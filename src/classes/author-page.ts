import { Author } from '../interfaces/author';
import { TagPage } from '../interfaces/tag-page';
import { TagType } from '../types/tag-type';

export class AuthorPage implements Author, TagPage {
    bio: String;
    location: String;
    name: String;
    image: String;
    isASTBio: Boolean;
    pages: object[];
    slug: String;
    title: String;
    type: TagType;
    constructor(author, slug, pages) {
        const name = author.name;
        this.bio = author.bio;
        this.isASTBio = author.isASTBio;
        this.location = author.location;
        this.name = name;
        this.image = author.image;
        this.pages = pages;
        this.slug = slug;
        this.title = author.title;
        this.type = 'author';
    }
}
