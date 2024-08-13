import gamelist from '../api/gameboard-list.json';

for (let game of gamelist.games) {
  // Comments
  let comments = game.comments ?? [];
  try {
    const COMMENTS_API_URL = `https://api.geekdo.com/api/collections?ajax=1&comment=1&objectid=${game.objectId}&objecttype=thing&oneperuser=1&pageid=1&rated=1&require_review=true&showcount=50&sort=review_tstamp`;
    const commentsResponse = await fetch(COMMENTS_API_URL, {
      signal: AbortSignal.timeout(30000),
    }).then((res) => res.json());
    game.comments = (commentsResponse?.items ?? comments)
      .map((item) => item?.textfield?.comment?.rendered ?? '')
      .filter((str) => str.length > 25 && str.length < 300)
      .slice(15);
  } catch (e) {
    game.comments = comments;
  }
  // Price
  let price = 0;
  try {
    const PRICE_API_URL = `https://api.geekdo.com/api/geekbay/summary?nosession=1&objectid=${game.objectId}&objecttype=thing&sort=price`;
    const priceResponse = await fetch(PRICE_API_URL, {
      signal: AbortSignal.timeout(30000),
    }).then((res) => res.json());
    game.price = Number(priceResponse?.fromprice ?? price);
  } catch (e) {
    game.price = price;
  }
}

console.log(JSON.stringify(gamelist, null, 4));
