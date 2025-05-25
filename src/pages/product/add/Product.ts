import { instance } from "../../../service/api"
import type { Products } from "../../../types/Product"

function saveProduct(product: Products) {
  instance.post("product/add", {
    data:
    {
      nameProduct: product.nameProduct,
      supplier: product.suppliers,
      dateExpiration: product.dateExpiration,
      dateAdd: new Date().toLocaleTimeString(),
      weightProduct: product.weightProduct,
      amount: product.stock,
      priceProduct: product.priceProduct,
      image: product.images
    }

  })
}
export { saveProduct }
