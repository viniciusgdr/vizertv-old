"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let vizer = new src_1.Vizer();
    // search
    let search = yield vizer.search({
        query: 'The good Doctor',
        type: 'serie'
    });
    console.log(search);
    // get Info
    let info = yield vizer.getInfo({
        url: search[0].url
    });
    console.log(info);
    // get Episodes and Temporates
    let temporates = yield vizer.listSerieEpisodes({
        url: search[0].url
    });
    console.log(temporates);
    // get Player
    let player = yield vizer.getPlayerSerie({
        // send the id of the episode
        id: temporates[0].episodes[0].id,
        // imdb, you get with getInfo
        imdbTT: info.imdbTT,
        language: 'pt'
    });
    console.log(player);
    // get download
    let download = yield vizer.getDownload({
        id: Number(temporates[0].episodes[0].id),
        player: player.players[0].split('=')[2]
    });
    console.log(download);
}))();
