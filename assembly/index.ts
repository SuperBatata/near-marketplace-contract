// import {PersistentUnorderedMap} from "near-sdk-as";



// // create a PersistentUnorderedMap instance to store the data products
// export const products = new PersistentUnorderedMap<string , string >("PRODUCTS");

// //add a new product to the products map
// export function setProduct(id : string , productName: string) : void {
//     products.set(id, productName);
// }


// // retrieve a product from the products map
// export function getProduct(id:string):string | null {
//     return products.get(id);
// }


import { Product , listProducts } from "./model";


export function setProduct (product: Product): void{
    let storedProduct = listProducts.get(product.id);
    if (storedProduct !== null){
        throw new Error(`Product with ${product.id} already exists`);
    }
    listProducts.set(product.id, Product.fromPayload(product));

}


export function getProduct(id: string): Product | null {
    return listProducts.get(id);
}

export function getAllProducts(): Product[] | null {
    return listProducts.values();
}