# Overview

This application is a simple web-frontend to open pre-defined bookmarks that added through JavaScript code.

# Components and directory structure

The application contains 3 components:

- The web application itself is implemented in `src/web-app` and in `dist`.
- The user manual is documented in `src/user-manual`.
- A simple static HTTP web server is implemented in `src/web-server`.

The following directories can be ignored (they are auto-generated or not relevant for any coding/analysis task):

- `.launchpad`
- `.vscode`
- `archive`
- `build`
- `dist/data`
- `dist/data-demo`
- `dist/data-template`
- `dist/resources`
- `docs`
- `releases`

# Architecture of the web application

- The web app uses plain HTML, CSS and TypeScript (without any framework like React or Tailwind).
- All components are hard-coded HTML in `dist/index.html`.
- The `css` files in `src/web-app` (particularly `src/web-app/pages`) adds the CSS styling (as plain CSS).
- The TypeScript files in `src/web-app/pages` manage the components (show or hide them and add event handlers).

# Development

- This project does not use any unit tests. Changes are tested manually after they have been implemented.
- You can run `make` to compile the web application and check if it is syntactically correct.
