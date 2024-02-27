"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vizer = void 0;
const cheerio_1 = __importStar(require("cheerio"));
const got_1 = __importDefault(require("got"));
const getstr_1 = require("./utils/getstr");
const publicFunctionsVizer_1 = require("./functions/publicFunctionsVizer");
class Vizer {
    constructor() { }
    search({ quantity, query, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            let { body: html } = yield got_1.default.get('https://vizer.tv/pesquisar/' + query, {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
                }
            });
            let $ = cheerio_1.default.load(html);
            let results = [];
            $('div.listItems > a').each((i, elem) => {
                let url = $(elem).attr('href');
                if ((!quantity || i < quantity) &&
                    (type == 'serie' ? url.includes('serie') ? true : false : type == 'movie' ? url.includes('filme') ? true : false : true))
                    results.push({
                        title: $(elem).find('div.infos > span').text().trim(),
                        url: 'https://vizer.tv/' + url,
                        image: 'https://vizer.tv' + $(elem).find('picture > img').attr('src') || null,
                        yearFilm: $(elem).find('div.y').text().trim() || null,
                        rateFilm: $(elem).find('div.r').text().trim() || null
                    });
            });
            return results;
        });
    }
    getInfo({ url }) {
        return __awaiter(this, void 0, void 0, function* () {
            let { body: html } = yield got_1.default.get(url, {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
                }
            });
            let $ = cheerio_1.default.load(html);
            let result = {
                title: $('#ms > div:nth-child(1) > section > h2').text().trim(),
                imdb: $('#ms > div:nth-child(1) > section > div.infos > a').attr('href') || null,
                imdbTT: $('#ms > div:nth-child(1) > section > div.infos > a').attr('href').trim().split('/')[4] || null,
                film: {
                    year: $('#ms > div:nth-child(1) > section > div.infos > div.year').text().trim() || null,
                    rate: $('#ms > div:nth-child(1) > section > div.infos > a').text().trim() + '/10' || null,
                    time: $('#ms > div:nth-child(1) > section > div.infos > div.dur > div.tm').text().trim() || null,
                    image: 'https://vizer.tv' + $('#ms > div:nth-child(1) > div > picture > img').attr('src') || null,
                    casts: $('#castList > a').map((i, elem) => {
                        return {
                            name: $(elem).find('span').text().trim(),
                            picture: 'https://vizer.tv/' + $(elem).find('img').attr('src') || null
                        };
                    }).toArray() || null,
                    description: $('#ms > div:nth-child(1) > section > span').text().trim() || null,
                }
            };
            return result;
        });
    }
    listSerieEpisodes({ url }) {
        return __awaiter(this, void 0, void 0, function* () {
            let { body: html } = yield got_1.default.get(url, {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
                }
            });
            let $ = cheerio_1.default.load(html);
            let ids = [];
            $('#seasons > .wrap > #seasonsList > div').each((i, elem) => {
                ids.push({
                    id: $(elem).attr('data-season-id'),
                    number: $(elem).text().trim()
                });
            });
            let result = [];
            for (let i = 0; i < ids.length; i++) {
                let results = [];
                let epsode = yield this.getEpisodes({ id: ids[i].id });
                for (let i2 = 0; i2 < epsode.length; i2++) {
                    results.push(epsode[i2]);
                }
                result.push({
                    number: Number(ids[i].number),
                    episodes: results
                });
            }
            return result;
        });
    }
    getPlayerSerie({ id, imdbTT, language, temporada, episode }) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = yield (0, publicFunctionsVizer_1.publicFunctionsVizer)({
                getEpisodeLanguages: id
            });
            let obj = JSON.parse(html);
            let list = Object.keys(obj.list).map(key => obj.list[key]);
            if (language == 'pt') {
                let result = list.find(item => item.lang == '2');
                //console.log(list)
                if (result) {
                    let player = yield this.getEmbed({ id: result.id, data: JSON.parse(result.players) });
                    //console.log(player)
                    return {
                        isLanguageSelected: true,
                        warezcdn: episode && temporada ? `https://embed.warezcdn.net/serie/${imdbTT}/${temporada}/${episode}` : temporada ? `https://embed.warezcdn.net/serie/${imdbTT}/${temporada}` : `https://embed.warezcdn.net/serie/${imdbTT}`,
                        players: player,
                        id: Number(result.id)
                    };
                }
                else {
                    let player = yield this.getEmbed({ id: list[0].id, data: JSON.parse(list[0].players) });
                    return {
                        isLanguageSelected: false,
                        warezcdn: episode && temporada ? `https://embed.warezcdn.net/serie/${imdbTT}/${temporada}/${episode}` : temporada ? `https://embed.warezcdn.net/serie/${imdbTT}/${temporada}` : `https://embed.warezcdn.net/serie/${imdbTT}`,
                        players: player,
                        id: Number(list[0].id)
                    };
                }
            }
        });
    }
    getPlayer({ url, imdbTT, language }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (url.includes('serie'))
                throw new Error('The url is not a movie, use the getPlayerSerie method instead');
            let { body: html } = yield got_1.default.get(url, {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
                }
            });
            const $ = (0, cheerio_1.load)(html);
            const audios = $('.area.audios > div').toArray().map((elem) => {
                return {
                    playerId: $(elem).attr('data-load-player'),
                    dataPlayers: $(elem).attr('data-players'),
                    dataAudio: $(elem).attr('data-audio')
                };
            });
            if (language == 'pt') {
                let result = audios.find(item => item.dataAudio == 'dublado');
                if (result) {
                    let player = yield this.getEmbed({ id: result.playerId, data: JSON.parse(result.dataPlayers) });
                    return {
                        isLanguageSelected: true,
                        warezcdn: 'https://embed.warezcdn.net/filme/' + imdbTT,
                        players: player,
                        id: Number(result.playerId)
                    };
                }
                else {
                    let player = yield this.getEmbed({ id: audios[0].playerId, data: JSON.parse(audios[0].dataPlayers) });
                    return {
                        isLanguageSelected: false,
                        warezcdn: 'https://embed.warezcdn.net/filme/' + imdbTT,
                        players: player,
                        id: Number(audios[0].playerId)
                    };
                }
            }
        });
    }
    getEpisodes({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = yield (0, publicFunctionsVizer_1.publicFunctionsVizer)({
                getEpisodes: id
            });
            let obj = JSON.parse(html);
            let list = Object.keys(obj.list).map(key => obj.list[key]);
            return list.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    title: item.title,
                };
            });
        });
    }
    getDownload({ id, player }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (player.includes('https://'))
                player = player.split('=')[2];
            let body = yield (0, publicFunctionsVizer_1.publicFunctionsVizer)({
                downloadVideo: id,
                player
            });
            let url = 'https://vizer.tv/' + ((_a = JSON.parse(body)) === null || _a === void 0 ? void 0 : _a.url);
            try {
                let { body: body2 } = yield got_1.default.get(url);
                let urlReal = (0, getstr_1.getstr)(body2, 'window.location.href="', '"', 0);
                return urlReal;
            }
            catch (err) {
                return url;
            }
        });
    }
    getEmbed({ id, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            let players = [];
            if (data.mixdrop == "3") {
                players.push(`https://vizer.tv/embed/getEmbed.php?id=${id}&sv=mixdrop`);
            }
            if (data.streamtape == "3") {
                players.push(`https://vizer.tv/embed/getEmbed.php?id=${id}&sv=streamtape`);
            }
            if (data.warezcdn == "3") {
                players.push(`https://vizer.tv/embed/getEmbed.php?id=${id}&sv=warezcdn`);
            }
            if (data.fembed == "3") {
                players.push(`https://vizer.tv/embed/getEmbed.php?id=${id}&sv=fembed`);
            }
            return players;
        });
    }
}
exports.Vizer = Vizer;
;
