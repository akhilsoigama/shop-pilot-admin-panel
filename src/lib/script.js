await Product.createIndexes([
    { key: { productName: "text" } },
    { key: { brand: "text" } },
    { key: { category: 1 } },
    { key: { subCategory: 1 } },
    { key: { price: 1 } },
    { key: { inStock: 1 } },
]);