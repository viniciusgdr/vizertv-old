import { Vizer } from "../src";

(async () => {
    let vizer = new Vizer()

    // search
    let search = await vizer.search({
        query: 'The good Doctor',
        type: 'serie'
    })
    console.log(search)
    // get Info
    let info = await vizer.getInfo({
        url: search[0].url
    })
    console.log(info)
    // get Episodes and Temporates
    let temporates = await vizer.listSerieEpisodes({
        url: search[0].url
    })
    console.log(temporates)

    // get Player
    let player = await vizer.getPlayerSerie({
        // send the id of the episode
        id: temporates[0].episodes[0].id,
        // imdb, you get with getInfo
        imdbTT: info.imdbTT,
        language: 'pt'
    })
    console.log(player)
    // get download
    let download = await vizer.getDownload({
        id: Number(temporates[0].episodes[0].id),
        player: player.players[0].split('=')[2]
    })
    console.log(download)
})()