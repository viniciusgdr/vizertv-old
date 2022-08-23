import { Vizer } from '../src';

(async () => {
    let vizer = new Vizer()
    let search = await vizer.search({ query: "Velozes e Furiosos", type: 'movie' })
    console.log(search)
    let info = await vizer.getInfo({ url: search[0].url })
    console.log(info)
    let player = await vizer.getPlayer({ url: search[0].url, imdbTT: info.imdbTT, language: 'pt' })
    console.log(player)
    
    let download = await vizer.getDownload({
        id: player.id,
        player: player.players[0].split('=')[2]
    })
    console.log(download)
})();
