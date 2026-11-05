export interface ProductVariant {
  id: string;
  weight: string;
  weightUrdu: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  nameUrdu: string;
  tagline: string;
  taglineUrdu: string;
  category: 'desi-ghee' | 'butter' | 'honey' | 'sweets';
  categoryLabel: string;
  categoryLabelUrdu: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isFlagship?: boolean;
  description: string;
  descriptionUrdu: string;
  variants: ProductVariant[];
  selectedVariantId: string;
  nutrition: {
    calories: string;
    fat: string;
    saturatedFat: string;
    protein: string;
    carbs: string;
    shelfLife: string;
  };
  highlights: string[];
  highlightsUrdu: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'khaas-cow-desi-ghee',
    name: '100% Pure Cow Desi Ghee',
    nameUrdu: '100% Pure Cow Desi Ghee',
    tagline: '100% Traditional Churned Grass-Fed Cow Ghee',
    taglineUrdu: '100% Traditional Churned Grass-Fed Cow Ghee',
    category: 'desi-ghee',
    categoryLabel: 'Desi Ghee',
    categoryLabelUrdu: 'Desi Ghee',
    image: '/src/assets/images/product_desi_ghee_1kg_1791077419482.jpg',
    rating: 4.9,
    reviewsCount: 382,
    isBestseller: true,
    isFlagship: true,
    description: 'Slow-simmered using natural whole cow milk cultured into probiotic curd and churned with traditional wooden madhani. Features a golden yellow hue, authentic granular (danedar) texture, and heavenly aroma.',
    descriptionUrdu: 'Slow-simmered using natural whole cow milk cultured into probiotic curd and churned with traditional wooden madhani. Features a golden yellow hue, authentic granular (danedar) texture, and heavenly aroma.',
    variants: [
      { id: 'cow-500g', weight: '500 Grams (500g)', weightUrdu: '500g', price: 1750, originalPrice: 2275, inStock: true },
      { id: 'cow-1kg', weight: '1 Kilogram (1 Kg)', weightUrdu: '1 Kg', price: 3200, originalPrice: 3500, inStock: true },
    ],
    selectedVariantId: 'cow-500g',
    nutrition: {
      calories: '897 kcal / 100g',
      fat: '99.8g',
      saturatedFat: '62g',
      protein: '0g',
      carbs: '0g',
      shelfLife: '12 Months at room temperature',
    },
    highlights: [
      '100% Pure Grass-Fed Cow Milk',
      'Traditional Churned from Probiotic Curd',
      'Rich in A2 Beta-Casein & Butyric Acid',
      'No Additives, Chemicals or Preservatives',
      'Zero Palm Oil or Banaspati Adulteration'
    ],
    highlightsUrdu: [
      '100% Pure Grass-Fed Cow Milk',
      'Traditional Churned from Probiotic Curd',
      'Rich in A2 Beta-Casein & Butyric Acid',
      'No Additives, Chemicals or Preservatives',
      'Zero Palm Oil or Banaspati Adulteration'
    ]
  },
  {
    id: 'khaas-buffalo-desi-ghee',
    name: '100% Pure Buffalo Desi Ghee',
    nameUrdu: '100% Pure Buffalo Desi Ghee',
    tagline: 'Rich, Creamy White & Deep Granular Aroma',
    taglineUrdu: 'Rich, Creamy White & Deep Granular Aroma',
    category: 'desi-ghee',
    categoryLabel: 'Desi Ghee',
    categoryLabelUrdu: 'Desi Ghee',
    image: '/src/assets/images/product_desi_ghee_bilona_1791077436287.jpg',
    rating: 4.8,
    reviewsCount: 247,
    isBestseller: true,
    description: 'Preferred by traditional sweet makers and Pakistani households for its intense creamy aroma and dense granular texture. Crafted from rich Punjab buffalo milk via slow simmering in clay vessels.',
    descriptionUrdu: 'Preferred by traditional sweet makers and Pakistani households for its intense creamy aroma and dense granular texture. Crafted from rich Punjab buffalo milk via slow simmering in clay vessels.',
    variants: [
      { id: 'buf-500g', weight: '500 Grams (500g)', weightUrdu: '500g', price: 1750, originalPrice: 2275, inStock: true },
      { id: 'buf-1kg', weight: '1 Kilogram (1 Kg)', weightUrdu: '1 Kg', price: 3400, originalPrice: 3700, inStock: true },
    ],
    selectedVariantId: 'buf-500g',
    nutrition: {
      calories: '902 kcal / 100g',
      fat: '99.9g',
      saturatedFat: '65g',
      protein: '0g',
      carbs: '0g',
      shelfLife: '12 Months at room temperature',
    },
    highlights: [
      'High Smoke Point (~250°C) ideal for cooking',
      'Ultra dense, authentic grain texture',
      'Naturally cultured aroma',
      'Great for Halwa, Daal Tarka & Parathas'
    ],
    highlightsUrdu: [
      'High Smoke Point (~250°C) ideal for cooking',
      'Ultra dense, authentic grain texture',
      'Naturally cultured aroma',
      'Great for Halwa, Daal Tarka & Parathas'
    ]
  },
  {
    id: 'acacia-honey',
    name: '100% Pure Acacia Honey',
    nameUrdu: '100% Pure Acacia Honey',
    tagline: '100% Raw Wild Harvested Acacia Honey',
    taglineUrdu: '100% Raw Wild Harvested Acacia Honey',
    category: 'honey',
    categoryLabel: 'Pure Honey',
    categoryLabelUrdu: 'Pure Honey',
    image: '/src/assets/images/acacia_honey_jar_1791538693507.jpg',
    rating: 4.9,
    reviewsCount: 142,
    isBestseller: true,
    description: 'Pure, unpasteurized raw Acacia honey cold-extracted from wild acacia blossoms. Known for its clear golden color, mild sweet taste, and high nutritional enzymes.',
    descriptionUrdu: 'Pure, unpasteurized raw Acacia honey cold-extracted from wild acacia blossoms. Known for its clear golden color, mild sweet taste, and high nutritional enzymes.',
    variants: [
      { id: 'acacia-500g', weight: '500 Grams (500g)', weightUrdu: '500g', price: 1200, originalPrice: 1600, inStock: true },
      { id: 'acacia-1kg', weight: '1 Kilogram (1 Kg)', weightUrdu: '1 Kg', price: 2300, originalPrice: 2900, inStock: true },
    ],
    selectedVariantId: 'acacia-500g',
    nutrition: {
      calories: '304 kcal / 100g',
      fat: '0g',
      saturatedFat: '0g',
      protein: '0.3g',
      carbs: '82g',
      shelfLife: 'Indefinite (Raw Honey does not spoil)',
    },
    highlights: [
      '100% Raw, Unfiltered & Unheated',
      'Lab Tested for Purity & Zero Sugar',
      'Rich in Natural Antioxidants'
    ],
    highlightsUrdu: [
      '100% Raw, Unfiltered & Unheated',
      'Lab Tested for Purity & Zero Sugar',
      'Rich in Natural Antioxidants'
    ]
  },
  {
    id: 'wild-bee-honey',
    name: '100% Pure Wild Honey Small Bee Export Quality',
    nameUrdu: '100% Pure Wild Honey Small Bee Export Quality',
    tagline: 'Rare Small Bee Wild Forest Honey',
    taglineUrdu: 'Rare Small Bee Wild Forest Honey',
    category: 'honey',
    categoryLabel: 'Wild Honey',
    categoryLabelUrdu: 'Wild Honey',
    image: '/src/assets/images/wild_honey_jar_1791538722767.jpg',
    rating: 5.0,
    reviewsCount: 188,
    isBestseller: true,
    description: 'Extracted from natural wild beehives of small bees in remote forests. Highly prized for its rich amber color, potent medicinal benefits, and unmatched floral aroma.',
    descriptionUrdu: 'Extracted from natural wild beehives of small bees in remote forests. Highly prized for its rich amber color, potent medicinal benefits, and unmatched floral aroma.',
    variants: [
      { id: 'wild-500g', weight: '500 Grams (500g)', weightUrdu: '500g', price: 1800, originalPrice: 2000, inStock: true },
      { id: 'wild-1kg', weight: '1 Kilogram (1 Kg)', weightUrdu: '1 Kg', price: 3400, originalPrice: 3800, inStock: true },
    ],
    selectedVariantId: 'wild-500g',
    nutrition: {
      calories: '304 kcal / 100g',
      fat: '0g',
      saturatedFat: '0g',
      protein: '0.3g',
      carbs: '82g',
      shelfLife: 'Indefinite (Raw Honey does not spoil)',
    },
    highlights: [
      'Rare Small Bee Forest Honey Harvest',
      'Boosts Immunity & Natural Vitality',
      '100% Raw, Unpasteurized & Pure'
    ],
    highlightsUrdu: [
      'Rare Small Bee Forest Honey Harvest',
      'Boosts Immunity & Natural Vitality',
      '100% Raw, Unpasteurized & Pure'
    ]
  },
  {
    id: 'khaas-desi-makhan',
    name: '100% Pure Desi Makhan (White Butter)',
    nameUrdu: '100% Pure Desi Makhan (White Butter)',
    tagline: 'Freshly Churned Traditional Cultured Butter',
    taglineUrdu: 'Freshly Churned Traditional Cultured Butter',
    category: 'butter',
    categoryLabel: 'Pure Butter',
    categoryLabelUrdu: 'Pure Butter',
    image: '/src/assets/images/product_pure_butter_makhan_1791077449503.jpg',
    rating: 4.9,
    reviewsCount: 164,
    description: 'Silky smooth, unsalted authentic white butter extracted through traditional dahi churning. Melts freshly over hot rotis and saag.',
    descriptionUrdu: 'Silky smooth, unsalted authentic white butter extracted through traditional dahi churning. Melts freshly over hot rotis and saag.',
    variants: [
      { id: 'makhan-500g', weight: '500 Grams (500g)', weightUrdu: '500g', price: 1450, originalPrice: 1800, inStock: true },
      { id: 'makhan-1kg', weight: '1 Kilogram (1 Kg)', weightUrdu: '1 Kg', price: 2800, originalPrice: 3100, inStock: true },
    ],
    selectedVariantId: 'makhan-500g',
    nutrition: {
      calories: '717 kcal / 100g',
      fat: '81g',
      saturatedFat: '51g',
      protein: '0.8g',
      carbs: '0.6g',
      shelfLife: '30 Days refrigerated / 6 Months frozen',
    },
    highlights: [
      'Zero added salt or artificial coloring',
      'Natural cultured probiotic essence',
      'Freshly delivered in temperature-controlled pack'
    ],
    highlightsUrdu: [
      'Zero added salt or artificial coloring',
      'Natural cultured probiotic essence',
      'Freshly delivered in temperature-controlled pack'
    ]
  },
  {
    id: 'khaas-shahi-panjeeri',
    name: '100% Pure Shahi Desi Ghee Panjeeri',
    nameUrdu: '100% Pure Shahi Desi Ghee Panjeeri',
    tagline: 'Nourishing Blend of Desi Ghee, Almonds, Pistachios & Gond',
    taglineUrdu: 'Nourishing Blend of Desi Ghee, Almonds, Pistachios & Gond',
    category: 'sweets',
    categoryLabel: 'Artisanal Sweets',
    categoryLabelUrdu: 'Artisanal Sweets',
    image: '/src/assets/images/product_desi_ghee_1kg_1791077419482.jpg',
    rating: 4.9,
    reviewsCount: 94,
    description: 'Prepared in pure Zubair Organic Desi Ghee with premium dry fruits, lotus seeds (phool makhana), semolina, and medicinal herbs.',
    descriptionUrdu: 'Prepared in pure Zubair Organic Desi Ghee with premium dry fruits, lotus seeds (phool makhana), semolina, and medicinal herbs.',
    variants: [
      { id: 'panjeeri-500g', weight: '500 Grams (500g)', weightUrdu: '500g', price: 1850, originalPrice: 2200, inStock: true },
      { id: 'panjeeri-1kg', weight: '1 Kilogram (1 Kg)', weightUrdu: '1 Kg', price: 3500, originalPrice: 3900, inStock: true },
    ],
    selectedVariantId: 'panjeeri-500g',
    nutrition: {
      calories: '510 kcal / 100g',
      fat: '28g',
      saturatedFat: '14g',
      protein: '9g',
      carbs: '55g',
      shelfLife: '3 Months at room temperature',
    },
    highlights: [
      'Made purely with 100% Pure Desi Ghee',
      'Loaded with 8 varieties of premium nuts',
      'Natural energy without chemical preservatives'
    ],
    highlightsUrdu: [
      'Made purely with 100% Pure Desi Ghee',
      'Loaded with 8 varieties of premium nuts',
      'Natural energy without chemical preservatives'
    ]
  },
  {
    id: 'khaas-special-khatai',
    name: 'Zubair Organic Desi Ghee Khatai',
    nameUrdu: 'Zubair Organic Desi Ghee Khatai',
    tagline: 'Melt-in-the-mouth heritage bakery delight',
    taglineUrdu: 'Melt-in-the-mouth heritage bakery delight',
    category: 'sweets',
    categoryLabel: 'Artisanal Sweets',
    categoryLabelUrdu: 'Artisanal Sweets',
    image: '/src/assets/images/product_desi_ghee_bilona_1791077436287.jpg',
    rating: 4.8,
    reviewsCount: 112,
    description: 'Crisp on the outside and crumbly soft within, baked using pure Zubair Organic Desi Ghee, cardamom, and toasted pistachios.',
    descriptionUrdu: 'Crisp on the outside and crumbly soft within, baked using pure Zubair Organic Desi Ghee, cardamom, and toasted pistachios.',
    variants: [
      { id: 'khatai-1kg', weight: '1 Kilogram (1 Kg)', weightUrdu: '1 Kg', price: 1400, originalPrice: 1600, inStock: true },
      { id: 'khatai-500g', weight: '500 Grams (500g)', weightUrdu: '500g', price: 750, originalPrice: 850, inStock: true },
    ],
    selectedVariantId: 'khatai-1kg',
    nutrition: {
      calories: '460 kcal / 100g',
      fat: '24g',
      saturatedFat: '12g',
      protein: '6g',
      carbs: '60g',
      shelfLife: '45 Days in airtight container',
    },
    highlights: [
      'Baked with 100% Pure Desi Ghee',
      'No Dalda or Hydrogenated oils',
      'Real green cardamom fragrance'
    ],
    highlightsUrdu: [
      'Baked with 100% Pure Desi Ghee',
      'No Dalda or Hydrogenated oils',
      'Real green cardamom fragrance'
    ]
  }
];

export interface CartItem {
  productId: string;
  productName: string;
  productNameUrdu: string;
  variantId: string;
  weight: string;
  weightUrdu: string;
  price: number;
  image: string;
  quantity: number;
}
