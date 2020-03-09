import { getPageSchema } from '../../src/utils/get-page-schema';

it('should correctly generate a schema for SEO on non-article pages', () => {
    /*
    Should have a schema looking like the following:
    {{
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: siteUrl,
      logo: {
        @type: 'imageObject',
        url: logoURL
      },
    }}
  */
    const url = 'nonarticle.page';
    const generatedSchema = JSON.parse(getPageSchema(url));
    expect(generatedSchema['@context']).toBe('http://schema.org');
    expect(generatedSchema['@type']).toBe('Organization');
    expect(generatedSchema.url).toBe(url);
    expect(generatedSchema.logo).toBeTruthy();
    expect(generatedSchema.logo['@type']).toBe('imageObject');
    expect(generatedSchema.logo.url).toBeTruthy();
});

it('should correctly generate a schema for SEO on article pages', () => {
    /*
  Should have a schema similar to the following:
  {{'@context': 'https://schema.org',
    '@type': 'BlogPosting',
    url: articleURL,
    headline: articleTitle,
    description: aritcleDescription,
    datePublished: datePublished,
    datemodified: datemodified,
    mainEntityOfPage: {  
        '@type': 'WebPage',
        url: articleURL
    },
    image: identical to LOGO object above but for this page's blog image
    publisher: {
        '@type': 'Organization', 
        name: 'MongoDB',
        logo: identical to LOGO object above,
    },
    author: { '@type': 'Person', name: 'Maxime Beugnet' },
    inLanguage: 'English',
    articleBody: contents of article,
    }}
  */
    const articleBody = 'article body';
    const articleUrl = 'article.url';
    const author = { name: 'Maxime Beugnet' };
    const datePublished = '2017-01-18';
    const datemodified = '2017-01-19';
    const description = 'description';
    const headline = 'headline';
    const logoUrl = 'foo.img';
    const articleParams = {
        articleBody,
        author,
        datemodified,
        datePublished,
        description,
        headline,
        logoUrl,
    };
    const pageSchema = JSON.parse(getPageSchema(articleUrl, articleParams));

    expect(pageSchema['@context']).toBe('http://schema.org');
    expect(pageSchema['@type']).toBe('BlogPosting');
    expect(pageSchema.headline).toBe(headline);
    expect(pageSchema.description).toBe(description);
    expect(pageSchema.datePublished).toBe(datePublished);
    expect(pageSchema.datemodified).toBe(datemodified);

    expect(pageSchema.mainEntityOfPage).toBeTruthy();
    expect(pageSchema.mainEntityOfPage['@type']).toBe('WebPage');
    expect(pageSchema.mainEntityOfPage.url).toBe(articleUrl);

    expect(pageSchema.image).toBeTruthy();
    expect(pageSchema.image['@type']).toBe('imageObject');
    expect(pageSchema.image.url).toBe(logoUrl);

    expect(pageSchema.publisher).toBeTruthy();
    expect(pageSchema.publisher['@type']).toBe('Organization');
    expect(pageSchema.publisher.name).toBe('MongoDB');
    expect(pageSchema.publisher.logo).toBeTruthy();

    expect(pageSchema.author['@type']).toBe('Person');
    expect(pageSchema.author.name).toBe(author.name);

    expect(pageSchema.inLanguage).toBe('English');
    expect(pageSchema.articleBody).toBe(articleBody);
});
