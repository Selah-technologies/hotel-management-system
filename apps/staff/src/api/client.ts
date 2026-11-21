// The only place that talks to the backend. Screens call api<T>(...) and never use fetch directly.
// Response format comes from handbook Chapter 18:
//   success: { "data": ... }
//   failure: { "error": { "code": "...", "message": "..." } }

export class ApiError extends Error {
  status: number; // HTTP status, or 0 when the server could not be reached
  code: string; // machine-readable, e.g. "ROOM_NOT_AVAILABLE"

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

type ApiInit = Omit<RequestInit, "headers"> & { headers?: Record<string, string> };

function baseUrl(): string {
  const url = import.meta.env.VITE_API_URL;
  if (!url) {
    throw new Error(
      "VITE_API_URL is not set. Copy apps/staff/.env.example to apps/staff/.env and restart the dev server.",
    );
  }
  return url;
}

export async function api<T>(path: string, init: ApiInit = {}): Promise<T> {
  const url = `${baseUrl()}${path}`;

  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      credentials: "include", // send the session cookie
      headers: {
        // Only describe a body when there is one.
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
      },
    });
  } catch {
    // fetch throws when the server is down, offline, or blocked by CORS.
    throw new ApiError(0, "NETWORK_ERROR", "Cannot reach the server. Check your connection and try again.");
  }

  if (res.status === 204) return undefined as T; // success with no content (logout, delete)

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      res.status,
      body?.error?.code ?? "UNKNOWN",
      body?.error?.message ?? "Request failed",
    );
  }
  return body.data as T;
}