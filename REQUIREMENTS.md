# SOFTWARE REQUIREMENTS FOR AI BOARD GAME REVIEWER

## INTRODUCTION

The app will be divided into three main features:

- Scrapper
- UI
- AI processing

### Scrapper

- Will read the forums from [Board Game Geek](www.boardgamegeek.com) to extract information about board games.
- The information needed to extract at the moment is:

  - Name
  - Time duration
  - Player count
  - Board game image
  - Year of release
  - Board game rating

- All the forum comments made by players
- The scrapper will save the information scrapped in a JSON file.
  - This JSON file will be served as an API

### UI

- Will read all the information from the scrapper API
- Will show each board game as a flash card
- Each flash card will have:
  - Name
  - Time duration
    - as reported by the game published
    - as reported by the users
  - Player count
  - Number of votes in [Board Game Geek](www.boardgamegeek.com)
  - Board game image as background in the flash card
  - Board game rating
    - See more details below
- The flash cards can be sorted by:
  - Name
  - Overall rating
- Search field
  - A user can perform a search based on the board game name.
- Filter field
  - A user can filter the list based on overall rating, time duration, player count.
- Board game rating
  - Two ratings will be displayed in the flash card:
    - The [Board Game Geek](www.boardgamegeek.com) rating
    - The rating generated with the Vercel AI SDK
- The UI will retrieve both scrapped and AI processed information via an API

### AI processing

- To calculate the board game rating all the forum comments will be processed using the Vercel AI SDK.

- Will instruct the Vercel AI SDK to:

  - Determine a rating between 1 and 10 based on the user comments
  - Determine a "real time" duration based on the user comments

- The results of the AI processing will be stored in a JSON file.
  - This JSON file will be served as an API.
