import got from "got";

export async function publicFunctionsVizer(form: object) {
    let { body } = await got.post('https://vizer.tv/includes/ajax/publicFunctions.php', {
        form,
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
        }
    })
    return body
}