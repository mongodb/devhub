export interface Author {
    bio: String | object; //Bio can be an AST or just text, the below field helps ID
    isASTBio: Boolean;
    location: String;
    name: String;
    image: String;
    title: String;
}
