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
  import eslint from 'vite-plugin-eslint';

  export default defineConfig({
    plugins: [react(), eslint()],
  });
  ```

## Install JSON Server

We will use json-server 0.17.4 as a quick way to simulate our API.

[json-server](https://github.com/typicode/json-server/tree/v0)

```bash
npm install -D json-server@0.17.4
```

## Install REACT router

```bash
npm i react-router-dom
```

## Install Cheerio for scrapping the web

```bash
npm i cheerio
```

## Install Tailwind CSS

Since we are using Vite we followed the instructions located at [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Install PropType

```bash
npm i prop-types
```

#### Configure your template paths

Add the paths to all of your template files in your `tailwind.config.js` file.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### Add the Tailwind directives to your CSS

Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Install Tailwind CSS prettier extension

A Prettier v3+ plugin for Tailwind CSS v3.0+ that automatically sorts classes based on our recommended class order. [Prettier Plugin Tailwind CSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

Then add the plugin to your Prettier configuration. See [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

```js
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Start JSON Server

```bash
npm run server
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
