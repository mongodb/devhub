export interface Podcast {
    description: string;
    mediaType: string;
    publishDate: string;
    rawDescription?: string;
    slug: string;
    thumbnailUrl: string;
    title: string;
    url?: string;
    podcastId: string;
}