/**
 * Generates a prefix for an author's name on Byline Block based on index and
 * total number of authors
 */
export const getAuthorPrefix = (index, numberOfAuthors) => {
    switch (index) {
        case 0:
            return 'By ';
        case numberOfAuthors - 1:
            // Handle case of two authors, so no comma needed
            if (numberOfAuthors === 2) return '\u00a0and ';
            return ', and ';
        default:
            // Otherwise, let's use commas to separate authors
            return ', ';
    }
};
