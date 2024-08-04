import * as cheerio from 'cheerio'

async function $fetch(url) {
    const data = await fetch(url)
    return cheerio.load(await data.text())
}

const games = {}
const BASE_API_URL = 'https://boardgamegeek.com'
const $ = await $fetch(`${BASE_API_URL}/browse/boardgame`)

await $('table#collectionitems > tbody > tr#row_').each(async (index, el) => {
    //if (index >= 1) return
    // ID
    const $a = $(el).find('td a.primary')
    const href = $a.attr('href')
    const id = href?.split('/')?.pop() || ''
    // Name, Description & Year
    games[id] = { 
        name: $a.text(),
        description: $(el).find('p.smallefont').text().trim(),
        year: Number($(el).find('span.smallerfont').text().replace('(', '').replace(')', '')),
    }
    // Rating & Votes
    $(el).find('td.collection_bggrating').each((index, td) => {
        if (index === 1) games[id].rating = Number($(td).text().trim())
        if (index === 2) games[id].votes = Number($(td).text().trim())
    })
    // Images
    const $$ = await $fetch(`${BASE_API_URL}${href}`)
    const $script = $$('script').eq(2)
    const $json = JSON.parse($script.html()?.match(/GEEK.geekitemPreload = (\{.+\})/)?.[1]?? '{item:{}}')['item']
    games[id].duration = {
        min: Number($json['minplaytime']),
        max: Number($json['maxplaytime']),
    }
    games[id].players = {
        min: Number($json['minplayers']),
        max: Number($json['maxplayers']),
    }
    games[id].minage = Number($json['minage'])
    const stats = $json['stats']
    games[id].weight = Number(stats['avgweight'])
    games[id].images = {
        default: $json['imageSets']['mediacard']['src'],
        '2x': $json['imageSets']['mediacard']['src@2x'],
        banner: $json['topimageurl'],
    }
    games[id].score = {
        fun: Math.round(Math.random() * 10),
        learning_curve: Math.round(Math.random() * 10),
        duration: Math.round(Math.random() * 10),
        players: Math.round(Math.random() * 10),
        difficulty: Math.round(Math.random() * 10),
        cost: Math.round(Math.random() * 10),
    }
    //console.log($json)
})

await new Promise(resolve => setTimeout(resolve, 10000))

// Print output
console.log(JSON.stringify(games, null, 4))
