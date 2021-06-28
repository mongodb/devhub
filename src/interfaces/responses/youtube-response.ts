interface YoutubeResponse {
    contentDetails: ContentDetails;
    etag: string;
    id: string;
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
    channelTitle: string;
    description: string;
    playlistId: string;
    position: number;
    publishedAt: string;
    resourceId: ResourceId;
    thumbnails: Thumbnails;
    title: string;
    videoOwnerChannelId: string;
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
