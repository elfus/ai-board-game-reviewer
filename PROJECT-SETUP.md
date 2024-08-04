# How to set up this project with Vite from scratch

## Start Vite project from scratch

```bash
npm create vite
```

Then I chose `React` as a framework and `JavaScript` as a variant and enter the requested information.

## Cloning from github

- Using `https` protocol

  - `git clone https://github.com/elfus/ai-board-game-reviewer.git`

- Using `git` protocol
  - `git clone git@github.com:elfus/ai-board-game-reviewer.git`

## Install missing components and dependencies

```bash
cd <project_name>
npm install
```

## Install and configure ESLint for React apps

```bash
npm i --save-dev vite-plugin-eslint eslint-config-react-app eslint
```

- Create the file `.eslintrc.json` in the root directory of the project.
  Inside this folder place the following content
  ```js
  {
      "extends" : "react-app"
  }
  ```
  This will tell `eslint` about all the react specific eslint rules.
- Then open the file `vite.config.js` and tell vite about the eslint plugin

  ```js
  import eslint from "vite-plugin-eslint";

  export default defineConfig({
    plugins: [react(), eslint()],
  });
  ```

## Install REACT router

```bash
npm i react-router-dom
```

## Install Cheerio for scrapping the web

```bash
npm i cheerio
```

## Start your project

- Finally execute `npm run dev` you should get something like

  ```bash
  VITE v5.3.5  ready in 256 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
  ```

  Click on the localhost address and you're ready to work.
