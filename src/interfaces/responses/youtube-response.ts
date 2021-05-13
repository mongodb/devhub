interface YoutubeResponse {
    id: string;
    contentDetails: ContentDetails;
    etag: string;
    kind: string;
    snippet: Snippet;
}

interface Thumbnails {
    default: ThumbnailsSize;
    high: ThumbnailsSize;
    maxres: ThumbnailsSize;
    medium: ThumbnailsSize;
    standard: ThumbnailsSize;
}

interface Snippet {
    channelId: string;
    playlistId: string;
    resourceId: ResourceId;
    videoOwnerChannelId: string;
    channelTitle: string;
    description: string;
    position: number;
    publishedAt: string;
    thumbnails: Thumbnails;
    title: string;
    videoOwnerChannelTitle: string;
}

type ThumbnailsSize = {
    height: number;
    url: string;
    width: number;
};

type ResourceId = {
    kind: string;
    videoId: string;
};

type ContentDetails = {
    videoId: string;
    videoPublishedAt: string;
};

export { YoutubeResponse, Thumbnails, Snippet };
