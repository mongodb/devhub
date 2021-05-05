import { TagPage } from '../interfaces/tag-page';
import { TagType } from '../types/tag-type';

export class SnootyTagPage implements TagPage {
    name: String;
    pages: object[];
    slug: String;
    type: TagType;
    constructor(name, type, slug, pages) {
        this.name = name;
        this.pages = pages;
        this.slug = slug;
        this.type = type;
    }
}
