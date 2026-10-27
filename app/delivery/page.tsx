"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Leaf,
  Truck,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Flame,
  Utensils,
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Check,
  SlidersHorizontal,
  Tag,
  Compass,
  ChefHat,
  Bike,
  BarChart3,
  CalendarHeart,
  CreditCard,
  Trash2,
  ThermometerSnowflake,
  Store,
} from "lucide-react";
import {
  COUPONS,
  CartItem,
  DELIVERY_PRODUCTS,
  DeliveryMode,
  DeliveryOrder,
  DeliveryProduct,
  EXTRA_OPTIONS,
  ExtraOption,
  INITIAL_ORDERS,
  NEIGHBORHOODS,
  OrderStatus,
  SAUCES_LIST,
  formatBRL,
} from "./data";
import BowlBuilderView from "./components/BowlBuilderView";
import {
  CheckoutView,
  OrderTrackingView,
} from "./components/CheckoutAndTrackingView";
import KitchenKdsView from "./components/KitchenKdsView";
import CourierAppView from "./components/CourierAppView";
import {
  AdminAnalyticsView,
  SubscriptionPlansView,
} from "./components/AdminAnalyticsAndPlansView";

export type DeliveryViewTab =
  | "menu"
  | "builder"
  | "checkout"
  | "tracking"
  | "kitchen"
  | "courier"
  | "subscriptions"
  | "analytics";

export default function DeliverySystemPage() {
  // Active View Tab
  const [activeView, setActiveView] = useState<DeliveryViewTab>("menu");

  // Store & Menu State
  const [products, setProducts] = useState<DeliveryProduct[]>(DELIVERY_PRODUCTS);
  const [storeOpen, setStoreOpen] = useState(true);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("delivery");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(
    NEIGHBORHOODS[0]
  );

  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "popular" | "price_asc" | "calories_asc" | "protein_desc"
  >("popular");

  // Cart & Coupon State
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartItemId: "init-1",
      productId: 2,
      title: "Wrap de Abacate com Bacon",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
      size: "300g (Regular)",
      unitPrice: 29.9,
      quantity: 1,
      calories: 420,
      protein: 22,
      removedIngredients: [],
      addedExtras: [],
      selectedSauce: "Chipotle Defumado Artesanal",
    },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("SUNNEEN10");
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  // Product Customization Modal State
  const [customizingProduct, setCustomizingProduct] =
    useState<DeliveryProduct | null>(null);
  const [modalSize, setModalSize] = useState<"300g (Regular)" | "450g (Grande)">(
    "300g (Regular)"
  );
  const [modalRemovedIngs, setModalRemovedIngs] = useState<string[]>([]);
  const [modalExtras, setModalExtras] = useState<ExtraOption[]>([]);
  const [modalSauce, setModalSauce] = useState(SAUCES_LIST[0]);
  const [modalNotes, setModalNotes] = useState("");
  const [modalQty, setModalQty] = useState(1);

  // Orders State (shared across Tracking, KDS, Courier, and Analytics)
  const [orders, setOrders] = useState<DeliveryOrder[]>(INITIAL_ORDERS);
  const [activeOrderId, setActiveOrderId] = useState<string>(
    INITIAL_ORDERS[0].id
  );

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Categories
  const categories = [
    "Todos",
    "Combos & Kits",
    "Tigelas Deli",
    "Wraps Artesanais",
    "Saladas Proteicas",
    "Opções Veganas",
    "Sucos & Bebidas",
    "Sobremesas Naturais",
  ];

  const dietaryFilters = [
    { id: "vegano", label: "100% Vegano" },
    { id: "sem-gluten", label: "Sem Glúten" },
    { id: "sem-lactose", label: "Zero Lactose" },
    { id: "proteico", label: "+Proteína" },
    { id: "low-carb", label: "Low Carb" },
  ];

  const toggleDietaryFilter = (id: string) => {
    setSelectedDietary((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== "Todos" && p.category !== selectedCategory) {
          return false;
        }
        if (
          searchQuery.trim() &&
          !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.desc.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        if (selectedDietary.length > 0) {
          const matchesAll = selectedDietary.every((d) =>
            p.dietary.includes(d as DeliveryProduct["dietary"][number])
          );
          if (!matchesAll) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "calories_asc") return a.calories - b.calories;
        if (sortBy === "protein_desc") return b.protein - a.protein;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [products, selectedCategory, searchQuery, selectedDietary, sortBy]);

  // Cart Calculations
  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
    [cart]
  );

  const discount = useMemo(() => {
    if (!appliedCoupon || !COUPONS[appliedCoupon]) return 0;
    const c = COUPONS[appliedCoupon];
    if (subtotal < c.minOrder) return 0;
    if (c.discountType === "percent") return (subtotal * c.value) / 100;
    if (c.discountType === "fixed") return c.value;
    return 0;
  }, [appliedCoupon, subtotal]);

  const freeShippingThreshold = 79;
  const isFreeShipping =
    deliveryMode === "pickup" ||
    subtotal >= freeShippingThreshold ||
    appliedCoupon === "FRETEGRATIS";
  const deliveryFee = isFreeShipping ? 0 : selectedNeighborhood.fee;
  const totalBagCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  // Open Customization Modal
  const openProductModal = (product: DeliveryProduct) => {
    setCustomizingProduct(product);
    setModalSize("300g (Regular)");
    setModalRemovedIngs([]);
    setModalExtras([]);
    setModalSauce(SAUCES_LIST[0]);
    setModalNotes("");
    setModalQty(1);
  };

  // Quick Add Product
  const handleQuickAdd = (product: DeliveryProduct) => {
    if (!product.inStock) return;
    const existingIdx = cart.findIndex(
      (i) =>
        i.productId === product.id &&
        i.size === "300g (Regular)" &&
        i.addedExtras.length === 0 &&
        i.removedIngredients.length === 0
    );
    if (existingIdx > -1) {
      setCart((prev) =>
        prev.map((item, idx) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const newItem: CartItem = {
        cartItemId: `ci-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        productId: product.id,
        title: product.title,
        image: product.image,
        size:
          product.category === "Sucos & Bebidas" ||
          product.category === "Sobremesas Naturais"
            ? "Único"
            : "300g (Regular)",
        unitPrice: product.price,
        quantity: 1,
        calories: product.calories,
        protein: product.protein,
        removedIngredients: [],
        addedExtras: [],
      };
      setCart((prev) => [...prev, newItem]);
    }
    showToast(`${product.title} adicionado à sacola!`);
  };

  // Confirm Add from Customization Modal
  const handleConfirmModalAdd = () => {
    if (!customizingProduct) return;
    const sizeUpcharge = modalSize === "450g (Grande)" ? 9.0 : 0;
    const extrasPrice = modalExtras.reduce((acc, e) => acc + e.price, 0);
    const extrasCal = modalExtras.reduce((acc, e) => acc + e.calories, 0);
    const extrasProt = modalExtras.reduce((acc, e) => acc + e.protein, 0);

    const newItem: CartItem = {
      cartItemId: `ci-${Date.now()}`,
      productId: customizingProduct.id,
      title: customizingProduct.title,
      image: customizingProduct.image,
      size:
        customizingProduct.category === "Sucos & Bebidas" ||
        customizingProduct.category === "Sobremesas Naturais"
          ? "Único"
          : modalSize,
      unitPrice: customizingProduct.price + sizeUpcharge + extrasPrice,
      quantity: modalQty,
      calories:
        customizingProduct.calories +
        (modalSize === "450g (Grande)" ? 110 : 0) +
        extrasCal,
      protein:
        customizingProduct.protein +
        (modalSize === "450g (Grande)" ? 9 : 0) +
        extrasProt,
      removedIngredients: modalRemovedIngs,
      addedExtras: modalExtras,
      selectedSauce: modalSauce,
      notes: modalNotes.trim() || undefined,
    };

    setCart((prev) => [...prev, newItem]);
    setCustomizingProduct(null);
    setCartOpen(true);
    showToast(`${customizingProduct.title} personalizado na sacola!`);
  };

  const updateCartQty = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleApplyCoupon = (codeToApply?: string) => {
    const normalized = (codeToApply ?? couponInput).trim().toUpperCase();
    if (!normalized) return;
    const found = COUPONS[normalized];
    if (!found) {
      setCouponFeedback("Cupom inválido. Tente SUNNEEN10, BEMVINDO15 ou FRETEGRATIS.");
      return;
    }
    setAppliedCoupon(normalized);
    setCouponInput("");
    setCouponFeedback(`Cupom ${normalized} aplicado: ${found.description}!`);
  };

  // Place Order from Checkout
  const handlePlaceOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    address: string;
    pickupStore?: string;
    scheduledSlot?: string;
    paymentMethod: "pix" | "credit_card" | "vr_alelo" | "on_delivery";
    paymentLabel: string;
    courierTip: number;
    ecoPackaging: boolean;
    allergenAlert?: string;
  }) => {
    const randomNum = Math.floor(1046 + Math.random() * 890);
    const pin = orderData.customerPhone.replace(/\D/g, "").slice(-4) || "4400";
    const newOrder: DeliveryOrder = {
      id: `ord-${Date.now()}`,
      code: `#SUN-${randomNum}`,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      address: orderData.address,
      neighborhood: selectedNeighborhood.name,
      deliveryMode,
      pickupStore: orderData.pickupStore,
      scheduledSlot: orderData.scheduledSlot,
      status: "pending",
      createdAt: "Agora mesmo",
      estimatedMinutes: selectedNeighborhood.minTime,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount,
      courierTip: orderData.courierTip,
      total: Math.max(0, subtotal - discount + deliveryFee + orderData.courierTip),
      paymentMethod: orderData.paymentMethod,
      paymentLabel: orderData.paymentLabel,
      securityPin: pin,
      bagTempCelsius: "3.0°C",
      courierName: "Lucas Ferreira",
      courierPhone: "(11) 97411-8892",
      courierVehicle: "E-Bike Refrigerada Sunneen #08",
      courierRating: 4.98,
      courierProgress: 12,
      ecoPackaging: orderData.ecoPackaging,
      allergenAlert: orderData.allergenAlert,
      chatMessages: [
        {
          id: `msg-${Date.now()}`,
          sender: "kitchen",
          senderName: "Cozinha Sunneen Jardins",
          text: `Recebemos seu pedido #SUN-${randomNum}! Nossa equipe já está higienizando e selecionando os ingredientes frescos.`,
          time: "Agora",
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    setCart([]);
    setActiveView("tracking");
    showToast(`Pedido ${newOrder.code} enviado para a Cozinha Sunneen!`);
  };

  // Update Order Status (from Tracking, KDS, or Courier App)
  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    const progressMap: Record<OrderStatus, number> = {
      pending: 12,
      preparing: 30,
      ready: 50,
      delivering: 75,
      delivered: 100,
      cancelled: 0,
    };
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: nextStatus,
              courierProgress: progressMap[nextStatus],
              estimatedMinutes:
                nextStatus === "delivered"
                  ? 0
                  : Math.max(4, o.estimatedMinutes - 6),
            }
          : o
      )
    );
    showToast(`Status do pedido atualizado para: ${nextStatus.toUpperCase()}`);
  };

  // Advance Order Status by 1 step
  const handleAdvanceOrderStatus = (orderId: string) => {
    const sequence: OrderStatus[] = [
      "pending",
      "preparing",
      "ready",
      "delivering",
      "delivered",
    ];
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;
    const idx = sequence.indexOf(target.status);
    if (idx < sequence.length - 1) {
      handleUpdateOrderStatus(orderId, sequence[idx + 1]);
    }
  };

  // Send Chat Message in Tracking View
  const handleSendChatMessage = (orderId: string, text: string) => {
    const customerMsg = {
      id: `m-${Date.now()}`,
      sender: "customer" as const,
      senderName: "Você",
      text,
      time: "Agora",
    };
    const autoReply = {
      id: `m-${Date.now() + 1}`,
      sender: "courier" as const,
      senderName: "Central & Entregador Sunneen",
      text: "Combinado! Recebemos sua instrução e já registramos na entrega refrigerada.",
      time: "Agora",
    };
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, chatMessages: [...o.chatMessages, customerMsg, autoReply] }
          : o
      )
    );
  };

  // Simulate Incoming Order in KDS
  const handleSimulateIncomingOrder = () => {
    const randomProduct =
      products[Math.floor(Math.random() * 8)] || products[0];
    const randomNames = [
      "Gabriel Martins",
      "Helena Souza",
      "Carlos Eduardo",
      "Juliana Paiva",
    ];
    const pickedName =
      randomNames[Math.floor(Math.random() * randomNames.length)];
    const codeNum = Math.floor(1050 + Math.random() * 800);

    const simulated: DeliveryOrder = {
      id: `sim-${Date.now()}`,
      code: `#SUN-${codeNum}`,
      customerName: pickedName,
      customerPhone: "(11) 98877-3322",
      address: "Av. Brigadeiro Faria Lima, 2200 - Conj. 112",
      neighborhood: "Itaim Bibi / Vila Olímpia",
      deliveryMode: "delivery",
      status: "pending",
      createdAt: "Agora mesmo",
      estimatedMinutes: 28,
      items: [
        {
          cartItemId: `ci-sim-${Date.now()}`,
          productId: randomProduct.id,
          title: randomProduct.title,
          image: randomProduct.image,
          size: "300g (Regular)",
          unitPrice: randomProduct.price,
          quantity: 1,
          calories: randomProduct.calories,
          protein: randomProduct.protein,
          removedIngredients: [],
          addedExtras: [],
          selectedSauce: "Molho Padrão da Receita",
        },
      ],
      subtotal: randomProduct.price,
      deliveryFee: 5.9,
      discount: 0,
      courierTip: 5,
      total: randomProduct.price + 10.9,
      paymentMethod: "pix",
      paymentLabel: "PIX Instantâneo (Pago)",
      securityPin: "3322",
      bagTempCelsius: "3.0°C",
      courierName: "Lucas Ferreira",
      courierPhone: "(11) 97411-8892",
      courierVehicle: "E-Bike Refrigerada #08",
      courierRating: 4.98,
      courierProgress: 10,
      ecoPackaging: true,
      allergenAlert: "Zero Lactose",
      chatMessages: [],
    };

    setOrders((prev) => [simulated, ...prev]);
    showToast(`Novo pedido ${simulated.code} (${pickedName}) chegou na cozinha!`);
  };

  // View Switcher Tabs Configuration
  const viewTabs: {
    id: DeliveryViewTab;
    label: string;
    badge?: string;
    Icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "menu", label: "1. Cardápio & Loja", Icon: Utensils },
    { id: "builder", label: "2. Monte seu Bowl", badge: "Interativo", Icon: Sparkles },
    {
      id: "checkout",
      label: "3. Checkout",
      badge: totalBagCount > 0 ? `${totalBagCount}` : undefined,
      Icon: CreditCard,
    },
    {
      id: "tracking",
      label: "4. Rastreio GPS",
      badge: "Ao Vivo",
      Icon: Compass,
    },
    {
      id: "kitchen",
      label: "5. Cozinha (KDS)",
      badge: `${orders.filter((o) => o.status !== "delivered").length}`,
      Icon: ChefHat,
    },
    {
      id: "courier",
      label: "6. App Entregador",
      Icon: Bike,
    },
    {
      id: "subscriptions",
      label: "7. Planos Semanais",
      Icon: CalendarHeart,
    },
    {
      id: "analytics",
      label: "8. Painel Gerencial",
      Icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f5] text-zinc-800 font-sans antialiased selection:bg-[#f4a51c] selection:text-white flex flex-col">
      {/* NOTIFICAÇÃO FLUTUANTE (TOAST) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1b4332] text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <span className="w-6 h-6 rounded-full bg-[#f4a51c] text-[#123826] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* BARRA DE TELEMETRIA E CUPOM NO TOPO */}
      <div className="bg-gradient-to-r from-[#123826] via-[#1b4332] to-[#123826] text-emerald-50 text-xs py-2 px-4 border-b border-emerald-800/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#f4a51c] text-[#1b4332] font-black uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full">
              <ThermometerSnowflake className="w-3 h-3" />
              Logística Fria 3°C
            </span>
            <span className="text-[11px] font-medium text-emerald-100">
              Frete Refrigerado <strong>GRÁTIS</strong> em pedidos acima de R$ 79 ou com o cupom{" "}
              <button
                type="button"
                onClick={() => {
                  handleApplyCoupon("FRETEGRATIS");
                  showToast("Cupom FRETEGRATIS ativado na sua sacola!");
                }}
                className="underline font-black text-[#f4a51c] cursor-pointer"
              >
                FRETEGRATIS
              </button>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-emerald-200">
            <span>⚡ Tempo Médio: 22-30 min</span>
            <span>🌱 100% Non-GMO & Sem Conservantes</span>
          </div>
        </div>
      </div>

      {/* HEADER PRINCIPAL DO SISTEMA DE DELIVERY */}
      <header className="bg-white/95 backdrop-blur-md border-b border-zinc-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          {/* Logo + Link Voltar ao Site Institucional */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-full bg-zinc-100 hover:bg-emerald-50 text-[#1b4332] transition-colors flex items-center gap-1.5 text-xs font-bold pr-3"
              title="Voltar para a Página Inicial"
            >
              <ArrowLeft className="w-4 h-4 text-[#3a7d44]" />
              <span className="hidden sm:inline">Site Principal</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1b4332] to-[#3a7d44] flex items-center justify-center shadow-xs shrink-0">
                <Leaf className="w-4 h-4 text-[#f4a51c]" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-[#1b4332] leading-none block">
                  Sunneen<span className="text-[#e08e24]">.</span>{" "}
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#3a7d44]">
                    Delivery
                  </span>
                </span>
                <span className="text-[10px] text-zinc-500 font-semibold block">
                  {storeOpen
                    ? "● Cozinha Aberta • Av. Paulista, 1450"
                    : "○ Cozinha Pausada"}
                </span>
              </div>
            </div>
          </div>

          {/* Seletor Rápido de Região & Modalidade */}
          <div className="hidden lg:flex items-center gap-2 bg-[#faf9f5] p-1.5 rounded-full border border-zinc-200/90">
            <button
              type="button"
              onClick={() => setDeliveryMode("delivery")}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                deliveryMode === "delivery"
                  ? "bg-[#1b4332] text-white"
                  : "text-zinc-600 hover:text-[#1b4332]"
              }`}
            >
              Entrega
            </button>
            <button
              type="button"
              onClick={() => setDeliveryMode("pickup")}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                deliveryMode === "pickup"
                  ? "bg-[#1b4332] text-white"
                  : "text-zinc-600 hover:text-[#1b4332]"
              }`}
            >
              Retirada Grab N Go
            </button>

            <div className="h-4 w-px bg-zinc-300 mx-1" />

            <div className="flex items-center gap-1.5 pr-2 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#3a7d44]" />
              <select
                value={selectedNeighborhood.name}
                onChange={(e) => {
                  const found = NEIGHBORHOODS.find(
                    (n) => n.name === e.target.value
                  );
                  if (found) setSelectedNeighborhood(found);
                }}
                aria-label="Selecionar bairro de entrega"
                className="bg-transparent font-bold text-[#1b4332] text-xs focus:outline-none cursor-pointer"
              >
                {NEIGHBORHOODS.map((n) => (
                  <option key={n.name} value={n.name}>
                    {n.name} ({n.minTime}-{n.maxTime}m)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botão da Sacola com Contador e Subtotal */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="px-4 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white rounded-full text-xs font-black transition-all shadow-sm flex items-center gap-2.5 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#f4a51c]" />
                {totalBagCount > 0 && (
                  <span className=" -top-1.5 -right-2 bg-[#e08e24] text-white text-[9px] font-black px-1.5 rounded-full">
                    {totalBagCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Sacola</span>
              <span className="bg-emerald-950/80 px-2.5 py-0.5 rounded-full text-[#f4a51c]">
                {formatBRL(subtotal)}
              </span>
            </button>
          </div>
        </div>

        {/* BARRA DE NAVEGAÇÃO ENTRE TODAS AS VISUALIZAÇÕES DO ECOSSISTEMA DELIVERY */}
        <div className="bg-[#f4f7f4] border-t border-zinc-200/80 px-4 py-2 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mr-1.5 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#3a7d44]" />
              Visualizações:
            </span>
            {viewTabs.map((tab) => {
              const active = activeView === tab.id;
              const TabIcon = tab.Icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveView(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? "bg-[#1b4332] text-white shadow-xs"
                      : "bg-white text-zinc-700 border border-zinc-200/80 hover:border-[#3a7d44] hover:text-[#1b4332]"
                  }`}
                >
                  <TabIcon
                    className={`w-3.5 h-3.5 ${
                      active ? "text-[#f4a51c]" : "text-[#3a7d44]"
                    }`}
                  />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full ${
                        active
                          ? "bg-[#f4a51c] text-[#123826]"
                          : "bg-emerald-100 text-[#1b4332]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* CONTEÚDO DINÂMICO DE CADA VISUALIZAÇÃO */}
      <main className="flex-1">
        {activeView === "menu" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            {/* BANNERS DE DESTAQUE E CUPONS INTERATIVOS */}
            <div className="grid md:grid-cols-12 gap-5">
              <div className="md:col-span-8 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] rounded-2xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-2 max-w-xl relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#f4a51c]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Delivery Direto da Cozinha Artesanal
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
                    Comida Saudável de Verdade, Entregue a 3°C na Sua Porta.
                  </h1>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    Peça nossas Tigelas Deli, Wraps Artesanais e Sucos Prensados a Frio ou monte sua própria combinação com cálculo de macros ao vivo.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-5 relative z-10">
                  <button
                    type="button"
                    onClick={() => setActiveView("builder")}
                    className="px-5 py-2.5 bg-[#f4a51c] hover:bg-[#e08e24] text-[#123826] text-xs font-black uppercase tracking-wider rounded-full transition-all shadow-sm cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Monte Seu Bowl / Wrap</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView("subscriptions")}
                    className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/25 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer"
                  >
                    Ver Planos Semanais (-30%)
                  </button>
                </div>
              </div>

              {/* Card de Cupons Ativos */}
              <div className="md:col-span-4 bg-[#ebe6dc] rounded-2xl p-5 border border-zinc-200/90 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#3a7d44] flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Benefícios Clube Sunneen
                  </span>
                  <h2 className="text-base font-black text-[#1b4332] mt-1">
                    Cupons Disponíveis Hoje
                  </h2>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Clique em um cupom para ativá-lo direto na sua sacola:
                  </p>
                </div>

                <div className="space-y-2">
                  {Object.values(COUPONS).map((c) => {
                    const isApplied = appliedCoupon === c.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          handleApplyCoupon(c.code);
                          showToast(`Cupom ${c.code} aplicado!`);
                        }}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isApplied
                            ? "bg-[#1b4332] text-white border-[#1b4332]"
                            : "bg-white text-zinc-800 border-zinc-200 hover:border-[#3a7d44]"
                        }`}
                      >
                        <div>
                          <span className="text-xs font-black block">
                            {c.code}
                          </span>
                          <span
                            className={`text-[10px] block ${
                              isApplied ? "text-emerald-100" : "text-zinc-500"
                            }`}
                          >
                            {c.description}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                            isApplied
                              ? "bg-[#f4a51c] text-[#123826]"
                              : "bg-emerald-50 text-[#3a7d44]"
                          }`}
                        >
                          {isApplied ? "Ativo" : "Usar"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* BARRA DE PESQUISA, FILTROS DIETÉTICOS E ORDENAÇÃO */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-4">
              <div className="grid md:grid-cols-12 gap-3 items-center">
                {/* Busca */}
                <div className="md:col-span-5 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por prato, ingrediente (ex: salmão, quinoa, abacate)..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-zinc-300 bg-[#faf9f5] focus:bg-white focus:outline-none focus:border-[#3a7d44]"
                  />
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Filtros Dietéticos */}
                <div className="md:col-span-5 flex flex-wrap items-center gap-1.5">
                  {dietaryFilters.map((df) => {
                    const active = selectedDietary.includes(df.id);
                    return (
                      <button
                        key={df.id}
                        type="button"
                        onClick={() => toggleDietaryFilter(df.id)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer border ${
                          active
                            ? "bg-[#3a7d44] text-white border-[#3a7d44]"
                            : "bg-[#faf9f5] text-zinc-600 border-zinc-200 hover:border-[#3a7d44]"
                        }`}
                      >
                        {df.label}
                      </button>
                    );
                  })}
                </div>

                {/* Ordenação */}
                <div className="md:col-span-2">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as typeof sortBy)
                    }
                    aria-label="Ordenar cardápio"
                    className="w-full px-3 py-2 text-xs font-bold text-[#1b4332] rounded-xl border border-zinc-300 bg-[#faf9f5] focus:outline-none"
                  >
                    <option value="popular">Mais Pedidos</option>
                    <option value="price_asc">Menor Preço</option>
                    <option value="calories_asc">Menos Calorias</option>
                    <option value="protein_desc">Mais Proteína</option>
                  </select>
                </div>
              </div>

              {/* Abas de Categorias */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-zinc-100">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#1b4332] text-white shadow-2xs"
                        : "bg-zinc-100 text-zinc-600 hover:bg-emerald-50 hover:text-[#1b4332]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* GRADE DE PRODUTOS DO CARDÁPIO DE DELIVERY */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200/80 space-y-3">
                <p className="text-sm font-bold text-[#1b4332]">
                  Nenhum prato encontrado com esses filtros.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Todos");
                    setSelectedDietary([]);
                  }}
                  className="px-4 py-2 bg-[#1b4332] text-white text-xs font-bold rounded-full cursor-pointer"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${
                      !product.inStock ? "opacity-60" : ""
                    }`}
                  >
                    <div>
                      <div
                        onClick={() =>
                          product.inStock && openProductModal(product)
                        }
                        className="relative h-44 overflow-hidden cursor-pointer"
                      >
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 280px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-[#1b4332]/90 backdrop-blur text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                          {product.tag}
                        </span>
                        <span className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur text-[#1b4332] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <Star className="w-3 h-3 text-[#f4a51c] fill-current" />
                          {product.rating} ({product.reviewsCount})
                        </span>
                      </div>

                      <div className="p-4 space-y-2.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-[#3a7d44]">
                          <span className="uppercase tracking-wider">
                            {product.category}
                          </span>
                          <span className="flex items-center gap-1 text-zinc-400">
                            <Clock className="w-3 h-3" /> {product.prepTimeMin} min
                          </span>
                        </div>

                        <h3
                          onClick={() =>
                            product.inStock && openProductModal(product)
                          }
                          className="text-sm font-black text-[#1b4332] leading-snug cursor-pointer hover:text-[#3a7d44]"
                        >
                          {product.title}
                        </h3>

                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                          {product.desc}
                        </p>

                        {/* Pílulas de Calorias e Proteínas */}
                        <div className="flex items-center gap-1.5 pt-1 text-[10px] font-bold">
                          <span className="inline-flex items-center gap-1 text-[#e08e24] bg-amber-50 px-2 py-0.5 rounded-full">
                            <Flame className="w-3 h-3" />
                            {product.calories} kcal
                          </span>
                          <span className="inline-flex items-center gap-1 text-[#3a7d44] bg-emerald-50 px-2 py-0.5 rounded-full">
                            <Utensils className="w-3 h-3" />
                            {product.protein}g Prot
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rodapé do Card: Preço + Personalizar / Adicionar */}
                    <div className="p-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                      <div>
                        {product.originalPrice && (
                          <span className="text-[10px] text-zinc-400 line-through block">
                            {formatBRL(product.originalPrice)}
                          </span>
                        )}
                        <span className="text-base font-black text-[#1b4332]">
                          {formatBRL(product.price)}
                        </span>
                      </div>

                      {product.inStock ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openProductModal(product)}
                            className="px-3 py-1.5 rounded-full border border-zinc-300 hover:border-[#3a7d44] text-[11px] font-bold text-[#1b4332] hover:bg-emerald-50 transition-colors cursor-pointer"
                          >
                            Personalizar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(product)}
                            aria-label={`Adicionar ${product.title}`}
                            className="w-8 h-8 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform active:scale-95"
                          >
                            <Plus className="w-4 h-4 text-[#f4a51c]" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-black uppercase bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full">
                          Esgotado Hoje
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeView === "builder" && (
          <BowlBuilderView
            onAddCustomBowl={(item) => {
              setCart((prev) => [...prev, item]);
              setCartOpen(true);
              showToast(`${item.title} adicionado à sacola!`);
            }}
          />
        )}

        {activeView === "checkout" && (
          <CheckoutView
            cart={cart}
            subtotal={subtotal}
            discount={discount}
            deliveryMode={deliveryMode}
            setDeliveryMode={setDeliveryMode}
            selectedNeighborhood={selectedNeighborhood}
            setSelectedNeighborhood={setSelectedNeighborhood}
            onPlaceOrder={handlePlaceOrder}
            onBackToMenu={() => setActiveView("menu")}
          />
        )}

        {activeView === "tracking" && (
          <OrderTrackingView
            orders={orders}
            activeOrderId={activeOrderId}
            setActiveOrderId={setActiveOrderId}
            onAdvanceOrderStatus={handleAdvanceOrderStatus}
            onSendChatMessage={handleSendChatMessage}
            onRateOrder={(orderId, stars) => {
              setOrders((prev) =>
                prev.map((o) =>
                  o.id === orderId ? { ...o, rating: stars } : o
                )
              );
              showToast(`Obrigado pela avaliação de ${stars} estrelas!`);
            }}
            onReorder={(order) => {
              setCart(
                order.items.map((i) => ({
                  ...i,
                  cartItemId: `re-${Date.now()}-${Math.random()}`,
                }))
              );
              setCartOpen(true);
              showToast(`Itens do pedido ${order.code} adicionados à sacola!`);
            }}
          />
        )}

        {activeView === "kitchen" && (
          <KitchenKdsView
            orders={orders}
            products={products}
            storeOpen={storeOpen}
            setStoreOpen={setStoreOpen}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSimulateIncomingOrder={handleSimulateIncomingOrder}
            onToggleProductStock={(productId) => {
              setProducts((prev) =>
                prev.map((p) =>
                  p.id === productId ? { ...p, inStock: !p.inStock } : p
                )
              );
              showToast("Disponibilidade do prato atualizada no cardápio!");
            }}
          />
        )}

        {activeView === "courier" && (
          <CourierAppView
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onMoveCourierProgress={(orderId, progress) => {
              setOrders((prev) =>
                prev.map((o) =>
                  o.id === orderId ? { ...o, courierProgress: progress } : o
                )
              );
              showToast(`Posição GPS do entregador atualizada (${progress}%)!`);
            }}
          />
        )}

        {activeView === "subscriptions" && (
          <SubscriptionPlansView
            onSelectPlanToBag={(planTitle, price) => {
              const subItem: CartItem = {
                cartItemId: `sub-${Date.now()}`,
                productId: 888,
                title: planTitle,
                image:
                  "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
                size: "300g (Regular)",
                unitPrice: price,
                quantity: 1,
                calories: 1850,
                protein: 110,
                removedIngredients: [],
                addedExtras: [],
              };
              setCart((prev) => [...prev, subItem]);
              setCartOpen(true);
            }}
          />
        )}

        {activeView === "analytics" && <AdminAnalyticsView orders={orders} />}
      </main>

      {/* MODAL DE PERSONALIZAÇÃO DE PRODUTO */}
      {customizingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-zinc-200 my-8">
            <div className="relative h-48">
              <Image
                src={customizingProduct.image}
                alt={customizingProduct.title}
                fill
                sizes="600px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setCustomizingProduct(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 text-[#1b4332] flex items-center justify-center shadow-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-3 left-3 bg-[#1b4332]/95 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                {customizingProduct.tag}
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <h3 className="text-xl font-black text-[#1b4332]">
                  {customizingProduct.title}
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  {customizingProduct.desc}
                </p>
              </div>

              {/* Escolha de Tamanho */}
              {customizingProduct.category !== "Sucos & Bebidas" &&
                customizingProduct.category !== "Sobremesas Naturais" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#1b4332]">
                      1. Escolha o Tamanho da Porção
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(
                        ["300g (Regular)", "450g (Grande)"] as const
                      ).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setModalSize(sz)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            modalSize === sz
                              ? "bg-[#1b4332] text-white border-[#1b4332]"
                              : "bg-[#faf9f5] text-zinc-700 border-zinc-200"
                          }`}
                        >
                          <span className="text-xs font-black block">{sz}</span>
                          <span className="text-[10px] opacity-80">
                            {sz === "450g (Grande)"
                              ? "+ R$ 9,00 (+50% Proteína)"
                              : "Porção padrão"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Ingredientes da Receita (Desmarcar se quiser retirar) */}
              {customizingProduct.ingredients.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#1b4332]">
                    2. Ingredientes da Receita (Clique para remover)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {customizingProduct.ingredients.map((ing) => {
                      const removed = modalRemovedIngs.includes(ing);
                      return (
                        <button
                          key={ing}
                          type="button"
                          onClick={() =>
                            setModalRemovedIngs((prev) =>
                              prev.includes(ing)
                                ? prev.filter((x) => x !== ing)
                                : [...prev, ing]
                            )
                          }
                          className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                            removed
                              ? "bg-rose-50 border-rose-300 text-rose-600 line-through"
                              : "bg-emerald-50 border-emerald-200 text-[#1b4332]"
                          }`}
                        >
                          {removed ? `Sem ${ing}` : `✓ ${ing}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Adicionais Extras */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-[#1b4332]">
                  3. Turbinar com Ingredientes Extras (Opcional)
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {EXTRA_OPTIONS.slice(0, 6).map((ext) => {
                    const checked = modalExtras.some((e) => e.id === ext.id);
                    return (
                      <button
                        key={ext.id}
                        type="button"
                        onClick={() =>
                          setModalExtras((prev) =>
                            checked
                              ? prev.filter((e) => e.id !== ext.id)
                              : [...prev, ext]
                          )
                        }
                        className={`p-2.5 rounded-xl border text-left text-xs flex items-center justify-between cursor-pointer ${
                          checked
                            ? "bg-emerald-950 text-white border-[#1b4332]"
                            : "bg-[#faf9f5] text-zinc-700 border-zinc-200"
                        }`}
                      >
                        <div>
                          <span className="font-bold block">{ext.name}</span>
                          <span className="text-[10px] opacity-75">
                            +{ext.protein}g Prot • +{formatBRL(ext.price)}
                          </span>
                        </div>
                        <Check
                          className={`w-4 h-4 ${
                            checked ? "text-[#f4a51c]" : "opacity-20"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#1b4332] mb-1">
                  Observações para a Cozinha
                </label>
                <input
                  type="text"
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Ex: Enviar molho à parte, cortar wrap ao meio..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 bg-[#faf9f5]"
                />
              </div>

              {/* Botão Confirmar */}
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 bg-[#faf9f5] border border-zinc-200 rounded-full px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                    className="p-1 text-[#1b4332] cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-black w-5 text-center">
                    {modalQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalQty(modalQty + 1)}
                    className="p-1 text-[#1b4332] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmModalAdd}
                  className="flex-1 py-3 px-5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>Adicionar à Sacola</span>
                  <span className="text-[#f4a51c]">
                    {formatBRL(
                      (customizingProduct.price +
                        (modalSize === "450g (Grande)" ? 9 : 0) +
                        modalExtras.reduce((a, e) => a + e.price, 0)) *
                        modalQty
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GAVETA LATERAL DA SACOLA (SLIDE-OVER CART DRAWER) */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Topo da Sacola */}
            <div className="p-5 bg-[#1b4332] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#f4a51c]" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider">
                    Sua Sacola Refrigerada
                  </h3>
                  <span className="text-[11px] text-emerald-100/80 block">
                    {totalBagCount} item(ns) • Cadeia Fria Garantida
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="p-1.5 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Barra de Progresso de Frete Grátis */}
            <div className="bg-[#f4f7f4] px-5 py-3 border-b border-zinc-200/80 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                {isFreeShipping ? (
                  <span className="text-[#3a7d44]">
                    🎉 Parabéns! Você ganhou Entrega Refrigerada GRÁTIS!
                  </span>
                ) : (
                  <span className="text-[#1b4332]">
                    Faltam{" "}
                    <strong>
                      {formatBRL(Math.max(0, freeShippingThreshold - subtotal))}
                    </strong>{" "}
                    para Frete Grátis!
                  </span>
                )}
              </div>
              <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${Math.min(
                      100,
                      (subtotal / freeShippingThreshold) * 100
                    )}%`,
                  }}
                  className="h-full bg-[#3a7d44] transition-all duration-300"
                />
              </div>
            </div>

            {/* Lista de Itens na Sacola + Upsell */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-zinc-300 mx-auto" />
                  <p className="text-xs text-zinc-500">
                    Sua sacola ainda está vazia. Escolha seus pratos favoritos!
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="p-3.5 rounded-xl bg-[#faf9f5] border border-zinc-200/80 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 flex-1 min-w-0">
                          <span className="text-xs font-black text-[#1b4332] block">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-bold text-[#3a7d44] block">
                            {item.size} • {item.calories} kcal • {item.protein}g Prot
                          </span>
                          {item.removedIngredients.length > 0 && (
                            <span className="text-[10px] text-rose-600 block">
                              Sem: {item.removedIngredients.join(", ")}
                            </span>
                          )}
                          {item.addedExtras.length > 0 && (
                            <span className="text-[10px] text-zinc-600 block">
                              + {item.addedExtras.map((e) => e.name).join(", ")}
                            </span>
                          )}
                          <span className="text-xs font-black text-[#1b4332] block pt-1">
                            {formatBRL(item.unitPrice * item.quantity)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-full px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.cartItemId, -1)}
                            className="p-0.5 text-zinc-600 hover:text-rose-600 cursor-pointer"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="w-3.5 h-3.5" />
                            ) : (
                              <Minus className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="text-xs font-black w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.cartItemId, 1)}
                            className="p-0.5 text-[#1b4332] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upsell Inteligente: Complete sua refeição */}
                  <div className="pt-3 border-t border-zinc-100 space-y-2.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#3a7d44] block">
                      Complete sua refeição com 1 clique:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {products
                        .filter(
                          (p) =>
                            p.category === "Sucos & Bebidas" ||
                            p.category === "Sobremesas Naturais"
                        )
                        .slice(0, 2)
                        .map((up) => (
                          <button
                            key={up.id}
                            type="button"
                            onClick={() => handleQuickAdd(up)}
                            className="p-2.5 rounded-xl border border-zinc-200 hover:border-[#3a7d44] bg-white text-left flex items-center justify-between gap-2 cursor-pointer"
                          >
                            <div className="min-w-0">
                              <span className="text-[11px] font-bold text-[#1b4332] block truncate">
                                {up.title}
                              </span>
                              <span className="text-[10px] font-black text-[#e08e24]">
                                + {formatBRL(up.price)}
                              </span>
                            </div>
                            <Plus className="w-4 h-4 text-[#3a7d44] shrink-0" />
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Cupom de Desconto */}
                  <div className="pt-3 border-t border-zinc-100 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Cupom (ex: SUNNEEN10)"
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-300 bg-[#faf9f5] uppercase font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        className="px-4 py-2 bg-emerald-100 text-[#1b4332] text-xs font-black rounded-xl cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponFeedback && (
                      <p className="text-[11px] font-bold text-[#3a7d44]">
                        {couponFeedback}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Rodapé da Sacola */}
            {cart.length > 0 && (
              <div className="p-5 bg-[#faf9f5] border-t border-zinc-200 space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span>
                    <span>{formatBRL(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#3a7d44] font-bold">
                      <span>Cupom ({appliedCoupon})</span>
                      <span>- {formatBRL(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-500">
                    <span>Taxa de Entrega ({selectedNeighborhood.name})</span>
                    <span className="font-bold text-[#1b4332]">
                      {deliveryFee === 0 ? "GRÁTIS" : formatBRL(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-[#1b4332] pt-2 border-t border-zinc-200">
                    <span>Total Estimado</span>
                    <span>
                      {formatBRL(Math.max(0, subtotal - discount + deliveryFee))}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    setActiveView("checkout");
                  }}
                  className="w-full py-3.5 px-5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Avançar para o Checkout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
