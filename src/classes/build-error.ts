export class BuildError extends Error {
    constructor(e) {
        super(e);
        this.name = 'Build Error';
        console.error(e);
        throw new Error(e);
        // Add additional logging logic
    }
}
