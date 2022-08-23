import { Vizer } from "..";

test('Serie Episodes', async () => {
    const vizer = new Vizer();
    let search = await vizer.search({
        query: "The good Doctor",
        type: "serie"
    })
    let episodes = await vizer.listSerieEpisodes({
        url: search[0].url
    })
    expect(episodes)
})