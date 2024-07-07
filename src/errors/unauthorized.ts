

export class Unathorized extends Error {
    constructor(
        message: string
    ) {
        super(message)
        this.message = "Unathorized user check"
    }
}