import { randFloat, randNumber, randPastDate, randProductCategory, randProductDescription, randSoonDate, randText, randUrl } from "@ngneat/falso"
import { Category, ProductDto } from "../models/products.interface"
import { OrderDto } from "../models/cart.interface"


export const getProductsResponseMock = () => {
  return [
    {
      id: randNumber(),
      title: randText(),
      price: randNumber().toString(),
      category: randProductCategory(),
      description: randProductDescription(),
      image: randUrl()[0],
      rating: {
        rate: randFloat(),
        count: randNumber()
      }
    },
  ]
}

export const getMappedProduct = (): ProductDto => {
  return {
    id: randNumber(),
    name: randText(),
    price: randNumber(),
    category: Category.Electronics,
    description: randProductDescription(),
    image: randUrl(),
  }
}

export const getOrderBodyMock = (): OrderDto => {
  return {
    userId: randNumber(),
    date: randPastDate().toISOString(),
    products: [{
      productId: randNumber(),
      quantity: randNumber(),
    }]

  }
}