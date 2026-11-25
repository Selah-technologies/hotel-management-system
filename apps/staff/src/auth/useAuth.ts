import type { CurrentUser } from "./types";
import { STAND_IN_USER } from "./standInUser";

// TEMPORARY: always returns the stand-in user.
// Later this reads the signed-in user from GET /api/auth/me (needs Member 2's contract).
export function useAuth(): { user: CurrentUser | null } {
  return { user: STAND_IN_USER };
}