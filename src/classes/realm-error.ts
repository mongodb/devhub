export class RealmError extends Error {
    constructor(e) {
        super(e);
        this.name = 'Realm Error';
        console.error(e);
        throw new Error(e);
        // Add additional logging logic
    }
}
