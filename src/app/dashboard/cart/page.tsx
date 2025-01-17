import { Product, products } from '@/products/data/products'

import { ItemCard } from '@/shopping-cart'
import { WidgetItem } from '@/components'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Cart Page',
  description: 'Cart Page',
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = []

  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id)
    if (product) {
      productsInCart.push({ product, quantity: cart[id] })
    }
  }

  return productsInCart
}

export default function CartPage() {
  const cookieStore = cookies()
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}')
  const productsInCart = getProductsInCart(cart)

  const totalToPay = productsInCart.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity
  }, 0)

  return (
    <div>
      <h1 className="text-5xl">Products in cart</h1>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total">
            <div className="mt-2 flex flex-col justify-center gap-4 items-center">
              <h3 className="text-3xl font-bold text-gray-700">${totalToPay.toFixed(2)}</h3>
              <span className="font-bold text-center text-gray-500">
                Taxes 23%: $ {(totalToPay * 1.23).toFixed(2)}
              </span>
            </div>
          </WidgetItem>
        </div>
      </div>
    </div>
  )
}
