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
import {ContractPromiseBatch , context} from "near-sdk-as";



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


export function buyProduct(productId:string):void {
    
    const product = getProduct(productId);
    if (product == null){
        throw new Error(`Product with ${productId} does not exist`);
    }
    if (product.price.toString != context.attachedDeposit.toString){
        throw new Error(`Deposit ${context.attachedDeposit} does not match product price ${product.price}`);
    }

    ContractPromiseBatch.create(product.owner).transfer(context.attachedDeposit);
    product.incrementSoldAmount();
    listProducts.set(productId, product);
}