import { renderOrderSummary } from "./checkout/OrderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js'; 

async function loadpage() {
    // console.log('load page');
    await loadProductsFetch();

    const value = await new Promise((resolve) => {
        loadCart(() => {
            resolve('value3');
        });

    });
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
