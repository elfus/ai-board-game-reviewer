# AI BOARD GAME REVIEWER

## Description

This app is a board game reviewer which reads reviews, comments, questions and opinions scrapped from the internet then are processed with the Vercel AI SDK to calculate an overall rating based on the comments.

## How to run

### UI

To start the server application run the following command in the project root directory.

```bash
npm run dev
```

## Scraper

Run scrapper and leave data in `src/api/gameboard-list.json`.

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
- Get a short list of the board games containing the `id` and `id_name`
  `GET /shortlist`
  _Response_
  ```bash
  curl http://localhost:3000/shortlist
  [
    {
        "id": 1,
        "id_name": "brass-birmingham"
    },
    {
        "id": 2,
        "id_name": "pandemic-legacy-season-1"
    }
  ]
  ```
- Get a complete list of all board games with detailed attributes for each board game
  `GET /all`

  _Response_

  ```bash
  curl http://localhost:3000/all
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
  `GET /all?id=56`
- Get game with `id_name` equals to `inis`
  `GET/all?id_name=inis`
- Get game with `title` equals to `Gloomhaven`
  `GET/all?id_name=Gloomhaven`
- Get all games released in `2016`
  `GET/all?year=2016`

###### Advanced queries

- Get all games with a duration at least 60 minutes
  `GET/all?duration.min_gte=60`
- Get all games that require at least 3 players.
  `GET/all?players.min_gte=3`
- Get all games that have a fun score of at least 6
  `GET/all?score.fun_gte=6`
