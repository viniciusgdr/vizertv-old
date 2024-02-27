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
    let search = yield vizer.search({ query: "Velozes e Furiosos", type: 'movie' });
    console.log(search);
    let info = yield vizer.getInfo({ url: search[0].url });
    console.log(info);
    let player = yield vizer.getPlayer({ url: search[0].url, imdbTT: info.imdbTT, language: 'pt' });
    console.log(player);
    let download = yield vizer.getDownload({
        id: player.id,
        player: player.players[0].split('=')[2]
    });
    console.log(download);
}))();
