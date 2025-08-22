import { Category, Product, Seller, PaymentOption, Order, OrderStatus, DeliveryAgent } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    icon: 'ri-smartphone-line',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
    description: 'Discover the latest electronics, from smartphones and laptops to home entertainment systems.',
    subCategories: [
      {
        _id: '1-1',
        name: 'Smartphones',
        slug: 'smartphones',
        categoryId: '1',
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1829&auto=format&fit=crop',
        featured: true
      },
      {
        id: '1-2',
        name: 'Laptops',
        slug: 'laptops',
        categoryId: '1',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop',
        featured: true
      },
      {
        id: '1-3',
        name: 'Audio & Headphones',
        slug: 'audio-headphones',
        categoryId: '1',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
        featured: true
      },
      {
        id: '1-4',
        name: 'Cameras',
        slug: 'cameras',
        categoryId: '1',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop'
      },
      {
        id: '1-5',
        name: 'Tablets',
        slug: 'tablets',
        categoryId: '1',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1964&auto=format&fit=crop'
      },
      {
        id: '1-6',
        name: 'Computer Accessories',
        slug: 'computer-accessories',
        categoryId: '1',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1965&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '2',
    name: 'Fashion',
    icon: 'ri-t-shirt-line',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    description: 'Stay on trend with the latest fashion styles for men, women, and children.',
    subCategories: [
      {
        id: '2-1',
        name: 'Women\'s Clothing',
        slug: 'womens-clothing',
        categoryId: '2',
        image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop',
        featured: true
      },
      {
        id: '2-2',
        name: 'Men\'s Clothing',
        slug: 'mens-clothing',
        categoryId: '2',
        image: 'https://images.unsplash.com/photo-1503341733017-1901578f9f1e?q=80&w=1887&auto=format&fit=crop',
        featured: true
      },
      {
        id: '2-3',
        name: 'Footwear',
        slug: 'footwear',
        categoryId: '2',
        image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=2070&auto=format&fit=crop',
        featured: true
      },
      {
        id: '2-4',
        name: 'Accessories',
        slug: 'accessories',
        categoryId: '2',
        image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: '2-5',
        name: 'Traditional Wear',
        slug: 'traditional-wear',
        categoryId: '2',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842259?q=80&w=1964&auto=format&fit=crop'
      },
      {
        id: '2-6',
        name: 'Children\'s Clothing',
        slug: 'childrens-clothing',
        categoryId: '2',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1887&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '3',
    name: 'Grocery',
    icon: 'ri-shopping-basket-line',
    slug: 'grocery',
    image: 'https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2070&auto=format&fit=crop',
    description: 'Fresh produce, pantry essentials, and specialty foods delivered to your door.',
    subCategories: [
      {
        id: '3-1',
        name: 'Fresh Produce',
        slug: 'fresh-produce',
        categoryId: '3',
        image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop',
        featured: true
      },
      {
        id: '3-2',
        name: 'Grains & Rice',
        slug: 'grains-rice',
        categoryId: '3',
        image: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2069&auto=format&fit=crop',
        featured: true
      },
      {
        id: '3-3',
        name: 'Beverages',
        slug: 'beverages',
        categoryId: '3',
        image: 'https://images.unsplash.com/photo-1496318447583-f524534e9ce1?q=80&w=2134&auto=format&fit=crop'
      },
      {
        id: '3-4',
        name: 'Snacks',
        slug: 'snacks',
        categoryId: '3',
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: '3-5',
        name: 'Canned Goods',
        slug: 'canned-goods',
        categoryId: '3',
        image: 'https://images.unsplash.com/photo-1597517697297-7cc4b349ce06?q=80&w=1778&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '4',
    name: 'Home & Kitchen',
    icon: 'ri-home-line',
    slug: 'home-kitchen',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    description: 'Everything you need for your home, from furniture to kitchen appliances.',
    subCategories: [
      {
        id: '4-1',
        name: 'Kitchen Appliances',
        slug: 'kitchen-appliances',
        categoryId: '4',
        image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1974&auto=format&fit=crop',
        featured: true
      },
      {
        id: '4-2',
        name: 'Furniture',
        slug: 'furniture',
        categoryId: '4',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop',
        featured: true
      },
      {
        id: '4-3',
        name: 'Bedding & Linens',
        slug: 'bedding-linens',
        categoryId: '4',
        image: 'https://images.unsplash.com/photo-1617325710236-4a36d46427a5?q=80&w=1964&auto=format&fit=crop'
      },
      {
        id: '4-4',
        name: 'Home Decor',
        slug: 'home-decor',
        categoryId: '4',
        image: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?q=80&w=1888&auto=format&fit=crop'
      },
      {
        id: '4-5',
        name: 'Storage & Organization',
        slug: 'storage-organization',
        categoryId: '4',
        image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1965&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '5',
    name: 'Beauty',
    icon: 'ri-hearts-line',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070&auto=format&fit=crop',
    description: 'Enhance your natural beauty with our range of makeup, skincare, and hair products.',
    subCategories: [
      {
        id: '5-1',
        name: 'Skincare',
        slug: 'skincare',
        categoryId: '5',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop',
        featured: true
      },
      {
        id: '5-2',
        name: 'Makeup',
        slug: 'makeup',
        categoryId: '5',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1965&auto=format&fit=crop',
        featured: true
      },
      {
        id: '5-3',
        name: 'Hair Care',
        slug: 'hair-care',
        categoryId: '5',
        image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=2071&auto=format&fit=crop'
      },
      {
        id: '5-4',
        name: 'Fragrances',
        slug: 'fragrances',
        categoryId: '5',
        image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: '5-5',
        name: 'Natural & Organic',
        slug: 'natural-organic',
        categoryId: '5',
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1982&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '6',
    name: 'Sports',
    icon: 'ri-football-line',
    slug: 'sports',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop',
    description: 'Everything for your active lifestyle, from workout gear to sports equipment.',
    subCategories: [
      {
        id: '6-1',
        name: 'Fitness Equipment',
        slug: 'fitness-equipment',
        categoryId: '6',
        image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop',
        featured: true
      },
      {
        id: '6-2',
        name: 'Sportswear',
        slug: 'sportswear',
        categoryId: '6',
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop',
        featured: true
      },
      {
        id: '6-3',
        name: 'Football',
        slug: 'football',
        categoryId: '6',
        image: 'https://images.unsplash.com/photo-1626248801379-51a0748e0005?q=80&w=1978&auto=format&fit=crop',
        featured: true
      },
      {
        id: '6-4',
        name: 'Outdoor & Adventure',
        slug: 'outdoor-adventure',
        categoryId: '6',
        image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: '6-5',
        name: 'Team Sports',
        slug: 'team-sports',
        categoryId: '6',
        image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2007&auto=format&fit=crop'
      }
    ]
  }
];

export const sellers: Seller[] = [
  {
    id: '1',
    name: 'Accra Tech',
    description: 'Premier electronics store with the latest gadgets and accessories. Fast delivery in Accra.',
    logo: '',
    initials: 'AT',
    bgColor: 'bg-primary',
    rating: 4.8,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Kumasi Fashion',
    description: 'Traditional and modern fashion items. Specializing in kente and African prints.',
    logo: '',
    initials: 'KF',
    bgColor: 'bg-accent',
    rating: 4.9,
    category: 'Fashion'
  },
  {
    id: '3',
    name: 'Takoradi Foods',
    description: 'Fresh local produce and imported groceries. Same-day delivery for fresh items.',
    logo: '',
    initials: 'TF',
    bgColor: 'bg-secondary',
    rating: 4.7,
    category: 'Grocery'
  },
  {
    id: '4',
    name: 'Tema Home',
    description: 'Quality home and kitchen products at affordable prices. Free assembly for furniture.',
    logo: '',
    initials: 'TH',
    bgColor: 'bg-primary',
    rating: 4.6,
    category: 'Home & Kitchen'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S21 Ultra - 256GB',
    slug: 'samsung-galaxy-s21-ultra-256gb',
    description: 'Experience the power of Samsung\'s flagship smartphone with an incredible camera system, stunning 6.8" Dynamic AMOLED display, and powerful performance. This Phantom Black model comes with 256GB storage and 12GB RAM for seamless multitasking.',
    price: 3999,
    discountPrice: 3599,
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[0],
    seller: sellers[0],
    rating: 4.7,
    reviews: 120,
    stock: 15,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '9',
    name: 'Apple iPhone 14 Pro - 128GB',
    slug: 'apple-iphone-14-pro-128gb',
    description: 'The latest iPhone featuring Dynamic Island, 48MP camera system, and A16 Bionic chip.',
    price: 4999,
    discountPrice: 4799,
    images: ['https://images.unsplash.com/photo-1678652197831-2d180705cd2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[0],
    seller: sellers[0],
    rating: 4.9,
    reviews: 85,
    stock: 10,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '10',
    name: 'African Print Maxi Dress',
    slug: 'african-print-maxi-dress',
    description: 'Beautiful handmade maxi dress featuring vibrant African prints and modern design.',
    price: 299,
    discountPrice: 249,
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[1],
    seller: sellers[1],
    rating: 4.8,
    reviews: 45,
    stock: 20,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '11',
    name: 'Organic Red Quinoa - 1kg',
    slug: 'organic-red-quinoa-1kg',
    description: 'Premium organic red quinoa, rich in protein and nutrients.',
    price: 45,
    discountPrice: undefined,
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[2],
    seller: sellers[2],
    rating: 4.6,
    reviews: 28,
    stock: 100,
    featured: false,
    _id: '',
    data: undefined
  },
  {
    id: '12',
    name: 'Modern Pendant Light',
    slug: 'modern-pendant-light',
    description: 'Contemporary pendant light with adjustable height, perfect for dining rooms and living spaces.',
    price: 199,
    discountPrice: 169,
    images: ['https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[3],
    seller: sellers[3],
    rating: 4.7,
    reviews: 32,
    stock: 15,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '13',
    name: 'Sony WH-1000XM4 Headphones',
    slug: 'sony-wh-1000xm4-headphones',
    description: 'Industry-leading noise canceling wireless headphones with premium sound quality.',
    price: 1499,
    discountPrice: 1299,
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[0],
    seller: sellers[0],
    rating: 4.9,
    reviews: 156,
    stock: 25,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '14',
    name: 'Traditional Kente Scarf',
    slug: 'traditional-kente-scarf',
    description: 'Handwoven Kente scarf with traditional Ghanaian patterns.',
    price: 199,
    discountPrice: 179,
    images: ['https://images.unsplash.com/photo-1590735213920-68192a487bc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[1],
    seller: sellers[1],
    rating: 4.8,
    reviews: 42,
    stock: 30,
    featured: false,
    _id: '',
    data: undefined
  },
  {
    id: '15',
    name: 'Organic Shea Butter - 500g',
    slug: 'organic-shea-butter-500g',
    description: 'Pure, unrefined shea butter sourced from northern Ghana.',
    price: 49,
    discountPrice: 39,
    images: ['https://images.unsplash.com/photo-1575510232147-901d12644a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[4],
    seller: sellers[2],
    rating: 4.7,
    reviews: 89,
    stock: 100,
    featured: false,
    _id: '',
    data: undefined
  },
  {
    id: '16',
    name: 'Smart LED TV - 55"',
    slug: 'smart-led-tv-55-inch',
    description: '4K Ultra HD Smart LED TV with HDR and built-in streaming apps.',
    price: 2999,
    discountPrice: 2799,
    images: ['https://images.unsplash.com/photo-1593784991095-a205069533cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[0],
    seller: sellers[0],
    rating: 4.6,
    reviews: 67,
    stock: 10,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '17',
    name: 'Premium Coffee Maker',
    slug: 'premium-coffee-maker',
    description: 'Programmable coffee maker with thermal carafe and auto-brew function.',
    price: 399,
    discountPrice: 349,
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[3],
    seller: sellers[3],
    rating: 4.5,
    reviews: 34,
    stock: 20,
    featured: false,
    _id: '',
    data: undefined
  },
  {
    id: '18',
    name: 'African Print Tote Bag',
    slug: 'african-print-tote-bag',
    description: 'Stylish tote bag made with authentic African print fabric.',
    price: 79,
    discountPrice: 69,
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[1],
    seller: sellers[1],
    rating: 4.7,
    reviews: 28,
    stock: 45,
    featured: false,
    _id: '',
    data: undefined
  },
  {
    id: '19',
    name: 'Gaming Laptop',
    slug: 'gaming-laptop',
    description: 'High-performance gaming laptop with RTX graphics and 144Hz display.',
    price: 5999,
    discountPrice: 5499,
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[0],
    seller: sellers[0],
    rating: 4.8,
    reviews: 92,
    stock: 8,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '20',
    name: 'Spice Gift Set',
    slug: 'spice-gift-set',
    description: 'Collection of premium African spices in an elegant gift box.',
    price: 89,
    discountPrice: 79,
    images: ['https://images.unsplash.com/photo-1596547609652-9cf9ef0f5a81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[2],
    seller: sellers[2],
    rating: 4.9,
    reviews: 56,
    stock: 40,
    featured: false,
    _id: '',
    data: undefined
  },
  {
    id: '21',
    name: 'Smart Watch',
    slug: 'smart-watch',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
    price: 499,
    discountPrice: 449,
    images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[0],
    seller: sellers[0],
    rating: 4.6,
    reviews: 78,
    stock: 30,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '22',
    name: 'Traditional Sandals',
    slug: 'traditional-sandals',
    description: 'Handcrafted leather sandals with traditional Ghanaian design.',
    price: 89,
    discountPrice: 79,
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[1],
    seller: sellers[1],
    rating: 4.7,
    reviews: 45,
    stock: 25,
    featured: false,
    _id: '',
    data: undefined
  },
  {
    id: '23',
    name: 'Bamboo Dining Set',
    slug: 'bamboo-dining-set',
    description: 'Eco-friendly bamboo dining set including plates, bowls, and cutlery.',
    price: 159,
    discountPrice: 139,
    images: ['https://images.unsplash.com/photo-1549897411-b677d1c5d224?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[3],
    seller: sellers[3],
    rating: 4.5,
    reviews: 23,
    stock: 35,
    featured: false,
    _id: '',
    data: undefined
  },
  {
    id: '24',
    name: 'Natural Hair Care Kit',
    slug: 'natural-hair-care-kit',
    description: 'Complete hair care set with natural and organic ingredients.',
    price: 129,
    discountPrice: 109,
    images: ['https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[4],
    seller: sellers[2],
    rating: 4.8,
    reviews: 67,
    stock: 50,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '25',
    name: 'Wireless Gaming Mouse',
    slug: 'wireless-gaming-mouse',
    description: 'High-precision wireless gaming mouse with RGB lighting.',
    price: 199,
    discountPrice: 179,
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[0],
    seller: sellers[0],
    rating: 4.7,
    reviews: 89,
    stock: 40,
    featured: false,
    _id: '',
    data: undefined
  },
  {
    id: '26',
    name: 'Premium Yoga Mat',
    slug: 'premium-yoga-mat',
    description: 'Non-slip yoga mat made from eco-friendly materials.',
    price: 89,
    discountPrice: 79,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf4b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[5],
    seller: sellers[3],
    rating: 4.6,
    reviews: 34,
    stock: 60,
    featured: false,
    _id: '',
    data: undefined
  },
  {
    id: '27',
    name: 'African Art Canvas',
    slug: 'african-art-canvas',
    description: 'Hand-painted canvas featuring traditional African art motifs.',
    price: 299,
    discountPrice: 259,
    images: ['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[3],
    seller: sellers[1],
    rating: 4.9,
    reviews: 28,
    stock: 15,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '2',
    name: 'MacBook Pro 13" M2 - 512GB SSD',
    slug: 'macbook-pro-13-m2-512gb-ssd',
    description: 'The new MacBook Pro delivers game-changing performance with the M2 chip, up to 20 hours of battery life, and a stunning Retina display. Perfect for professionals and creators who need power on the go.',
    price: 13299,
    discountPrice: 12499,
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[0],
    seller: sellers[0],
    rating: 4.8,
    reviews: 83,
    stock: 7,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '3',
    name: 'Premium Kente Cloth - Handwoven',
    slug: 'premium-kente-cloth-handwoven',
    description: 'Authentic handwoven Kente cloth made by master craftsmen in Ghana. Each piece represents Ghanaian heritage and tradition with intricate patterns and vibrant colors. Perfect for special occasions and celebrations.',
    price: 1299,
    discountPrice: 899,
    images: ['https://pixabay.com/get/g96f30aab043d72aee09ba3a2c475f4a0abb264a30eee6406dfb11b7de30934ecfe9fb8455de1daa960b705d736efe519a06e21a43ef9ea84c122eb97c64dd13d_1280.jpg'],
    category: categories[1],
    seller: sellers[1],
    rating: 5.0,
    reviews: 215,
    stock: 30,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '4',
    name: 'Nike Air Max 270 - Red/Black',
    slug: 'nike-air-max-270-red-black',
    description: 'The Nike Air Max 270 delivers visible air and unbelievable comfort with large window and fresh array of colors. The shoe features a breathable knit upper, dual-density foam sole, and iconic Air Max styling.',
    price: 899,
    discountPrice: 749,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[1],
    seller: sellers[1],
    rating: 4.5,
    reviews: 98,
    stock: 12,
    featured: true,
    _id: '',
    data: undefined
  },
  {
    id: '5',
    name: 'Fresh Pineapple Bundle (3 Pack)',
    slug: 'fresh-pineapple-bundle-3-pack',
    description: 'Sweet, juicy pineapples straight from Ghana\'s fertile farms. Perfect for smoothies, salads, or enjoying fresh. Each pack contains 3 medium-sized pineapples at peak ripeness.',
    price: 45,
    discountPrice: 35,
    images: ['https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[2],
    seller: sellers[2],
    rating: 4.6,
    reviews: 74,
    stock: 50,
    _id: '',
    data: undefined
  },
  {
    id: '6',
    name: 'Jollof Rice Spice Mix',
    slug: 'jollof-rice-spice-mix',
    description: 'Authentic Ghanaian Jollof Rice spice blend that delivers the perfect flavor every time. Just add rice, tomatoes, and your choice of protein for a delicious meal.',
    price: 15,
    discountPrice: 12,
    images: ['https://images.unsplash.com/photo-1567021093385-45c8ee97f428?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[2],
    seller: sellers[2],
    rating: 4.9,
    reviews: 182,
    stock: 200,
    _id: '',
    data: undefined
  },
  {
    id: '7',
    name: 'Modern Wooden Coffee Table',
    slug: 'modern-wooden-coffee-table',
    description: 'Elegant coffee table crafted from sustainable Ghanaian wood. Features a sleek minimalist design with natural grain patterns that make each piece unique.',
    price: 699,
    discountPrice: 599,
    images: ['https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[3],
    seller: sellers[3],
    rating: 4.7,
    reviews: 43,
    stock: 8,
    _id: '',
    data: undefined
  },
  {
    id: '8',
    name: 'Stainless Steel Cookware Set (10 Piece)',
    slug: 'stainless-steel-cookware-set-10-piece',
    description: 'Complete your kitchen with this premium stainless steel cookware set including pots, pans, and utensils. Durable, easy to clean, and works with all cooktop types.',
    price: 499,
    discountPrice: 399,
    images: ['https://images.unsplash.com/photo-1588868478435-8a60486c2b7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'],
    category: categories[3],
    seller: sellers[3],
    rating: 4.5,
    reviews: 67,
    stock: 15,
    _id: '',
    data: undefined
  }
];

export const paymentOptions: PaymentOption[] = [
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    icon: 'MTN',
    color: 'bg-[#FFCC00]',
    description: 'Fast & secure payments'
  },
  {
    id: 'vodafone',
    name: 'Vodafone Cash',
    icon: 'Vodafone',
    color: 'bg-[#E60000]',
    description: 'Easy mobile payments'
  },
  {
    id: 'airteltigo',
    name: 'AirtelTigo Money',
    icon: 'AirtelTigo',
    color: 'bg-[#0071BC]',
    description: 'Convenient transfers'
  },
  {
    id: 'cash-on-delivery',
    name: 'Cash on Delivery',
    icon: 'ri-money-dollar-circle-line',
    color: 'bg-[#4CAF50]',
    description: 'Pay when you receive'
  }
];

export const deliveryAgents: DeliveryAgent[] = [
  {
    id: '1',
    name: 'Kwame Asante',
    avatar: 'https://i.pravatar.cc/150?img=11',
    phone: '+233 24 123 4567',
    rating: 4.9,
    reviews: 245,
    currentLocation: {
      lat: 5.6037,
      lng: -0.1870
    }
  },
  {
    id: '2',
    name: 'Abena Mensah',
    avatar: 'https://i.pravatar.cc/150?img=10',
    phone: '+233 25 987 6543',
    rating: 4.8,
    reviews: 187,
    currentLocation: {
      lat: 5.6142,
      lng: -0.2051
    }
  },
  {
    id: '3',
    name: 'David Owusu',
    avatar: 'https://i.pravatar.cc/150?img=12',
    phone: '+233 20 345 6789',
    rating: 4.7,
    reviews: 154,
    currentLocation: {
      lat: 5.5855,
      lng: -0.1823
    }
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-12345',
    items: [
      {
        product: products[0],
        quantity: 1
      },
      {
        product: products[1],
        quantity: 1
      }
    ],
    status: 'en-route',
    date: '2023-07-15T10:30:00',
    deliveryAddress: '123 Independence Ave, Accra, Ghana',
    paymentMethod: 'mtn',
    total: 16098,
    deliveryFee: 25,
    tracking: {
      orderId: 'ORD-12345',
      deliveryAgent: deliveryAgents[0],
      estimatedArrival: '2023-07-15T14:30:00',
      currentLocation: {
        lat: 5.6037,
        lng: -0.1870
      },
      statusUpdates: [
        {
          status: 'pending',
          timestamp: '2023-07-15T10:32:00',
          note: 'Order placed'
        },
        {
          status: 'confirmed',
          timestamp: '2023-07-15T10:35:00',
          note: 'Order confirmed'
        },
        {
          status: 'processing',
          timestamp: '2023-07-15T11:15:00',
          note: 'Preparing your order'
        },
        {
          status: 'picked',
          timestamp: '2023-07-15T12:45:00',
          location: 'Accra Tech Store',
          note: 'Order picked up by delivery agent'
        },
        {
          status: 'en-route',
          timestamp: '2023-07-15T13:00:00',
          note: 'On the way to your location'
        }
      ]
    }
  },
  {
    id: 'ORD-12346',
    items: [
      {
        product: products[2],
        quantity: 2
      }
    ],
    status: 'delivered',
    date: '2023-07-10T14:15:00',
    deliveryAddress: '45 Cantonments Road, Accra, Ghana',
    paymentMethod: 'vodafone',
    total: 1798,
    deliveryFee: 25,
    tracking: {
      orderId: 'ORD-12346',
      deliveryAgent: deliveryAgents[1],
      estimatedArrival: '2023-07-10T18:30:00',
      statusUpdates: [
        {
          status: 'pending',
          timestamp: '2023-07-10T14:16:00',
          note: 'Order placed'
        },
        {
          status: 'confirmed',
          timestamp: '2023-07-10T14:20:00',
          note: 'Order confirmed'
        },
        {
          status: 'processing',
          timestamp: '2023-07-10T15:45:00',
          note: 'Preparing your order'
        },
        {
          status: 'picked',
          timestamp: '2023-07-10T16:30:00',
          location: 'Kumasi Fashion Store',
          note: 'Order picked up by delivery agent'
        },
        {
          status: 'en-route',
          timestamp: '2023-07-10T16:45:00',
          note: 'On the way to your location'
        },
        {
          status: 'delivered',
          timestamp: '2023-07-10T18:20:00',
          note: 'Order delivered successfully'
        }
      ]
    }
  }
];

export const getOrderStatusText = (status: OrderStatus): string => {
  const statusMap: Record<OrderStatus, string> = {
    'pending': 'Order Pending',
    'confirmed': 'Order Confirmed',
    'processing': 'Processing',
    'picked': 'Picked Up',
    'en-route': 'On the Way',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  };
  
  return statusMap[status];
};

export const getOrderStatusColor = (status: OrderStatus): string => {
  const colorMap: Record<OrderStatus, string> = {
    'pending': 'bg-neutral-400',
    'confirmed': 'bg-blue-500',
    'processing': 'bg-cyan-500',
    'picked': 'bg-violet-500',
    'en-route': 'bg-orange-500',
    'delivered': 'bg-green-500',
    'cancelled': 'bg-red-500'
  };
  
  return colorMap[status];
};
