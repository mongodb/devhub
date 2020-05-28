export const getTimeLabel = secondsElapsed => {
    const minutes = Math.floor(secondsElapsed / 60);
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secondsElapsed % 60);
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${displayMinutes}:${displaySeconds}`;
};
