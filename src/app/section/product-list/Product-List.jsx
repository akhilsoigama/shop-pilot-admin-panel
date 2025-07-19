'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/hooks/useProducts'

export default function ProductList() {
  const router = useRouter()
  const { products } = useProducts()
  const data = products || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-3"
    >
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      {data.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
          No products found.
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-muted dark:bg-muted/30 text-left text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Discount-Price</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((product) => (
                <tr
                  key={product._id}
                  className="transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                >
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 overflow-hidden rounded-lg">
                      <img
                        src={product.productImage[0]}
                        alt={product.productName}
                        className="w-full h-full object-cover transform transition-transform duration-200 hover:scale-105"
                      />
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {product.productName}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{product.category}</td>
                  <td className="p-4 text-gray-800 dark:text-gray-100 font-semibold">
                    ₹{product.price}
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-100 font-semibold">
                    ₹{product.discount}
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-100 font-semibold">
                    ₹{product.discountPrice}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                      onClick={() => router.push(`/dashboard/addProducts/${product._id}`)}
                    >
                      Visit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}
