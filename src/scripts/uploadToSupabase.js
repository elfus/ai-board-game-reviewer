import toast from 'react-hot-toast';

import { readFileSync } from 'fs';
let gamelist = JSON.parse(readFileSync('./src/api/gameboard-list-scores.json'));

import { createClient } from '@supabase/supabase-js';
// NOTE: Before executing this script you sould replace
// the import.meta.env variables with some strings with valid
// URL and a valid Key.
//
// These variables are Vite variables and when exucted outside
// Vite in a node.js command line they will result in error
// because they cannot be resolved.
//
// I could have added the key and url here but I didn´t want them
// to show up in the GITHUB repository. This information should be
// kept secretly in your .env file
export const supabaseUrl = import.meta.env.VITE_BASE_API_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

let supaGames = [];
for (const game of gamelist['games']) {
  let commentsSupabase = {
    id: game.id,
    comments: game.comments.join('.\n\n '),
  };

  let aiScore = {
    id: game.id,
    fun: game.score.fun,
    learning_curve: game.score.fun,
    players: game.score.players,
    difficulty: game.score.difficulty,
    cost: game.score.cost,
    duration: game.score.duration,
  };

  let supaGame = {
    duration_min: game.duration.min,
    duration_max: game.duration.max,
    players_min: game.players.min,
    players_max: game.players.max,
    images_default: game.images.default,
    images_2x: game.images['2x'],
    images_banner: game.images.banner,
    overall: game.overall,
    rank: game.rank,
  };
  delete game.duration;
  delete game.players;
  delete game.images;
  delete game.comments;
  delete game.score;
  // TODO the following two properties should be calculated in a view
  delete game.overall;
  delete game.rank;
  supaGame = {
    ...supaGame,
    ...game,
    supaComments: { ...commentsSupabase },
    supaScore: { ...aiScore },
  };

  supaGames.push(supaGame);
}

for (const supag of supaGames) {
  const { errorComments } = await supabase
    .from('comments')
    .insert(supag.supaComments);

  if (errorComments) {
    console.error(errorComments);
    toast.error(`Comment could not be uploaded ${errorComments}`);
    throw new Error('Comment could not be inserted');
  }

  delete supag.supaComments;

  const { errorScore } = await supabase
    .from('ai_score')
    .insert(supag.supaScore);
  if (errorScore) {
    console.error(errorScore);
    toast.error(`Score could not be uploaded ${errorScore}`);
    throw new Error('Score could not be inserted');
  }
  delete supag.supaScore;

  const { errorGame } = await supabase.from('games').insert(supag);

  if (errorGame) {
    console.error(errorGame);
    toast.error(`Game could not be uploaded ${errorGame}`);
    throw new Error('Game could not be inserted');
  }
}
