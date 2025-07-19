"use client"
import AddProductsNewEditForm from '@/app/section/add-products/add-product-new-edit-form'
import { useProducts } from '@/hooks/useProducts'
import React, { use } from 'react'

const page = ({ params }) => {
    const { id } = use(params)
    const { product } = useProducts().getProduct(id)
    return (
        <div>
            <AddProductsNewEditForm productData={product} />
        </div>
    )
}

export default page
