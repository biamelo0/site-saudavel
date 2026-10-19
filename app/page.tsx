"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Leaf,
  Award,
  Truck,
  Heart,
  Star,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Flame,
  Utensils,
  ArrowRight,
  Menu,
  X,
  Zap,
  Dumbbell,
  Droplets,
  Sprout,
  ShoppingBag,
  Salad,
} from "lucide-react";

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Twitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const INGREDIENT_DETAILS = [
  {
    name: "Alface Romana",
    desc: "Colhida diariamente em fazendas parceiras locais, garantindo crocância máxima e folhas ricas em vitaminas A, C e K.",
    badge: "Colheita Diária",
    stats: { carb: "3g", fiber: "3g", cal: "50", vitC: "8%", vitA: "20%", iron: "2%" },
  },
  {
    name: "Tomate Fresco",
    desc: "Tomates amadurecidos naturalmente ao sol, ricos em licopeno e antioxidantes que realçam o frescor de cada mordida.",
    badge: "Rico em Licopeno",
    stats: { carb: "4g", fiber: "2g", cal: "35", vitC: "25%", vitA: "15%", iron: "3%" },
  },
  {
    name: "Pão Folha Integral",
    desc: "Massa fina artesanal feita com grãos 100% integrais moídos na pedra, oferecendo energia de absorção lenta e alto teor de fibras.",
    badge: "100% Grãos Integrais",
    stats: { carb: "18g", fiber: "5g", cal: "110", vitC: "0%", vitA: "2%", iron: "8%" },
  },
  {
    name: "Molho Chipotle",
    desc: "Receita exclusiva da casa preparada com pimentas defumadas, azeite extravirgem e especiarias naturais sem conservantes.",
    badge: "Receita Exclusiva",
    stats: { carb: "2g", fiber: "1g", cal: "65", vitC: "6%", vitA: "10%", iron: "1%" },
  },
  {
    name: "Bacon Defumado",
    desc: "Cortes selecionados defumados lentamente em madeira de macieira, sem nitritos artificiais, trazendo sabor intenso e equilibrado.",
    badge: "Sem Nitritos Artificiais",
    stats: { carb: "0g", fiber: "0g", cal: "90", vitC: "0%", vitA: "0%", iron: "4%" },
  },
  {
    name: "Sem Lactose",
    desc: "Cremosidade garantida pelo abacate Hass maduro e molhos vegetais, perfeito para intolerantes à lactose sem abrir mão do sabor.",
    badge: "100% Livre de Laticínios",
    stats: { carb: "6g", fiber: "5g", cal: "120", vitC: "12%", vitA: "8%", iron: "4%" },
  },
];

const PRODUCTS = [
  {
    id: 1,
    title: "Tigela Mediterrânea de Quinoa",
    category: "Tigelas Deli",
    tag: "Vegano • Sem Glúten",
    calories: "340 kcal",
    protein: "14g Proteína",
    price: "R$ 32,90",
    desc: "Quinoa tricolor orgânica, grão-de-bico assado com páprica, pepino crocante, tomate cereja, azeitonas Kalamata e molho tahine com limão.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Wrap de Abacate com Bacon",
    category: "Wraps Artesanais",
    tag: "Mais Vendido • Sem Lactose",
    calories: "420 kcal",
    protein: "22g Proteína",
    price: "R$ 29,90",
    desc: "Abacate Hass cremoso, bacon defumado artesanalmente, alface romana crocante, tomate fresco e toque de chipotle no pão folha integral.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Bowl Verde Detox & Edamame",
    category: "Tigelas Deli",
    tag: "100% Plant-Based",
    calories: "290 kcal",
    protein: "16g Proteína",
    price: "R$ 31,50",
    desc: "Mix de folhas escuras, edamame no vapor, abacate em cubos, sementes de abóbora tostadas, brotos frescos e vinagrete cítrico de gengibre.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Tacos Verdes de Tofu Grelhado",
    category: "Opções Veganas",
    tag: "Alto em Fibras",
    calories: "360 kcal",
    protein: "18g Proteína",
    price: "R$ 34,00",
    desc: "Tortilhas de milho não-transgênico recheadas com tofu orgânico marinado, repolho roxo cítrico, coentro fresco e creme de abacate.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Salada Proteica Colheita do Chef",
    category: "Saladas Proteicas",
    tag: "Rico em Proteína",
    calories: "390 kcal",
    protein: "28g Proteína",
    price: "R$ 36,90",
    desc: "Frango caipira grelhado em ervas finas, mix de folhas orgânicas, nozes pecan, maçã verde, sementes de girassol e mostarda com mel.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Tigela Tropical de Grãos & Manga",
    category: "Opções Veganas",
    tag: "Novo • Refrescante",
    calories: "310 kcal",
    protein: "12g Proteína",
    price: "R$ 30,90",
    desc: "Arroz negro integral, feijão preto temperado, cubos de manga madura, pimentão vermelho, castanha de caju e molho de maracujá.",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Poke Bowl de Salmão & Gergelim",
    category: "Tigelas Deli",
    tag: "Fonte de Ômega-3",
    calories: "440 kcal",
    protein: "30g Proteína",
    price: "R$ 42,90",
    desc: "Salmão fresco em cubos, arroz de jasmim integral, sunomono de pepino, abacate, manga, cebolinha, alga nori e molho ponzu artesanal.",
    image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Wrap de Frango ao Pesto de Manjericão",
    category: "Wraps Artesanais",
    tag: "Proteína Magra",
    calories: "380 kcal",
    protein: "26g Proteína",
    price: "R$ 31,90",
    desc: "Tiras de frango orgânico grelhado, pesto artesanal de manjericão com castanhas, tomate seco, rúcula selvagem e pão folha de espinafre.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    title: "Wrap Falafel Assado & Homus de Beterraba",
    category: "Wraps Artesanais",
    tag: "100% Vegano",
    calories: "350 kcal",
    protein: "15g Proteína",
    price: "R$ 28,90",
    desc: "Bolinhos de grão-de-bico assados com especiarias, homus cremoso de beterraba orgânica, folhas de hortelã, pepino e tahine cítrico.",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "Salada Caesar de Kale & Grão-de-Bico",
    category: "Saladas Proteicas",
    tag: "Clássico Reinventado",
    calories: "330 kcal",
    protein: "21g Proteína",
    price: "R$ 33,50",
    desc: "Couve kale massageada no azeite, frango grelhado, grão-de-bico crocante no lugar dos croutons, lascas de amêndoas e molho caesar leve.",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    title: "Suco Verde Prensado a Frio",
    category: "Sucos & Bebidas",
    tag: "Sem Adição de Açúcar",
    calories: "95 kcal",
    protein: "2g Proteína",
    price: "R$ 16,90",
    desc: "Extração a frio 100% pura de maçã verde, couve orgânica, pepino, hortelã fresca, gengibre e limão tahiti para máxima absorção de vitaminas.",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    title: "Elixir Dourado de Cúrcuma & Laranja",
    category: "Sucos & Bebidas",
    tag: "Imunidade • Antioxidante",
    calories: "110 kcal",
    protein: "2g Proteína",
    price: "R$ 17,50",
    desc: "Combinação revigorante de laranja bahia, cenoura baby, cúrcuma fresca, água de coco natural e uma pitada de pimenta-preta.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
  },
];

const GOALS = [
  {
    id: "energia",
    label: "Energia para o Dia",
    subtitle: "Foco & Disposição",
    Icon: Zap,
    recommendation: "Tigela Mediterrânea de Quinoa + Suco Prensado a Frio",
    description:
      "Carboidratos complexos de baixo índice glicêmico combinados com gorduras boas para manter seu foco e disposição por horas sem picos de açúcar.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    highlights: ["Baixo Índice Glicêmico", "Rico em Magnésio", "Saciedade Prolongada"],
    macros: { kcal: "410 kcal", prot: "16g", carb: "52g", fat: "14g" },
  },
  {
    id: "proteina",
    label: "Foco em Proteína",
    subtitle: "Pós-Treino & Força",
    Icon: Dumbbell,
    recommendation: "Salada Proteica Colheita do Chef + Wrap de Abacate",
    description:
      "Combinação ideal pós-treino com aminoácidos essenciais, proteínas magras e micronutrientes que aceleram a recuperação muscular com leveza.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    highlights: ["Alto Valor Biológico", "Aminoácidos Essenciais", "Zero Lactose"],
    macros: { kcal: "580 kcal", prot: "42g", carb: "34g", fat: "26g" },
  },
  {
    id: "leve",
    label: "Leve & Detox",
    subtitle: "Equilíbrio & Leveza",
    Icon: Droplets,
    recommendation: "Bowl Verde Detox & Edamame + Chá Verde Gelado",
    description:
      "Rico em clorofila, antioxidantes naturais e fibras solúveis que auxiliam a digestão e promovem saciedade com baixíssima caloria.",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    highlights: ["Ação Antioxidante", "Rico em Fibras", "Baixa Caloria"],
    macros: { kcal: "290 kcal", prot: "16g", carb: "24g", fat: "12g" },
  },
  {
    id: "vegano",
    label: "100% Plant-Based",
    subtitle: "Origem Vegetal",
    Icon: Sprout,
    recommendation: "Tacos Verdes de Tofu Orgânico + Tigela Tropical",
    description:
      "Refeição completa de origem 100% vegetal, livre de transgênicos e rica em ferro, cálcio vegetal e vitaminas do complexo B.",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    highlights: ["100% Vegano", "Tofu Orgânico Non-GMO", "Rico em Ferro"],
    macros: { kcal: "460 kcal", prot: "24g", carb: "48g", fat: "18g" },
  },
];

const FAQS = [
  {
    q: "Os alimentos da Sunneen possuem conservantes artificiais?",
    a: "Não! Todas as nossas tigelas, saladas, wraps e molhos são preparados diariamente com ingredientes 100% naturais, livres de transgênicos (Non-GMO), corantes ou conservantes químicos.",
  },
  {
    q: "Qual é a validade das tigelas prontas para levar (Grab N Go)?",
    a: "Como não utilizamos conservantes artificiais, nossas refeições frescas têm validade de até 4 dias sob refrigeração (entre 1°C e 4°C), mantendo toda a crocância e valor nutricional.",
  },
  {
    q: "Vocês fornecem em atacado para mercados, academias e cafés?",
    a: "Sim! Temos uma linha completa de Alimentos a Granel (Bulk Foods) e expositores refrigerados Grab N Go com entregas diárias para estabelecimentos parceiros.",
  },
  {
    q: "Existem opções para alérgicos a glúten e intolerantes à lactose?",
    a: "Com certeza. Grande parte do nosso cardápio é naturalmente sem glúten e sem lactose, e todas as embalagens possuem rotulagem clara e transparente de alergênicos.",
  },
];

export default function Home() {
  const [selectedIngredient, setSelectedIngredient] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedGoal, setSelectedGoal] = useState(GOALS[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "#home" },
    { label: "Sobre Nós", href: "#about" },
    { label: "Destaque", href: "#featured-wrap" },
    { label: "Nutrição", href: "#nutri-guide" },
    { label: "Cardápio", href: "#products" },
    { label: "Onde Comprar", href: "#where-to-buy" },
    { label: "Contato", href: "#contact" },
  ];

  const categories = [
    "Todos",
    "Tigelas Deli",
    "Wraps Artesanais",
    "Saladas Proteicas",
    "Opções Veganas",
    "Sucos & Bebidas",
  ];
  const filteredProducts =
    selectedCategory === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const currentIng = INGREDIENT_DETAILS[selectedIngredient];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div id="home" className="min-h-screen bg-white text-zinc-800 font-sans antialiased selection:bg-[#f4a51c] selection:text-white">
      {/* BARRA SUPERIOR DE ANÚNCIO */}
      <div className="bg-gradient-to-r from-[#123826] via-[#1b4332] to-[#123826] text-emerald-50 text-[11px] py-2 px-4 border-b border-emerald-800/50">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
          <span className="inline-flex items-center gap-1 bg-[#f4a51c] text-[#1b4332] font-black uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full shadow-xs">
            <Leaf className="w-3 h-3 fill-current" />
            Novidade
          </span>
          <p className="font-medium tracking-wide text-emerald-50/95">
            Conheça as novas <strong className="font-bold text-white">Tigelas Deli de 300g</strong> — 100% Naturais, Frescas e Sem Transgênicos!
          </p>
          <a
            href="#products"
            className="hidden sm:inline-flex items-center gap-1 text-[#f4a51c] hover:text-amber-300 font-bold uppercase tracking-wider text-[10px] underline underline-offset-4 transition-colors"
          >
            Ver Sabores
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 1. TOPO & NAVEGAÇÃO */}
      <header className="border-b border-zinc-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logótipo Minimalista & Moderno */}
          <a href="#home" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#1b4332] group-hover:bg-[#3a7d44] transition-colors flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-[#f4a51c] stroke-[2.4]" />
            </div>

            <div className="whitespace-nowrap flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-xl font-extrabold tracking-tight text-[#1b4332] leading-none">
                  sunneen
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4a51c]" />
              </div>
              <span className="text-[8.5px] uppercase font-bold tracking-[0.22em] text-zinc-400 leading-none mt-1">
                alimentos saudáveis
              </span>
            </div>
          </a>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  idx === 0
                    ? "bg-emerald-50 text-[#1b4332]"
                    : "text-zinc-600 hover:text-[#1b4332] hover:bg-zinc-100/80"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Pesquisa, Redes e Botão Mobile */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Pesquisar..."
                aria-label="Pesquisar"
                className="pl-8 pr-3 py-1.5 text-xs rounded-full border border-zinc-300 bg-zinc-50/60 focus:bg-white focus:outline-none focus:border-[#3a7d44] w-32 xl:w-40 transition-all focus:w-44"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>

            <div className="hidden sm:flex items-center gap-2 text-zinc-400">
              <a href="#" aria-label="Facebook" className="p-1.5 rounded-full hover:bg-emerald-50 hover:text-[#3a7d44] transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" aria-label="Twitter" className="p-1.5 rounded-full hover:bg-emerald-50 hover:text-[#3a7d44] transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" aria-label="LinkedIn" className="p-1.5 rounded-full hover:bg-emerald-50 hover:text-[#3a7d44] transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" aria-label="Instagram" className="p-1.5 rounded-full hover:bg-emerald-50 hover:text-[#3a7d44] transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>

            {/* Botão Menu Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu"
              className="lg:hidden p-2 rounded-lg text-[#1b4332] hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-100 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
            <div className="relative md:hidden">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                aria-label="Pesquisar"
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:border-[#3a7d44]"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>
            <nav className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-700 hover:bg-emerald-50 hover:text-[#1b4332] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative bg-[#ebe6dc] overflow-hidden py-16 md:py-24 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1b4332] shadow-sm border border-emerald-900/10">
              <Sparkles className="w-3.5 h-3.5 text-[#e08e24]" />
              <span>Alimentação Consciente, Prática e 100% Natural</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-serif italic text-[#3a7d44] tracking-wide block">
                Difícil de pronunciar,
              </span>
              <h1 className="text-5xl md:text-6xl font-black uppercase text-[#1b4332] tracking-tight leading-none">
                Fácil de amar.
              </h1>
            </div>

            <p className="text-sm text-zinc-600 max-w-md leading-relaxed">
              Preparamos diariamente refeições frescas, tigelas nutritivas e wraps artesanais com ingredientes colhidos no auge do sabor — sem transgênicos e prontos para acompanhar a sua rotina.
            </p>

            <div className="inline-flex items-center gap-3 bg-[#e08e24] text-white px-5 py-2.5 rounded-sm shadow-md text-xs font-semibold uppercase tracking-wider">
              <span className="bg-white/20 px-2 py-0.5 rounded font-black text-xs">3 NOVOS</span>
              <span>Tigelas Deli de 300g</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#products"
                className="px-6 py-3 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold uppercase tracking-wider rounded transition-all shadow hover:shadow-md inline-flex items-center gap-2"
              >
                Explorar Cardápio
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#where-to-buy"
                className="px-6 py-3 bg-white hover:bg-zinc-50 text-[#1b4332] border border-[#1b4332]/20 text-xs font-bold uppercase tracking-wider rounded transition-all shadow-sm"
              >
                Onde Encontrar
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl relative">
              <Image
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                alt="Tigela com salada fresca"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                priority
              />
            </div>

            {/* Selos flutuantes decorativos */}
            <div className="hidden sm:flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl shadow-lg border border-zinc-100 absolute -bottom-3 left-4 md:left-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#3a7d44] flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[11px] font-black text-[#1b4332] uppercase">100% Orgânico & Fresco</span>
                <span className="block text-[10px] text-zinc-500">Direto do produtor local</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl shadow-lg border border-zinc-100 absolute top-4 right-2 md:right-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-[#e08e24] flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[11px] font-black text-[#1b4332] uppercase">Baixa Caloria</span>
                <span className="block text-[10px] text-zinc-500">Alto teor de fibras e nutrientes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAIXA DE ESTATÍSTICAS RÁPIDAS */}
      <section className="relative z-20 -mt-8 pb-6 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-zinc-200/80 p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-zinc-200/80">
            <div className="flex items-center gap-4 lg:px-6 first:lg:pl-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-900/10 text-[#3a7d44] flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl md:text-3xl font-black text-[#1b4332] leading-none">+45</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#e08e24]">
                    Receitas Exclusivas
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Criadas por chefs e nutricionistas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:px-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-900/10 text-[#3a7d44] flex items-center justify-center shrink-0">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl md:text-3xl font-black text-[#1b4332] leading-none">100%</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#3a7d44]">
                    Sem Transgênicos
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Ingredientes puros e rastreáveis
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:px-6">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-900/10 text-[#e08e24] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl md:text-3xl font-black text-[#1b4332] leading-none">+180</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#e08e24]">
                    Pontos de Venda
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Abastecidos todas as manhãs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:px-6 last:lg:pr-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-900/10 text-[#3a7d44] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl md:text-3xl font-black text-[#1b4332] leading-none">0%</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#3a7d44]">
                    Conservantes
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Zero aditivos ou corantes químicos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WELCOME & 3 PILARES */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3a7d44]">
              Qualidade em Cada Detalhe
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1b4332]">
              Bem-vindo à Sunneen Alimentos Saudáveis
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Unimos praticidade, gastronomia natural e rigor nutricional para levar saúde de verdade à sua mesa, seja em casa, no trabalho ou no seu estabelecimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 border border-zinc-100 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center bg-gradient-to-b from-white to-zinc-50/50">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-[#3a7d44] mb-4 shadow-inner border border-emerald-900/10">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase tracking-wider text-sm text-zinc-800">Pronto para Levar</h3>
              <p className="text-xs text-zinc-500 mt-2 mb-5 leading-relaxed">
                Explore as nossas seleções frescas embaladas individualmente, perfeitas para um almoço rápido, nutritivo e cheio de sabor.
              </p>
              <a href="#products" className="mt-auto px-5 py-2 bg-[#e08e24] hover:bg-[#c97d1b] transition-colors text-white text-[11px] font-bold uppercase tracking-wider rounded">
                Ver Opções
              </a>
            </div>

            <div className="p-7 border border-zinc-100 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center bg-gradient-to-b from-white to-zinc-50/50">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-[#3a7d44] mb-4 shadow-inner border border-emerald-900/10">
                <Salad className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase tracking-wider text-sm text-zinc-800">Alimentos a Granel</h3>
              <p className="text-xs text-zinc-500 mt-2 mb-5 leading-relaxed">
                Disponibilizamos saladas, grãos, pastas e proteínas vegetais em embalagens ideais para restaurantes, empórios, hotéis e cafés.
              </p>
              <a href="#contact" className="mt-auto px-5 py-2 bg-[#e08e24] hover:bg-[#c97d1b] transition-colors text-white text-[11px] font-bold uppercase tracking-wider rounded">
                Para Empresas
              </a>
            </div>

            <div className="p-7 border border-zinc-100 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center bg-gradient-to-b from-white to-zinc-50/50">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-[#3a7d44] mb-4 shadow-inner border border-emerald-900/10">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase tracking-wider text-sm text-zinc-800">100% Sem Transgênicos</h3>
              <p className="text-xs text-zinc-500 mt-2 mb-5 leading-relaxed">
                Total compromisso com ingredientes naturais, rastreáveis e isentos de modificações genéticas, cultivados com respeito à terra.
              </p>
              <a href="#about" className="mt-auto px-5 py-2 bg-[#e08e24] hover:bg-[#c97d1b] transition-colors text-white text-[11px] font-bold uppercase tracking-wider rounded">
                Nossa Origem
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY BANNER */}
      <section id="about" className="relative py-16 bg-zinc-100 border-y border-zinc-200">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-2 gap-3 w-full md:w-1/2">
            <div className="relative h-36 sm:h-44 rounded-lg overflow-hidden shadow">
              <Image
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80"
                alt="Salada mista"
                fill
                sizes="(max-width: 768px) 50vw, 250px"
                className="object-cover"
              />
            </div>
            <div className="relative h-36 sm:h-44 rounded-lg overflow-hidden shadow">
              <Image
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80"
                alt="Salada colorida"
                fill
                sizes="(max-width: 768px) 50vw, 250px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-sm border border-zinc-200 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#3a7d44] block mb-1">
              Nossa História
            </span>
            <h3 className="text-2xl font-black text-[#1b4332] uppercase mb-3">
              Tradição em Fazer o Bem!
            </h3>
            <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
              A nossa paixão por hábitos alimentares mais saudáveis inspirou as receitas caseiras que deram início à Sunneen Alimentos Saudáveis. O que começou em uma pequena cozinha familiar hoje abastece milhares de pessoas que não abrem mão de comer bem todos os dias.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6 text-left text-[11px] text-zinc-700 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3a7d44] shrink-0" />
                <span>Produtores Familiares</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3a7d44] shrink-0" />
                <span>Receitas Artesanais</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3a7d44] shrink-0" />
                <span>Rastreabilidade Total</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3a7d44] shrink-0" />
                <span>Embalagens Recicláveis</span>
              </div>
            </div>
            <a
              href="#contact"
              className="inline-block px-6 py-2.5 bg-[#e08e24] hover:bg-[#c97d1b] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow"
            >
              Conheça Nossa Jornada
            </a>
          </div>
        </div>
      </section>

      {/* 5. PRODUTO PRINCIPAL INTERATIVO: WRAP DE ABACATE & TABELA NUTRICIONAL */}
      <section id="featured-wrap" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3a7d44] block">
            Raio-X do Sabor • Clique nos Ingredientes
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1b4332] tracking-wide">
            Wrap de Abacate com Bacon
          </h2>

          {/* Abas de ingredientes interativas */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold">
            {INGREDIENT_DETAILS.map((item, idx) => (
              <button
                key={item.name}
                onClick={() => setSelectedIngredient(idx)}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedIngredient === idx
                    ? "bg-[#e08e24] text-white shadow-sm scale-105"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Card de informação do ingrediente selecionado */}
          <div className="max-w-xl mx-auto bg-[#f4f7f4] border border-emerald-900/10 rounded-xl p-4 text-xs text-zinc-700">
            <span className="inline-block bg-[#3a7d44] text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full mb-1.5">
              {currentIng.badge}
            </span>
            <p className="leading-relaxed">
              <strong className="text-[#1b4332]">{currentIng.name}:</strong> {currentIng.desc}
            </p>
          </div>

          {/* Destaque central e fotografia */}
          <div className="relative py-8">
            <span className="absolute inset-0 flex items-center justify-center text-5xl sm:text-7xl md:text-8xl font-black text-zinc-100 select-none uppercase tracking-widest -z-10">
              Feito à Mão
            </span>

            <div className="relative w-72 sm:w-96 h-52 sm:h-64 mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80"
                alt="Wrap de Abacate com Bacon cortado"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Ficha com métricas nutricionais dinâmicas */}
          <div className="pt-4 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-b border-zinc-200 py-4">
            <div className="text-left font-serif italic text-2xl font-bold text-[#3a7d44]">
              Fresco
            </div>
            <div className="flex gap-4 sm:gap-6 text-center">
              <div>
                <span className="block text-sm font-bold text-zinc-800">{currentIng.stats.carb}</span>
                <span className="block text-[10px] text-zinc-400 uppercase">Carbo</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-zinc-800">{currentIng.stats.fiber}</span>
                <span className="block text-[10px] text-zinc-400 uppercase">Fibras</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-zinc-800">{currentIng.stats.cal}</span>
                <span className="block text-[10px] text-zinc-400 uppercase">Calorias</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-zinc-800">{currentIng.stats.vitC}</span>
                <span className="block text-[10px] text-zinc-400 uppercase">Vit C</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-zinc-800">{currentIng.stats.vitA}</span>
                <span className="block text-[10px] text-zinc-400 uppercase">Vit A</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-zinc-800">{currentIng.stats.iron}</span>
                <span className="block text-[10px] text-zinc-400 uppercase">Ferro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GUIA INTERATIVO DE REFEIÇÃO POR OBJETIVO */}
      <section id="nutri-guide" className="py-20 bg-[#ebe6dc]/60 border-y border-zinc-200">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Cabeçalho no mesmo padrão visual da página */}
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xl font-serif italic text-[#3a7d44] block">
              Nutrição Personalizada
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-[#1b4332] tracking-tight">
              Qual é o Seu Objetivo Hoje?
            </h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Selecione a sua meta do dia e descubra a combinação perfeita do nosso cardápio recomendada pelos nossos nutricionistas.
            </p>
          </div>

          {/* Seletor de Objetivos em formato elegante e alinhado ao design do site */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {GOALS.map((goal) => {
              const active = selectedGoal.id === goal.id;
              const GoalIcon = goal.Icon;
              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal)}
                  className={`p-5 rounded-xl text-center transition-all border cursor-pointer flex flex-col items-center gap-2 group ${
                    active
                      ? "bg-[#1b4332] border-[#1b4332] text-white shadow-md -translate-y-0.5"
                      : "bg-white border-zinc-200/90 text-zinc-700 hover:border-[#3a7d44] hover:shadow-xs"
                  }`}
                >
                  <span
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                      active
                        ? "bg-[#f4a51c] text-[#1b4332] shadow-sm"
                        : "bg-emerald-50 text-[#3a7d44] group-hover:bg-emerald-100"
                    }`}
                  >
                    <GoalIcon className="w-5 h-5 stroke-[2.2]" />
                  </span>
                  <span className="font-black text-xs uppercase tracking-wider block">
                    {goal.label}
                  </span>
                  <span
                    className={`text-[10px] font-medium ${
                      active ? "text-[#f4a51c]" : "text-zinc-400"
                    }`}
                  >
                    {goal.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Card de Recomendação integrado com foto, selos e barra nutricional */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-zinc-200/80 grid md:grid-cols-12 gap-8 items-center">
            {/* Imagem do combo recomendado */}
            <div className="md:col-span-5 relative h-56 sm:h-64 rounded-xl overflow-hidden shadow-md border-4 border-[#f4f7f4]">
              <Image
                src={selectedGoal.image}
                alt={selectedGoal.recommendation}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#e08e24] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                Sugestão do Chef
              </span>
            </div>

            {/* Conteúdo e Tabela Nutricional */}
            <div className="md:col-span-7 space-y-5 text-left">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#3a7d44] block">
                  Combinação Recomendada
                </span>
                <h3 className="text-xl md:text-2xl font-black text-[#1b4332] leading-snug">
                  {selectedGoal.recommendation}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {selectedGoal.description}
                </p>
              </div>

              {/* Selos de benefícios */}
              <div className="flex flex-wrap gap-2">
                {selectedGoal.highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-[#f4f7f4] border border-emerald-900/10 text-[#1b4332] text-[11px] font-semibold px-3 py-1 rounded-full"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3a7d44]" />
                    {item}
                  </span>
                ))}
              </div>

              {/* Faixa nutricional no mesmo estilo clássico da página */}
              <div className="border-t border-b border-zinc-200 py-3.5 flex flex-wrap items-center justify-between gap-4">
                <div className="font-serif italic text-xl font-bold text-[#3a7d44]">
                  Nutrição
                </div>
                <div className="flex gap-5 sm:gap-7 text-center">
                  <div>
                    <span className="block text-sm font-black text-[#1b4332]">{selectedGoal.macros.kcal}</span>
                    <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Energia</span>
                  </div>
                  <div>
                    <span className="block text-sm font-black text-[#3a7d44]">{selectedGoal.macros.prot}</span>
                    <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Proteínas</span>
                  </div>
                  <div>
                    <span className="block text-sm font-black text-[#e08e24]">{selectedGoal.macros.carb}</span>
                    <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Carboidratos</span>
                  </div>
                  <div>
                    <span className="block text-sm font-black text-zinc-800">{selectedGoal.macros.fat}</span>
                    <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Gorduras Boas</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e08e24] hover:bg-[#c97d1b] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-xs"
                >
                  Ver no Cardápio
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NON-GMO & INGREDIENTES + DIFERENCIAIS */}
      <section className="py-16 bg-[#f4f7f4]">
        <div className="max-w-5xl mx-auto px-4 space-y-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xl font-serif italic text-[#3a7d44] block">
                Ingredientes Puros
              </span>
              <h2 className="text-3xl font-black uppercase text-[#1b4332] tracking-tight">
                100% Sem Transgênicos
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Utilizamos exclusivamente ingredientes frescos de alta qualidade e de origem responsável. A nossa oferta inclui feijões orgânicos, tofu fresco, quinoa real, sementes selecionadas e vegetais colhidos no dia, preparados apenas com azeite extravirgem e temperos naturais.
              </p>
              <div className="pt-1">
                <a
                  href="#products"
                  className="inline-block px-5 py-2.5 bg-[#3a7d44] hover:bg-[#2d6a4f] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                >
                  Conhecer Ingredientes
                </a>
              </div>
            </div>

            <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
                alt="Tacos frescos e saudáveis"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>

          {/* 4 Pilares de Diferenciais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 pt-4">
            <div className="bg-white p-5 rounded-xl border border-zinc-200/70 shadow-xs space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#3a7d44]" />
              <h4 className="font-bold text-xs uppercase text-[#1b4332]">Selo Non-GMO</h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Ingredientes auditados e livres de qualquer modificação genética ou agrotóxicos pesados.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-zinc-200/70 shadow-xs space-y-2">
              <Truck className="w-6 h-6 text-[#e08e24]" />
              <h4 className="font-bold text-xs uppercase text-[#1b4332]">Logística Fria Diária</h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Frota refrigerada própria que garante que as tigelas cheguem frescas todas as manhãs.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-zinc-200/70 shadow-xs space-y-2">
              <Heart className="w-6 h-6 text-[#3a7d44]" />
              <h4 className="font-bold text-xs uppercase text-[#1b4332]">Cuidado Nutricional</h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Cardápio equilibrado com baixo teor de sódio e rico em fibras, vitaminas e antioxidantes.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-zinc-200/70 shadow-xs space-y-2">
              <Award className="w-6 h-6 text-[#e08e24]" />
              <h4 className="font-bold text-xs uppercase text-[#1b4332]">Sustentabilidade</h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Embalagens 100% recicláveis e compostáveis com desperdício zero na nossa cozinha central.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EQUIPA & COZINHA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-40 rounded-lg overflow-hidden shadow">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80"
                alt="Preparação na cozinha"
                fill
                sizes="(max-width: 768px) 50vw, 250px"
                className="object-cover"
              />
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden shadow">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
                alt="Chef de cozinha"
                fill
                sizes="(max-width: 768px) 50vw, 250px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xl font-serif italic text-[#3a7d44] block">
              Nossa Operação
            </span>
            <h2 className="text-3xl font-black uppercase text-[#1b4332] tracking-tight">
              Equipe Dedicada
            </h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Trabalhamos diariamente com equipes treinadas nas mais rigorosas práticas de segurança alimentar e no respeito pelo frescor dos alimentos do campo até a embalagem final.
            </p>
            <a
              href="#where-to-buy"
              className="inline-block px-5 py-2.5 bg-[#e08e24] hover:bg-[#c97d1b] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              Encontrar Loja
            </a>
          </div>
        </div>
      </section>

      {/* 9. CARDÁPIO EM DESTAQUE INTERATIVO (MAIS ABAIXO NA LANDING PAGE) */}
      <section id="products" className="py-20 bg-[#f8f9f7] border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xl font-serif italic text-[#3a7d44] block">
              Cardápio Completo
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-[#1b4332] tracking-tight">
              Nossas Criações Mais Amadas
            </h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Cada receita é elaborada por chefs e nutricionistas para entregar o equilíbrio perfeito entre texturas crocantes, temperos naturais e alta densidade nutricional.
            </p>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1b4332] text-white shadow-sm"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:border-[#3a7d44] hover:text-[#3a7d44]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grade de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1b4332]/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {product.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur text-[#1b4332] text-xs font-black px-3 py-1 rounded-full shadow">
                    {product.price}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#3a7d44]">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-black text-[#1b4332] mt-0.5">
                      {product.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      {product.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-bold text-zinc-600">
                    <span className="flex items-center gap-1 text-[#e08e24]">
                      <Flame className="w-3.5 h-3.5" />
                      {product.calories}
                    </span>
                    <span className="flex items-center gap-1 text-[#3a7d44]">
                      <Utensils className="w-3.5 h-3.5" />
                      {product.protein}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. NOVA SEÇÃO: DEPOIMENTOS DE CLIENTES */}
      <section className="py-16 bg-[#ebe6dc]/60 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3a7d44] block">
              Quem Prova, Recomenda
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b4332]">
              O Que Dizem Nossos Clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Mariana Costa",
                role: "Nutricionista Esportiva",
                text: "Indico as tigelas da Sunneen para todos os meus pacientes que têm rotina corrida. A lista de ingredientes é limpa de verdade e o sabor do molho chipotle artesanal é imbatível!",
              },
              {
                name: "Rafael Mendonça",
                role: "Gerente de Empório Natural",
                text: "Desde que colocamos a linha Grab N Go da Sunneen no nosso empório, o giro da geladeira triplicou. Os clientes adoram a transparência nutricional e a qualidade dos wraps.",
              },
              {
                name: "Camila Alencar",
                role: "Arquiteta & Maratonista",
                text: "O Wrap de Abacate com Bacon sem lactose e a Tigela Mediterrânea salvaram os meus almoços no escritório. É comida fresca de verdade, parece feita na hora em casa.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#f4a51c]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-600 italic leading-relaxed">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-100">
                  <span className="block text-xs font-black text-[#1b4332]">{item.name}</span>
                  <span className="block text-[10px] text-[#3a7d44] font-semibold">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. NOVA SEÇÃO: ONDE COMPRAR & PERGUNTAS FREQUENTES (FAQ) */}
      <section id="where-to-buy" className="py-20 bg-white border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
          {/* Onde Encontrar */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#e08e24] block mb-1">
                Pontos de Venda
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1b4332]">
                Onde Encontrar a Sunneen
              </h2>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Nossos produtos são entregues fresquinhos todas as manhãs nas melhores redes de mercados naturais, empórios gourmet e academias.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  store: "Empório Vida Verde - Jardins",
                  address: "Av. Paulista, 1450 • São Paulo, SP",
                  hours: "Seg a Sáb: 07h às 22h",
                  type: "Linha Completa & Grab N Go",
                },
                {
                  store: "Mercado Orgânico da Vila",
                  address: "Rua Harmonia, 320 • Vila Madalena, SP",
                  hours: "Todos os dias: 08h às 21h",
                  type: "Tigelas Deli & Opções Veganas",
                },
                {
                  store: "Bistrô & Café Saúde Plena",
                  address: "Al. Santos, 890 • Cerqueira César, SP",
                  hours: "Seg a Sex: 07h às 19h",
                  type: "Wraps Artesanais & Saladas",
                },
              ].map((loc) => (
                <div
                  key={loc.store}
                  className="p-4 rounded-xl border border-zinc-200 hover:border-[#3a7d44] transition-colors bg-[#f8f9f7] flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-[#1b4332] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#3a7d44]" />
                      {loc.store}
                    </h4>
                    <p className="text-[11px] text-zinc-500">{loc.address}</p>
                    <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {loc.hours}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-[#1b4332] px-2.5 py-1 rounded-full shrink-0">
                    {loc.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Perguntas Frequentes (FAQ) */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#3a7d44] block mb-1">
                Tire Suas Dúvidas
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1b4332]">
                Perguntas Frequentes
              </h2>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Tudo o que você precisa saber sobre nossos ingredientes, conservação e fornecimento para empresas.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="border border-zinc-200 rounded-xl overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-xs font-bold text-[#1b4332] hover:bg-zinc-50 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#3a7d44] shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 12. RODAPÉ */}
      <footer id="contact" className="bg-[#123826] text-white pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs pb-12 border-b border-emerald-900/50">
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4 text-[#e08e24]">Sobre a Sunneen</h4>
            <ul className="space-y-2 text-zinc-300">
              <li><a href="#home" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Sobre a Sunneen Alimentos Saudáveis</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Nossos Produtos</a></li>
              <li><a href="#where-to-buy" className="hover:text-white transition-colors">Onde Comprar</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4 text-[#e08e24]">Ajuda</h4>
            <ul className="space-y-2 text-zinc-300">
              <li><a href="#where-to-buy" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
              <li><a href="#nutri-guide" className="hover:text-white transition-colors">Guia Nutricional</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Parcerias & Atacado</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Envios e Entregas Refrigeradas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4 text-[#e08e24]">Contato</h4>
            <div className="space-y-2 text-zinc-300">
              <p>Email: contato@sunneen.com.br</p>
              <p>Telefone: 0800 798 9004</p>
              <p>Seg - Sex: 8:00 - 18:00</p>
              <p>Endereço: Av. Paulista, 1450 - São Paulo, SP</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4 text-[#e08e24]">Boletim Informativo</h4>
            <p className="text-zinc-300 mb-3">Inscreva-se para receber dicas de nutrição, receitas e novidades.</p>
            {newsletterSuccess ? (
              <div className="p-3 rounded bg-emerald-900/70 border border-emerald-700 text-emerald-100 text-xs">
                ✅ Obrigado por se inscrever! Em breve você receberá nossas novidades.
              </div>
            ) : (
              <form className="flex flex-col gap-2" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  placeholder="Digite o seu email"
                  aria-label="Digite o seu email para a newsletter"
                  className="px-3 py-2 bg-emerald-950/60 border border-emerald-800 rounded text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-[#e08e24]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#e08e24] hover:bg-[#c97d1b] font-bold uppercase tracking-wider rounded text-white transition-colors text-[11px] cursor-pointer"
                >
                  Inscrever-se
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400">
          <p>© 2026 Sunneen Alimentos Saudáveis - Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Termos e Condições</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
