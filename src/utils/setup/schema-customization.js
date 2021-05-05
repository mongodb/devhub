export const schemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type SitePage implements Node @dontInfer {
        path: String
    }
    type Language implements Node {
        language: String
    }
    type Product implements Node {
        product: String
    }
    type Tag implements Node {
        tag: String
    }
    type CMSImage implements Node {
        url: String
    }
    type SEO implements Node {
        canonical_url: String
        meta_description: String
        og_description: String
        og_image: CMSImage
        og_type: String
        og_url: String
        twitter_creator: String
        twitter_description: String
        twitter_image: CMSImage
    }
    type Author implements Node {
        name: String
        bio: String
        location: String
        title: String
        image: CMSImage
    }
    type StrapiArticles implements Node {
        authors: [Author]
        content: String
        type: String
        description: String
        languages: [Language]
        products: [Product]
        tags: [Tag]
        slug: String
        image: CMSImage
        name: String
        published_at: Date @dateformat
        updatedAt: Date @dateformat
        SEO: SEO
    }
    type allStrapiArticles implements Node @dontInfer {
        nodes: [StrapiArticles]
    }
    type StrapiClientSideRedirect implements Node {
        fromPath: String
        isPermanent: Boolean
        toPath: String
    }
    type allStrapiClientSideRedirects implements Node {
        nodes: [StrapiClientSideRedirect]
    }
    `;
    createTypes(typeDefs);
};
