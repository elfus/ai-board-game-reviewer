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

## Install REACT Query and REACT Query development tools

```bash
npm install @tanstack/react-query
npm install -D @tanstack/react-query-development
```

## Install Husky

```bash
npm run --save-dev husky
npx husky init
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

## Installing Ollama language models

The easiest way to install `ollama` is executing the following command

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Should you want or need to do a manual install follow the steps located at [Ollama manual install](https://github.com/ollama/ollama/blob/main/docs/linux.md)

Installation example:

```bash
curl -fsSL https://ollama.com/install.sh | sh
>>> Downloading ollama...
######################################################################## 100.0%#=#=#
>>> Installing ollama to /usr/local/bin...
[sudo] password for aortegag:
>>> Creating ollama user...
>>> Adding ollama user to render group...
>>> Adding ollama user to video group...
>>> Adding current user to ollama group...
>>> Creating ollama systemd service...
>>> Enabling and starting ollama service...
Created symlink /etc/systemd/system/default.target.wants/ollama.service → /etc/systemd/system/ollama.service.
>>> NVIDIA GPU installed
```

If you list the language models with `ollama list` you will get an empty list.

```bash
ollama list
NAME    ID      SIZE    MODIFIED
```

You need to install your desired model. For our project we chose `llama3`. You can checkout a complete list of complete models provided by `ollama` here at this location [ollama library](https://ollama.com/library). Run the command (this one will take a while to download the model around 4.7GB).

```bash
ollama pull llama3
pulling manifest
pulling 6a0746a1ec1a... 100% ▕████████████████████████████████████████████████████████████▏ 4.7 GB
pulling 4fa551d4f938... 100% ▕████████████████████████████████████████████████████████████▏  12 KB
pulling 8ab4849b038c... 100% ▕████████████████████████████████████████████████████████████▏  254 B
pulling 577073ffcc6c... 100% ▕████████████████████████████████████████████████████████████▏  110 B
pulling 3f8eb4da87fa... 100% ▕████████████████████████████████████████████████████████████▏  485 B
verifying sha256 digest
writing manifest
removing any unused layers
success
```

You can test the newly downloaded model with

```bash
ollama run llama3
>>> What is the capital of Mexico?
The capital of Mexico is Ciudad de México (Mexico City).
```

More information about `ollama` can found at [github](https://github.com/ollama/ollama)

## Install the ollama-ai-provider

```bash
npm i ollama-ai-provider
```

## Install the Vercel AI SDK

```bash
npm i ai
```

## Install JSON Server

We will use json-server 0.17.4 as a quick way to simulate our API.

[json-server](https://github.com/typicode/json-server/tree/v0)

```bash
npm install -D json-server@0.17.4
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

## Supabase

The following are some example functions on how to perform CRUD
operations using supabase api.

```js
/**
 * The following examples make some basic operations
 * on a dummy table using the supabase interface.
 *
 * You need to create the proper table and have
 * a corresponding Row Level Security (RLS) policy on
 * each table for each of the CRUD operations.
 *
 */
async function getDummyData() {
  const query = supabase.from('dummy').select('id, title, description');
  console.log(query);
  const { data, error } = await query;

  console.log(`data`, data);

  if (error) {
    console.error(error);
    throw new Error('Dummy could not get loaded');
  }

  return data;
}

async function insertDummyData() {
  const { data, error } = await supabase
    .from('dummy')
    .insert([{ title: 'Ark Nova', description: 'ZZZZZ;LKAS;LD' }]);

  if (error) {
    console.error(error);
    throw new Error('Dummy data could not be inserted');
  }
  console.log(`INSERT Returning data: ${data}`);
  return data;
}
async function updateDummyData() {
  const { data, error } = await supabase
    .from('dummy')
    .update({ description: new Date().toISOString() })
    .eq('id', 2);

  if (error) {
    console.error(error);
    throw new Error('Dummy data could not be updated');
  }
  console.log(`UPDATE Returning data: ${data}`);
  return data;
}

async function deleteDummy(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('dummy').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Dummy data could not be deleted');
  }
  return data;
}

function runSupaBaseExamples() {
  getDummyData();
  insertDummyData();
  updateDummyData();
  getDummyData();
  // change this number manually by checking the dummy table
  // on your browser
  deleteDummy(23);
}
```
