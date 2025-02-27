export class AuthRequiredError extends Error {
    constructor(message: string = "Du måste logga in för att se denna sida") {
        super(message);
        this.name = "AuthRequiredError";
    }
}

/* export class NotFoundError extends Error {
    constructor(message: string = "Sidan kunde inte hittas") {
        super(message);
        this.name = "NotFoundError";
    }
} */