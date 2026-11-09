# Eidos MD for Raycast

Open your [Eidos](https://eidosmd.com) projects in Eidos MD and search inside one, from Raycast, on macOS and Windows.

- **Open Project** lists the projects this computer knows: the ones Eidos MD opened lately, the ones in your projects folder (Documents/Eidos unless you chose another), and any folders you add in the preferences. Enter opens one in Eidos MD; ⌘F searches it.
- **Search Project** finds a blueprint, a top-level doc, a draft, or a task by its id, its title, or a property as you type, and finds the words inside the blueprints once you pause. Enter opens it in Eidos MD at its own page.

Give either command, or a project's quicklink, a hotkey in Raycast's settings to reach it in one chord.

## What it needs

Eidos MD 0.22 or later. The extension reads each project through the `eidos` command: the one on your PATH, or the one inside Eidos MD when there is none. It writes nothing to a project.

## How it reads your projects

The recent projects come from Eidos MD's own `state.json` (its `recent` list only), in `~/Library/Application Support/eidosmd/` on macOS and `%APPDATA%\eidosmd\` on Windows, and the projects folder from `projects_folder` in the `preferences.yaml` beside it. A result opens in the app by an `eidosmd://open?project=<folder>&to=<page>` link.

The design is the Raycast Extension spec in the Eidos MD project (B-A54).

## Develop

```bash
npm install
npm run dev
```

`npm run lint` and `npm test` check it; `npm run build` builds it the way the Store does.
