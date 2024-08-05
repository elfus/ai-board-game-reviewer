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

## AI Score
Calculates scores based on game data using [Vercel - AI SDK](https://sdk.vercel.ai/) and leaves them in `src/api/gameboard-list-scores.json`.

```bash
npm run score
```