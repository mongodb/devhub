export type ArticleSEO = {
  canonicalUrl?: String,
  metaDescription: String,
  og: {
    description: String;
    image: String;
    title: String;
    type: String;
    url: String;
  },
  twitter: {
    creator: String;
    description: String;
    image: String;
    site: String;
    title: String;
  }
}
