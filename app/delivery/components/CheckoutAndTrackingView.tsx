"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  QrCode,
  CreditCard,
  Wallet,
  Copy,
  Check,
  Leaf,
  ThermometerSnowflake,
  MessageSquare,
  Send,
  Star,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Store,
  CalendarClock,
  Navigation,
  Lock,
} from "lucide-react";
import {
  CartItem,
  DeliveryMode,
  DeliveryOrder,
  NEIGHBORHOODS,
  OrderStatus,
  PICKUP_STORES,
  formatBRL,
} from "../data";

interface CheckoutViewProps {
  cart: CartItem[];
  subtotal: number;
  discount: number;
  deliveryMode: DeliveryMode;
  setDeliveryMode: (m: DeliveryMode) => void;
  selectedNeighborhood: (typeof NEIGHBORHOODS)[0];
  setSelectedNeighborhood: (n: (typeof NEIGHBORHOODS)[0]) => void;
  onPlaceOrder: (orderData: {
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
  }) => void;
  onBackToMenu: () => void;
}

export function CheckoutView({
  cart,
  subtotal,
  discount,
  deliveryMode,
  setDeliveryMode,
  selectedNeighborhood,
  setSelectedNeighborhood,
  onPlaceOrder,
  onBackToMenu,
}: CheckoutViewProps) {
  const [customerName, setCustomerName] = useState("Mariana Costa");
  const [customerPhone, setCustomerPhone] = useState("(11) 99812-4400");
  const [address, setAddress] = useState("Rua Oscar Freire, 720 - Apto 82");
  const [pickupStore, setPickupStore] = useState(PICKUP_STORES[0].name);
  const [scheduledSlot, setScheduledSlot] = useState("Hoje • 19:30 às 20:00");
  const [paymentMethod, setPaymentMethod] = useState<
    "pix" | "credit_card" | "vr_alelo" | "on_delivery"
  >("pix");
  const [courierTip, setCourierTip] = useState(5);
  const [ecoPackaging, setEcoPackaging] = useState(true);
  const [allergenAlert, setAllergenAlert] = useState("");
  const [cpfNota, setCpfNota] = useState("");
  const [copiedPix, setCopiedPix] = useState(false);

  const isFreeShipping = deliveryMode === "pickup" || subtotal >= 79;
  const deliveryFee = isFreeShipping ? 0 : selectedNeighborhood.fee;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee + (deliveryMode === "pickup" ? 0 : courierTip));

  const paymentLabels: Record<typeof paymentMethod, string> = {
    pix: "PIX Instantâneo (5% Cashback Clube Sunneen)",
    credit_card: "Cartão de Crédito Online (Visa/Mastercard)",
    vr_alelo: "Vale-Refeição (Alelo / Pluxee / Ticket / Caju)",
    on_delivery: "Pagamento na Entrega (Maquininha)",
  };

  const handleCopyPix = () => {
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder({
      customerName: customerName.trim() || "Cliente Sunneen",
      customerPhone: customerPhone.trim() || "(11) 99999-0000",
      address:
        deliveryMode === "pickup"
          ? `Retirada • ${pickupStore}`
          : address.trim() || "Av. Paulista, 1450",
      pickupStore: deliveryMode === "pickup" ? pickupStore : undefined,
      scheduledSlot: deliveryMode === "scheduled" ? scheduledSlot : undefined,
      paymentMethod,
      paymentLabel: paymentLabels[paymentMethod],
      courierTip: deliveryMode === "pickup" ? 0 : courierTip,
      ecoPackaging,
      allergenAlert: allergenAlert.trim() || undefined,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#3a7d44] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#1b4332]">
          Sua sacola está vazia
        </h2>
        <p className="text-xs text-zinc-500 max-w-md mx-auto">
          Adicione tigelas frescas, wraps artesanais ou monte sua combinação personalizada antes de finalizar o pedido.
        </p>
        <button
          type="button"
          onClick={onBackToMenu}
          className="px-6 py-3 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
        >
          Voltar para o Cardápio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-sm font-serif italic text-[#3a7d44] block">
            Finalização Segura • Cadeia Fria Garantida
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#1b4332] tracking-tight">
            Checkout & Pagamento
          </h2>
        </div>
        <button
          type="button"
          onClick={onBackToMenu}
          className="text-xs font-bold text-[#3a7d44] hover:text-[#1b4332] underline underline-offset-4 cursor-pointer"
        >
          ← Continuar comprando
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Dados de Entrega e Pagamento */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. MODALIDADE DE ENTREGA */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#1b4332] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#3a7d44]" />
              1. Como deseja receber sua refeição?
            </h3>

            <div className="grid sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: "delivery" as DeliveryMode,
                  title: "Entrega Expressa",
                  sub: `${selectedNeighborhood.minTime}-${selectedNeighborhood.maxTime} min • Bag 3°C`,
                  Icon: Truck,
                },
                {
                  id: "pickup" as DeliveryMode,
                  title: "Retirar na Loja",
                  sub: "Grab N Go • Sem Taxa",
                  Icon: Store,
                },
                {
                  id: "scheduled" as DeliveryMode,
                  title: "Agendar Horário",
                  sub: "Escolha a janela ideal",
                  Icon: CalendarClock,
                },
              ].map((m) => {
                const active = deliveryMode === m.id;
                const ModeIcon = m.Icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setDeliveryMode(m.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? "bg-[#1b4332] border-[#1b4332] text-white shadow-sm"
                        : "bg-[#faf9f5] border-zinc-200/80 text-zinc-700 hover:border-[#3a7d44]"
                    }`}
                  >
                    <ModeIcon
                      className={`w-4 h-4 mb-1.5 ${
                        active ? "text-[#f4a51c]" : "text-[#3a7d44]"
                      }`}
                    />
                    <span className="text-xs font-black block">{m.title}</span>
                    <span
                      className={`text-[10px] block mt-0.5 ${
                        active ? "text-emerald-100/80" : "text-zinc-500"
                      }`}
                    >
                      {m.sub}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Campos de Endereço ou Loja de Retirada */}
            {deliveryMode === "pickup" ? (
              <div className="space-y-2.5 pt-2">
                <label className="block text-xs font-bold text-[#1b4332]">
                  Selecione a unidade Sunneen para retirada sem fila:
                </label>
                {PICKUP_STORES.map((st) => (
                  <label
                    key={st.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      pickupStore === st.name
                        ? "bg-emerald-50/70 border-[#3a7d44]"
                        : "bg-[#faf9f5] border-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pickupStore"
                        checked={pickupStore === st.name}
                        onChange={() => setPickupStore(st.name)}
                        className="accent-[#1b4332]"
                      />
                      <div>
                        <span className="text-xs font-black text-[#1b4332] block">
                          {st.name}
                        </span>
                        <span className="text-[11px] text-zinc-500 block">
                          {st.address}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-white text-[#3a7d44] px-2.5 py-1 rounded-full border border-emerald-200">
                      {st.prepTime}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#1b4332] mb-1">
                    Região / Bairro (Cálculo de Logística Fria)
                  </label>
                  <select
                    value={selectedNeighborhood.name}
                    onChange={(e) => {
                      const found = NEIGHBORHOODS.find(
                        (n) => n.name === e.target.value
                      );
                      if (found) setSelectedNeighborhood(found);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-300 bg-[#faf9f5] font-semibold text-[#1b4332] focus:outline-none focus:border-[#3a7d44]"
                  >
                    {NEIGHBORHOODS.map((n) => (
                      <option key={n.name} value={n.name}>
                        {n.name} ({n.minTime}-{n.maxTime} min • Taxa {formatBRL(n.fee)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#1b4332] mb-1">
                    Endereço Completo com Número e Complemento
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-300 bg-[#faf9f5] focus:bg-white focus:outline-none focus:border-[#3a7d44]"
                  />
                </div>

                {deliveryMode === "scheduled" && (
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-[#1b4332] mb-1">
                      Janela de Horário Programada
                    </label>
                    <select
                      value={scheduledSlot}
                      onChange={(e) => setScheduledSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-300 bg-amber-50/60 font-bold text-[#1b4332]"
                    >
                      <option>Hoje • 19:30 às 20:00</option>
                      <option>Hoje • 20:30 às 21:00</option>
                      <option>Amanhã (Almoço) • 12:00 às 12:30</option>
                      <option>Amanhã (Almoço) • 13:00 às 13:30</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-3.5 pt-2 border-t border-zinc-100">
              <div>
                <label className="block text-[11px] font-bold text-[#1b4332] mb-1">
                  Seu Nome
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 bg-[#faf9f5]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1b4332] mb-1">
                  WhatsApp (Para aviso do entregador)
                </label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 bg-[#faf9f5]"
                />
              </div>
            </div>
          </div>

          {/* 2. PREFERÊNCIAS SUSTENTÁVEIS & ALERGÊNICOS */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#1b4332] flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#3a7d44]" />
              2. Sustentabilidade & Cuidado Nutricional
            </h3>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f4f7f4] border border-emerald-900/10 cursor-pointer">
              <input
                type="checkbox"
                checked={ecoPackaging}
                onChange={(e) => setEcoPackaging(e.target.checked)}
                className="mt-0.5 accent-[#1b4332]"
              />
              <div>
                <span className="text-xs font-black text-[#1b4332] block">
                  Dispenso talheres descartáveis (Embalagem 100% Eco)
                </span>
                <span className="text-[11px] text-zinc-600 block">
                  Ajude a Sunneen a economizar plástico/madeira e ganhe +15 pontos verdes no Clube Sunneen.
                </span>
              </div>
            </label>

            <div>
              <label className="block text-[11px] font-bold text-[#1b4332] mb-1">
                Possui alguma restrição ou alergia severa? (Destaque no painel da cozinha)
              </label>
              <input
                type="text"
                value={allergenAlert}
                onChange={(e) => setAllergenAlert(e.target.value)}
                placeholder="Ex: Celíaco, Alergia a Castanhas, Zero Lactose..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 bg-[#faf9f5]"
              />
            </div>
          </div>

          {/* 3. FORMA DE PAGAMENTO */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#1b4332] flex items-center gap-2">
              <Wallet className="w-4 h-4 text-[#3a7d44]" />
              3. Forma de Pagamento
            </h3>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: "pix" as const,
                  title: "PIX Instantâneo",
                  sub: "Aprovação imediata + 5% Cashback",
                  Icon: QrCode,
                },
                {
                  id: "credit_card" as const,
                  title: "Cartão de Crédito",
                  sub: "Visa, Mastercard, Elo, Apple Pay",
                  Icon: CreditCard,
                },
                {
                  id: "vr_alelo" as const,
                  title: "Vale-Refeição / Benefícios",
                  sub: "Alelo, Pluxee, Ticket, VR, Caju, Flash",
                  Icon: Sparkles,
                },
                {
                  id: "on_delivery" as const,
                  title: "Pagar na Entrega",
                  sub: "Levamos a maquininha até você",
                  Icon: Wallet,
                },
              ].map((pm) => {
                const active = paymentMethod === pm.id;
                const PmIcon = pm.Icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      active
                        ? "bg-[#1b4332] border-[#1b4332] text-white shadow-sm"
                        : "bg-[#faf9f5] border-zinc-200/80 text-zinc-700 hover:border-[#3a7d44]"
                    }`}
                  >
                    <PmIcon
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        active ? "text-[#f4a51c]" : "text-[#3a7d44]"
                      }`}
                    />
                    <div>
                      <span className="text-xs font-black block">{pm.title}</span>
                      <span
                        className={`text-[10px] block mt-0.5 ${
                          active ? "text-emerald-100/80" : "text-zinc-500"
                        }`}
                      >
                        {pm.sub}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {paymentMethod === "pix" && (
              <div className="p-4 rounded-xl bg-[#f4f7f4] border border-emerald-900/10 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 rounded-xl bg-white border border-zinc-200 p-2 flex flex-col items-center justify-center shrink-0">
                  <QrCode className="w-16 h-16 text-[#1b4332]" />
                  <span className="text-[8px] font-bold uppercase text-zinc-400">
                    PIX Sunneen
                  </span>
                </div>
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-[#1b4332] px-2.5 py-0.5 rounded-full">
                    Código PIX Copia e Cola Pronto
                  </span>
                  <p className="text-xs text-zinc-600">
                    Escaneie o QR Code ou copie a chave abaixo. Assim que clicar em Confirmar Pedido, sua refeição vai direto para a cozinha!
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-zinc-300 rounded-lg text-xs font-bold text-[#1b4332] hover:border-[#3a7d44] cursor-pointer"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#3a7d44]" />
                        <span>Código PIX Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#3a7d44]" />
                        <span>Copiar Código PIX</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
              {deliveryMode !== "pickup" && (
                <div>
                  <label className="block text-[11px] font-bold text-[#1b4332] mb-1.5">
                    Gorjeta para o Entregador Parceiro (100% repassada)
                  </label>
                  <div className="flex gap-1.5">
                    {[0, 3, 5, 10].map((tip) => (
                      <button
                        key={tip}
                        type="button"
                        onClick={() => setCourierTip(tip)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          courierTip === tip
                            ? "bg-[#e08e24] border-[#e08e24] text-white"
                            : "bg-[#faf9f5] border-zinc-200 text-zinc-600"
                        }`}
                      >
                        {tip === 0 ? "Sem" : `R$ ${tip}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-[11px] font-bold text-[#1b4332] mb-1.5">
                  CPF/CNPJ na Nota Paulista (opcional)
                </label>
                <input
                  type="text"
                  value={cpfNota}
                  onChange={(e) => setCpfNota(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full px-3.5 py-1.5 text-xs rounded-lg border border-zinc-300 bg-[#faf9f5]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Resumo do Pedido & Confirmação */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-md space-y-4">
            <h3 className="text-base font-black text-[#1b4332] border-b border-zinc-100 pb-3">
              Resumo do Seu Pedido ({cart.reduce((a, i) => a + i.quantity, 0)} itens)
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-start justify-between gap-3 text-xs border-b border-zinc-100 pb-2.5"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-emerald-50 text-[#1b4332] font-black flex items-center justify-center text-[11px] shrink-0">
                      {item.quantity}x
                    </span>
                    <div>
                      <span className="font-bold text-[#1b4332] block">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 block">
                        {item.size} • {item.calories} kcal • {item.protein}g Prot
                      </span>
                      {item.addedExtras.length > 0 && (
                        <span className="text-[10px] text-[#3a7d44] block">
                          + {item.addedExtras.map((e) => e.name).join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-black text-[#1b4332] shrink-0">
                    {formatBRL(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Balanço Nutricional Total do Pedido */}
            <div className="bg-[#f4f7f4] rounded-xl p-3 border border-emerald-900/10 flex items-center justify-between text-xs">
              <span className="font-bold text-[#1b4332]">
                Valor Nutricional do Pedido:
              </span>
              <span className="font-black text-[#3a7d44]">
                {cart.reduce((a, i) => a + i.calories * i.quantity, 0)} kcal •{" "}
                {cart.reduce((a, i) => a + i.protein * i.quantity, 0)}g Proteína
              </span>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-zinc-100">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal dos Itens</span>
                <span className="font-semibold">{formatBRL(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#3a7d44] font-bold">
                  <span>Desconto Aplicado</span>
                  <span>- {formatBRL(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Taxa de Entrega Refrigerada</span>
                <span className="font-bold text-[#1b4332]">
                  {deliveryFee === 0 ? "GRÁTIS" : formatBRL(deliveryFee)}
                </span>
              </div>
              {deliveryMode !== "pickup" && courierTip > 0 && (
                <div className="flex justify-between text-zinc-600">
                  <span>Gorjeta do Entregador</span>
                  <span className="font-semibold">{formatBRL(courierTip)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-[#1b4332] pt-2 border-t border-zinc-200">
                <span>Total a Pagar</span>
                <span>{formatBRL(finalTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#f4a51c]" />
              <span>Confirmar Pedido & Acompanhar ao Vivo</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

interface OrderTrackingViewProps {
  orders: DeliveryOrder[];
  activeOrderId: string;
  setActiveOrderId: (id: string) => void;
  onAdvanceOrderStatus: (orderId: string) => void;
  onSendChatMessage: (orderId: string, text: string) => void;
  onRateOrder: (orderId: string, stars: number) => void;
  onReorder: (order: DeliveryOrder) => void;
}

export function OrderTrackingView({
  orders,
  activeOrderId,
  setActiveOrderId,
  onAdvanceOrderStatus,
  onSendChatMessage,
  onRateOrder,
  onReorder,
}: OrderTrackingViewProps) {
  const [chatInput, setChatInput] = useState("");
  const activeOrder =
    orders.find((o) => o.id === activeOrderId) || orders[0];

  if (!activeOrder) {
    return null;
  }

  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    {
      status: "pending",
      label: "Pedido Recebido",
      desc: "Confirmado pela central Sunneen",
    },
    {
      status: "preparing",
      label: "Preparo Artesanal",
      desc: "Cortes frescos e montagem na bancada fria",
    },
    {
      status: "ready",
      label: "Embalado & Lacrado (3°C)",
      desc: "Conferência nutricional e selo de segurança",
    },
    {
      status: "delivering",
      label: "Em Rota Refrigerada",
      desc: "Entregador a caminho com Ecobag Térmica",
    },
    {
      status: "delivered",
      label: "Entregue",
      desc: "Bom apetite! Refeição fresca entregue",
    },
  ];

  const statusOrder: OrderStatus[] = [
    "pending",
    "preparing",
    "ready",
    "delivering",
    "delivered",
  ];
  const currentStepIdx = Math.max(
    0,
    statusOrder.indexOf(activeOrder.status)
  );

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendChatMessage(activeOrder.id, chatInput.trim());
    setChatInput("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Seletor de Pedidos Ativos e Histórico */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-sm font-serif italic text-[#3a7d44] block">
            Telemetria & Rastreamento em Tempo Real
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#1b4332] tracking-tight">
            Acompanhe Seu Pedido
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {orders.map((ord) => (
            <button
              key={ord.id}
              type="button"
              onClick={() => setActiveOrderId(ord.id)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                ord.id === activeOrder.id
                  ? "bg-[#1b4332] text-white border-[#1b4332] shadow-xs"
                  : "bg-white text-zinc-700 border-zinc-200 hover:border-[#3a7d44]"
              }`}
            >
              <span>{ord.code}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  ord.status === "delivered"
                    ? "bg-emerald-400"
                    : "bg-[#f4a51c] animate-pulse"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Mapa ao Vivo + Linha do Tempo (8 colunas) */}
        <div className="lg:col-span-8 space-y-6">
          {/* MAPA INTERATIVO DE RASTREAMENTO AO VIVO */}
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-md overflow-hidden">
            {/* Barra de Telemetria do Mapa */}
            <div className="bg-[#1b4332] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="bg-[#f4a51c] text-[#1b4332] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {activeOrder.code}
                </span>
                <div>
                  <span className="text-xs font-black block">
                    {activeOrder.status === "delivered"
                      ? "Pedido Entregue com Sucesso!"
                      : `Previsão de Chegada: ~${activeOrder.estimatedMinutes} min`}
                  </span>
                  <span className="text-[11px] text-emerald-100/80 block">
                    Destino: {activeOrder.address}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-emerald-900/80 border border-emerald-700 px-3 py-1.5 rounded-full text-xs">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-300" />
                  <span className="font-bold text-emerald-50">
                    Bag: {activeOrder.bagTempCelsius}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-400/20 border border-[#f4a51c]/50 px-3 py-1.5 rounded-full text-xs">
                  <Lock className="w-3.5 h-3.5 text-[#f4a51c]" />
                  <span className="font-black text-[#f4a51c]">
                    PIN: {activeOrder.securityPin}
                  </span>
                </div>
              </div>
            </div>

            {/* Canvas Visual do Mapa GPS */}
            <div className="relative h-64 sm:h-72 bg-[#e8ede7] overflow-hidden select-none">
              {/* Grade estilizada de quarteirões e avenidas de São Paulo */}
              <svg
                viewBox="0 0 800 320"
                className="w-full h-full object-cover"
                preserveAspectRatio="none"
              >
                <rect width="800" height="320" fill="#e9efe8" />
                {/* Parques / Áreas Verdes */}
                <rect x="40" y="20" width="160" height="90" rx="16" fill="#d3e4d4" />
                <rect x="560" y="190" width="190" height="100" rx="16" fill="#d3e4d4" />
                {/* Ruas secundárias */}
                <path
                  d="M0 70 H800 M0 160 H800 M0 250 H800 M140 0 V320 M310 0 V320 M490 0 V320 M660 0 V320"
                  stroke="#ffffff"
                  strokeWidth="10"
                />
                {/* Avenida Paulista / Rota Principal */}
                <path
                  d="M90 240 C 230 240, 280 110, 440 110 C 560 110, 620 180, 700 140"
                  stroke="#cbd5cb"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Linha tracejada da rota ativa */}
                <path
                  d="M140 220 C 260 220, 310 120, 450 120 C 560 120, 610 160, 670 140"
                  stroke="#1b4332"
                  strokeWidth="5"
                  strokeDasharray="10 8"
                  fill="none"
                />
              </svg>

              {/* Rótulos de Ruas no Mapa */}
              <span className="absolute top-3 left-4 bg-white/85 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-[#1b4332] shadow-2xs">
                📍 Cozinha Central Av. Paulista, 1450
              </span>
              <span className="absolute bottom-3 right-4 bg-white/85 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-[#1b4332] shadow-2xs">
                🏠 Seu Endereço ({activeOrder.neighborhood})
              </span>

              {/* Pino da Cozinha Sunneen */}
              <div className="absolute left-[15%] bottom-[26%] -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-[#1b4332] text-white border-4 border-white shadow-md flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-[#f4a51c]" />
                </div>
                <span className="mt-1 bg-[#1b4332] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  Cozinha Sunneen
                </span>
              </div>

              {/* Pino Dinâmico do Entregador (Move conforme o progresso) */}
              <div
                style={{
                  left: `${18 + (activeOrder.courierProgress / 100) * 64}%`,
                  bottom: `${28 + Math.sin((activeOrder.courierProgress / 100) * Math.PI) * 26}%`,
                }}
                className="absolute -translate-x-1/2 translate-y-1/2 transition-all duration-700 flex flex-col items-center z-20"
              >
                <div className="px-2.5 py-1 rounded-full bg-[#e08e24] text-white text-[10px] font-black shadow-md whitespace-nowrap mb-1 flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  <span>{activeOrder.courierName.split(" ")[0]}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#f4a51c] text-[#1b4332] border-4 border-white shadow-xl flex items-center justify-center animate-bounce">
                  <Truck className="w-5 h-5" />
                </div>
              </div>

              {/* Pino do Cliente */}
              <div className="absolute left-[82%] bottom-[52%] -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-[#3a7d44] text-white border-4 border-white shadow-md flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="mt-1 bg-white text-[#1b4332] text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                  Entrega
                </span>
              </div>
            </div>

            {/* Linha do Tempo Interativa + Simulador de Avanço */}
            <div className="p-5 sm:p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#3a7d44] block">
                    Status da Operação
                  </span>
                  <h3 className="text-base font-black text-[#1b4332]">
                    Linha do Tempo do Pedido
                  </h3>
                </div>

                {activeOrder.status !== "delivered" && (
                  <button
                    type="button"
                    onClick={() => onAdvanceOrderStatus(activeOrder.id)}
                    className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-[#1b4332] border border-[#f4a51c] rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#e08e24]" />
                    <span>Simular Próxima Etapa</span>
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-5 gap-3">
                {steps.map((st, idx) => {
                  const completed = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;
                  return (
                    <div
                      key={st.status}
                      className={`p-3 rounded-xl border transition-all ${
                        isCurrent
                          ? "bg-[#1b4332] border-[#1b4332] text-white shadow-sm"
                          : completed
                          ? "bg-emerald-50/70 border-emerald-200 text-[#1b4332]"
                          : "bg-[#faf9f5] border-zinc-200/70 text-zinc-400"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-black uppercase">
                          0{idx + 1}
                        </span>
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            isCurrent
                              ? "text-[#f4a51c]"
                              : completed
                              ? "text-[#3a7d44]"
                              : "text-zinc-300"
                          }`}
                        />
                      </div>
                      <span className="text-xs font-black block leading-snug">
                        {st.label}
                      </span>
                      <span
                        className={`text-[10px] block mt-1 leading-relaxed ${
                          isCurrent
                            ? "text-emerald-100/85"
                            : completed
                            ? "text-zinc-600"
                            : "text-zinc-400"
                        }`}
                      >
                        {st.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Avaliação do Pedido ou Chat ao Vivo */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#1b4332] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#3a7d44]" />
                Chat Direto com Cozinha & Entregador
              </h3>
              <span className="text-[11px] font-bold text-[#3a7d44]">
                ● Atendimento Online ({activeOrder.courierName})
              </span>
            </div>

            <div className="bg-[#faf9f5] rounded-xl p-4 border border-zinc-200/70 space-y-3 max-h-56 overflow-y-auto">
              {activeOrder.chatMessages.length === 0 ? (
                <p className="text-xs text-zinc-400 text-center py-4">
                  Nenhuma mensagem ainda. Envie uma mensagem para a cozinha ou entregador abaixo!
                </p>
              ) : (
                activeOrder.chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "customer" ? "items-end" : "items-start"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-zinc-400 mb-0.5">
                      {msg.senderName} • {msg.time}
                    </span>
                    <div
                      className={`px-3.5 py-2 rounded-xl text-xs max-w-md ${
                        msg.sender === "customer"
                          ? "bg-[#1b4332] text-white"
                          : "bg-white border border-zinc-200 text-zinc-700"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ex: Pode deixar na portaria com o Sr. José, por favor..."
                className="flex-1 px-4 py-2.5 text-xs rounded-full border border-zinc-300 bg-[#faf9f5] focus:bg-white focus:outline-none focus:border-[#3a7d44]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#f4a51c]" />
                <span>Enviar</span>
              </button>
            </form>
          </div>
        </div>

        {/* Coluna Direita: Detalhes do Pedido, Entregador & Pedir Novamente */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card do Entregador / Logística */}
          <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#3a7d44]">
                Parceiro Logístico Sunneen
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-black text-[#e08e24]">
                <Star className="w-3.5 h-3.5 fill-current" />
                {activeOrder.courierRating}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1b4332] flex items-center justify-center font-black text-base">
                {activeOrder.courierName.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-black text-[#1b4332]">
                  {activeOrder.courierName}
                </h4>
                <p className="text-xs text-zinc-500">
                  {activeOrder.courierVehicle}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f4f7f4] border border-emerald-900/10 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-500">Código de Segurança:</span>
                <span className="font-black text-[#1b4332]">
                  {activeOrder.securityPin} (4 últimos dígitos)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Pagamento:</span>
                <span className="font-bold text-[#3a7d44]">
                  {activeOrder.paymentLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Recibo & Itens do Pedido */}
          <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h4 className="text-sm font-black text-[#1b4332]">
                  Itens do Pedido {activeOrder.code}
                </h4>
                <span className="text-[11px] text-zinc-400">
                  Realizado: {activeOrder.createdAt}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onReorder(activeOrder)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#e08e24] hover:text-[#c97d1b] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repetir Pedido</span>
              </button>
            </div>

            <div className="space-y-3">
              {activeOrder.items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center gap-3 text-xs"
                >
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-zinc-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-[#1b4332] block truncate">
                      {item.quantity}x {item.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">
                      {item.size} • {item.calories} kcal
                    </span>
                  </div>
                  <span className="font-black text-[#1b4332]">
                    {formatBRL(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>{formatBRL(activeOrder.subtotal)}</span>
              </div>
              {activeOrder.discount > 0 && (
                <div className="flex justify-between text-[#3a7d44] font-bold">
                  <span>Desconto</span>
                  <span>- {formatBRL(activeOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-500">
                <span>Entrega Refrigerada</span>
                <span>
                  {activeOrder.deliveryFee === 0
                    ? "Grátis"
                    : formatBRL(activeOrder.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#1b4332] pt-2 border-t border-zinc-200">
                <span>Total Pago</span>
                <span>{formatBRL(activeOrder.total)}</span>
              </div>
            </div>

            {/* Avaliação com Estrelas */}
            <div className="pt-3 border-t border-zinc-100 text-center space-y-2">
              <span className="text-[11px] font-bold text-zinc-500 block">
                Como foi sua experiência com este pedido?
              </span>
              <div className="flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => onRateOrder(activeOrder.id, star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        (activeOrder.rating || 0) >= star
                          ? "text-[#f4a51c] fill-current"
                          : "text-zinc-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
