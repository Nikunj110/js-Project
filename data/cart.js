export const cart= [];
export function addtoCart(productId) {
    let matchingitem;
  
    // we check if product already in the cart then increase Quantity
    cart.forEach((cartitem) => {
      if (productId === cartitem.productId) {
        matchingitem = cartitem;
      }
  
    });
  
    if (matchingitem) {
      matchingitem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1
      });
    }
  }