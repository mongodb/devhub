import { Author as AuthorInterface } from '../interfaces/author';

export class StrapiAuthor implements AuthorInterface {
    bio: String;
    location: String;
    name: String;
    image: String;
    isASTBio: Boolean;
    title: String;
    constructor({ name, bio, location, image, title }) {
        this.bio = bio;
        this.isASTBio = false;
        this.location = location;
        this.name = name;
        this.image = image;
        this.title = title;
    }
}
