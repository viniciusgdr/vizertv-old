import { Vizer } from "..";

test('Player Movie' , async () => {
    const vizer = new Vizer();
    let search = await vizer.search({
        query: "Velozes e Furiosos",
        type: "movie"
    })
    let info = await vizer.getInfo({
        url: search[0].url
    })
    let player = await vizer.getPlayer({
        url: search[0].url,
        imdbTT: info.imdbTT,
        language: 'pt'
    })
    expect(player)
})

test('Player Series', async () => {
    const vizer = new Vizer();
    let search = await vizer.search({
        query: "The good Doctor",
        type: "serie"
    })
    let info = await vizer.getInfo({
        url: search[0].url
    })
    let episodes = await vizer.listSerieEpisodes({
        url: search[0].url
    })
    let player = await vizer.getPlayerSerie({
        id: episodes[0].episodes[0].id,
        imdbTT: info.imdbTT,
        language: 'pt'
    })
    expect(player)
})