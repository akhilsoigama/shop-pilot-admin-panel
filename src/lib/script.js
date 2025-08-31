await Product.createIndexes([
    // Main product fields
    { key: { productName: "text" } },
    { key: { brand: "text" } },
    { key: { category: 1 } },
    { key: { subCategory: 1 } },
    { key: { productKey: 1 } },
    { key: { price: 1 } },
    { key: { discount: 1 } },
    { key: { discountPrice: 1 } },
    { key: { inStock: 1 } },
    { key: { quantity: 1 } },
    
    // Variants fields indexes
    { key: { "variants.price": 1 } },
    { key: { "variants.discount": 1 } },
    { key: { "variants.discountPrice": 1 } },
    { key: { "variants.quantity": 1 } },
    { key: { "variants.availableStock": 1 } },
    { key: { "variants.inStock": 1 } },
    { key: { "variants.sku": 1 } },
    { key: { "variants.stripePriceId": 1 } },
    
    // Specifications fields indexes
    { key: { "specifications.name": 1 } },
    { key: { "specifications.value": 1 } },
    { key: { "specifications.type": 1 } },
    { key: { "variants.specifications.name": 1 } },
    { key: { "variants.specifications.value": 1 } },
    { key: { "variants.specifications.type": 1 } },
    
    // Compound indexes for better query performance
    { key: { category: 1, "variants.price": 1 } },
    { key: { "variants.inStock": 1, "variants.price": 1 } },
    { key: { "specifications.name": 1, "specifications.value": 1 } },
    
    // Text search across multiple fields
    { key: { 
        productName: "text", 
        brand: "text", 
        productDescription: "text",
        "specifications.value": "text",
        "variants.specifications.value": "text"
    } }
]);