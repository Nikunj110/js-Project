import { cart, removeFromcart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatcurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryoption as deliveryOptions } from '../../data/deliveryoption.js';

hello();

// Just for logging:
const today = dayjs();
const deliverydate = today.add(7, 'days');
console.log(deliverydate.format('dddd, MMMM D'));
console.log();

export function renderOrderSummary() {
  let cartsummaryHTML = '';

  cart.forEach((cartitem) => {
    const productId = cartitem.productId;
    let matchingproduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingproduct = product;
      }
    });

    const deliveryoptionid = cartitem.deliveryoptionid;
    let deliveryoption;

    // Find the matching delivery option
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryoptionid) {
        deliveryoption = option;
      }
    });

    // Calculate date
    const today = dayjs();
    const deliverydate = today.add(deliveryoption.deliverydays, 'days');
    const datestring = deliverydate.format('dddd, MMMM D');

    cartsummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
        <div class="delivery-date">
          Delivery date: ${datestring}
        </div>

        <div class="cart-item-details-grid">    
          <img 
            class="product-image"
            src="${matchingproduct.image}"
          >

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingproduct.name}
            </div>
            <div class="product-price">
              $${formatcurrency(matchingproduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartitem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span 
                class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${matchingproduct.id}"
              >
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryoptionsHTML(matchingproduct, cartitem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryoptionsHTML(matchingproduct, cartitem) {
    let html = '';

    deliveryOptions.forEach((deliveryoption) => {
      const today = dayjs();
      const deliverydate = today.add(deliveryoption.deliverydays, 'days');
      const datestring = deliverydate.format('dddd, MMMM D');
      const pricestring = deliveryoption.pricecents === 0
        ? 'FREE'
        : `${formatcurrency(deliveryoption.pricecents)} - `;
      const ischecked = deliveryoption.id === cartitem.deliveryoptionid;

      // FIX: Use data-deliveryoptionid so the destructuring { productId, deliveryoptionid } works
      html += `
        <div 
          class="delivery-option js-delivery-option"
          data-product-id="${matchingproduct.id}"
          data-deliveryoptionid="${deliveryoption.id}"
        >
          <input
            type="radio"
            ${ischecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingproduct.id}"
          >
          <div>
            <div class="delivery-option-date">
              ${datestring}
            </div>
            <div class="delivery-option-price">
              ${pricestring} - Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartsummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromcart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryoptionid } = element.dataset;
        updateDeliveryOption(productId, deliveryoptionid);
        renderOrderSummary();
      });
    });
}

