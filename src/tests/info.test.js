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
test('getInfo movie and series', () => __awaiter(void 0, void 0, void 0, function* () {
    const vizer = new __1.Vizer();
    let search = yield vizer.search({
        query: "Velozes e Furiosos",
        type: "movie"
    });
    let info = yield vizer.getInfo({
        url: search[0].url
    });
    expect(info);
}));
