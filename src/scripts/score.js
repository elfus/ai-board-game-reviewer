import { ollama } from 'ollama-ai-provider';
import { generateObject } from 'ai';
import { z } from 'zod'; 

import gamelist from '../api/gameboard-list.json' assert { type: "json" };

const updatedGameList = { games: [] };

for(let gameId in gamelist){
    const game = gamelist[gameId]

    const { object } = await generateObject({
        model: ollama("llama3"),
        schema: z.object({
            fun: z.number(),
            learning_curve: z.number(),
            duration: z.number(),
            players: z.number(),
            difficulty: z.number(),
            cost: z.number(),
        }),
        prompt: `Give me score between 0 and 10 for the following categories (being 0 the worst score and 10 the best score): fun, learning curve, duration, players, difficulty, cost.
            What is the score for the game: "${game.name}"?, 
            considering the duration is: ${game.duration.max}, 
            the number of players is: ${game.players.max}, 
            the weight is : ${game.weight}, 
            and it is rated with score: ${game.rating} with number of votes: ${game.votes}.
            Default to 0 if you don't rely on the answer of any category.
            `,
    })
    updatedGameList.games.push({...game, score: object})
}

console.log(JSON.stringify(updatedGameList, null, 4))