import { Vizer } from "..";

test('Search Films', async () => {
    const vizer = new Vizer();
    let search = await vizer.search({
        query: "Velozes e Furiosos",
        type: "movie"
    })
    expect(search)
})

test('Search Series', async () => {
    const vizer = new Vizer();
    let search = await vizer.search({
        query: "The good Doctor",
        type: "serie"
    })
    expect(search)
})