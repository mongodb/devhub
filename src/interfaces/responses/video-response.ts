export interface VideoResponse {
    description: string;
    mediaType: string;
    originalPublishDate: string;
    slug: string;
    thumbnailUrl: string;
    title: string;
    videoId: string;
    SEO: object;
    tags: object[];
    products: object[];
    languages: object[];
    related_content: RelatedContent[];
    authors: object[];
}

interface RelatedContent {
    label: string;
    url: string;
}