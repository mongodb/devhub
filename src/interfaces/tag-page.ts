import { TagType } from '../types/tag-type';

export interface TagPage {
    name: String;
    pages: object[];
    slug: String;
    type: TagType;
}
