import { isBrowser } from './is-browser';

const isValidStorage = isBrowser();

export const setLocalValue = (key, value) => {
    if (isValidStorage) {
        const prevState = JSON.parse(
            window.localStorage.getItem('mongodb-devhub')
        );
        localStorage.setItem(
            'mongodb-devhub',
            JSON.stringify({ ...prevState, [key]: value })
        );
    }
};

export const getLocalValue = key => {
    if (
        isValidStorage &&
        JSON.parse(window.localStorage.getItem('mongodb-devhub'))
    ) {
        const docsObj = JSON.parse(
            window.localStorage.getItem('mongodb-devhub')
        );
        if (docsObj) {
            return docsObj[key];
        }
    }
    return undefined;
};
