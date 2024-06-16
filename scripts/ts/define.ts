export {};

export enum WebsiteType {
    Debug, Product, Release
}

declare global {
    var WEBSITE_TYPE: WebsiteType;
}
