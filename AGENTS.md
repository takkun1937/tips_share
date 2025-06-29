# Codex Guidelines

This repository uses Codex for AI-assisted contributions. All contributors should run the following checks from the `frontend` directory before committing:

- `npm run lint`
- `npx prettier --check .`

These checks ensure code style and unit tests pass without internet access.

For local development, start the Next.js app with `npm run dev` inside the `frontend` directory.

Codex should ignore the `android` and `ios` directories by default when exploring
or modifying code unless a prompt explicitly instructs otherwise. These folders
contain the mobile build artifacts generated from the frontend and rarely need
manual changes.

## Next.js code generation guidelines

When creating or modifying frontend code, follow Next.js best practices and use a
`features` directory structure under `frontend/` to group functionality. Imports must
respect the following restrictions:

'import/no-restricted-paths': [
  'error',
  {
    zones: [
      // disables cross-feature imports
      {
        target: './features/auth',
        from: './features',
        except: ['./auth'],
      },
      {
        target: './features/comments',
        from: './features',
        except: ['./comments'],
      },
      {
        target: './features/discussions',
        from: './features',
        except: ['./discussions'],
      },
      {
        target: './features/teams',
        from: './features',
        except: ['./teams'],
      },
      {
        target: './features/users',
        from: './features',
        except: ['./users'],
      },
      // enforce unidirectional codebase
      {
        target: './features',
        from: './app',
      },
      {
        target: [
          './components',
          './hooks',
          './lib',
          './types',
          './utils',
        ],
        from: ['./features', './app'],
      },
    ],
  },
];

If your code generation requires changes to these paths or introduces new
directories, update the ESLint configuration accordingly so that these
restrictions remain enforced.

## Capacitor mobile build

The frontend will ultimately be released as a mobile app using Capacitor.
Ensure any generated Next.js code remains compatible with `next export` after
running `npm run build`. This allows the project to be exported to static files
for packaging with Capacitor.
