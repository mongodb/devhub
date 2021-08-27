import { RuntimeError } from '../classes/runtime-error';

export const reportAnalytics = (eventName, data) => {
    if (!window || !window.analytics) return;
    try {
        window.analytics.track(eventName, data);
    } catch (err) {
        new RuntimeError(`Error reporting analytics: ${eventName}`, err);
    }
};
