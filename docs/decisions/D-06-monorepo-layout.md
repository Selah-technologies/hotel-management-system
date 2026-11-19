# D-06: Repository layout

- **Status:** Decided
- **Recorded:** 2026-10-27
- **Agreed by:** the team, as reported by Eyuel (Member 1). Teammates confirm by approving the pull request that adds this file.
- **Source:** Team handbook, decision D-06 (Appendix B)

## Context

The HMS has an API, a public website, a staff dashboard, and code shared between them. We needed to choose how to organize the code.

## Options

- **A: one monorepo** with apps/api, apps/web, apps/staff and packages/shared. Pros: one pull request can change the API and the frontends together, and types can be shared. Cons: slightly more tooling.
- **B: three repositories.** Pros: simple mental model. Cons: the API and frontends can drift apart, and setup is tripled.

## Decision

Option A: one monorepo managed with npm workspaces, as the handbook recommends.

## Consequences

- Workspace packages are named @hms/api, @hms/web, @hms/staff and @hms/shared (agreed with Member 2).
- The initial structure was created in commit 8370acb on main.
- packages/shared holds types, constants and pure helpers only, with no business logic. Code that more than one app needs lives there. apps/api/src/shared holds backend-internal utilities only.
- One package-lock.json at the repository root is committed. npm generates it, and nobody edits it by hand.
