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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AmazonTranslate = void 0;
var client_translate_1 = require("@aws-sdk/client-translate");
var html_entities_1 = require("html-entities");
var matchers_1 = require("../matchers");
var fs_1 = __importDefault(require("fs"));
// Contains replacements for language codes
var codeMap = {
    'zh-tw': 'zh-TW',
    'fa-af': 'fa-AF',
    'fr-ca': 'fr-CA',
    'pt-pt': 'pt-PT',
    'es-mx': 'es-MX'
};
var supportedLanguages = [
    'af',
    'sq',
    'am',
    'ar',
    'hy',
    'az',
    'bn',
    'bs',
    'bg',
    'ca',
    'zh',
    'zh-tw',
    'hr',
    'cs',
    'da',
    'fa-af',
    'nl',
    'en',
    'et',
    'fa',
    'tl',
    'fi',
    'fr',
    'fr-ca',
    'ka',
    'de',
    'el',
    'gu',
    'ht',
    'ha',
    'he',
    'hi',
    'hu',
    'is',
    'id',
    'ga',
    'it',
    'ja',
    'kn',
    'kk',
    'ko',
    'lv',
    'lt',
    'mk',
    'ms',
    'ml',
    'mt',
    'mr',
    'mn',
    'no',
    'ps',
    'pl',
    'pt',
    'pt-pt',
    'pa',
    'ro',
    'ru',
    'sr',
    'si',
    'sk',
    'sl',
    'so',
    'es',
    'es-mx',
    'sw',
    'sv',
    'ta',
    'te',
    'th',
    'tr',
    'uk',
    'ur',
    'uz',
    'vi',
    'cy',
];
var AmazonTranslate = /** @class */ (function () {
    function AmazonTranslate() {
        this.supportedLanguages = [];
        this.name = 'Amazon Translate';
    }
    AmazonTranslate.prototype.cleanResponse = function (response) {
        var translated = response.replace(/\<(.+?)\s*\>\s*(.+?)\s*\<\/\s*(.+?)>/g, '<$1>$2</$3>');
        return this.decodeEscapes ? html_entities_1.decode(translated) : translated;
    };
    AmazonTranslate.prototype.initialize = function (config, interpolationMatcher, decodeEscapes) {
        return __awaiter(this, void 0, void 0, function () {
            var configJson;
            return __generator(this, function (_a) {
                configJson = config ? JSON.parse(fs_1["default"].readFileSync(config).toString()) : {};
                this.translate = new client_translate_1.Translate(configJson);
                this.interpolationMatcher = interpolationMatcher;
                this.supportedLanguages = supportedLanguages;
                this.decodeEscapes = decodeEscapes;
                return [2 /*return*/];
            });
        });
    };
    AmazonTranslate.prototype.supportsLanguage = function (language) {
        return this.supportedLanguages.includes(language.toLowerCase());
    };
    AmazonTranslate.prototype.cleanLanguageCode = function (languageCode) {
        var lowerCaseCode = languageCode.toLowerCase();
        if (codeMap[lowerCaseCode]) {
            return codeMap[lowerCaseCode];
        }
        return lowerCaseCode.split('-')[0];
    };
    AmazonTranslate.prototype.translateStrings = function (strings, from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(strings.map(function (_a) {
                        var key = _a.key, value = _a.value;
                        return __awaiter(_this, void 0, void 0, function () {
                            var _b, clean, replacements, TranslatedText;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = matchers_1.replaceInterpolations(value, this.interpolationMatcher), clean = _b.clean, replacements = _b.replacements;
                                        // After translation, a space is removed before escaped tags.
                                        // I don't know why this happens, but this fixes it.
                                        replacements.forEach(function (replacement) { return replacement.from = " " + replacement.from; });
                                        return [4 /*yield*/, this.translate.translateText({
                                                Text: clean,
                                                SourceLanguageCode: this.cleanLanguageCode(from),
                                                TargetLanguageCode: this.cleanLanguageCode(to)
                                            })];
                                    case 1:
                                        TranslatedText = (_c.sent()).TranslatedText;
                                        return [2 /*return*/, {
                                                key: key,
                                                value: value,
                                                translated: this.cleanResponse(matchers_1.reInsertInterpolations(TranslatedText, replacements))
                                            }];
                                }
                            });
                        });
                    }))];
            });
        });
    };
    return AmazonTranslate;
}());
exports.AmazonTranslate = AmazonTranslate;
