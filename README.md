# Hotel Management System (HMS)

A web-based Hotel Management System for one hotel, built by a team of four university students.

> **Status:** project setup in progress. Anything marked _Planned_ describes the agreed design and is not implemented yet.

## What this repository contains

One repository (a monorepo using npm workspaces) with:

| Folder | Purpose | Status |
|---|---|---|
| `apps/api` | Shared Node.js, Express and TypeScript API | Planned |
| `apps/web` | Public hotel website and customer portal (React) | Planned |
| `apps/staff` | Staff dashboard for Admin, Manager, Receptionist and Housekeeping roles (React) | Planned |
| `packages/shared` | Shared types, constants and pure helpers (no business logic) | Planned |
| `docs/` | Handbook, API contract and decision records | Planned |

Data is stored in PostgreSQL and accessed through Prisma. The system is a modular monolith for one hotel, not microservices.

## Prerequisites

_To be confirmed as the apps are scaffolded:_ Node.js and npm (version to be pinned), Git, and PostgreSQL (the handbook's SQL was tested on PostgreSQL 16).

## Getting started

_Planned._ This section must let a new teammate run all three apps and the database in ten minutes. It will be written as each part is built and tested.

## Team workflow

- Branches: `main` (always demonstrable), `develop` (integration), and short-lived `feature/<module>-<short-name>` branches.
- All changes reach `develop` through pull requests.
- Commit messages: `type(scope): summary (requirement id)`.
- Only the schema owner merges database migrations.
- `.env` files are never committed; `.env.example` files are.
- Decisions are recorded in `docs/decisions/`.

The full rules are in the team handbook.
