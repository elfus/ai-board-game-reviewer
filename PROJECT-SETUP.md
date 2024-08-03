# How to set up this project with Vite from scratch

- `npm create vite`
  Then I chose `React` as a framework and `JavaScript` as a variant.

- `cd <project_name>`
- `npm install`
- `npm i --save-dev vite-plugin-eslint eslint-config-react-app eslint`
- Create the file `.eslintrc.json` in the root directory of the project.
  Inside this folder place the following content
  ```
  {
      "extends" : "react-app"
  }
  ```
  This will tell `eslint` about all the react specific eslint rules.
- Then open the file `vite.config.js` and tell vite about the eslint plugin

  ```
  import eslint from 'vite-plugin-eslint'

  export default defineConfig({
    plugins: [react(), eslint()]
  })
  ```

- Finally execute `npm run dev` you should get something like

  ```
  VITE v5.3.5  ready in 256 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
  ```

  Click on the localhost address and you're ready to work.
