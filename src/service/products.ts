import { instance } from "./api.ts"
export const productUrl = {
  getProduct: function (id: string) {
    return instance.get("" + id)
  },
  updateProduct: function () {
    return null;
  },
  allProducts: function () {
    return instance.get("product/allProducts");
  },
};
