# D-11: Branching model

- **Status:** Decided
- **Recorded:** 2026-10-27
- **Agreed by:** Eyuel (Member 1) and Member 2 (confirmed in a message to Eyuel). Members 3 and 4 confirm by approving the pull request that adds this file.
- **Source:** Team handbook, decision D-11 (Appendix B)

## Context

Four beginners need a simple Git workflow that avoids overwriting each other's work and keeps a working version available for demos.

## Options

- **A: main plus develop**, with short-lived feature branches that merge into develop. Pros: develop acts as a buffer, so main stays demonstrable. Cons: more ceremony.
- **B: main only**, with short-lived feature branches merging straight into main. Pros: less ceremony. Cons: no buffer before demos.

The handbook says to choose either one and not to mix them.

## Decision

Option A: main plus develop, as the handbook recommends.

## Consequences

- main stays demonstrable, and develop is the integration branch.
- Feature branches are named like feature/reservations-availability.
- Changes reach main and develop only through pull requests. A GitHub ruleset named protect-main-and-develop blocks direct pushes, force-pushes and deletion of those two branches, and requires a pull request.
- GitHub's default branch is main, so pull requests must be pointed at develop by hand. Whether to make develop the default branch is still open.
- Open items: required status checks will be added to the ruleset once CI exists, and the pull request merge method (merge commit, squash or rebase) is not decided yet.
