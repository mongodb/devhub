export interface Podcast {
    mediaType: string;
    title: string;
    publishDate: string;
    description?: string;
    rawDescription?: string;
    slug?: string;
    url: string;
    thumbnailUrl: string;
}