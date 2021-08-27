export class RuntimeError extends Error {
    constructor(e) {
        super(e);
        this.name = 'Runtime Error';
        console.error(e);
        throw new Error(e);
        // Add additional logging logic
    }
}
