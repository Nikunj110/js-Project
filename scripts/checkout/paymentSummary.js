import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryoption.js";
import {formatcurrency } from "../utils/money.js";

export function renderPaymentSummary() {

    let productPriceCents = 0;
    let shippingpriceCents = 0;

    cart.forEach((cartitem) => {
        const product = getProduct(cartitem.productId);
        productPriceCents += product.priceCents * cartitem.quantity;

        const deliveryOption = getDeliveryOption(cartitem.deliveryoptionid)
        shippingpriceCents += deliveryOption.pricecents;
    });

    console.log(productPriceCents);
    console.log(shippingpriceCents);
    const totalbeforetaxcents = productPriceCents + shippingpriceCents;
    const taxcents = totalbeforetaxcents * 0.1;
    const totalCents = totalbeforetaxcents + taxcents;

    const paymentSummaryHTML = `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatcurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatcurrency(shippingpriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatcurrency(totalbeforetaxcents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatcurrency(taxcents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatcurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}