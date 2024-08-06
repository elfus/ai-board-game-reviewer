# AI BOARD GAME REVIEWER

## Description

AI Board Game Reviewer reads reviews, comments, questions and opinions scrapped from the internet then are processed with the Vercel AI SDK to calculate an overall rating based on the comments.

AI Board Game Reviewer was designed in two main components:

- AI Scrapper
  - The scrapper is meant to be run asynchronously.
  - The scrapper uses the Vercel SDK to rate each board game.
  - The final output of the scrapper is `gameboard-list-scores.json`
- Web page
  - Our web page will consume the data in `gameboard-list-scores.json` via `json-server` and present the ratings to the user.

## How to run

In order to run locally you need to run the following steps:

1. Scrap and analyze data with Vercel SDK to generate the final `gameboard-list-scores.json` file.

   - We have included a `gameboard-list-scores.json` so you can skip this step.
   - If you want to run the scrapper along with the vercel sdk follow this steps.

   ```bash
   npm run scrap    # Scrap initial board game data
   npm run comments # Scrap people's comments on the board games
   npm run score    # Use the Vercel SDK to rate scrapped board games
   ```

2. Start the `json-server` with

   ```bash
   npm run server
   ```

3. Start the web application

   ```bash
   npm run dev
   ```

The following sections provide more details on what each of the components do.

You can start testing the application now or continue reading if you want more details.

## Scraper

Run scrapper, this will leave data in `src/api/gameboard-list.json`.

```bash
npm run scrap
```

## Comments

Run fetch process for getting comments and prices and leave the data in `src/api/gameboard-list-comments.json`.

```bash
npm run comments
```

## AI Score

Calculates scores based on game data using [Vercel - AI SDK](https://sdk.vercel.ai/) and leaves them in `src/api/gameboard-list-scores.json`.

```bash
npm run score
```

## json-server

The `json-server` will provide several endpoints based on the json file provided.

Currently the format used by our scrapper will provide the following endpoints

- Get the number of available board games
  `GET /count`
  _Response_

  ```bash
  curl http://localhost:3000/count
  [
    100
  ]
  ```

- Get a complete list of all board games with detailed attributes for each board game
  `GET /games`

  _Response_

  ```bash
  curl http://localhost:3000/games
  [
  {
      "id": 99,
      "id_name": "decrypto",
      "name": "Decrypto",
      "description": "Decipher your opponents' code before they decipher yours. Don't get caught.",
      "year": 2018,
      "rating": 7.77,
      "votes": 22885,
      "duration": {
      "min": 15,
      "max": 45
      },
      "players": {
      "min": 3,
      "max": 8
      },
      "minage": 12,
      "weight": 1.8128,
      "images": {
      "default": "https://cf.geekdo-images.com/hHZWXnUTMYDd_KTAM6Jwlw__mediacard/img/WKrwq2W6lUtSo7Oi6_C0xlV2QLs=/0x0:558x314/288x162/filters:strip_icc()/pic3759421.jpg",
      "2x": "https://cf.geekdo-images.com/hHZWXnUTMYDd_KTAM6Jwlw__mediacard@2x/img/-grqiICsr2alYcmu7UICV_ksIp0=/0x0:558x314/576x324/filters:strip_icc()/pic3759421.jpg",
      "banner": "https://cf.geekdo-images.com/bGQoGiLpnp0Tq_DVfk5sNw__itemheader/img/gvOCuaAVz_swjtdriS6Tr9LKdeE=/800x450/filters:quality(30):strip_icc()/pic4012525.jpg"
      },
      "score": {
      "fun": 3,
      "learning_curve": 5,
      "duration": 3,
      "players": 5,
      "difficulty": 6,
      "cost": 6
      }
  }
  ]
  ```

#### Filtering endpoint requests

`json-server` provides some nice features by default to perform basic filtering.

Below are some endpoint requests doing basic filtering on our scrapped database.

###### Basic queries

- Get game with a `id` equals to `56`
  `GET /games?id=56`
- Get game with `id_name` equals to `inis`
  `GET/games?id_name=inis`
- Get game with `title` equals to `Gloomhaven`
  `GET/games?title=Gloomhaven`
- Get all games released in `2016`
  `GET/games?year=2016`

###### Advanced queries

- Get all games with a duration at least 60 minutes
  `GET/games?duration.min_gte=60`
- Get all games that require at least 3 players.
  `GET/games?players.min_gte=3`
- Get all games that have a fun score of at least 6
  `GET/games?score.fun_gte=6`

## UI

To start the server application run the following command in the project root directory.

```bash
npm run dev
```
