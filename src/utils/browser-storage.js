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

export const setSessionValue = (key, value) => {
    if (isValidStorage) {
        const prevState = JSON.parse(
            window.sessionStorage.getItem('mongodb-devhub')
        );
        sessionStorage.setItem(
            'mongodb-devhub',
            JSON.stringify({ ...prevState, [key]: value })
        );
    }
};

export const getSessionValue = key => {
    if (
        isValidStorage &&
        JSON.parse(window.sessionStorage.getItem('mongodb-devhub'))
    ) {
        const docsObj = JSON.parse(
            window.sessionStorage.getItem('mongodb-devhub')
        );
        if (docsObj) {
            return docsObj[key];
        }
    }
    return undefined;
};
