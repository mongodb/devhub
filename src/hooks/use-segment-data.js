const useSegmentData = () => {
    const segmentData = {
        // TODO: update in the future when we add auth
        segmentUid: null,
    };
    // try catch needed for window.segment (does not exist locally)
    try {
        const segment = window.segment;
        segmentData.segmentAnonymousId = segment.anonymousId();
    } catch {
        segmentData.segmentAnonymousId = null;
    }
    return segmentData;
};

export default useSegmentData;
