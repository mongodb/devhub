import dlv from 'dlv';
import { Author } from '../interfaces/author';
import { TagPage } from '../interfaces/tag-page';
import { TagType } from '../types/tag-type';

const getAuthorIncludesPath = authorName => {
    switch (authorName) {
        // Handle case where REF_DOC_MAP name isnt just lastname-firstname
        case 'Ken W. Alger':
            return 'includes/authors/alger-ken';
        case 'MongoDB Inc.':
            return 'includes/authors/mongodb';
        default:
            return `includes/authors/${authorName
                .toLowerCase()
                .split(' ')
                .reverse()
                .join('-')}`;
    }
};

export class SnootyAuthorPage implements Author, TagPage {
    bio: String;
    location: String;
    name: String;
    image: String;
    isASTBio: Boolean;
    pages: object[];
    slug: String;
    title: String;
    type: TagType;
    constructor(author, RESOLVED_REF_DOC_MAPPING, slug, pages) {
        const name = author.item._id.name;
        const authorBioPath = getAuthorIncludesPath(name);
        this.bio =
            author.item._id.bio ||
            dlv(
                RESOLVED_REF_DOC_MAPPING[authorBioPath],
                ['ast', 'children', 0, 'children', 0],
                null
            );
        this.isASTBio = !author.item._id.bio;
        this.location = author.item._id.location;
        this.name = name;
        this.image = author.item._id.image;
        this.pages = pages;
        this.slug = slug;
        this.title = author.item._id.title;
        this.type = 'author';
    }
}
