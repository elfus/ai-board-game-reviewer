import * as cheerio from 'cheerio';

const gamelist = {
  games: [],
};
const BASE_API_URL = 'https://boardgamegeek.com';
const $ = await cheerio.fromURL(`${BASE_API_URL}/browse/boardgame`);

const games = await $('table#collectionitems > tbody > tr#row_').map(
  async (index, el) => {
    //if (index >= 1) return
    // ID
    const $a = $(el).find('td a.primary');
    const href = $a.attr('href');
    const splitted = href?.split('/') || [];
    const id_name = splitted.pop() || '';
    const objectId = splitted.pop() || '';
    const bgg_rank = Number($(el).find('td.collection_rank').text());

    // Name, Description & Year
    const game = {
      id: 0,
      id_name,
      objectId,
      title: $a.text(),
      description: $(el).find('p.smallefont').text().trim(),
      year: Number(
        $(el).find('span.smallerfont').text().replace('(', '').replace(')', ''),
      ),
      bggRank: bgg_rank,
    };
    // Rating & Votes
    $(el)
      .find('td.collection_bggrating')
      .each((index, td) => {
        if (index === 1) game.rating = Number($(td).text().trim());
        if (index === 2) game.votes = Number($(td).text().trim());
      });
    // Images
    const $$ = await cheerio.fromURL(`${BASE_API_URL}${href}`);
    const $script = $$('script').eq(2);
    const $json = JSON.parse(
      $script.html()?.match(/GEEK.geekitemPreload = (\{.+\})/)?.[1] ??
        '{item:{}}',
    )['item'];
    game.duration = {
      min: Number($json['minplaytime']),
      max: Number($json['maxplaytime']),
    };
    game.players = {
      min: Number($json['minplayers']),
      max: Number($json['maxplayers']),
    };
    game.minage = Number($json['minage']);
    const stats = $json['stats'];
    game.weight = Number(stats['avgweight']);
    game.images = {
      default: $json['imageSets']['mediacard']['src'],
      '2x': $json['imageSets']['mediacard']['src@2x'],
      banner: $json['topimageurl'],
    };
    return game;
  },
);
gamelist.games = await Promise.all(games.get());

gamelist['count'] = [gamelist['games'].length];

// Assign an arbitray ID number for json-server
let i = 1;
gamelist['games'].forEach((game) => (game['id'] = i++));
// Print output
console.log(JSON.stringify(gamelist, null, 4));
