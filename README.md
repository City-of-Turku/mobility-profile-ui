# mobility-profile-ui

The Mobility Profile UI

[![Mobility Profile UI CI](https://github.com/City-of-Turku/mobility-profile-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/City-of-Turku/mobility-profile-ui/actions/workflows/ci.yml)
[![CodeQL](https://github.com/City-of-Turku/mobility-profile-ui/actions/workflows/codeql-analysis.yml/badge.svg?branch=develop)](https://github.com/City-of-Turku/mobility-profile-ui/actions/workflows/codeql-analysis.yml)

## Requirements

Using following:

- Node LTS (v18)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app by starting node server using build files.

### `npm build`

Builds the app for production to the `dist` folder.<br>

## How to use

For development:

- Make sure npm packages are installed by running `npm install`in project root.
- Make sure you have environment variables set. `.env.example` should have all required values so you can copy it to `.env`.
- Then you can start development server using `npm run dev`. Which watches files and updates on code changes.
- Code can be linted by running `npm run lint` which will check code for linting errors.
- Code can be formatted by running `npm run format` which will format the code using Prettier.
- You can run unit tests by running `npm test`.
