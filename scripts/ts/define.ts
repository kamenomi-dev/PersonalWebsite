export {};

export enum WebsiteType {
    Debug, Product, Release
}

declare global {
    var WATCH_DOG: boolean;

    var WEBSITE_TYPE: WebsiteType;
    var CLIENT_MOBILE: boolean;
}
