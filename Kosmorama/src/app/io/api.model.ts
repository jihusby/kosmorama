export class API {

    private domain: string;
    private access_token: string;

    constructor() {
        this.domain = 'http://localhost:3000/api/';
        this.access_token = '';
    }

    url(name: string) {
        return this.domain + name + this.access_token;
    }
}