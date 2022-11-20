import {PersistentUnorderedMap} from "near-sdk-as";



// create a PersistentUnorderedMap instance to store the data products
export const products = new PersistentUnorderedMap<string , string >("PRODUCTS");

//add a new product to the products map
export function setProduct(id : string , productName: string) : void {
    products.set(id, productName);
}


// retrieve a product from the products map
export function getProduct(id:string):string | null {
    return products.get(id);
}