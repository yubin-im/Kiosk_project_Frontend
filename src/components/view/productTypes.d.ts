type ProductCategory =
  | BURGER_SET
  | BURGER_SINGLE
  | HAPPY_MEAL
  | DRINK
  | DESSERT;

type ProductsByCategory = {
  productId: string;
  productName: string;
  productPrice: string;
  productImgUrl: string;
};
