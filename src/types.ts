import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface Products {
    items: Product[]
}

export interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
    category: string,
    image: string,
    stock: number,
    dimensions: Dimensions,
    material: string,
    rating: number,
    warranty: string,
    isFeatured: boolean

}

export interface Dimensions {
    width: number,
    height: number,
    depth: number
}