import { renderOrderSummary } from "./checkout/OrderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js'; 

async function loadpage() {
    try {
        // console.log('load page');
        await loadProductsFetch();

        const value = await new Promise((resolve,reject) => {
            loadCart(() => {
                // reject('error3');
                resolve('value3');
            });

        });
    } catch (error) {
        console.log('Unexpected Error .please Try Again Later');

    }
    renderOrderSummary();
    renderPaymentSummary();


    // return 'value2';
}
loadpage()

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });

    })

]).then((values) => {
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
});
*/
/*
new Promise((resolve) => {
    // console.log('start promise ');
    loadProducts(() => {
        // console.log('finsihed loading');
        resolve('value1');
    });
}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });

    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    });
  
});
*/
