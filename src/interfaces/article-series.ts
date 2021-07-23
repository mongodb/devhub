export interface SeriesArticle {
    slug: String;
    title: String;
}

export interface ArticleSeries {
    articles: SeriesArticle[];
    title: String;
}
