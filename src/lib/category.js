export const categories = [
    'Electronics',
    'Fashion & Apparel',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Health & Wellness',
    'Sports & Outdoors',
    'Automotive',
    'Books & Stationery',
    'Toys & Games',
    'Baby Products',
    'Groceries & Gourmet',
    'Pet Supplies',
    'Office Supplies',
    'Tools & Hardware',
    'Jewelry & Accessories',
    'Footwear',
];


export const Subcategories = [
    {
        name: 'Electronics',
        subcategories: [
            {
                name: 'Smartphones & Mobiles',
                fields: [
                    { name: 'RAM', type: 'dropdown', options: ['4GB', '6GB', '8GB', '12GB'] },
                    { name: 'Storage', type: 'dropdown', options: ['64GB', '128GB', '256GB', '512GB', '1TB'] },
                    { name: 'Screen Size', type: 'text', unit: 'inches' },
                    { name: 'Battery', type: 'text', unit: 'mAh' },
                    { name: 'Camera', type: 'text' },
                    { name: 'Processor', type: 'text' },
                    { name: 'Operating System', type: 'text' },
                    { name: '5G Supported', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'RAM', description: 'Available RAM configurations' },
                    { name: 'Storage', description: 'Available storage options' },
                    { name: 'Color', description: 'Available color variants' }
                ]
            },
            {
                name: 'Laptops',
                fields: [
                    { name: 'Processor', type: 'dropdown', options: ['Intel i3', 'Intel i5', 'Intel i7', 'Intel i9', 'Ryzen 5', 'Ryzen 7'] },
                    { name: 'RAM', type: 'dropdown', options: ['8GB', '16GB', '32GB'] },
                    { name: 'Storage Type', type: 'dropdown', options: ['HDD', 'SSD', 'Hybrid'] },
                    { name: 'Storage Capacity', type: 'dropdown', options: ['256GB', '512GB', '1TB', '2TB'] },
                    { name: 'Screen Size', type: 'text', unit: 'inches' },
                    { name: 'Graphics Card', type: 'text' },
                    { name: 'Operating System', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Processor', description: 'Available processor options' },
                    { name: 'RAM', description: 'Available memory configurations' },
                    { name: 'Storage Capacity', description: 'Available storage sizes' },
                    { name: 'Color', description: 'Available color options' }
                ]
            },
            {
                name: 'Tablets',
                fields: [
                    { name: 'Screen Size', type: 'text', unit: 'inches' },
                    { name: 'Storage', type: 'dropdown', options: ['32GB', '64GB', '128GB', '256GB'] },
                    { name: 'RAM', type: 'dropdown', options: ['2GB', '4GB', '6GB', '8GB'] },
                    { name: 'Battery', type: 'text', unit: 'mAh' },
                    { name: 'Camera', type: 'text' },
                    { name: 'SIM Support', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Storage', description: 'Available storage options' },
                    { name: 'RAM', description: 'Available memory configurations' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Connectivity', description: 'Wi-Fi only or Cellular models' }
                ]
            },
            {
                name: 'Headphones',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['In-Ear', 'On-Ear', 'Over-Ear'] },
                    { name: 'Connectivity', type: 'dropdown', options: ['Wired', 'Wireless', 'Bluetooth'] },
                    { name: 'Noise Cancellation', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Battery Life', type: 'text', unit: 'hours' },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Connectivity', description: 'Wired or wireless variants' }
                ]
            },
            {
                name: 'Cameras',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['DSLR', 'Mirrorless', 'Point & Shoot', 'Action Camera'] },
                    { name: 'Resolution', type: 'text', unit: 'MP' },
                    { name: 'Lens Included', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Zoom', type: 'text', unit: 'x' },
                    { name: 'Sensor Type', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Lens Kit', description: 'Body only or with lens options' },
                    { name: 'Color', description: 'Available color variants' }
                ]
            },
            {
                name: 'Gaming Consoles',
                fields: [
                    { name: 'Model', type: 'text' },
                    { name: 'Storage', type: 'dropdown', options: ['500GB', '1TB', '2TB'] },
                    { name: 'Controller Included', type: 'dropdown', options: ['1', '2'] },
                ],
                variantAttributes: [
                    { name: 'Storage', description: 'Available storage capacities' },
                    { name: 'Edition', description: 'Special edition variants' }
                ]
            },
            {
                name: 'Televisions',
                fields: [
                    { name: 'Screen Size', type: 'text', unit: 'inches' },
                    { name: 'Display Type', type: 'dropdown', options: ['LED', 'OLED', 'QLED', 'LCD'] },
                    { name: 'Smart TV', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Resolution', type: 'dropdown', options: ['HD', 'Full HD', '4K', '8K'] },
                ],
                variantAttributes: [
                    { name: 'Screen Size', description: 'Available size options' },
                    { name: 'Resolution', description: 'HD, Full HD, 4K, 8K variants' }
                ]
            },
            {
                name: 'Computer Accessories',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Keyboard', 'Mouse', 'Webcam', 'Speakers', 'Cables', 'Docking Station'] },
                    { name: 'Connectivity', type: 'dropdown', options: ['Wired', 'Wireless', 'Bluetooth'] },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Connectivity', description: 'Wired or wireless variants' }
                ]
            },
            {
                name: 'Printers',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Inkjet', 'Laser', 'Dot Matrix'] },
                    { name: 'Functions', type: 'dropdown', options: ['Print', 'Print + Scan + Copy'] },
                    { name: 'Connectivity', type: 'dropdown', options: ['USB', 'Wi-Fi', 'Bluetooth'] },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Functions', description: 'Print only or multifunction variants' }
                ]
            },
            {
                name: 'Monitors',
                fields: [
                    { name: 'Screen Size', type: 'text', unit: 'inches' },
                    { name: 'Resolution', type: 'dropdown', options: ['HD', 'Full HD', '2K', '4K'] },
                    { name: 'Refresh Rate', type: 'text', unit: 'Hz' },
                    { name: 'Panel Type', type: 'dropdown', options: ['IPS', 'TN', 'VA'] },
                ],
                variantAttributes: [
                    { name: 'Screen Size', description: 'Available size options' },
                    { name: 'Resolution', description: 'Available resolution variants' },
                    { name: 'Curved', description: 'Flat or curved screen options' }
                ]
            },
            {
                name: 'Storage Devices',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['HDD', 'SSD', 'Pen Drive', 'Memory Card'] },
                    { name: 'Capacity', type: 'dropdown', options: ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'] },
                    { name: 'Interface', type: 'dropdown', options: ['USB 2.0', 'USB 3.0', 'USB-C', 'SATA', 'NVMe'] },
                ],
                variantAttributes: [
                    { name: 'Capacity', description: 'Available storage sizes' },
                    { name: 'Interface', description: 'Connection type variants' }
                ]
            },
            {
                name: 'Smart Watches',
                fields: [
                    { name: 'Dial Shape', type: 'dropdown', options: ['Round', 'Square', 'Rectangular'] },
                    { name: 'Connectivity', type: 'dropdown', options: ['Bluetooth', 'Wi-Fi'] },
                    { name: 'Fitness Features', type: 'dropdown', options: ['Heart Rate', 'SpO2', 'Sleep Tracking', 'Steps Counter'] },
                    { name: 'Battery Life', type: 'text', unit: 'days' },
                ],
                variantAttributes: [
                    { name: 'Strap Color', description: 'Available strap color options' },
                    { name: 'Case Size', description: 'Available case diameter options' }
                ]
            },
            {
                name: 'Fitness Bands',
                fields: [
                    { name: 'Display', type: 'dropdown', options: ['AMOLED', 'LCD'] },
                    { name: 'Battery Life', type: 'text', unit: 'days' },
                    { name: 'Water Resistant', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Tracking Features', type: 'dropdown', options: ['Steps', 'Calories', 'Sleep', 'Heart Rate'] },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Size', description: 'Available band sizes' }
                ]
            },
            {
                name: 'Refrigerators',
                fields: [
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                    { name: 'Door Type', type: 'dropdown', options: ['Single Door', 'Double Door', 'Side by Side', 'French Door'] },
                    { name: 'Defrost Type', type: 'dropdown', options: ['Direct Cool', 'Frost Free'] },
                    { name: 'Star Rating', type: 'dropdown', options: ['2 Star', '3 Star', '4 Star', '5 Star'] },
                ],
                variantAttributes: [
                    { name: 'Capacity', description: 'Available size variants' },
                    { name: 'Color', description: 'Available exterior color options' }
                ]
            },
            {
                name: 'Washing Machines',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Front Load', 'Top Load', 'Semi Automatic'] },
                    { name: 'Capacity', type: 'text', unit: 'Kg' },
                    { name: 'Spin Speed', type: 'text', unit: 'RPM' },
                    { name: 'Star Rating', type: 'dropdown', options: ['3 Star', '4 Star', '5 Star'] },
                ],
                variantAttributes: [
                    { name: 'Capacity', description: 'Available load capacity options' },
                    { name: 'Color', description: 'Available exterior color options' }
                ]
            },
            {
                name: 'Air Conditioners',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Split', 'Window', 'Portable'] },
                    { name: 'Capacity', type: 'text', unit: 'Tons' },
                    { name: 'Star Rating', type: 'dropdown', options: ['3 Star', '4 Star', '5 Star'] },
                    { name: 'Inverter', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Capacity', description: 'Available cooling capacity options' },
                    { name: 'Type', description: 'Split, window or portable variants' }
                ]
            },
            {
                name: 'Audio Systems',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Home Theater', 'Soundbar', 'Bluetooth Speaker'] },
                    { name: 'Connectivity', type: 'dropdown', options: ['Bluetooth', 'Wi-Fi', 'Wired'] },
                    { name: 'Output Power', type: 'text', unit: 'Watt' },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Configuration', description: 'Speaker count variants (2.1, 5.1 etc.)' }
                ]
            },
            {
                name: 'Accessories',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Charger', 'Power Bank', 'Adapter', 'Screen Protector', 'Phone Case', 'Stylus', 'Mount & Holder'] },
                    { name: 'Compatibility', type: 'text' },
                    { name: 'Color', type: 'dropdown', options: ['Black', 'White', 'Blue', 'Red', 'Transparent'] },
                    { name: 'Material', type: 'dropdown', options: ['Plastic', 'Silicone', 'Metal', 'Leather'] },
                    { name: 'Connectivity', type: 'dropdown', options: ['USB', 'USB-C', 'Lightning', 'Wireless'] },
                    { name: 'Fast Charging Supported', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Compatibility', description: 'Device-specific variants' },
                    { name: 'Capacity', description: 'For power banks and chargers' }
                ]
            }
        ]
    },
    {
        name: 'Fashion & Apparel',
        subcategories: [
            {
                name: "Men's Clothing",
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Shirt', 'T-Shirt', 'Jeans', 'Trousers', 'Jacket', 'Kurta'] },
                    { name: 'Size', type: 'dropdown', options: ['S', 'M', 'L', 'XL', 'XXL'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Fit', type: 'dropdown', options: ['Slim', 'Regular', 'Loose'] },
                    { name: 'Sleeve Length', type: 'dropdown', options: ['Full Sleeve', 'Half Sleeve', 'Sleeveless'] },
                    { name: 'Pattern', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available sizes for this clothing item' },
                    { name: 'Color', description: 'Available colors for this clothing item' }
                ]
            },
            {
                name: "Women's Clothing",
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Top', 'Dress', 'Saree', 'Kurti', 'Jeans', 'Leggings'] },
                    { name: 'Size', type: 'dropdown', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Fit', type: 'dropdown', options: ['Slim', 'Regular', 'Loose'] },
                    { name: 'Sleeve Length', type: 'dropdown', options: ['Full Sleeve', 'Half Sleeve', 'Sleeveless'] },
                    { name: 'Pattern', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available sizes for this clothing item' },
                    { name: 'Color', description: 'Available colors for this clothing item' }
                ]
            },
            {
                name: "Kid's Clothing",
                fields: [
                    { name: 'Age Group', type: 'dropdown', options: ['0-1 Years', '1-3 Years', '4-6 Years', '7-9 Years', '10-12 Years'] },
                    { name: 'Gender', type: 'dropdown', options: ['Boys', 'Girls'] },
                    { name: 'Type', type: 'dropdown', options: ['Shirt', 'T-Shirt', 'Dress', 'Frock', 'Pants', 'Shorts'] },
                    { name: 'Size', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Pattern', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available sizes for kids clothing' },
                    { name: 'Color', description: 'Available colors for this clothing item' }
                ]
            },
            {
                name: 'Bags & Luggage',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Backpack', 'Trolley Bag', 'Handbag', 'Laptop Bag', 'Duffel Bag'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                    { name: 'Color', type: 'text' },
                    { name: 'Water Resistant', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available colors for this bag' },
                    { name: 'Capacity', description: 'Different storage capacities available' }
                ]
            },
            {
                name: 'Sunglasses',
                fields: [
                    { name: 'Frame Shape', type: 'dropdown', options: ['Round', 'Square', 'Aviator', 'Wayfarer', 'Cat Eye'] },
                    { name: 'Lens Color', type: 'text' },
                    { name: 'Frame Color', type: 'text' },
                    { name: 'Frame Material', type: 'text' },
                    { name: 'UV Protection', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Polarized', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Lens Color', description: 'Available lens colors' },
                    { name: 'Frame Color', description: 'Available frame colors' }
                ]
            },
            {
                name: 'Fashion Accessories',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Necklace', 'Bracelet', 'Ring', 'Earrings', 'Anklet'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Occasion', type: 'dropdown', options: ['Casual', 'Party', 'Wedding', 'Festive'] },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available colors for this accessory' }
                ]
            },
            {
                name: 'Traditional Watches',
                fields: [
                    { name: 'Dial Shape', type: 'dropdown', options: ['Round', 'Square', 'Rectangular'] },
                    { name: 'Strap Material', type: 'text' },
                    { name: 'Strap Color', type: 'text' },
                    { name: 'Water Resistant', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Display Type', type: 'dropdown', options: ['Analog', 'Digital'] },
                ],
                variantAttributes: [
                    { name: 'Strap Color', description: 'Available strap colors' },
                    { name: 'Dial Shape', description: 'Available dial shapes' }
                ]
            },
            {
                name: 'Belts & Wallets',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Belt', 'Wallet'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Pattern', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available colors' },
                    { name: 'Size', description: 'Different available sizes' }
                ]
            },
            {
                name: 'Scarves & Shawls',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Scarf', 'Shawl', 'Stole', 'Dupatta'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Pattern', type: 'text' },
                    { name: 'Length', type: 'text', unit: 'cm' },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available colors' },
                    { name: 'Length', description: 'Different length options' }
                ]
            },
            {
                name: 'Hats & Caps',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Cap', 'Hat', 'Beanie', 'Fedora'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Occasion', type: 'dropdown', options: ['Casual', 'Sports', 'Beach', 'Winter'] },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available colors' },
                    { name: 'Size', description: 'Available sizes' }
                ]
            }
        ]
    },
    {
        name: 'Home & Kitchen',
        subcategories: [
            {
                name: 'Living Room Furniture',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Sofa', 'Coffee Table', 'TV Unit', 'Recliner', 'Bookshelf'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Seating Capacity', type: 'dropdown', options: ['1 Seater', '2 Seater', '3 Seater', '5 Seater'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Dimensions', type: 'text', unit: 'L x W x H (cm)' },
                    { name: 'Storage Included', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Seating Capacity', description: 'Available seating configurations' },
                    { name: 'Material', description: 'Available material variants' }
                ]
            },
            {
                name: 'Bedroom Furniture',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Bed', 'Wardrobe', 'Dressing Table', 'Nightstand', 'Mattress'] },
                    { name: 'Size', type: 'dropdown', options: ['Single', 'Double', 'Queen', 'King'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Storage Type', type: 'dropdown', options: ['Box', 'Drawer', 'Hydraulic', 'None'] },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available bed sizes' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Storage Type', description: 'Available storage configurations' }
                ]
            },
            {
                name: 'Kitchen & Dining Furniture',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Dining Table', 'Chairs', 'Kitchen Rack', 'Bar Stool'] },
                    { name: 'Seating Capacity', type: 'dropdown', options: ['2', '4', '6', '8'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Shape', type: 'dropdown', options: ['Round', 'Rectangular', 'Square'] },
                ],
                variantAttributes: [
                    { name: 'Seating Capacity', description: 'Available seating options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Shape', description: 'Available table shapes' }
                ]
            },
            {
                name: 'Cookware & Bakeware',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Kadhai', 'Pan', 'Tawa', 'Casserole', 'Baking Tray'] },
                    { name: 'Material', type: 'dropdown', options: ['Non-stick', 'Stainless Steel', 'Aluminium', 'Cast Iron'] },
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                    { name: 'Induction Compatible', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Oven Safe', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Capacity', description: 'Available size variants' },
                    { name: 'Color', description: 'Available color options' }
                ]
            },
            {
                name: 'Kitchen Appliances',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Mixer Grinder', 'Microwave', 'Toaster', 'Juicer', 'Induction Cooktop'] },
                    { name: 'Power Consumption', type: 'text', unit: 'Watts' },
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                    { name: 'Color', type: 'text' },
                    { name: 'Auto Shut Off', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Capacity', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Power Consumption', description: 'Available wattage options' }
                ]
            },
            {
                name: 'Lighting',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Ceiling Light', 'Lamp', 'LED Strip', 'Pendant Light'] },
                    { name: 'Wattage', type: 'text', unit: 'Watts' },
                    { name: 'Color Temperature', type: 'dropdown', options: ['Warm White', 'Cool White', 'Daylight'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Dimmable', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Color Temperature', description: 'Available light colors' },
                    { name: 'Wattage', description: 'Available brightness levels' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Storage & Organization',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Drawer', 'Storage Box', 'Shoe Rack', 'Wardrobe Organizer'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                    { name: 'Foldable', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Capacity', description: 'Available size variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Bedding & Bath',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Bedsheet', 'Pillow', 'Comforter', 'Towel', 'Mattress Protector'] },
                    { name: 'Size', type: 'dropdown', options: ['Single', 'Double', 'Queen', 'King'] },
                    { name: 'Thread Count', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Material', description: 'Available fabric types' }
                ]
            },
            {
                name: 'Home Decor',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Wall Art', 'Clock', 'Showpiece', 'Photo Frame', 'Artificial Plant'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Mount Type', type: 'dropdown', options: ['Wall Mounted', 'Tabletop'] },
                    { name: 'Dimensions', type: 'text', unit: 'L x W x H (cm)' },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Dimensions', description: 'Available size variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Gardening & Outdoor',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Plant Pot', 'Garden Tool', 'Seeds', 'Outdoor Furniture'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Usage Area', type: 'dropdown', options: ['Balcony', 'Terrace', 'Garden', 'Indoor'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Capacity', description: 'Available size variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Dining & Serveware',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Dinner Set', 'Plates', 'Bowls', 'Serving Tray', 'Cutlery Set', 'Glasses', 'Jug', 'Serving Spoon', 'Salad Bowl'] },
                    { name: 'Material', type: 'dropdown', options: ['Ceramic', 'Stainless Steel', 'Melamine', 'Glass', 'Bone China', 'Wood'] },
                    { name: 'Microwave Safe', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Dishwasher Safe', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Number of Pieces', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Pattern/Design', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Number of Pieces', description: 'Available set sizes' },
                    { name: 'Color/Pattern', description: 'Available design variants' }
                ]
            }
        ]
    },
    {
        name: 'Beauty & Personal Care',
        subcategories: [
            {
                name: 'Makeup',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Foundation', 'Lipstick', 'Mascara', 'Blush', 'Eyeshadow', 'Concealer'] },
                    { name: 'Shade', type: 'text' },
                    { name: 'Finish', type: 'dropdown', options: ['Matte', 'Glossy', 'Dewy', 'Satin'] },
                    { name: 'Skin Type', type: 'dropdown', options: ['Dry', 'Oily', 'Combination', 'Normal', 'All Skin Types'] },
                    { name: 'Waterproof', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Shade', description: 'Available color shades' },
                    { name: 'Finish', description: 'Available finish types' },
                    { name: 'Size', description: 'Available product sizes' }
                ]
            },
            {
                name: 'Skin Care',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Moisturizer', 'Sunscreen', 'Serum', 'Face Wash', 'Toner', 'Face Mask'] },
                    { name: 'Skin Type', type: 'dropdown', options: ['Dry', 'Oily', 'Combination', 'Sensitive', 'All Skin Types'] },
                    { name: 'SPF', type: 'text' },
                    { name: 'Usage', type: 'dropdown', options: ['Day', 'Night', 'Both'] },
                    { name: 'Fragrance Free', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available product sizes' },
                    { name: 'Skin Type', description: 'Formulations for different skin types' },
                    { name: 'SPF', description: 'Available sun protection levels' }
                ]
            },
            {
                name: 'Hair Care',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Serum', 'Hair Mask'] },
                    { name: 'Hair Type', type: 'dropdown', options: ['Dry', 'Oily', 'Normal', 'Colored', 'Damaged'] },
                    { name: 'Quantity', type: 'text', unit: 'ml' },
                    { name: 'Sulfate Free', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Purpose', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Quantity', description: 'Available size options' },
                    { name: 'Hair Type', description: 'Formulations for different hair types' },
                    { name: 'Purpose', description: 'Specific benefit variants' }
                ]
            },
            {
                name: 'Fragrances',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Perfume', 'Deodorant', 'Body Mist'] },
                    { name: 'Gender', type: 'dropdown', options: ['Men', 'Women', 'Unisex'] },
                    { name: 'Fragrance Type', type: 'dropdown', options: ['Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh'] },
                    { name: 'Volume', type: 'text', unit: 'ml' },
                    { name: 'Long Lasting', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Volume', description: 'Available size options' },
                    { name: 'Fragrance Type', description: 'Available scent families' },
                    { name: 'Gender', description: 'Gender-specific variants' }
                ]
            },
            {
                name: 'Grooming Tools',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Trimmer', 'Razor', 'Hair Dryer', 'Straightener', 'Epilator'] },
                    { name: 'Power Source', type: 'dropdown', options: ['Electric', 'Battery Operated', 'Manual'] },
                    { name: 'Cordless', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Recharge Time', type: 'text', unit: 'hrs' },
                    { name: 'Usage Time', type: 'text', unit: 'mins' },
                ],
                variantAttributes: [
                    { name: 'Power Source', description: 'Available power options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Accessories', description: 'Available accessory kits' }
                ]
            },
            {
                name: 'Bath & Body',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Body Wash', 'Soap', 'Body Lotion', 'Body Scrub'] },
                    { name: 'Skin Type', type: 'dropdown', options: ['Dry', 'Oily', 'Normal', 'Sensitive', 'All Skin Types'] },
                    { name: 'Quantity', type: 'text', unit: 'ml' },
                    { name: 'Fragrance', type: 'text' },
                    { name: 'Paraben Free', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Quantity', description: 'Available size options' },
                    { name: 'Fragrance', description: 'Available scent variants' },
                    { name: 'Skin Type', description: 'Formulations for different skin types' }
                ]
            },
            {
                name: 'Oral Care',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Toothpaste', 'Toothbrush', 'Mouthwash', 'Floss'] },
                    { name: 'Pack Size', type: 'text' },
                    { name: 'Flavor', type: 'text' },
                    { name: 'Whitening', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Sensitivity Care', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Pack Size', description: 'Available size options' },
                    { name: 'Flavor', description: 'Available flavor variants' },
                    { name: 'Type', description: 'Available product types' }
                ]
            },
            {
                name: "Men's Grooming",
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Beard Oil', 'Shaving Foam', 'After Shave', 'Beard Trimmer'] },
                    { name: 'Fragrance', type: 'text' },
                    { name: 'Skin Type', type: 'dropdown', options: ['Dry', 'Oily', 'Sensitive', 'All Skin Types'] },
                    { name: 'Quantity', type: 'text', unit: 'ml' },
                    { name: 'Usage Area', type: 'dropdown', options: ['Face', 'Body', 'Beard'] },
                ],
                variantAttributes: [
                    { name: 'Quantity', description: 'Available size options' },
                    { name: 'Fragrance', description: 'Available scent variants' },
                    { name: 'Skin Type', description: 'Formulations for different skin types' }
                ]
            }
        ]
    },
    {
        name: 'Health & Wellness',
        subcategories: [
            {
                name: 'Supplements',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Protein', 'Vitamins', 'Minerals', 'Omega-3', 'Herbal'] },
                    { name: 'Form', type: 'dropdown', options: ['Tablet', 'Capsule', 'Powder', 'Liquid', 'Gummies'] },
                    { name: 'Flavour', type: 'text' },
                    { name: 'Quantity', type: 'text', unit: 'g/ml' },
                    { name: 'Serving Size', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Form', description: 'Available product forms' },
                    { name: 'Quantity', description: 'Available size options' },
                    { name: 'Flavour', description: 'Available flavor variants' }
                ]
            },
            {
                name: 'Fitness Equipment',
                fields: [
                    { name: 'Equipment Type', type: 'dropdown', options: ['Dumbbells', 'Treadmills', 'Exercise Bikes', 'Resistance Bands', 'Home Gym'] },
                    { name: 'Weight', type: 'text', unit: 'kg' },
                    { name: 'Material', type: 'text' },
                    { name: 'Dimensions', type: 'text' },
                    { name: 'Color', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Weight', description: 'Available weight options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Personal Care',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Electric Trimmer', 'Hair Dryer', 'Epilator', 'Facial Cleanser'] },
                    { name: 'Usage', type: 'dropdown', options: ['Men', 'Women', 'Unisex'] },
                    { name: 'Battery Operated', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Water Resistant', type: 'dropdown', options: ['Yes', 'No'] }
                ],
                variantAttributes: [
                    { name: 'Usage', description: 'Gender-specific variants' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Power Source', description: 'Battery or electric variants' }
                ]
            },
            {
                name: 'Wellness Devices',
                fields: [
                    { name: 'Device Type', type: 'dropdown', options: ['Massager', 'Foot Spa', 'Aroma Diffuser', 'Heating Pad'] },
                    { name: 'Power Source', type: 'dropdown', options: ['Electric', 'Battery'] },
                    { name: 'Timer Function', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Weight', type: 'text', unit: 'kg' }
                ],
                variantAttributes: [
                    { name: 'Power Source', description: 'Available power options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Size', description: 'Available size options' }
                ]
            },
            {
                name: 'First Aid',
                fields: [
                    { name: 'Kit Type', type: 'dropdown', options: ['Basic', 'Comprehensive', 'Travel', 'Home Use'] },
                    { name: 'Number of Items', type: 'text' },
                    { name: 'Sterile', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Water Resistant Case', type: 'dropdown', options: ['Yes', 'No'] }
                ],
                variantAttributes: [
                    { name: 'Kit Type', description: 'Available kit configurations' },
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Contents', description: 'Different item combinations' }
                ]
            },
            {
                name: 'Health Monitors',
                fields: [
                    { name: 'Monitor Type', type: 'dropdown', options: ['Blood Pressure', 'Glucometer', 'Pulse Oximeter', 'Thermometer'] },
                    { name: 'Display Type', type: 'dropdown', options: ['Digital', 'Analog'] },
                    { name: 'Power Source', type: 'dropdown', options: ['Battery', 'Rechargeable'] },
                    { name: 'Memory Function', type: 'dropdown', options: ['Yes', 'No'] }
                ],
                variantAttributes: [
                    { name: 'Monitor Type', description: 'Available health monitoring devices' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Connectivity', description: 'Bluetooth or wired variants' }
                ]
            },
            {
                name: 'Yoga & Meditation',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Yoga Mat', 'Meditation Cushion', 'Yoga Block', 'Strap'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Thickness', type: 'text', unit: 'mm' },
                    { name: 'Dimensions', type: 'text' },
                    { name: 'Color', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Thickness', description: 'Available thickness variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Vitamins & Minerals',
                fields: [
                    { name: 'Vitamin Type', type: 'dropdown', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'Multivitamin'] },
                    { name: 'Mineral Type', type: 'dropdown', options: ['Calcium', 'Iron', 'Magnesium', 'Zinc', 'Potassium', 'Selenium'] },
                    { name: 'Form', type: 'dropdown', options: ['Tablet', 'Capsule', 'Liquid', 'Gummies', 'Powder'] },
                    { name: 'Quantity', type: 'text', unit: 'g/ml' },
                    { name: 'Dosage Per Day', type: 'text' },
                    { name: 'Suitable For', type: 'dropdown', options: ['Adults', 'Kids', 'Elderly', 'Pregnant Women'] }
                ],
                variantAttributes: [
                    { name: 'Form', description: 'Available product forms' },
                    { name: 'Quantity', description: 'Available size options' },
                    { name: 'Suitable For', description: 'Age-specific formulations' }
                ]
            },
            {
                name: 'Herbal Products',
                fields: [
                    { name: 'Herb Type', type: 'dropdown', options: ['Ashwagandha', 'Tulsi', 'Amla', 'Giloy', 'Turmeric', 'Neem'] },
                    { name: 'Form', type: 'dropdown', options: ['Tablet', 'Powder', 'Juice', 'Capsule', 'Tea'] },
                    { name: 'Quantity', type: 'text', unit: 'g/ml' },
                    { name: 'Organic Certified', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Consumption Method', type: 'dropdown', options: ['Oral', 'Topical'] },
                    { name: 'Age Group', type: 'dropdown', options: ['Adults', 'Children', 'Senior Citizens'] }
                ],
                variantAttributes: [
                    { name: 'Form', description: 'Available product forms' },
                    { name: 'Quantity', description: 'Available size options' },
                    { name: 'Organic Certified', description: 'Organic or conventional variants' }
                ]
            }
        ]
    },
    {
        name: 'Sports & Outdoors',
        subcategories: [
            {
                name: 'Gym Equipment',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Dumbbell', 'Treadmill', 'Bench', 'Barbell', 'Resistance Band'] },
                    { name: 'Material', type: 'dropdown', options: ['Steel', 'Rubber', 'Plastic'] },
                    { name: 'Weight', type: 'text', unit: 'kg' },
                    { name: 'Dimensions', type: 'text', unit: 'cm' }
                ],
                variantAttributes: [
                    { name: 'Weight', description: 'Available weight options' },
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Color', description: 'Available color variants' }
                ]
            },
            {
                name: 'Sportswear',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['T-Shirt', 'Shorts', 'Tracksuit', 'Jacket'] },
                    { name: 'Size', type: 'dropdown', options: ['S', 'M', 'L', 'XL', 'XXL'] },
                    { name: 'Material', type: 'dropdown', options: ['Polyester', 'Cotton', 'Nylon'] },
                    { name: 'Color', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Material', description: 'Available fabric types' }
                ]
            },
            {
                name: 'Camping Gear',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Tent', 'Sleeping Bag', 'Camping Stove', 'Lantern'] },
                    { name: 'Capacity', type: 'text', unit: 'persons' },
                    { name: 'Weight', type: 'text', unit: 'kg' },
                    { name: 'Material', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Capacity', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Season', description: 'Season-specific variants' }
                ]
            },
            {
                name: 'Cycling',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Mountain Bike', 'Road Bike', 'Hybrid', 'BMX'] },
                    { name: 'Frame Size', type: 'text', unit: 'inches' },
                    { name: 'Wheel Size', type: 'text', unit: 'inches' },
                    { name: 'Gear Type', type: 'dropdown', options: ['Single Speed', 'Multi Speed'] }
                ],
                variantAttributes: [
                    { name: 'Frame Size', description: 'Available frame sizes' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Gear Type', description: 'Speed configuration variants' }
                ]
            },
            {
                name: 'Team Sports',
                fields: [
                    { name: 'Sport Type', type: 'dropdown', options: ['Cricket', 'Football', 'Basketball', 'Hockey'] },
                    { name: 'Equipment Type', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Size', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Color', description: 'Available color variants' }
                ]
            },
            {
                name: 'Water Sports',
                fields: [
                    { name: 'Activity Type', type: 'dropdown', options: ['Swimming', 'Surfing', 'Diving', 'Kayaking'] },
                    { name: 'Equipment Type', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Material', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Hiking & Trekking',
                fields: [
                    { name: 'Gear Type', type: 'dropdown', options: ['Backpack', 'Trekking Pole', 'Boots', 'Tent'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Capacity', type: 'text', unit: 'liters' },
                    { name: 'Weight', type: 'text', unit: 'kg' }
                ],
                variantAttributes: [
                    { name: 'Capacity', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            }
        ]
    },
    {
        name: 'Automotive',
        subcategories: [
            {
                name: 'Car Accessories',
                fields: [
                    { name: 'Type', type: 'text' },
                    { name: 'Compatibility', type: 'text' },
                    { name: 'Color', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Compatibility', description: 'Vehicle model variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Motorbike Accessories',
                fields: [
                    { name: 'Type', type: 'text' },
                    { name: 'Bike Model Compatibility', type: 'text' },
                    { name: 'Material', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Bike Model Compatibility', description: 'Model-specific variants' }
                ]
            },
            {
                name: 'Oils & Fluids',
                fields: [
                    { name: 'Oil Type', type: 'dropdown', options: ['Engine Oil', 'Brake Oil', 'Coolant', 'Transmission Oil'] },
                    { name: 'Quantity', type: 'text' },
                    { name: 'Viscosity Grade', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Quantity', description: 'Available size options' },
                    { name: 'Viscosity Grade', description: 'Available viscosity grades' },
                    { name: 'Oil Type', description: 'Different fluid types' }
                ]
            },
            {
                name: 'Tools & Equipment',
                fields: [
                    { name: 'Tool Type', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Usage', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Size', description: 'Available size variants' },
                    { name: 'Usage', description: 'Vehicle-specific variants' }
                ]
            },
            {
                name: 'Car Electronics',
                fields: [
                    { name: 'Device Type', type: 'text' },
                    { name: 'Compatibility', type: 'text' },
                    { name: 'Connectivity', type: 'dropdown', options: ['Bluetooth', 'Wired', 'Wireless'] },
                ],
                variantAttributes: [
                    { name: 'Connectivity', description: 'Available connection types' },
                    { name: 'Compatibility', description: 'Vehicle model variants' },
                    { name: 'Color', description: 'Available color options' }
                ]
            },
            {
                name: 'Car Care',
                fields: [
                    { name: 'Product Type', type: 'text' },
                    { name: 'Volume', type: 'text' },
                    { name: 'Surface Compatibility', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Volume', description: 'Available size options' },
                    { name: 'Surface Compatibility', description: 'Surface-specific variants' },
                    { name: 'Fragrance', description: 'Available scent options' }
                ]
            },
            {
                name: 'Motorbike Gear',
                fields: [
                    { name: 'Gear Type', type: 'dropdown', options: ['Helmet', 'Gloves', 'Jacket', 'Boots', 'Pants'] },
                    { name: 'Size', type: 'text' },
                    { name: 'Material', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Tires & Wheels',
                fields: [
                    { name: 'Tire Type', type: 'dropdown', options: ['Tubeless', 'Tube Type', 'Radial'] },
                    { name: 'Size', type: 'text' },
                    { name: 'Vehicle Compatibility', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available tire sizes' },
                    { name: 'Tire Type', description: 'Tire construction variants' },
                    { name: 'Vehicle Compatibility', description: 'Vehicle-specific fitments' }
                ]
            }
        ]
    },
    {
        name: 'Books & Stationery',
        subcategories: [
            {
                name: 'Fiction',
                fields: [
                    { name: 'Author', type: 'text' },
                    { name: 'Language', type: 'text' },
                    { name: 'Genre', type: 'text' },
                    { name: 'Page Count', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Format', description: 'Paperback/Hardcover variants' },
                    { name: 'Edition', description: 'Different editions available' },
                    { name: 'Language', description: 'Available language versions' }
                ]
            },
            {
                name: 'Non-Fiction',
                fields: [
                    { name: 'Author', type: 'text' },
                    { name: 'Language', type: 'text' },
                    { name: 'Subject', type: 'text' },
                    { name: 'Page Count', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Format', description: 'Paperback/Hardcover variants' },
                    { name: 'Edition', description: 'Different editions available' },
                    { name: 'Language', description: 'Available language versions' }
                ]
            },
            {
                name: 'Educational',
                fields: [
                    { name: 'Subject', type: 'text' },
                    { name: 'Board/University', type: 'text' },
                    { name: 'Class/Level', type: 'text' },
                    { name: 'Language', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Edition', description: 'Current/previous editions' },
                    { name: 'Format', description: 'Paperback/Hardcover variants' },
                    { name: 'Class/Level', description: 'Grade-specific versions' }
                ]
            },
            {
                name: "Children's Books",
                fields: [
                    { name: 'Age Group', type: 'dropdown', options: ['0-3', '4-6', '7-9', '10-12'] },
                    { name: 'Language', type: 'text' },
                    { name: 'Illustrated', type: 'dropdown', options: ['Yes', 'No'] }
                ],
                variantAttributes: [
                    { name: 'Age Group', description: 'Age-specific variants' },
                    { name: 'Format', description: 'Board book/Paperback options' },
                    { name: 'Language', description: 'Available language versions' }
                ]
            },
            {
                name: 'Notebooks & Journals',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Ruled', 'Unruled', 'Grid', 'Dotted'] },
                    { name: 'Pages', type: 'text' },
                    { name: 'Size', type: 'dropdown', options: ['A4', 'A5', 'B5', 'Custom'] },
                    { name: 'Binding Type', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Type', description: 'Page style variants' },
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available cover colors' }
                ]
            },
            {
                name: 'Art Supplies',
                fields: [
                    { name: 'Product Type', type: 'text' },
                    { name: 'Color Set', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Size', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Color Set', description: 'Available color combinations' },
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Material', description: 'Available material variants' }
                ]
            },
            {
                name: 'Office Stationery',
                fields: [
                    { name: 'Item Type', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Usage', type: 'text' },
                    { name: 'Pack Size', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Pack Size', description: 'Available quantity options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Size', description: 'Available size options' }
                ]
            },
            {
                name: 'Pens & Writing',
                fields: [
                    { name: 'Pen Type', type: 'dropdown', options: ['Ballpoint', 'Gel', 'Fountain', 'Marker', 'Highlighter'] },
                    { name: 'Ink Color', type: 'text' },
                    { name: 'Refillable', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Pack Size', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Ink Color', description: 'Available ink colors' },
                    { name: 'Pack Size', description: 'Single or multipack options' },
                    { name: 'Pen Type', description: 'Different writing instruments' }
                ]
            },
            {
                name: 'Calendars & Planners',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Wall Calendar', 'Desk Calendar', 'Planner'] },
                    { name: 'Year', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Binding Type', type: 'dropdown', options: ['Spiral', 'Stapled', 'Hardbound'] }
                ],
                variantAttributes: [
                    { name: 'Type', description: 'Different calendar formats' },
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Theme', description: 'Different design variants' }
                ]
            }
        ]
    },
    {
        name: 'Toys & Games',
        subcategories: [
            {
                name: 'Action Figures',
                fields: [
                    { name: 'Character', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Height', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['3+', '5+', '8+', '12+'] },
                ],
                variantAttributes: [
                    { name: 'Character', description: 'Different character variants' },
                    { name: 'Height', description: 'Available size options' },
                    { name: 'Edition', description: 'Special edition variants' }
                ]
            },
            {
                name: 'Educational Toys',
                fields: [
                    { name: 'Skill Focus', type: 'dropdown', options: ['STEM', 'Language', 'Math', 'Creativity'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['2+', '4+', '6+', '10+'] },
                ],
                variantAttributes: [
                    { name: 'Skill Focus', description: 'Different learning focus areas' },
                    { name: 'Recommended Age', description: 'Age-specific variants' },
                    { name: 'Color', description: 'Available color options' }
                ]
            },
            {
                name: 'Board Games',
                fields: [
                    { name: 'Game Type', type: 'dropdown', options: ['Strategy', 'Family', 'Party', 'Card'] },
                    { name: 'Number of Players', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['6+', '8+', '10+', '12+'] },
                ],
                variantAttributes: [
                    { name: 'Game Type', description: 'Different game categories' },
                    { name: 'Edition', description: 'Special edition variants' },
                    { name: 'Language', description: 'Available language versions' }
                ]
            },
            {
                name: 'Puzzles',
                fields: [
                    { name: 'Puzzle Type', type: 'dropdown', options: ['Jigsaw', '3D', 'Wooden'] },
                    { name: 'Piece Count', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['4+', '6+', '8+', '12+'] },
                ],
                variantAttributes: [
                    { name: 'Piece Count', description: 'Available difficulty levels' },
                    { name: 'Puzzle Type', description: 'Different puzzle styles' },
                    { name: 'Theme', description: 'Various image/design variants' }
                ]
            },
            {
                name: 'Remote Control Toys',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Car', 'Helicopter', 'Boat', 'Drone'] },
                    { name: 'Battery Type', type: 'text' },
                    { name: 'Range', type: 'text' },
                    { name: 'Control Type', type: 'dropdown', options: ['Remote', 'App-Controlled'] },
                ],
                variantAttributes: [
                    { name: 'Type', description: 'Different vehicle categories' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Scale', description: 'Size variants (1:10, 1:24 etc.)' }
                ]
            },
            {
                name: 'Outdoor Play',
                fields: [
                    { name: 'Play Type', type: 'dropdown', options: ['Slides', 'Swings', 'Tents', 'Sports'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Dimensions', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['3+', '5+', '8+'] },
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Recommended Age', description: 'Age-specific variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Dolls & Playsets',
                fields: [
                    { name: 'Doll Type', type: 'dropdown', options: ['Fashion', 'Baby', 'Character'] },
                    { name: 'Accessories Included', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['3+', '5+', '8+'] },
                ],
                variantAttributes: [
                    { name: 'Doll Type', description: 'Different doll categories' },
                    { name: 'Character', description: 'Various character variants' },
                    { name: 'Outfit', description: 'Different clothing options' }
                ]
            }
        ]
    },
    {
        name: 'Baby Products',
        subcategories: [
            {
                name: 'Diapers & Wipes',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['Newborn', 'S', 'M', 'L', 'XL', 'XXL'] },
                    { name: 'Diaper Type', type: 'dropdown', options: ['Pant Style', 'Tape Style'] },
                    { name: 'Pack Size', type: 'text' },
                    { name: 'Fragrance', type: 'dropdown', options: ['Fragrance-Free', 'Mild Fragrance'] }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Pack Size', description: 'Different quantity packs' },
                    { name: 'Diaper Type', description: 'Style variants' }
                ]
            },
            {
                name: 'Feeding & Nursing',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Bottle', 'Sipper', 'Breast Pump', 'Sterilizer'] },
                    { name: 'Material', type: 'dropdown', options: ['Plastic', 'Glass', 'Silicone'] },
                    { name: 'Capacity (ml)', type: 'text' },
                    { name: 'BPA Free', type: 'dropdown', options: ['Yes', 'No'] }
                ],
                variantAttributes: [
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Capacity', description: 'Size variants' },
                    { name: 'Color', description: 'Available color options' }
                ]
            },
            {
                name: 'Baby Gear',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Stroller', 'Car Seat', 'Carrier', 'Walker'] },
                    { name: 'Age Range', type: 'text' },
                    { name: 'Weight Capacity (kg)', type: 'text' },
                    { name: 'Foldable', type: 'dropdown', options: ['Yes', 'No'] }
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Model', description: 'Different model variants' },
                    { name: 'Accessories', description: 'Available accessory kits' }
                ]
            },
            {
                name: 'Baby Clothing',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M'] },
                    { name: 'Material', type: 'dropdown', options: ['Cotton', 'Fleece', 'Wool'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Sleeve Length', type: 'dropdown', options: ['Full Sleeve', 'Half Sleeve', 'Sleeveless'] }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Material', description: 'Available fabric types' }
                ]
            },
            {
                name: 'Baby Toys',
                fields: [
                    { name: 'Toy Type', type: 'dropdown', options: ['Soft Toy', 'Rattle', 'Teether', 'Musical Toy'] },
                    { name: 'Age Group', type: 'text' },
                    { name: 'Material', type: 'dropdown', options: ['Plastic', 'Wooden', 'Fabric'] },
                    { name: 'Battery Required', type: 'dropdown', options: ['Yes', 'No'] }
                ],
                variantAttributes: [
                    { name: 'Toy Type', description: 'Different toy categories' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Age Group', description: 'Age-specific variants' }
                ]
            },
            {
                name: 'Health & Safety',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Thermometer', 'Nail Clipper', 'Medicine Dispenser', 'Safety Lock'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Usage Age', type: 'text' },
                    { name: 'Color', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Size', description: 'Available size variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Baby Care',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Shampoo', 'Lotion', 'Powder', 'Oil'] },
                    { name: 'Volume (ml)', type: 'text' },
                    { name: 'Skin Type', type: 'dropdown', options: ['Normal', 'Sensitive'] },
                    { name: 'Paraben Free', type: 'dropdown', options: ['Yes', 'No'] }
                ],
                variantAttributes: [
                    { name: 'Volume', description: 'Available size options' },
                    { name: 'Fragrance', description: 'Available scent variants' },
                    { name: 'Skin Type', description: 'Formulations for different skin types' }
                ]
            }
        ]
    },
    {
        name: 'Groceries & Gourmet',
        subcategories: [
            {
                name: 'Snacks & Sweets',
                fields: [
                    { name: 'Type', type: 'text' },
                    { name: 'Weight', type: 'text' },
                    { name: 'Flavor', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Flavor', description: 'Available flavor variants' },
                    { name: 'Weight', description: 'Available package sizes' },
                    { name: 'Pack Size', description: 'Single or multipack options' }
                ]
            },
            {
                name: 'Beverages',
                fields: [
                    { name: 'Drink Type', type: 'dropdown', options: ['Juice', 'Soft Drink', 'Energy Drink', 'Tea', 'Coffee', 'Water'] },
                    { name: 'Volume', type: 'text' },
                    { name: 'Sugar Content', type: 'dropdown', options: ['Sugar-Free', 'Low Sugar', 'Regular'] },
                ],
                variantAttributes: [
                    { name: 'Volume', description: 'Available size options' },
                    { name: 'Flavor', description: 'Available flavor variants' },
                    { name: 'Sugar Content', description: 'Different sweetness levels' }
                ]
            },
            {
                name: 'Staples',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Rice', 'Pulses', 'Flour', 'Oil'] },
                    { name: 'Weight', type: 'text' },
                    { name: 'Organic', type: 'dropdown', options: ['Yes', 'No'] },
                ],
                variantAttributes: [
                    { name: 'Weight', description: 'Available package sizes' },
                    { name: 'Organic', description: 'Organic or conventional options' },
                    { name: 'Brand', description: 'Different brand variants' }
                ]
            },
            {
                name: 'Organic Foods',
                fields: [
                    { name: 'Product Type', type: 'text' },
                    { name: 'Certified Organic', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Weight', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Weight', description: 'Available package sizes' },
                    { name: 'Certification', description: 'Different organic certifications' },
                    { name: 'Brand', description: 'Different brand variants' }
                ]
            },
            {
                name: 'Baking Essentials',
                fields: [
                    { name: 'Item Type', type: 'text' },
                    { name: 'Weight/Volume', type: 'text' },
                    { name: 'Use Case', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Weight/Volume', description: 'Available size options' },
                    { name: 'Type', description: 'Different product variants' },
                    { name: 'Brand', description: 'Different brand options' }
                ]
            },
            {
                name: 'Packaged Foods',
                fields: [
                    { name: 'Food Type', type: 'text' },
                    { name: 'Net Quantity', type: 'text' },
                    { name: 'Shelf Life', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Net Quantity', description: 'Available package sizes' },
                    { name: 'Flavor', description: 'Available flavor variants' },
                    { name: 'Brand', description: 'Different brand options' }
                ]
            },
            {
                name: 'International Cuisine',
                fields: [
                    { name: 'Cuisine Type', type: 'dropdown', options: ['Italian', 'Chinese', 'Mexican', 'Thai', 'Japanese', 'Continental'] },
                    { name: 'Item Type', type: 'text' },
                    { name: 'Weight/Volume', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Cuisine Type', description: 'Different regional cuisines' },
                    { name: 'Weight/Volume', description: 'Available size options' },
                    { name: 'Spice Level', description: 'Different heat levels' }
                ]
            },
            {
                name: 'Condiments & Sauces',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Ketchup', 'Mustard', 'Mayonnaise', 'Hot Sauce', 'Soy Sauce'] },
                    { name: 'Flavor', type: 'text' },
                    { name: 'Volume', type: 'text' },
                    { name: 'Spice Level', type: 'dropdown', options: ['Mild', 'Medium', 'Hot'] },
                ],
                variantAttributes: [
                    { name: 'Flavor', description: 'Available flavor variants' },
                    { name: 'Volume', description: 'Available size options' },
                    { name: 'Spice Level', description: 'Different heat levels' }
                ]
            },
            {
                name: 'Bakery Items',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Bread', 'Cakes', 'Cookies', 'Pastries'] },
                    { name: 'Flavor', type: 'text' },
                    { name: 'Weight', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Flavor', description: 'Available flavor variants' },
                    { name: 'Weight', description: 'Available size options' },
                    { name: 'Type', description: 'Different bakery product categories' }
                ]
            },
            {
                name: 'Dairy Products',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Milk', 'Cheese', 'Yogurt', 'Butter'] },
                    { name: 'Fat Content', type: 'text' },
                    { name: 'Volume', type: 'text' },
                ],
                variantAttributes: [
                    { name: 'Fat Content', description: 'Different fat percentage options' },
                    { name: 'Volume', description: 'Available size options' },
                    { name: 'Flavor', description: 'Available flavor variants' }
                ]
            }
        ]
    },
    {
        name: 'Pet Supplies',
        subcategories: [
            {
                name: 'Dog Food & Care',
                fields: [
                    { name: 'Food Type', type: 'dropdown', options: ['Dry', 'Wet', 'Treats', 'Grain-Free'] },
                    { name: 'Weight', type: 'text' },
                    { name: 'Breed Size', type: 'dropdown', options: ['Small', 'Medium', 'Large'] },
                    { name: 'Age Group', type: 'dropdown', options: ['Puppy', 'Adult', 'Senior'] }
                ],
                variantAttributes: [
                    { name: 'Breed Size', description: 'Size-specific formulations' },
                    { name: 'Age Group', description: 'Life stage nutrition' },
                    { name: 'Flavor', description: 'Available flavor options' }
                ]
            },
            {
                name: 'Cat Food & Care',
                fields: [
                    { name: 'Food Type', type: 'dropdown', options: ['Dry', 'Wet', 'Treats'] },
                    { name: 'Weight', type: 'text' },
                    { name: 'Age Group', type: 'dropdown', options: ['Kitten', 'Adult', 'Senior'] }
                ],
                variantAttributes: [
                    { name: 'Age Group', description: 'Life stage nutrition' },
                    { name: 'Flavor', description: 'Available flavor options' },
                    { name: 'Food Type', description: 'Different food formats' }
                ]
            },
            {
                name: 'Pet Toys',
                fields: [
                    { name: 'Animal Type', type: 'dropdown', options: ['Dog', 'Cat', 'Bird', 'Small Pet'] },
                    { name: 'Toy Type', type: 'text' },
                    { name: 'Material', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Animal Type', description: 'Species-specific toys' },
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' }
                ]
            },
            {
                name: 'Health & Grooming',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Shampoo', 'Conditioner', 'Supplements', 'Dental Care', 'Skin Care'] },
                    { name: 'Animal Type', type: 'dropdown', options: ['Dog', 'Cat', 'Other'] },
                    { name: 'Volume/Weight', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Animal Type', description: 'Species-specific formulations' },
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Fragrance', description: 'Available scent variants' }
                ]
            },
            {
                name: 'Pet Accessories',
                fields: [
                    { name: 'Accessory Type', type: 'dropdown', options: ['Collar', 'Leash', 'Harness', 'Clothing', 'Bedding'] },
                    { name: 'Size', type: 'text' },
                    { name: 'Material', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Material', description: 'Available material options' }
                ]
            },
            {
                name: 'Aquarium Supplies',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Fish Food', 'Filters', 'Tanks', 'Heaters', 'Decorations'] },
                    { name: 'Volume/Size', type: 'text' },
                    { name: 'Water Type', type: 'dropdown', options: ['Freshwater', 'Saltwater'] }
                ],
                variantAttributes: [
                    { name: 'Water Type', description: 'Freshwater or saltwater variants' },
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' }
                ]
            },
            {
                name: 'Bird Supplies',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Food', 'Cage', 'Toys', 'Perches', 'Nesting'] },
                    { name: 'Bird Type', type: 'dropdown', options: ['Parrot', 'Budgie', 'Canary', 'Finch', 'Cockatiel'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Size', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Bird Type', description: 'Species-specific products' },
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' }
                ]
            }
        ]
    },
    {
        name: 'Office Supplies',
        subcategories: [
            {
                name: 'Office Stationery',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Pens', 'Notebooks', 'Markers', 'Staplers', 'Glue'] },
                    { name: 'Pack Size', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Pack Size', description: 'Available quantity options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Product Type', description: 'Different stationery categories' }
                ]
            },
            {
                name: 'Office Furniture',
                fields: [
                    { name: 'Furniture Type', type: 'dropdown', options: ['Chairs', 'Desks', 'Cabinets', 'Tables'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Dimensions', type: 'text' },
                    { name: 'Color', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Material', description: 'Available material variants' },
                    { name: 'Size', description: 'Available size configurations' }
                ]
            },
            {
                name: 'Filing Products',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Files', 'Folders', 'Binders'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Size', type: 'dropdown', options: ['A4', 'Letter', 'Legal'] }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Capacity', description: 'Different storage capacities' }
                ]
            },
            {
                name: 'Organizers',
                fields: [
                    { name: 'Organizer Type', type: 'dropdown', options: ['Desk Organizer', 'Drawer Organizer', 'Cable Organizer'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Dimensions', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Material', description: 'Available material variants' },
                    { name: 'Compartments', description: 'Different compartment configurations' }
                ]
            },
            {
                name: 'Presentation Supplies',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Whiteboards', 'Markers', 'Projectors', 'Flip Charts'] },
                    { name: 'Size/Dimensions', type: 'text' },
                    { name: 'Material', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Size/Dimensions', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Mounting Type', description: 'Wall-mounted or freestanding options' }
                ]
            }
        ]
    },
    {
        name: 'Tools & Hardware',
        subcategories: [
            {
                name: 'Power Tools',
                fields: [
                    { name: 'Tool Type', type: 'dropdown', options: ['Drill Machine', 'Angle Grinder', 'Heat Gun', 'Jigsaw', 'Screwdriver'] },
                    { name: 'Power Source', type: 'dropdown', options: ['Corded', 'Cordless'] },
                    { name: 'Voltage', type: 'text', unit: 'V' },
                    { name: 'Wattage', type: 'text', unit: 'W' },
                    { name: 'Speed Settings', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Power Source', description: 'Corded or cordless options' },
                    { name: 'Voltage', description: 'Available power ratings' },
                    { name: 'Accessories', description: 'Included accessory kits' }
                ]
            },
            {
                name: 'Hand Tools',
                fields: [
                    { name: 'Tool Type', type: 'dropdown', options: ['Hammer', 'Wrench', 'Screwdriver Set', 'Pliers', 'Measuring Tape'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Weight', type: 'text', unit: 'kg' }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Material', description: 'Available material variants' },
                    { name: 'Set Configuration', description: 'Individual or set options' }
                ]
            },
            {
                name: 'Safety Equipment',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Safety Helmet', 'Gloves', 'Safety Goggles', 'Safety Shoes', 'Ear Protection'] },
                    { name: 'Size', type: 'dropdown', options: ['S', 'M', 'L', 'XL'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Compliance Standard', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available size options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Safety Rating', description: 'Different protection levels' }
                ]
            },
            {
                name: 'Plumbing',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Pipes', 'Fittings', 'Taps', 'Valves', 'Connectors'] },
                    { name: 'Material', type: 'dropdown', options: ['PVC', 'CPVC', 'Brass', 'Stainless Steel'] },
                    { name: 'Size', type: 'text' },
                    { name: 'Length', type: 'text', unit: 'ft' }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available diameter options' },
                    { name: 'Material', description: 'Available material variants' },
                    { name: 'Connection Type', description: 'Different fitting configurations' }
                ]
            },
            {
                name: 'Electrical Supplies',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Switches', 'Sockets', 'Wires', 'MCB', 'Extension Boards'] },
                    { name: 'Current Rating', type: 'text', unit: 'A' },
                    { name: 'Voltage', type: 'text', unit: 'V' },
                    { name: 'Material', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Current Rating', description: 'Available amperage options' },
                    { name: 'Color', description: 'Available color variants' },
                    { name: 'Mounting Type', description: 'Surface or flush mount options' }
                ]
            },
            {
                name: 'Building Materials',
                fields: [
                    { name: 'Material Type', type: 'dropdown', options: ['Cement', 'Bricks', 'Steel', 'Paint', 'Tiles'] },
                    { name: 'Grade/Specification', type: 'text' },
                    { name: 'Weight', type: 'text', unit: 'kg' },
                    { name: 'Color', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Grade/Specification', description: 'Different quality grades' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Pack Size', description: 'Available quantity options' }
                ]
            }
        ]
    },
    {
        name: 'Jewelry & Accessories',
        subcategories: [
            {
                name: 'Necklaces',
                fields: [
                    { name: 'Material', type: 'dropdown', options: ['Gold', 'Silver', 'Platinum', 'Artificial'] },
                    { name: 'Length', type: 'text', unit: 'inches' },
                    { name: 'Occasion', type: 'dropdown', options: ['Casual', 'Wedding', 'Party', 'Daily'] },
                    { name: 'Gender', type: 'dropdown', options: ['Women', 'Men', 'Unisex'] }
                ],
                variantAttributes: [
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Length', description: 'Available chain lengths' },
                    { name: 'Pendant Style', description: 'Different pendant designs' }
                ]
            },
            {
                name: 'Earrings',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Studs', 'Hoops', 'Jhumkas', 'Drops'] },
                    { name: 'Material', type: 'dropdown', options: ['Gold', 'Silver', 'Platinum', 'Artificial'] },
                    { name: 'Occasion', type: 'dropdown', options: ['Casual', 'Wedding', 'Party', 'Daily'] },
                    { name: 'Closure Type', type: 'dropdown', options: ['Push Back', 'Screw Back', 'Clip On'] }
                ],
                variantAttributes: [
                    { name: 'Type', description: 'Different earring styles' },
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Stone Type', description: 'Gemstone/diamond variants' }
                ]
            },
            {
                name: 'Bracelets',
                fields: [
                    { name: 'Material', type: 'dropdown', options: ['Gold', 'Silver', 'Leather', 'Beads'] },
                    { name: 'Size', type: 'text', unit: 'cm' },
                    { name: 'Gender', type: 'dropdown', options: ['Men', 'Women', 'Unisex'] },
                    { name: 'Clasp Type', type: 'dropdown', options: ['Toggle', 'Lobster', 'Magnetic'] }
                ],
                variantAttributes: [
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Size', description: 'Available circumference sizes' },
                    { name: 'Design', description: 'Different pattern variants' }
                ]
            },
            {
                name: 'Rings',
                fields: [
                    { name: 'Material', type: 'dropdown', options: ['Gold', 'Silver', 'Platinum', 'Artificial'] },
                    { name: 'Size', type: 'text', unit: 'US Size' },
                    { name: 'Style', type: 'dropdown', options: ['Engagement', 'Wedding', 'Casual', 'Statement'] },
                    { name: 'Stone Type', type: 'dropdown', options: ['Diamond', 'CZ', 'None', 'Gemstone'] }
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available ring sizes' },
                    { name: 'Material', description: 'Available metal types' },
                    { name: 'Stone Type', description: 'Gemstone/diamond options' }
                ]
            },
            {
                name: 'Hair Accessories',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Clips', 'Bands', 'Headbands', 'Scrunchies'] },
                    { name: 'Material', type: 'dropdown', options: ['Plastic', 'Metal', 'Fabric'] },
                    { name: 'Color', type: 'text' }
                ],
                variantAttributes: [
                    { name: 'Type', description: 'Different accessory styles' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Material', description: 'Available material variants' }
                ]
            },
            {
                name: 'Brooches & Pins',
                fields: [
                    { name: 'Design Type', type: 'dropdown', options: ['Floral', 'Animal', 'Geometric', 'Traditional'] },
                    { name: 'Material', type: 'dropdown', options: ['Metal', 'Alloy', 'Artificial'] },
                    { name: 'Occasion', type: 'dropdown', options: ['Formal', 'Festive', 'Casual'] }
                ],
                variantAttributes: [
                    { name: 'Design Type', description: 'Different design themes' },
                    { name: 'Material', description: 'Available material options' },
                    { name: 'Color', description: 'Available color variants' }
                ]
            },
            {
                name: 'Premium Watches',
                fields: [
                    { name: 'Watch Type', type: 'dropdown', options: ['Analog', 'Digital', 'Chronograph'] },
                    { name: 'Strap Material', type: 'dropdown', options: ['Leather', 'Stainless Steel', 'Silicone'] },
                    { name: 'Dial Size', type: 'text', unit: 'mm' },
                    { name: 'Water Resistant', type: 'dropdown', options: ['Yes', 'No'] }
                ],
                variantAttributes: [
                    { name: 'Strap Material', description: 'Available strap options' },
                    { name: 'Dial Color', description: 'Available dial colors' },
                    { name: 'Watch Type', description: 'Different watch styles' }
                ]
            }
        ]
    },
    {
        name: 'Footwear',
        subcategories: [
            {
                name: "Men's Footwear",
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['6', '7', '8', '9', '10', '11'] },
                    { name: 'Color', type: 'dropdown', options: ['Black', 'Brown', 'White', 'Blue', 'Grey'] },
                    { name: 'Material', type: 'dropdown', options: ['Leather', 'Synthetic', 'Canvas'] },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available shoe sizes' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Width', description: 'Different width fittings' }
                ]
            },
            {
                name: "Women's Footwear",
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['4', '5', '6', '7', '8', '9'] },
                    { name: 'Color', type: 'dropdown', options: ['Black', 'Red', 'Beige', 'Pink', 'Blue'] },
                    { name: 'Heel Height', type: 'text', unit: 'inches' },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available shoe sizes' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Heel Height', description: 'Different heel height variants' }
                ]
            },
            {
                name: "Kids' Footwear",
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['1', '2', '3', '4', '5'] },
                    { name: 'Color', type: 'dropdown', options: ['Blue', 'Pink', 'Green', 'Yellow'] },
                    { name: 'Closure Type', type: 'dropdown', options: ['Velcro', 'Lace-Up', 'Slip-On'] },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available kids sizes' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Closure Type', description: 'Different fastening methods' }
                ]
            },
            {
                name: 'Sports Shoes',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['6', '7', '8', '9', '10', '11'] },
                    { name: 'Color', type: 'dropdown', options: ['Black', 'Red', 'Blue', 'Grey'] },
                    { name: 'Sport Type', type: 'dropdown', options: ['Running', 'Training', 'Walking'] },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available shoe sizes' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Sport Type', description: 'Activity-specific designs' }
                ]
            },
            {
                name: 'Sandals & Flip Flops',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['6', '7', '8', '9', '10'] },
                    { name: 'Color', type: 'dropdown', options: ['Brown', 'Black', 'Blue'] },
                    { name: 'Material', type: 'dropdown', options: ['Rubber', 'Leather', 'Synthetic'] },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available shoe sizes' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Material', description: 'Available material variants' }
                ]
            },
            {
                name: 'Formal Shoes',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['6', '7', '8', '9', '10', '11'] },
                    { name: 'Color', type: 'dropdown', options: ['Black', 'Brown', 'Tan'] },
                    { name: 'Toe Style', type: 'dropdown', options: ['Pointed', 'Round', 'Square'] },
                ],
                variantAttributes: [
                    { name: 'Size', description: 'Available shoe sizes' },
                    { name: 'Color', description: 'Available color options' },
                    { name: 'Toe Style', description: 'Different toe shape variants' }
                ]
            }
        ]
    }
]

export const getFieldsForSubcategory = (category, subcategory) => {
    const categoryObj = Subcategories.find(c => c.name === category);
    if (!categoryObj) return [];

    const subcategoryObj = categoryObj.subcategories.find(s =>
        typeof s === 'object' ? s.name === subcategory : s === subcategory
    );

    return (typeof subcategoryObj === 'object' && subcategoryObj.fields) || [];
};

export function getVariantAttributesForSubcategory(category, subcategory) {
    const categoryGroup = Subcategories.find(item => item.name === category);
    if (!categoryGroup) return [];

    const sub = categoryGroup.subcategories?.find(
        s => (typeof s === 'string' ? s : s.name) === subcategory
    );

    if (!sub) return [];

    return (typeof sub === 'object' && sub.variantAttributes) || [];
}