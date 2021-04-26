export const PLAYER_ACTIONS = {
    SET_DURATION: 'setDuration',
    SET_IS_READY: 'setIsReady',
    SET_PROGRESS: 'setProgress',
    TOGGLE_IS_PLAYING: 'toggleIsPlating',
};

export const playerInitialState = {
    duration: null,
    isPlaying: false,
    isReady: false,
    progress: { playedSeconds: 0 },
};

export const playerReducer = (state, { type, value }) => {
    switch (type) {
        case PLAYER_ACTIONS.SET_DURATION:
            return { ...state, duration: value };
        case PLAYER_ACTIONS.SET_IS_READY:
            return { ...state, isReady: value };
        case PLAYER_ACTIONS.SET_PROGRESS:
            return { ...state, progress: { ...state.progress, ...value } };
        case PLAYER_ACTIONS.TOGGLE_IS_PLAYING:
            return { ...state, isPlaying: !state.isPlaying };
        default:
            throw new Error();
    }
};

