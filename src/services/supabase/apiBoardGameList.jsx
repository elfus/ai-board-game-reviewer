import toast from 'react-hot-toast';
import supabase from '../supabase';

function normalize(games_table, ai_score_table) {
  /* NOTE: The following code might look excessive, the reason
    for it is that we are matching the structure provided by the JSON
    server. Of course this chould have been avoided by making a better
    design of the tables and endpoint APIs which could have simplified
    this function, but please keep in mind that this project was
    developed for learning purposes, in fact this comment turned out
    to be the result of that learning process.

    I will leave this function as is to match the JSON structure
    as returned by the JSON Server. By doing this we avoid modifying
    the code in GameCard.jsx

    */
  let map = new Map(
    games_table.map((row) => [
      row.id,
      {
        ...row,
        score: {
          fun: 0,
          learning_curve: 0,
          duration: 0,
          players: 0,
          difficulty: 0,
          cost: 0,
        },
        players: {
          min: row.players_min,
          max: row.players_max,
        },
        images: {
          default: row.images_default,
          '2x': row.images_2x,
          banner: row.images_banner,
        },
      },
    ]),
  );

  for (const score_row of ai_score_table) {
    let currGame = map.get(score_row.id);

    map.set(score_row.id, {
      ...currGame,
      score: { ...score_row },
      players: {
        min: currGame.players_min,
        max: currGame.players_max,
      },
      images: {
        default: currGame.images_default,
        '2x': currGame.images_2x,
        banner: currGame.images_banner,
      },
    });
  }

  return Array.from(map.values());
}

export async function getBoardGamesPage({ page, pageSize }) {
  if (!page || !pageSize) return null;

  const games = await supabase
    .from('games')
    .select('*')
    .order('rank', { ascending: true })
    .range((page - 1) * pageSize, page * pageSize - 1);

  const ids = games.data.map((row) => row.id);
  const ai_score = await supabase.from('ai_score').select().in('id', ids);
  if (games.error) {
    toast.error('Error fetching page data: ', games.error);
    throw new Error(games.error);
  }

  if (ai_score.error) {
    toast.error('Error fetching page data: ', ai_score.error);
    throw new Error(ai_score.error);
  }
  const dataNormalized = await normalize(games.data, ai_score.data);

  return dataNormalized;
}

export async function getBoardGamesCount() {
  const { count, error } = await supabase
    .from('games')
    .select('*', { count: 'exact', head: true });

  if (error) {
    toast.error(error);
    throw new Error(error);
  }

  return count;
}

export async function getTopThree() {
  const supaGames = await supabase.from('games').select().lte('rank', 3);
  const ids = supaGames.data.map((row) => row.id);
  const score_table = await supabase.from('ai_score').select().in('id', ids);
  let dataNormalized = normalize(supaGames.data, score_table.data);

  return dataNormalized;
}

export async function getLastUpdated() {
  const { data, error } = await supabase
    .from('ai_score')
    .select('created_at')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    toast.error(error);
    console.error(`Error fetching last updated data ${error}`);
  }

  return data['created_at']; // return ISO string
}
