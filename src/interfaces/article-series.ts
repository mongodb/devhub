export interface SeriesArticle {
    position: 'upcoming' | 'active' | 'past';
    slug: String;
    title: String;
}

export interface ArticleSeries {
    articles: object[];
    title: String;
}
