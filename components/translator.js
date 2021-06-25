const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const reverseDictionary = (object) => {
    return Object.assign(
        {},
        ...Object.entries(object).map(([key, value]) => ({ [value]: key })));
}

const reverseAmericanToBritishSpelling = reverseDictionary(americanToBritishSpelling);

const reverseAmericanToBritishTitles = reverseDictionary(americanToBritishTitles);


class Translator {
    toBritishEnglish(text) {
        const dictionary = {
            ...americanOnly,
            ...americanToBritishSpelling
        }

        const titlesDictionary = {
            ...americanToBritishTitles
        }

        const timeRegex = /([1-9]|1[012]):[0-5][0-9]/g;

        const translatedText = this.translate(
            text,
            dictionary,
            titlesDictionary,
            timeRegex,
            "toBritish"
        );

        if(!translatedText) {
            return text;
        }

        return translatedText;
    }

    toAmericanEnglish(text) {
        const dictionary = {
            ...britishOnly,
            ...reverseAmericanToBritishSpelling
        }

        const titlesDictionary = {
            ...reverseAmericanToBritishTitles
        }

        const timeRegex = /([1-9]|1[012]).[0-5][0-9]/g;

        const translatedText = this.translate(
            text,
            dictionary,
            titlesDictionary,
            timeRegex,
            "toAmerican"
        );

        if(!translatedText) {
            return text;
        }

        return translatedText;
    }

    translate(text, dictionary, titlesDictionary, timeRegex, locale) {
        const lowerCaseText = text.toLowerCase();
        const matchesMap = {};
        const wordRegex = /(\w+([-'])(\w+)?['-]?(\w+))|\w+/g;

        Object.entries(titlesDictionary).map(([key, value]) => {
            if(lowerCaseText.includes(key)) {
                matchesMap[key] = value.charAt(0).toUpperCase() + value.slice(1);
            }
        });

        const wordsWithSpaces = Object.fromEntries(
            Object.entries(dictionary).filter(([key, value]) => key.includes(' '))
        );

        Object.entries(wordsWithSpaces).map(([key, value]) => {
            if(lowerCaseText.includes(key)) {
                matchesMap[key] = value;
            }
        });

        lowerCaseText
            .match(wordRegex)
            .map((word) => {
                if(dictionary[word]) return (matchesMap[word] = dictionary[word]);
            });

        const matchedTimes = lowerCaseText.match(timeRegex);

        if(matchedTimes) {
            matchedTimes.map((element) => {
                if(locale === 'toBritish') {
                    return(matchesMap[element] = element.replace(':', '.'));
                }
                return(matchesMap[element] = element.replace('.', ':'));
            });
        }

        if(Object.keys(matchesMap).length === 0) {
            return null;
        }

        const translation = this.replaceAll(text, matchesMap);

        const translationWithHighlight = this.replaceAllWithHighlight(text, matchesMap);

        return[translation, translationWithHighlight];
    }

    replaceAll(text, matchesMap) {
        const textRegex = new RegExp(Object.keys(matchesMap).join('|'), 'gi');

        return text.replace(textRegex, (matched) => matchesMap[matched.toLowerCase()]);
    }

    replaceAllWithHighlight(text, matchesMap) {
        const textRegex = new RegExp(Object.keys(matchesMap).join("|"), "gi");

        return text.replace(textRegex, (matched) => {
            return `<span class="highlight">${matchesMap[matched.toLowerCase()]}</span>`;
        });
    }
}

module.exports = Translator;