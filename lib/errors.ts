export class AuthRequiredError extends Error {
    constructor(message: string = "Du måste logga in för att se denna sida") {
        super(message);
        this.name = "AuthRequiredError";
    }
}