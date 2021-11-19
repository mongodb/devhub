export interface IPodcast {
    description: string;
    mediaType: string;
    publishDate: string;
    rawDescription: string;
    slug: string;
    thumbnailUrl: string;
    title: string;
    url: string;
    SEO: object;
    tags: object[];
    products: object[];
    languages: object[];
    authors: object[];
    related: object[];
}