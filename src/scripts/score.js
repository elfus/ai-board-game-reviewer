import { ollama } from 'ollama-ai-provider';
import { generateObject } from 'ai';
import { z } from 'zod'; 

import gamelist from '../api/gameboard-list-comments.json' assert { type: "json" };

for(let game of gamelist.games){
    try{
        const { object } = await generateObject({
            model: ollama("llama3"),
            mode: 'json',
            schema: z.object({
                fun: z.number(),
                learning_curve: z.number(),
                duration: z.number(),
                players: z.number(),
                difficulty: z.number(),
                cost: z.number(),
            }),
            temperature: 0.5,
            prompt: `Give me scores between 1 and 10 for ONLY the following categories (being 0 the worst score and 10 the best score): fun, learning_curve, duration, players, difficulty, cost.
                Default to 1 if you don't rely on the answer of any of the categories.
                Include score for all the categories even if you don't rely on the answer of any of the categories.
                What are the scores for the game: "${game.name}"?, 
                Considering the duration is: ${game.duration.min}, 
                the number of players is: ${game.players.min}, 
                the weight is: ${game.weight},
                the rating score is: ${game.rating} with number of votes: ${game.votes},
                the price is: ${game.price},
                and the comments provided: "${game.comments.join(',')}".`,
        })

        game.score = object
    }catch(e){
        game.score = {
            fun: 1,
            learning_curve: 1,
            duration: 1,
            players: 1,
            difficulty: 1,
            cost: 1,
        }
    }
}

console.log(JSON.stringify(gamelist, null, 4))