"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Award,
  Clock,
  Leaf,
  CheckCircle2,
  Calendar,
  Sparkles,
  BarChart3,
  MapPin,
  Users,
  ShoppingBag,
  Star,
} from "lucide-react";
import {
  DeliveryOrder,
  SUBSCRIPTION_PLANS,
  formatBRL,
} from "../data";

export function SubscriptionPlansView({
  onSelectPlanToBag,
}: {
  onSelectPlanToBag: (planTitle: string, price: number) => void;
}) {
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "Segunda-feira",
    "Quarta-feira",
  ]);
  const [subscribedPlanId, setSubscribedPlanId] = useState<string | null>(null);

  const days = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
  ];

  const toggleDay = (d: string) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-base font-serif italic text-[#3a7d44] block">
          Clube Sunneen • Nutrição Recorrente
        </span>
        <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#1b4332] tracking-tight">
          Assinatura Semanal de Refeições Frescas
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Receba nossas tigelas e wraps preparados no dia, com até 30% de desconto, frete refrigerado grátis e acompanhamento nutricional incluso.
        </p>
      </div>

      {/* Seletor de Dias de Entrega Programada */}
      <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs max-w-3xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#1b4332] flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#3a7d44]" />
            Escolha os dias em que deseja receber suas entregas matinais:
          </span>
          <span className="text-[11px] font-bold text-[#3a7d44]">
            Frota Refrigerada 07h às 10h
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {days.map((d) => {
            const active = selectedDays.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => toggleDay(d)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  active
                    ? "bg-[#1b4332] border-[#1b4332] text-white"
                    : "bg-[#faf9f5] border-zinc-200 text-zinc-600 hover:border-[#3a7d44]"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards dos Planos */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isSubbed = subscribedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all border ${
                plan.highlighted
                  ? "bg-[#1b4332] text-white border-[#1b4332] shadow-xl scale-[1.02]"
                  : "bg-white text-zinc-800 border-zinc-200/90 shadow-xs"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                      plan.highlighted
                        ? "bg-[#f4a51c] text-[#123826]"
                        : "bg-emerald-100 text-[#1b4332]"
                    }`}
                  >
                    {plan.badge}
                  </span>
                  <span className="text-xs font-bold opacity-80">
                    {plan.mealsPerWeek} refeições/sem
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-xl font-black ${
                      plan.highlighted ? "text-white" : "text-[#1b4332]"
                    }`}
                  >
                    {plan.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      plan.highlighted ? "text-emerald-100/80" : "text-zinc-500"
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-current/10">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`text-3xl font-black ${
                        plan.highlighted ? "text-[#f4a51c]" : "text-[#1b4332]"
                      }`}
                    >
                      {formatBRL(plan.pricePerMeal)}
                    </span>
                    <span className="text-xs opacity-75">/ por refeição</span>
                  </div>
                  <span className="text-[11px] opacity-80 block mt-0.5">
                    Total semanal: {formatBRL(plan.totalWeekly)} (Economia de{" "}
                    {plan.savingsPercent}%)
                  </span>
                </div>

                <ul className="space-y-2.5 pt-2">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-xs">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.highlighted ? "text-[#f4a51c]" : "text-[#3a7d44]"
                        }`}
                      />
                      <span className="leading-relaxed">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubscribedPlanId(plan.id);
                  onSelectPlanToBag(
                    `Assinatura ${plan.title} (${plan.mealsPerWeek} refeições)`,
                    plan.totalWeekly
                  );
                }}
                className={`mt-6 w-full py-3 px-4 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? "bg-[#f4a51c] hover:bg-[#e08e24] text-[#123826]"
                    : "bg-[#1b4332] hover:bg-[#2d6a4f] text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isSubbed
                    ? "Plano Adicionado à Sacola!"
                    : "Assinar & Escolher Sabores"}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AdminAnalyticsView({ orders }: { orders: DeliveryOrder[] }) {
  const totalOrdersRevenue = orders.reduce((acc, o) => acc + o.total, 0) + 4280.5;
  const totalOrdersCount = orders.length + 68;
  const avgTicket = totalOrdersRevenue / totalOrdersCount;
  const ecoCount = orders.filter((o) => o.ecoPackaging).length + 61;

  const neighborhoodStats = [
    { name: "Jardins / Av. Paulista", orders: 34, share: 42, avgMin: 21 },
    { name: "Vila Madalena / Pinheiros", orders: 19, share: 24, avgMin: 27 },
    { name: "Itaim Bibi / Vila Olímpia", orders: 14, share: 18, avgMin: 31 },
    { name: "Cerqueira César / Consolação", orders: 11, share: 16, avgMin: 19 },
  ];

  const topDishes = [
    { name: "Wrap de Abacate com Bacon", sold: 48, revenue: 1435.2, rating: 5.0 },
    { name: "Tigela Mediterrânea de Quinoa", sold: 41, revenue: 1348.9, rating: 4.95 },
    { name: "Poke Bowl de Salmão & Gergelim", sold: 33, revenue: 1415.7, rating: 4.98 },
    { name: "Salada Proteica Colheita do Chef", sold: 29, revenue: 1070.1, rating: 4.94 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Cabeçalho BI */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-sm font-serif italic text-[#3a7d44] block">
            Inteligência Operacional & Financeira
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#1b4332] tracking-tight">
            Dashboard Gerencial do Delivery
          </h2>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#1b4332] text-xs font-black">
          ● Dados Atualizados em Tempo Real
        </span>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-zinc-400">
              Faturamento Hoje
            </span>
            <TrendingUp className="w-4 h-4 text-[#3a7d44]" />
          </div>
          <span className="text-2xl font-black text-[#1b4332] block">
            {formatBRL(totalOrdersRevenue)}
          </span>
          <span className="text-[11px] font-bold text-[#3a7d44]">
            +18.4% vs. semana passada
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-zinc-400">
              Pedidos & Ticket Médio
            </span>
            <ShoppingBag className="w-4 h-4 text-[#e08e24]" />
          </div>
          <span className="text-2xl font-black text-[#1b4332] block">
            {totalOrdersCount} pedidos
          </span>
          <span className="text-[11px] font-bold text-zinc-500">
            Ticket Médio: {formatBRL(avgTicket)}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-zinc-400">
              Tempo Médio Entrega
            </span>
            <Clock className="w-4 h-4 text-[#3a7d44]" />
          </div>
          <span className="text-2xl font-black text-[#1b4332] block">
            24 min
          </span>
          <span className="text-[11px] font-bold text-[#3a7d44]">
            98.6% dentro do SLA frio
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-zinc-400">
              Impacto Sustentável
            </span>
            <Leaf className="w-4 h-4 text-[#3a7d44]" />
          </div>
          <span className="text-2xl font-black text-[#1b4332] block">
            {ecoCount} pedidos Eco
          </span>
          <span className="text-[11px] font-bold text-[#3a7d44]">
            Zero plástico descartável
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Ranking de Pratos Mais Vendidos */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#1b4332] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#3a7d44]" />
              Pratos Campeões de Venda no Delivery
            </h3>
            <span className="text-[11px] font-bold text-zinc-400">Hoje</span>
          </div>

          <div className="space-y-3">
            {topDishes.map((dish, idx) => (
              <div
                key={dish.name}
                className="p-3.5 rounded-xl bg-[#faf9f5] border border-zinc-200/70 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#1b4332] text-[#f4a51c] font-black text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-black text-[#1b4332] block">
                      {dish.name}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {dish.sold} unidades vendidas • Avaliação {dish.rating} ★
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black text-[#3a7d44]">
                  {formatBRL(dish.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa de Calor por Região de Entrega */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#1b4332] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#e08e24]" />
              Volume por Região (São Paulo)
            </h3>
          </div>

          <div className="space-y-4">
            {neighborhoodStats.map((reg) => (
              <div key={reg.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#1b4332]">{reg.name}</span>
                  <span className="font-black text-[#3a7d44]">
                    {reg.orders} pedidos ({reg.share}%) • ~{reg.avgMin} min
                  </span>
                </div>
                <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${reg.share}%` }}
                    className="h-full bg-gradient-to-r from-[#1b4332] to-[#e08e24] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
