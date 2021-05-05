import dlv from 'dlv';
import { Author as AuthorInterface } from '../interfaces/author';

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

export class SnootyAuthor implements AuthorInterface {
    bio: String;
    isInternalReference: Boolean;
    location: String;
    name: String;
    image: String;
    isASTBio: Boolean;
    title: String;
    constructor({ name, location, image, title }, RESOLVED_REF_DOC_MAPPING) {
        const authorBioPath = getAuthorIncludesPath(name);
        this.bio = dlv(
            RESOLVED_REF_DOC_MAPPING[authorBioPath],
            ['ast', 'children', 0, 'children', 0],
            null
        );
        console.log(name, this.bio);
        this.isASTBio = true;
        this.isInternalReference = true;
        this.location = location;
        this.name = name;
        this.image = image;
        this.title = title;
    }
}
