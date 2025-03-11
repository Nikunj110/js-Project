class Cart {
    cartItems ;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if (!this.cartItems) {
            this.cartItems = [
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryoptionid: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryoptionid: '2'
                }
            ];

        }
    }
    // # means private 
    savetostorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    addtoCart(productId) {
        let matchingitem;

        // we check if product already in the cart then increase Quantity
        this.cartItems.forEach((cartitem) => {
            if (productId === cartitem.productId) {
                matchingitem = cartitem;
            }
        });

        if (matchingitem) {
            matchingitem.quantity += 1;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryoptionid: '1'
            });
        }
        this.savetostorage();
    }

    removeFromcart(productId) {
        const newcart = [];
        this.cartItems.forEach((cartitem) => {
            if (cartitem.productId !== productId) {
                newcart.push(cartitem);
            }
        });

        this.cartItems = newcart;
        this.savetostorage();
    }
    updateDeliveryOption(productId, deliveryoptionid) {
        let matchingitem;
        this.cartItems.forEach((cartitem) => {
            if (productId === cartitem.productId) {
                matchingitem = cartitem;
            }
        });

        matchingitem.deliveryoptionid = deliveryoptionid;
        this.savetostorage();
    }
}



const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);

