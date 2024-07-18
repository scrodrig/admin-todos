import { ProductCard } from '@/products'
import { products } from '@/products/data/products'

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {products.map((product) => {
        return <ProductCard key={product.id} {...product} />
      })}
    </div>
  )
}
