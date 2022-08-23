import { Vizer } from "..";

test('getInfo movie and series', async () => {
    const vizer = new Vizer();
    let search = await vizer.search({
        query: "Velozes e Furiosos",
        type: "movie"
    })
    let info = await vizer.getInfo({
        url: search[0].url
    })
    expect(info)
})