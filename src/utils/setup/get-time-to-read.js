const WORDS_PER_MINUTE = 200;

export const getTimeToRead = rawContent =>
    Math.round(
        rawContent.split(' ').filter(x => !!x).length / WORDS_PER_MINUTE
    );
