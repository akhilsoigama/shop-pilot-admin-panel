'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/hooks/useProducts'
import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MoreVertical, Edit, Trash2, Eye } from 'lucide-react'
import { toast } from 'sonner'

export default function ProductList() {
  const router = useRouter()
  const { products, deleteProduct } = useProducts()
  const data = products || []
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return data
    return data.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, data])

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId)
      toast.success('Product deleted successfully')
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 max-w-5xl h-full flex flex-col overflow-hidden p-4"
    >
      {/* Header with Search */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Products</h2>
        <Input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-[300px] px-4 py-2 border border-gray-300 rounded-md dark:bg-neutral-800 dark:text-white"
        />
      </div>

      {/* Product Table */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
          No products found.
        </div>
      ) : (
        <div className="flex-1 overflow-auto scrollbar-hide border rounded-lg shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-muted dark:bg-muted/30 text-left text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Discount-Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
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
                    <span className="font-medium truncate w-[150px] text-gray-800 dark:text-gray-100">
                      {product.productName}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{product.category}</td>
                  <td className="p-4 text-gray-800 dark:text-gray-100 font-semibold">
                    ₹{product.price}
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-100 font-semibold">
                    {product.discount}%
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-100 font-semibold">
                    ₹{product.discountPrice}
                  </td>
                  <td>
                    {product.inStock ? (
                      <div className="text-green-600 p-2 text-center font-bold rounded-md bg-green-300/30 dark:text-green-400">
                        Available
                      </div>
                    ) : (
                      <div className="text-red-600 p-2 text-center font-bold bg-red-300/30 rounded-md dark:text-red-400">
                        UnAvailable
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/dashboard/addProducts/${product._id}`)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Are you sure?</DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will permanently delete the product.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(product._id)}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
