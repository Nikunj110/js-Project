export const deliveryOptions = [
  { id: '1', deliverydays: 7, pricecents: 0 },
  { id: '2', deliverydays: 3, pricecents: 499 },
  { id: '3', deliverydays: 1, pricecents: 999 },
];

export function getDeliveryOption(deliveryoptionid) {
  let deliveryoption;

  // Find the matching delivery option
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryoptionid) {
      deliveryoption = option;
    }
  });

  return deliveryoption || deliveryOptions[0];
}
