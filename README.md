# Marknotes Front-end

[![build](https://github.com/Christian-007/marknotes-fe/workflows/Build/badge.svg)](https://github.com/Christian-007/marknotes-fe/actions) [![codecov](https://codecov.io/gh/Christian-007/marknotes-fe/branch/master/graph/badge.svg)](https://codecov.io/gh/Christian-007/marknotes-fe)

Marknotes is a note-taking app that lets you write using a markdown format. This app is built upon `Angular v8.x`, `Bootstrap`, `Ngrx`, and many more.

## Core Technology

The core of this app is the markdown parser which will hugely help to convert any of markdown formats into the readable article format. The markdown parser used is called `marked` (https://github.com/markedjs/marked).

- `marked` --> the markdown parser.
- `highlight.js` --> syntax highlighting add-ons that is configured onto marked.
- `DOMPurify` --> DOM Sanitizer to make sure the inputted markdown is safe for HTML.

## Design Patterns

There are several design patterns implemented in this project. The list may change in the future as the project goes. Another design pattern will be implemented if there's any suitable use case upon building this project. As such, the implemented design patterns will be documented as follows.

### State Management: Ngrx

The core of Marknotes _State Management_ pattern. This significantly improves the code reusability and maintainability, but comes with trade-offs that make the overall codebase more complicated than ever (just like any design patterns). In Marknotes, some of ngrx features are used:

- `@ngrx/store`
- `@ngrx/effects`
- `@ngrx/selectors`
- `@ngrx/entity` --> for reducing boilerplate when dealing with entity type of data by providing built-in CRUD operations, such as `addOne()`, `addMany()`, `updateOne()`, etc.

### Strategy Pattern

This is currently used for handling the way User data to be saved into the storage. The flow looks something like the following:

- User (_not logged in_) --> use `LocalStorageStrategy` (all data will be saved on Local Storage).
- User (_logged in_) --> use `BackendStrategy` (data will be saved into the Backend server DB).
