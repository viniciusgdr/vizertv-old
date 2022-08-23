
# Vizer TV - Filmes, Séries e Animes

O Projeto consegue capturar os players e resultados de filmes, séries e animes do site https://vizer.tv, pelo provedor WarezCDN.




## Instalação

Instale vizertv com npm

```bash
  npm install github:viniciusgdr/vizertv
```
    
## Funcionalidades

Procurar Filmes, animes e séries.
```ts
let vizer = new Vizer()
let search = await vizer.search({ 
    query: "Velozes e Furiosos", 
    type: 'movie' | 'serie'
})
console.log(search)
```

Pegar informações sobre determinado filme, anime ou série.
```ts
let vizer = new Vizer()
let info = await vizer.getInfo({ url: 'url' })
console.log(info)
```
Conseguir o Player (WarezCDN, etc)
```ts
let player = await vizer.getPlayer({ 
    url: search[0].url, 
    imdbTT: info.imdbTT, 
    language: 'pt' 
})
console.log(player)
```
