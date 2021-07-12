export interface Podcast {
    mediaType: string;
    title: string;
    publishDate: string;
    description?: string;
    slug?: string;
    url: string;
    thumbnailUrl: string;
}