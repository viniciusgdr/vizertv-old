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
const __1 = require("..");
test('Player Movie', () => __awaiter(void 0, void 0, void 0, function* () {
    const vizer = new __1.Vizer();
    let search = yield vizer.search({
        query: "Velozes e Furiosos",
        type: "movie"
    });
    let info = yield vizer.getInfo({
        url: search[0].url
    });
    let player = yield vizer.getPlayer({
        url: search[0].url,
        imdbTT: info.imdbTT,
        language: 'pt'
    });
    expect(player);
}));
test('Player Series', () => __awaiter(void 0, void 0, void 0, function* () {
    const vizer = new __1.Vizer();
    let search = yield vizer.search({
        query: "The good Doctor",
        type: "serie"
    });
    let info = yield vizer.getInfo({
        url: search[0].url
    });
    let episodes = yield vizer.listSerieEpisodes({
        url: search[0].url
    });
    let player = yield vizer.getPlayerSerie({
        id: episodes[0].episodes[0].id,
        imdbTT: info.imdbTT,
        language: 'pt'
    });
    expect(player);
}));
