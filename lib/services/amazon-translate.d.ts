import { TranslationService, TString } from '.';
import { Matcher } from '../matchers';
export declare class AmazonTranslate implements TranslationService {
    private translate;
    private interpolationMatcher;
    private supportedLanguages;
    private decodeEscapes;
    name: string;
    cleanResponse(response: string): string;
    initialize(config?: string, interpolationMatcher?: Matcher, decodeEscapes?: boolean): Promise<void>;
    supportsLanguage(language: string): boolean;
    cleanLanguageCode(languageCode: string): any;
    translateStrings(strings: TString[], from: string, to: string): Promise<{
        key: string;
        value: string;
        translated: string;
    }[]>;
}
