export interface ExtraOption {
  id: string;
  name: string;
  price: number;
  calories: number;
  protein: number;
  category: "proteina" | "topping" | "molho" | "acompanhamento";
}

export interface DeliveryProduct {
  id: number;
  title: string;
  category:
    | "Tigelas Deli"
    | "Wraps Artesanais"
    | "Saladas Proteicas"
    | "Opções Veganas"
    | "Sucos & Bebidas"
    | "Combos & Kits"
    | "Sobremesas Naturais";
  tag: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
  originalPrice?: number;
  prepTimeMin: number;
  rating: number;
  reviewsCount: number;
  dietary: ("vegano" | "sem-gluten" | "sem-lactose" | "proteico" | "low-carb")[];
  desc: string;
  ingredients: string[];
  allergens: string[];
  image: string;
  featured?: boolean;
  inStock: boolean;
}

export interface CartItem {
  cartItemId: string;
  productId: number;
  title: string;
  image: string;
  size: "300g (Regular)" | "450g (Grande)" | "Único";
  unitPrice: number;
  quantity: number;
  calories: number;
  protein: number;
  removedIngredients: string[];
  addedExtras: ExtraOption[];
  selectedSauce?: string;
  notes?: string;
  isCustomBowl?: boolean;
  customDetails?: string[];
}

export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "delivering"
  | "delivered"
  | "cancelled";

export type DeliveryMode = "delivery" | "pickup" | "scheduled";

export interface OrderChatMsg {
  id: string;
  sender: "customer" | "kitchen" | "courier";
  senderName: string;
  text: string;
  time: string;
}

export interface DeliveryOrder {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  address: string;
  neighborhood: string;
  deliveryMode: DeliveryMode;
  pickupStore?: string;
  scheduledSlot?: string;
  status: OrderStatus;
  createdAt: string;
  estimatedMinutes: number;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  courierTip: number;
  total: number;
  paymentMethod: "pix" | "credit_card" | "vr_alelo" | "on_delivery";
  paymentLabel: string;
  securityPin: string;
  bagTempCelsius: string;
  courierName: string;
  courierPhone: string;
  courierVehicle: string;
  courierRating: number;
  courierProgress: number; // 0 to 100
  ecoPackaging: boolean;
  allergenAlert?: string;
  rating?: number;
  chatMessages: OrderChatMsg[];
}

export const EXTRA_OPTIONS: ExtraOption[] = [
  { id: "ext-frango", name: "+100g Frango Caipira Orgânico", price: 9.9, calories: 145, protein: 26, category: "proteina" },
  { id: "ext-salmao", name: "+90g Salmão Fresco em Cubos", price: 14.9, calories: 175, protein: 22, category: "proteina" },
  { id: "ext-tofu", name: "+100g Tofu Marinado Non-GMO", price: 8.5, calories: 110, protein: 14, category: "proteina" },
  { id: "ext-falafel", name: "+3 unid. Falafel Assado", price: 7.9, calories: 130, protein: 8, category: "proteina" },
  { id: "ext-abacate", name: "Porção Extra de Abacate Hass", price: 6.9, calories: 95, protein: 2, category: "topping" },
  { id: "ext-bacon", name: "Bacon Artesanal Sem Nitritos", price: 6.5, calories: 90, protein: 6, category: "topping" },
  { id: "ext-sementes", name: "Mix de Sementes & Castanhas Tostadas", price: 4.9, calories: 75, protein: 4, category: "topping" },
  { id: "ext-homus", name: "Colherada de Homus de Beterraba", price: 5.5, calories: 65, protein: 3, category: "topping" },
  { id: "ext-molho-chipotle", name: "Potinho Extra Molho Chipotle", price: 3.9, calories: 65, protein: 0, category: "molho" },
  { id: "ext-molho-tahine", name: "Potinho Extra Tahine Cítrico", price: 3.9, calories: 70, protein: 2, category: "molho" },
  { id: "ext-molho-pesto", name: "Potinho Extra Pesto de Manjericão", price: 4.5, calories: 85, protein: 1, category: "molho" },
];

export const SAUCES_LIST = [
  "Molho Padrão da Receita",
  "Tahine com Limão Siciliano",
  "Chipotle Defumado Artesanal",
  "Pesto de Manjericão & Castanhas",
  "Mostarda Dijon & Mel Silvestre",
  "Vinagrete Cítrico de Gengibre",
  "Ponzu Artesanal de Baixo Sódio",
  "Apenas Azeite Extravirgem (Sem Molho)",
];

export const DELIVERY_PRODUCTS: DeliveryProduct[] = [
  {
    id: 1,
    title: "Tigela Mediterrânea de Quinoa",
    category: "Tigelas Deli",
    tag: "Vegano • Sem Glúten",
    calories: 340,
    protein: 14,
    carbs: 42,
    fat: 12,
    price: 32.9,
    originalPrice: 36.9,
    prepTimeMin: 12,
    rating: 4.9,
    reviewsCount: 248,
    dietary: ["vegano", "sem-gluten", "sem-lactose"],
    desc: "Quinoa tricolor orgânica, grão-de-bico assado com páprica, pepino crocante, tomate cereja, azeitonas Kalamata e molho tahine com limão.",
    ingredients: [
      "Quinoa Tricolor Orgânica",
      "Grão-de-Bico Assado",
      "Pepino Japonês",
      "Tomate Cereja Doce",
      "Azeitonas Kalamata",
      "Salsinha Fresca",
      "Molho Tahine com Limão",
    ],
    allergens: ["Gergelim"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    featured: true,
    inStock: true,
  },
  {
    id: 2,
    title: "Wrap de Abacate com Bacon",
    category: "Wraps Artesanais",
    tag: "Mais Vendido • Sem Lactose",
    calories: 420,
    protein: 22,
    carbs: 34,
    fat: 21,
    price: 29.9,
    prepTimeMin: 10,
    rating: 5.0,
    reviewsCount: 412,
    dietary: ["sem-lactose", "proteico"],
    desc: "Abacate Hass cremoso, bacon defumado artesanalmente em madeira de macieira, alface romana crocante, tomate fresco e toque de chipotle no pão folha integral.",
    ingredients: [
      "Pão Folha 100% Integral",
      "Abacate Hass Maduro",
      "Bacon Defumado sem Nitritos",
      "Alface Romana Colheita Diária",
      "Tomate Fresco",
      "Molho Chipotle da Casa",
    ],
    allergens: ["Trigo Integral"],
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
    featured: true,
    inStock: true,
  },
  {
    id: 3,
    title: "Bowl Verde Detox & Edamame",
    category: "Tigelas Deli",
    tag: "100% Plant-Based",
    calories: 290,
    protein: 16,
    carbs: 24,
    fat: 13,
    price: 31.5,
    prepTimeMin: 10,
    rating: 4.8,
    reviewsCount: 189,
    dietary: ["vegano", "sem-gluten", "sem-lactose", "low-carb"],
    desc: "Mix de folhas escuras, edamame no vapor, abacate em cubos, sementes de abóbora tostadas, brotos frescos e vinagrete cítrico de gengibre.",
    ingredients: [
      "Mix de Folhas Escuras Orgânicas",
      "Edamame no Vapor",
      "Abacate em Cubos",
      "Sementes de Abóbora Tostadas",
      "Brotos de Alfafa",
      "Vinagrete Cítrico de Gengibre",
    ],
    allergens: ["Soja Não-Transgênica (Edamame)"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: 4,
    title: "Tacos Verdes de Tofu Grelhado",
    category: "Opções Veganas",
    tag: "Alto em Fibras",
    calories: 360,
    protein: 18,
    carbs: 38,
    fat: 14,
    price: 34.0,
    prepTimeMin: 14,
    rating: 4.9,
    reviewsCount: 156,
    dietary: ["vegano", "sem-gluten", "sem-lactose"],
    desc: "Tortilhas de milho não-transgênico recheadas com tofu orgânico marinado, repolho roxo cítrico, coentro fresco e creme de abacate.",
    ingredients: [
      "Tortilhas de Milho Non-GMO",
      "Tofu Orgânico Marinado",
      "Repolho Roxo Cítrico",
      "Coentro Fresco",
      "Creme de Abacate com Limão",
      "Sementes de Gergelim Negro",
    ],
    allergens: ["Soja Orgânica", "Gergelim"],
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: 5,
    title: "Salada Proteica Colheita do Chef",
    category: "Saladas Proteicas",
    tag: "Rico em Proteína",
    calories: 390,
    protein: 28,
    carbs: 22,
    fat: 19,
    price: 36.9,
    prepTimeMin: 12,
    rating: 4.95,
    reviewsCount: 310,
    dietary: ["sem-gluten", "sem-lactose", "proteico", "low-carb"],
    desc: "Frango caipira grelhado em ervas finas, mix de folhas orgânicas, nozes pecan, maçã verde, sementes de girassol e mostarda com mel.",
    ingredients: [
      "Frango Caipira em Ervas Finas",
      "Mix de Folhas Orgânicas",
      "Nozes Pecan Caramelizadas no Mel",
      "Maçã Verde Crocante",
      "Sementes de Girassol",
      "Molho Mostarda & Mel",
    ],
    allergens: ["Nozes Pecan"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    featured: true,
    inStock: true,
  },
  {
    id: 6,
    title: "Tigela Tropical de Grãos & Manga",
    category: "Opções Veganas",
    tag: "Novo • Refrescante",
    calories: 310,
    protein: 12,
    carbs: 46,
    fat: 9,
    price: 30.9,
    prepTimeMin: 11,
    rating: 4.85,
    reviewsCount: 94,
    dietary: ["vegano", "sem-gluten", "sem-lactose"],
    desc: "Arroz negro integral, feijão preto temperado, cubos de manga madura, pimentão vermelho, castanha de caju e molho de maracujá.",
    ingredients: [
      "Arroz Negro Integral",
      "Feijão Preto Temperado",
      "Manga Palmer em Cubos",
      "Pimentão Vermelho Doce",
      "Castanha de Caju Tostada",
      "Redução Natural de Maracujá",
    ],
    allergens: ["Castanha de Caju"],
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: 7,
    title: "Poke Bowl de Salmão & Gergelim",
    category: "Tigelas Deli",
    tag: "Fonte de Ômega-3",
    calories: 440,
    protein: 30,
    carbs: 41,
    fat: 18,
    price: 42.9,
    originalPrice: 46.9,
    prepTimeMin: 14,
    rating: 4.98,
    reviewsCount: 376,
    dietary: ["sem-lactose", "proteico"],
    desc: "Salmão fresco em cubos, arroz de jasmim integral, sunomono de pepino, abacate, manga, cebolinha, alga nori e molho ponzu artesanal.",
    ingredients: [
      "Salmão Fresco Certificado",
      "Arroz de Jasmim Integral",
      "Sunomono de Pepino",
      "Abacate & Manga",
      "Cebolinha Verde",
      "Alga Nori Crocante",
      "Molho Ponzu Cítrico",
    ],
    allergens: ["Peixe (Salmão)", "Gergelim"],
    image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=800&q=80",
    featured: true,
    inStock: true,
  },
  {
    id: 8,
    title: "Wrap de Frango ao Pesto de Manjericão",
    category: "Wraps Artesanais",
    tag: "Proteína Magra",
    calories: 380,
    protein: 26,
    carbs: 32,
    fat: 15,
    price: 31.9,
    prepTimeMin: 11,
    rating: 4.9,
    reviewsCount: 205,
    dietary: ["sem-lactose", "proteico"],
    desc: "Tiras de frango orgânico grelhado, pesto artesanal de manjericão com castanhas, tomate seco, rúcula selvagem e pão folha de espinafre.",
    ingredients: [
      "Pão Folha de Espinafre",
      "Tiras de Frango Orgânico",
      "Pesto de Manjericão com Castanhas",
      "Tomate Seco Artesanal",
      "Rúcula Selvagem",
    ],
    allergens: ["Trigo Integral", "Castanha de Caju"],
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: 9,
    title: "Wrap Falafel Assado & Homus de Beterraba",
    category: "Wraps Artesanais",
    tag: "100% Vegano",
    calories: 350,
    protein: 15,
    carbs: 44,
    fat: 12,
    price: 28.9,
    prepTimeMin: 10,
    rating: 4.87,
    reviewsCount: 142,
    dietary: ["vegano", "sem-lactose"],
    desc: "Bolinhos de grão-de-bico assados com especiarias, homus cremoso de beterraba orgânica, folhas de hortelã, pepino e tahine cítrico.",
    ingredients: [
      "Pão Folha Integral",
      "Falafel Assado no Forno",
      "Homus de Beterraba Orgânica",
      "Hortelã Fresca",
      "Pepino Crocante",
      "Tahine Cítrico",
    ],
    allergens: ["Trigo Integral", "Gergelim"],
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: 10,
    title: "Salada Caesar de Kale & Grão-de-Bico",
    category: "Saladas Proteicas",
    tag: "Clássico Reinventado",
    calories: 330,
    protein: 21,
    carbs: 26,
    fat: 15,
    price: 33.5,
    prepTimeMin: 11,
    rating: 4.91,
    reviewsCount: 178,
    dietary: ["sem-gluten", "sem-lactose", "proteico"],
    desc: "Couve kale massageada no azeite, frango grelhado, grão-de-bico crocante no lugar dos croutons, lascas de amêndoas e molho caesar leve de castanhas.",
    ingredients: [
      "Couve Kale Orgânica Massageada",
      "Frango Grelhado em Cubos",
      "Grão-de-Bico Crocante Assado",
      "Lascas de Amêndoas Tostadas",
      "Molho Caesar Leve de Castanhas",
    ],
    allergens: ["Amêndoas", "Castanha de Caju"],
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: 11,
    title: "Suco Verde Prensado a Frio (350ml)",
    category: "Sucos & Bebidas",
    tag: "Sem Adição de Açúcar",
    calories: 95,
    protein: 2,
    carbs: 21,
    fat: 0,
    price: 16.9,
    prepTimeMin: 3,
    rating: 4.95,
    reviewsCount: 320,
    dietary: ["vegano", "sem-gluten", "sem-lactose", "low-carb"],
    desc: "Extração a frio 100% pura de maçã verde, couve orgânica, pepino, hortelã fresca, gengibre e limão tahiti para máxima absorção de vitaminas.",
    ingredients: ["Maçã Verde", "Couve Orgânica", "Pepino", "Hortelã", "Gengibre", "Limão Tahiti"],
    allergens: [],
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: 12,
    title: "Elixir Dourado de Cúrcuma & Laranja (350ml)",
    category: "Sucos & Bebidas",
    tag: "Imunidade • Antioxidante",
    calories: 110,
    protein: 2,
    carbs: 25,
    fat: 0,
    price: 17.5,
    prepTimeMin: 3,
    rating: 4.92,
    reviewsCount: 215,
    dietary: ["vegano", "sem-gluten", "sem-lactose"],
    desc: "Combinação revigorante de laranja bahia, cenoura baby, cúrcuma fresca, água de coco natural e uma pitada de pimenta-preta.",
    ingredients: ["Laranja Bahia", "Cenoura Baby", "Raiz de Cúrcuma", "Água de Coco Natural", "Pimenta-Preta"],
    allergens: [],
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: 13,
    title: "Combo Energia: Tigela Mediterrânea + Suco Verde",
    category: "Combos & Kits",
    tag: "Economize R$ 6,90",
    calories: 435,
    protein: 16,
    carbs: 63,
    fat: 12,
    price: 42.9,
    originalPrice: 49.8,
    prepTimeMin: 12,
    rating: 4.97,
    reviewsCount: 184,
    dietary: ["vegano", "sem-gluten", "sem-lactose"],
    desc: "Nossa combinação mais pedida para o almoço: 1 Tigela Mediterrânea de Quinoa (300g) + 1 Suco Verde Prensado a Frio (350ml).",
    ingredients: ["Tigela Mediterrânea de Quinoa 300g", "Suco Verde Prensado a Frio 350ml"],
    allergens: ["Gergelim"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    featured: true,
    inStock: true,
  },
  {
    id: 14,
    title: "Combo Pós-Treino: Salada Chef + Wrap Abacate",
    category: "Combos & Kits",
    tag: "50g Proteína • Super Combo",
    calories: 810,
    protein: 50,
    carbs: 56,
    fat: 40,
    price: 58.9,
    originalPrice: 66.8,
    prepTimeMin: 15,
    rating: 4.99,
    reviewsCount: 129,
    dietary: ["sem-lactose", "proteico"],
    desc: "Ideal para dividir ou para recuperação muscular intensa: 1 Salada Proteica Colheita do Chef + 1 Wrap de Abacate com Bacon.",
    ingredients: ["Salada Proteica Colheita do Chef", "Wrap de Abacate com Bacon"],
    allergens: ["Trigo Integral", "Nozes Pecan"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: 15,
    title: "Pudim de Chia com Manga & Coco (180g)",
    category: "Sobremesas Naturais",
    tag: "Zero Açúcar Refinado",
    calories: 185,
    protein: 5,
    carbs: 19,
    fat: 10,
    price: 18.9,
    prepTimeMin: 5,
    rating: 4.93,
    reviewsCount: 164,
    dietary: ["vegano", "sem-gluten", "sem-lactose", "low-carb"],
    desc: "Sementes de chia orgânica hidratadas no leite de coco artesanal, adoçado com néctar de tâmara, coberto com compota fresca de manga e coco queimado.",
    ingredients: ["Chia Orgânica", "Leite de Coco Artesanal", "Néctar de Tâmara", "Manga Fresca", "Lascas de Coco Tostado"],
    allergens: [],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: 16,
    title: "Brownie Funcional de Cacau 70% & Nozes",
    category: "Sobremesas Naturais",
    tag: "Sem Glúten • Sem Lactose",
    calories: 210,
    protein: 6,
    carbs: 22,
    fat: 12,
    price: 16.5,
    prepTimeMin: 5,
    rating: 4.96,
    reviewsCount: 231,
    dietary: ["sem-gluten", "sem-lactose"],
    desc: "Feito com farinha de amêndoas, cacau 70% de origem amazônica, açúcar de coco, óleo de coco extravirgem e pedaços crocantes de nozes.",
    ingredients: ["Farinha de Amêndoas", "Cacau 70% Amazônico", "Açúcar de Coco", "Nozes Pecan", "Ovos Caipiras Orgânicos"],
    allergens: ["Amêndoas", "Nozes", "Ovos"],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
];

export const BOWL_BUILDER_OPTIONS = {
  formats: [
    { id: "bowl-300", name: "Tigela Deli Regular (300g)", basePrice: 28.9, calories: 0, protein: 0, desc: "Porção equilibrada ideal para almoço ou jantar leve" },
    { id: "bowl-450", name: "Super Tigela Proteica (450g)", basePrice: 36.9, calories: 80, protein: 6, desc: "+50% de volume com porção reforçada de base e folhas" },
    { id: "wrap-int", name: "Wrap Artesanal no Pão Folha", basePrice: 29.9, calories: 110, protein: 4, desc: "Enrolado no nosso pão folha 100% grãos integrais" },
  ],
  bases: [
    { id: "base-quinoa", name: "Quinoa Tricolor Orgânica", calories: 120, protein: 5, carbs: 21, fiber: 3, tag: "Sem Glúten" },
    { id: "base-arroz-negro", name: "Arroz Negro Integral", calories: 130, protein: 4, carbs: 26, fiber: 4, tag: "Antioxidante" },
    { id: "base-folhas", name: "Mix de Folhas Verdes Colheita Diária", calories: 35, protein: 2, carbs: 5, fiber: 3, tag: "Low Carb" },
    { id: "base-kale", name: "Couve Kale Massageada no Azeite", calories: 65, protein: 3, carbs: 7, fiber: 4, tag: "Detox" },
    { id: "base-jasmim", name: "Arroz de Jasmim Integral + Folhas", calories: 115, protein: 3, carbs: 23, fiber: 3, tag: "Equilibrado" },
  ],
  proteins: [
    { id: "prot-frango", name: "Frango Caipira Grelhado em Ervas", priceExtra: 0, calories: 155, protein: 28, carbs: 1, fat: 4, tag: "28g Proteína" },
    { id: "prot-salmao", name: "Salmão Fresco em Cubos (Ômega-3)", priceExtra: 8.0, calories: 190, protein: 24, carbs: 0, fat: 11, tag: "Premium" },
    { id: "prot-tofu", name: "Tofu Orgânico Grelhado no Gergelim", priceExtra: 0, calories: 120, protein: 15, carbs: 3, fat: 6, tag: "100% Vegano" },
    { id: "prot-falafel", name: "Bolinhos de Falafel Assado", priceExtra: 0, calories: 140, protein: 10, carbs: 18, fat: 4, tag: "Plant-Based" },
    { id: "prot-grao", name: "Dupla de Grão-de-Bico & Edamame", priceExtra: 0, calories: 135, protein: 12, carbs: 19, fat: 3, tag: "Rico em Fibras" },
  ],
  toppings: [
    { id: "top-abacate", name: "Abacate Hass em Cubos", calories: 80, protein: 1, fiber: 3 },
    { id: "top-tomate", name: "Tomate Cereja Doce", calories: 20, protein: 1, fiber: 1 },
    { id: "top-pepino", name: "Sunomono de Pepino Crocante", calories: 15, protein: 0, fiber: 1 },
    { id: "top-manga", name: "Cubos de Manga Madura", calories: 45, protein: 0, fiber: 2 },
    { id: "top-homus", name: "Homus de Beterraba Orgânica", calories: 55, protein: 2, fiber: 2 },
    { id: "top-sementes", name: "Sementes de Abóbora & Girassol", calories: 65, protein: 3, fiber: 2 },
    { id: "top-castanha", name: "Castanha de Caju Tostada", calories: 75, protein: 2, fiber: 1 },
    { id: "top-azeitona", name: "Azeitonas Kalamata", calories: 40, protein: 0, fiber: 1 },
    { id: "top-bacon", name: "Bacon Defumado sem Nitritos", calories: 85, protein: 5, fiber: 0 },
    { id: "top-repolho", name: "Repolho Roxo Cítrico", calories: 20, protein: 1, fiber: 2 },
  ],
  sauces: [
    { id: "mol-tahine", name: "Tahine com Limão Siciliano", calories: 70, tag: "Vegano" },
    { id: "mol-chipotle", name: "Chipotle Defumado Artesanal", calories: 65, tag: "Levemente Picante" },
    { id: "mol-pesto", name: "Pesto de Manjericão & Castanhas", calories: 85, tag: "Herbal" },
    { id: "mol-mostarda", name: "Mostarda & Mel Silvestre", calories: 60, tag: "Agridoce" },
    { id: "mol-gengibre", name: "Vinagrete Cítrico de Gengibre", calories: 45, tag: "Leve & Detox" },
    { id: "mol-ponzu", name: "Molho Ponzu Artesanal", calories: 35, tag: "Baixo Caloria" },
  ],
};

export const NEIGHBORHOODS = [
  { name: "Jardins / Av. Paulista", fee: 5.9, minTime: 20, maxTime: 30, distanceKm: 1.8 },
  { name: "Vila Madalena / Pinheiros", fee: 6.9, minTime: 25, maxTime: 35, distanceKm: 3.2 },
  { name: "Cerqueira César / Consolação", fee: 4.9, minTime: 18, maxTime: 28, distanceKm: 1.4 },
  { name: "Itaim Bibi / Vila Olímpia", fee: 8.9, minTime: 30, maxTime: 42, distanceKm: 4.7 },
  { name: "Moema / Paraíso", fee: 7.9, minTime: 28, maxTime: 38, distanceKm: 3.9 },
  { name: "Perdizes / Higienópolis", fee: 7.5, minTime: 25, maxTime: 35, distanceKm: 3.5 },
];

export const PICKUP_STORES = [
  {
    id: "jardins",
    name: "Cozinha & Hub Sunneen - Jardins",
    address: "Av. Paulista, 1450 • Bela Vista, São Paulo - SP",
    prepTime: "Pronto em 12-15 min",
    hours: "07h às 22h",
  },
  {
    id: "vilamadalena",
    name: "Ponto Grab N Go - Vila Madalena",
    address: "Rua Harmonia, 320 • Vila Madalena, São Paulo - SP",
    prepTime: "Pronto em 15-20 min",
    hours: "08h às 21h",
  },
  {
    id: "cerqueira",
    name: "Hub Express - Cerqueira César",
    address: "Al. Santos, 890 • Cerqueira César, São Paulo - SP",
    prepTime: "Pronto em 10-15 min",
    hours: "07h às 20h",
  },
];

export const COUPONS: Record<
  string,
  { code: string; description: string; discountType: "percent" | "fixed" | "free_shipping"; value: number; minOrder: number }
> = {
  SUNNEEN10: {
    code: "SUNNEEN10",
    description: "10% OFF em todo o cardápio saudável",
    discountType: "percent",
    value: 10,
    minOrder: 30,
  },
  BEMVINDO15: {
    code: "BEMVINDO15",
    description: "R$ 15,00 OFF na sua primeira compra acima de R$ 55",
    discountType: "fixed",
    value: 15,
    minOrder: 55,
  },
  FRETEGRATIS: {
    code: "FRETEGRATIS",
    description: "Entrega Refrigerada Grátis no seu pedido",
    discountType: "free_shipping",
    value: 0,
    minOrder: 35,
  },
};

export const SUBSCRIPTION_PLANS = [
  {
    id: "plan-5",
    title: "Plano Rotina Leve",
    mealsPerWeek: 5,
    subtitle: "Ideal para os almoços de Segunda a Sexta",
    pricePerMeal: 27.9,
    totalWeekly: 139.5,
    savingsPercent: 15,
    perks: [
      "5 Tigelas ou Wraps à sua escolha por semana",
      "Frete Refrigerado Grátis em até 2 entregas semanais",
      "Acompanhamento de macros pelo app",
      "Pause ou altere o cardápio a qualquer momento",
    ],
    badge: "Mais Flexível",
  },
  {
    id: "plan-10",
    title: "Plano Foco Total",
    mealsPerWeek: 10,
    subtitle: "Almoço e Jantar garantidos com alta nutrição",
    pricePerMeal: 24.9,
    totalWeekly: 249.0,
    savingsPercent: 24,
    perks: [
      "10 Refeições Frescas + 2 Sucos Prensados a Frio de cortesia",
      "Entregas diárias ou programadas sem taxa",
      "Consultoria mensal online com Nutricionista Sunneen",
      "Embalagens retornáveis com 5% de cashback extra",
    ],
    badge: "Mais Assinado • 24% OFF",
    highlighted: true,
  },
  {
    id: "plan-corporate",
    title: "Plano Família & Home Office",
    mealsPerWeek: 16,
    subtitle: "Para casais ou famílias que buscam praticidade 100% natural",
    pricePerMeal: 22.9,
    totalWeekly: 366.4,
    savingsPercent: 30,
    perks: [
      "16 Refeições (Tigelas, Saladas, Wraps) + 4 Sobremesas Naturais",
      "Prioridade na Cozinha Artesanal e logística dedicada",
      "Personalização livre de proteínas e restrições alimentares",
      "Acesso VIP a novos sabores sazonais",
    ],
    badge: "Maior Economia • 30% OFF",
  },
];

export const INITIAL_ORDERS: DeliveryOrder[] = [
  {
    id: "ord-1042",
    code: "#SUN-1042",
    customerName: "Você (Cliente Sunneen)",
    customerPhone: "(11) 99812-4400",
    address: "Rua Oscar Freire, 720 - Apto 82",
    neighborhood: "Jardins / Av. Paulista",
    deliveryMode: "delivery",
    status: "delivering",
    createdAt: "Hoje, 18:52",
    estimatedMinutes: 14,
    items: [
      {
        cartItemId: "ci-1",
        productId: 2,
        title: "Wrap de Abacate com Bacon",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
        size: "300g (Regular)",
        unitPrice: 29.9,
        quantity: 1,
        calories: 420,
        protein: 22,
        removedIngredients: [],
        addedExtras: [],
        selectedSauce: "Chipotle Defumado Artesanal",
        notes: "Cortar ao meio, por favor",
      },
      {
        cartItemId: "ci-2",
        productId: 1,
        title: "Tigela Mediterrânea de Quinoa",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        size: "300g (Regular)",
        unitPrice: 32.9,
        quantity: 1,
        calories: 340,
        protein: 14,
        removedIngredients: [],
        addedExtras: [],
        selectedSauce: "Tahine com Limão Siciliano",
      },
      {
        cartItemId: "ci-3",
        productId: 11,
        title: "Suco Verde Prensado a Frio (350ml)",
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
        size: "Único",
        unitPrice: 16.9,
        quantity: 1,
        calories: 95,
        protein: 2,
        removedIngredients: [],
        addedExtras: [],
      },
    ],
    subtotal: 79.7,
    deliveryFee: 0,
    discount: 7.97,
    courierTip: 5.0,
    total: 76.73,
    paymentMethod: "pix",
    paymentLabel: "PIX Instantâneo (Pago)",
    securityPin: "4400",
    bagTempCelsius: "3.1°C",
    courierName: "Lucas Ferreira",
    courierPhone: "(11) 97411-8892",
    courierVehicle: "E-Bike Refrigerada Sunneen #08",
    courierRating: 4.98,
    courierProgress: 65,
    ecoPackaging: true,
    allergenAlert: "Sem Lactose",
    chatMessages: [
      {
        id: "msg-1",
        sender: "kitchen",
        senderName: "Cozinha Sunneen Jardins",
        text: "Olá! Seu pedido foi preparado com ingredientes colhidos hoje pela manhã e lacrado a 3°C.",
        time: "19:01",
      },
      {
        id: "msg-2",
        sender: "courier",
        senderName: "Lucas (Entregador Parceiro)",
        text: "Acabei de retirar sua Ecobag refrigerada na loja da Av. Paulista! Estou a caminho pela Rua Augusta.",
        time: "19:05",
      },
    ],
  },
  {
    id: "ord-1043",
    code: "#SUN-1043",
    customerName: "Beatriz Nogueira",
    customerPhone: "(11) 99123-7741",
    address: "Rua Harmonia, 512 - Casa 3",
    neighborhood: "Vila Madalena / Pinheiros",
    deliveryMode: "delivery",
    status: "preparing",
    createdAt: "Hoje, 19:02",
    estimatedMinutes: 24,
    items: [
      {
        cartItemId: "ci-10",
        productId: 7,
        title: "Poke Bowl de Salmão & Gergelim",
        image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=800&q=80",
        size: "450g (Grande)",
        unitPrice: 52.9,
        quantity: 1,
        calories: 560,
        protein: 40,
        removedIngredients: ["Cebolinha Verde"],
        addedExtras: [
          { id: "ext-abacate", name: "Porção Extra de Abacate Hass", price: 6.9, calories: 95, protein: 2, category: "topping" },
        ],
        selectedSauce: "Ponzu Artesanal de Baixo Sódio",
        notes: "Alergia severa a cebolinha! Enviar molho ponzu separado.",
      },
      {
        cartItemId: "ci-11",
        productId: 12,
        title: "Elixir Dourado de Cúrcuma & Laranja (350ml)",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
        size: "Único",
        unitPrice: 17.5,
        quantity: 2,
        calories: 110,
        protein: 2,
        removedIngredients: [],
        addedExtras: [],
      },
    ],
    subtotal: 94.8,
    deliveryFee: 0,
    discount: 0,
    courierTip: 5.0,
    total: 99.8,
    paymentMethod: "credit_card",
    paymentLabel: "Mastercard •••• 4821",
    securityPin: "7741",
    bagTempCelsius: "2.9°C",
    courierName: "Aguardando despacho",
    courierPhone: "-",
    courierVehicle: "E-Bike Refrigerada",
    courierRating: 4.95,
    courierProgress: 25,
    ecoPackaging: true,
    allergenAlert: "ATENÇÃO: Alergia a Cebolinha",
    chatMessages: [],
  },
  {
    id: "ord-1044",
    code: "#SUN-1044",
    customerName: "Rodrigo Vasconcelos",
    customerPhone: "(11) 98450-1190",
    address: "Retirada na Loja • Av. Paulista, 1450",
    neighborhood: "Jardins / Av. Paulista",
    deliveryMode: "pickup",
    pickupStore: "Cozinha & Hub Sunneen - Jardins",
    status: "ready",
    createdAt: "Hoje, 18:58",
    estimatedMinutes: 5,
    items: [
      {
        cartItemId: "ci-20",
        productId: 5,
        title: "Salada Proteica Colheita do Chef",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        size: "450g (Grande)",
        unitPrice: 46.9,
        quantity: 1,
        calories: 510,
        protein: 38,
        removedIngredients: [],
        addedExtras: [],
        selectedSauce: "Mostarda Dijon & Mel Silvestre",
      },
      {
        cartItemId: "ci-21",
        productId: 16,
        title: "Brownie Funcional de Cacau 70% & Nozes",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
        size: "Único",
        unitPrice: 16.5,
        quantity: 1,
        calories: 210,
        protein: 6,
        removedIngredients: [],
        addedExtras: [],
      },
    ],
    subtotal: 63.4,
    deliveryFee: 0,
    discount: 0,
    courierTip: 0,
    total: 63.4,
    paymentMethod: "vr_alelo",
    paymentLabel: "Vale-Refeição Alelo",
    securityPin: "1190",
    bagTempCelsius: "3.4°C",
    courierName: "Retirada pelo Cliente (Grab N Go)",
    courierPhone: "-",
    courierVehicle: "Balcão Refrigerado #02",
    courierRating: 5.0,
    courierProgress: 50,
    ecoPackaging: false,
    chatMessages: [],
  },
  {
    id: "ord-1045",
    code: "#SUN-1045",
    customerName: "Fernanda Tavares",
    customerPhone: "(11) 97230-9012",
    address: "Al. Lorena, 1180 - Conj. 41",
    neighborhood: "Cerqueira César / Consolação",
    deliveryMode: "delivery",
    status: "pending",
    createdAt: "Agora mesmo",
    estimatedMinutes: 28,
    items: [
      {
        cartItemId: "ci-30",
        productId: 4,
        title: "Tacos Verdes de Tofu Grelhado",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
        size: "300g (Regular)",
        unitPrice: 34.0,
        quantity: 1,
        calories: 360,
        protein: 18,
        removedIngredients: [],
        addedExtras: [],
      },
      {
        cartItemId: "ci-31",
        productId: 9,
        title: "Wrap Falafel Assado & Homus de Beterraba",
        image: "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=800&q=80",
        size: "300g (Regular)",
        unitPrice: 28.9,
        quantity: 1,
        calories: 350,
        protein: 15,
        removedIngredients: [],
        addedExtras: [],
      },
    ],
    subtotal: 62.9,
    deliveryFee: 4.9,
    discount: 0,
    courierTip: 3.0,
    total: 70.8,
    paymentMethod: "pix",
    paymentLabel: "PIX Instantâneo (Pago)",
    securityPin: "9012",
    bagTempCelsius: "3.0°C",
    courierName: "Aguardando aceite",
    courierPhone: "-",
    courierVehicle: "E-Bike Refrigerada",
    courierRating: 4.96,
    courierProgress: 10,
    ecoPackaging: true,
    allergenAlert: "100% Vegano",
    chatMessages: [],
  },
  {
    id: "ord-1039",
    code: "#SUN-1039",
    customerName: "Você (Cliente Sunneen)",
    customerPhone: "(11) 99812-4400",
    address: "Rua Oscar Freire, 720 - Apto 82",
    neighborhood: "Jardins / Av. Paulista",
    deliveryMode: "delivery",
    status: "delivered",
    createdAt: "Ontem, 13:15",
    estimatedMinutes: 0,
    items: [
      {
        cartItemId: "ci-40",
        productId: 5,
        title: "Salada Proteica Colheita do Chef",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        size: "300g (Regular)",
        unitPrice: 36.9,
        quantity: 1,
        calories: 390,
        protein: 28,
        removedIngredients: [],
        addedExtras: [],
      },
      {
        cartItemId: "ci-41",
        productId: 15,
        title: "Pudim de Chia com Manga & Coco (180g)",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
        size: "Único",
        unitPrice: 18.9,
        quantity: 1,
        calories: 185,
        protein: 5,
        removedIngredients: [],
        addedExtras: [],
      },
    ],
    subtotal: 55.8,
    deliveryFee: 5.9,
    discount: 0,
    courierTip: 3.0,
    total: 64.7,
    paymentMethod: "pix",
    paymentLabel: "PIX Instantâneo (Pago)",
    securityPin: "4400",
    bagTempCelsius: "3.0°C",
    courierName: "Marcos Oliveira",
    courierPhone: "(11) 98211-3301",
    courierVehicle: "Moto Elétrica Sunneen #03",
    courierRating: 5.0,
    courierProgress: 100,
    ecoPackaging: true,
    rating: 5,
    chatMessages: [],
  },
];

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
