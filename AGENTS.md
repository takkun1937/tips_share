# Codex Guidelines

This repository uses Codex for AI-assisted contributions. All contributors should run the following checks from the `frontend` directory before committing:

- `npm run lint`
- `npx prettier --check .`
- `npx vitest run`
- `npx playwright test`
- `npm audit`
- Optionally, scan the project with OWASP ZAP using the Docker environment.

For local development, Docker Compose is used as described in the README. Typical steps:

```bash
# Build and start the development environment
docker compose -f compose.dev.yaml build
docker compose -f compose.dev.yaml up
```

These steps help ensure code style, tests, and security checks are run consistently.

Codex should ignore the `android` and `ios` directories by default when exploring
or modifying code unless a prompt explicitly instructs otherwise. These folders
contain the mobile build artifacts generated from the frontend and rarely need
manual changes.
