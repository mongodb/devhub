import { RelatedContent } from "./related_content"
export interface PodcastResponse {
    description: string;
    mediaType: string;
    originalPublishDate: string;
    slug: string;
    podcastFileUrl: string;
    thumbnailUrl: string;
    title: string;
    SEO: object;
    tags: object[];
    products: object[];
    languages: object[];
    related_content: RelatedContent[];
    authors: object[];
}

