import AddProductsNewEditForm from '@/app/section/add-products/add-product-new-edit-form'
import React, { use } from 'react'

const page = ({ params }) => {
    const { id } = use(params)

    return (
        <div>
            <AddProductsNewEditForm productData={id} />
        </div>
    )
}

export default page
