export class AdminDetails {
    constructor(
        public readonly name: string,
        public readonly username: string,
        public readonly phone: string,
        public readonly password: string,
        public readonly email: string,
        public readonly id?: number,
    ) { }
}