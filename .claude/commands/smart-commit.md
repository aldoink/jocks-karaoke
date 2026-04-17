Run quality checks, then commit all staged/unstaged changes with a well-crafted commit message.

## Steps

### 1. Understand what changed
Run `git diff HEAD` and `git status` to understand the scope of changes before doing anything else.

### 2. Run quality checks

Run these checks. If any fail, fix the issues before committing — do not commit broken code.

**Backend** (only if Kotlin/Groovy/SQL files changed):
```bash
./gradlew :backend:build        # Compile + package
./gradlew :backend:test         # Spock tests (requires Docker for Testcontainers)
```

**Frontend** (only if files under `frontend/src/` changed):
```bash
cd frontend
NODE_OPTIONS=--openssl-legacy-provider yarn build   # Full production build
yarn test --watchAll=false                           # Jest + RTL tests
```

All checks must pass. Fix any failures before proceeding.

### 3. Stage changes
Stage all modified and new tracked files. Do not stage `.env` files, secrets, or generated build artefacts.

### 4. Craft the commit message

Follow the style of recent commits in this repo (run `git log --oneline -10`):
- First line: imperative mood, ≤72 chars, no trailing period
- If the change is non-trivial, add a blank line then a short body explaining *why*, not *what*
- Reference a WP migration range if the change is a song import (e.g. "Add White Pen songs WP-0376–WP-0390")

### 5. Commit
```bash
git commit -m "..."
```

Report the final commit hash and one-line summary when done.
