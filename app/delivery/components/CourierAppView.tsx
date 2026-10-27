"use client";

import React, { useState } from "react";
import {
  Truck,
  MapPin,
  ThermometerSnowflake,
  CheckCircle2,
  Navigation,
  PhoneCall,
  Lock,
  Wallet,
  Star,
  Package,
  BatteryCharging,
  Sparkles,
} from "lucide-react";
import { DeliveryOrder, OrderStatus, formatBRL } from "../data";

interface CourierAppViewProps {
  orders: DeliveryOrder[];
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onMoveCourierProgress: (orderId: string, progress: number) => void;
}

export default function CourierAppView({
  orders,
  onUpdateOrderStatus,
  onMoveCourierProgress,
}: CourierAppViewProps) {
  const [courierOnline, setCourierOnline] = useState(true);
  const [pinInputs, setPinInputs] = useState<Record<string, string>>({});
  const [pinError, setPinError] = useState<string | null>(null);

  const readyOrders = orders.filter((o) => o.status === "ready");
  const activeDeliveries = orders.filter((o) => o.status === "delivering");
  const completedDeliveries = orders.filter((o) => o.status === "delivered");

  const dailyEarnings =
    completedDeliveries.length * 11.5 +
    completedDeliveries.reduce((acc, o) => acc + o.courierTip, 0) +
    68.0; // Base morning shift earnings

  const handleConfirmDelivery = (order: DeliveryOrder) => {
    const typedPin = pinInputs[order.id] || "";
    if (typedPin !== order.securityPin) {
      setPinError(
        `Código PIN incorreto. Digite ${order.securityPin} (os 4 últimos dígitos do cliente) ou clique em Auto-Preencher PIN.`
      );
      return;
    }
    setPinError(null);
    onUpdateOrderStatus(order.id, "delivered");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Topo do App do Entregador */}
      <div className="bg-gradient-to-r from-[#123826] via-[#1b4332] to-[#123826] text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#f4a51c] text-[#123826] font-black text-lg flex items-center justify-center shadow-sm">
            LF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black">Lucas Ferreira</h2>
              <span className="inline-flex items-center gap-0.5 text-xs font-black text-[#f4a51c]">
                <Star className="w-3.5 h-3.5 fill-current" /> 4.98
              </span>
            </div>
            <p className="text-xs text-emerald-100/80">
              Frota Elétrica Refrigerada • E-Bike Sunneen #08
            </p>
          </div>
        </div>

        {/* Telemetria da Ecobag & Botão Online */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-emerald-900/90 border border-emerald-700 px-3 py-1.5 rounded-full text-xs">
            <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-300" />
            <span className="font-bold">Ecobag: 2.9°C</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-900/90 border border-emerald-700 px-3 py-1.5 rounded-full text-xs">
            <BatteryCharging className="w-3.5 h-3.5 text-[#f4a51c]" />
            <span className="font-bold">E-Bike: 92%</span>
          </div>
          <button
            type="button"
            onClick={() => setCourierOnline(!courierOnline)}
            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              courierOnline
                ? "bg-emerald-400 text-[#123826]"
                : "bg-zinc-700 text-zinc-300"
            }`}
          >
            {courierOnline ? "● Disponível p/ Rotas" : "○ Pausado"}
          </button>
        </div>
      </div>

      {/* Resumo Financeiro e de Entregas do Dia */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">
            Ganhos de Hoje
          </span>
          <span className="text-xl font-black text-[#1b4332] mt-0.5 block">
            {formatBRL(dailyEarnings)}
          </span>
          <span className="text-[10px] font-bold text-[#3a7d44]">
            Inclui 100% das gorjetas
          </span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">
            Entregas Concluídas
          </span>
          <span className="text-xl font-black text-[#1b4332] mt-0.5 block">
            {completedDeliveries.length + 7} rotas
          </span>
          <span className="text-[10px] font-bold text-zinc-500">
            100% no prazo SLA
          </span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">
            Prontos p/ Coleta
          </span>
          <span className="text-xl font-black text-[#e08e24] mt-0.5 block">
            {readyOrders.length} pacotes
          </span>
          <span className="text-[10px] font-bold text-zinc-500">
            Hub Jardins • Av. Paulista
          </span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">
            Em Rota Agora
          </span>
          <span className="text-xl font-black text-[#3a7d44] mt-0.5 block">
            {activeDeliveries.length} ativa(s)
          </span>
          <span className="text-[10px] font-bold text-zinc-500">
            Cadeia fria monitorada
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Coluna Esquerda: Coletas Prontas na Cozinha (5 colunas) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3a7d44]">
                  Expedição Hub Jardins
                </span>
                <h3 className="text-base font-black text-[#1b4332]">
                  1. Prontos para Retirar na Cozinha
                </h3>
              </div>
              <span className="w-6 h-6 rounded-full bg-amber-100 text-[#1b4332] text-xs font-black flex items-center justify-center">
                {readyOrders.length}
              </span>
            </div>

            {readyOrders.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-xl bg-[#faf9f5] border border-dashed border-zinc-200 text-xs text-zinc-400">
                Nenhum pacote aguardando coleta na expedição no momento.
              </div>
            ) : (
              <div className="space-y-3">
                {readyOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl bg-[#faf9f5] border border-zinc-200/90 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black bg-[#1b4332] text-white px-2.5 py-0.5 rounded-md">
                        {ord.code}
                      </span>
                      <span className="text-xs font-black text-[#3a7d44]">
                        Gorjeta: {formatBRL(ord.courierTip)}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-black text-[#1b4332] block">
                        Cliente: {ord.customerName}
                      </span>
                      <span className="text-[11px] text-zinc-600 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#3a7d44] shrink-0" />
                        {ord.address}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-500 bg-white p-2.5 rounded-lg border border-zinc-200/60">
                      <strong>Volume:</strong>{" "}
                      {ord.items.reduce((a, i) => a + i.quantity, 0)} itens lacrados • Bag{" "}
                      {ord.bagTempCelsius}
                    </div>

                    <button
                      type="button"
                      onClick={() => onUpdateOrderStatus(ord.id, "delivering")}
                      className="w-full py-2.5 px-4 bg-[#e08e24] hover:bg-[#c97d1b] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Package className="w-4 h-4" />
                      <span>Coletar Pacote & Iniciar Rota GPS</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coluna Direita: Entregas Ativas em Rota + Validação de PIN (7 colunas) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3a7d44]">
                  Navegação & Check-in no Cliente
                </span>
                <h3 className="text-base font-black text-[#1b4332]">
                  2. Entregas em Rota Ativa ({activeDeliveries.length})
                </h3>
              </div>
            </div>

            {pinError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                {pinError}
              </div>
            )}

            {activeDeliveries.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl bg-[#faf9f5] border border-dashed border-zinc-200 text-xs text-zinc-400">
                Você não possui entregas em rota agora. Colete um pedido pronto ao lado ou aproveite no KDS!
              </div>
            ) : (
              <div className="space-y-4">
                {activeDeliveries.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-[#faf9f5] border-2 border-[#1b4332]/20 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#1b4332] text-white text-xs font-black px-3 py-1 rounded-lg">
                          {ord.code}
                        </span>
                        <span className="text-xs font-black text-[#1b4332]">
                          {ord.customerName}
                        </span>
                      </div>
                      <a
                        href={`tel:${ord.customerPhone}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3a7d44] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{ord.customerPhone}</span>
                      </a>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#e08e24] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-black text-[#1b4332] block">
                            {ord.address}
                          </span>
                          <span className="text-[11px] text-zinc-500">
                            Região: {ord.neighborhood} • Pagamento: {ord.paymentLabel}
                          </span>
                        </div>
                      </div>

                      {/* Barra de Progresso do Deslocamento */}
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-[#3a7d44]">
                            Progresso da Rota GPS: {ord.courierProgress}%
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onMoveCourierProgress(
                                ord.id,
                                Math.min(95, ord.courierProgress + 20)
                              )
                            }
                            className="text-[#e08e24] hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Navigation className="w-3 h-3" />
                            <span>Avançar Bicicleta no Mapa (+20%)</span>
                          </button>
                        </div>
                        <div className="w-full h-2.5 bg-zinc-200 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${ord.courierProgress}%` }}
                            className="h-full bg-gradient-to-r from-[#1b4332] to-[#3a7d44] transition-all duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Validação do PIN de Segurança do Cliente */}
                    <div className="p-4 rounded-xl bg-emerald-950 text-white space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label className="text-xs font-bold flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#f4a51c]" />
                          <span>Código PIN de Segurança do Cliente (4 dígitos):</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setPinInputs((prev) => ({
                              ...prev,
                              [ord.id]: ord.securityPin,
                            }));
                            setPinError(null);
                          }}
                          className="text-[10px] font-black uppercase tracking-wider bg-[#f4a51c] text-[#123826] px-2.5 py-1 rounded-full cursor-pointer flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Auto-Preencher PIN ({ord.securityPin})</span>
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <input
                          type="text"
                          maxLength={4}
                          value={pinInputs[ord.id] || ""}
                          onChange={(e) =>
                            setPinInputs((prev) => ({
                              ...prev,
                              [ord.id]: e.target.value,
                            }))
                          }
                          placeholder={`Digite ${ord.securityPin}`}
                          className="px-4 py-2.5 rounded-xl bg-emerald-900 border border-emerald-700 text-white font-black tracking-widest text-center text-sm focus:outline-none focus:border-[#f4a51c] sm:w-40"
                        />
                        <button
                          type="button"
                          onClick={() => handleConfirmDelivery(ord)}
                          className="flex-1 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-[#123826] text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Confirmar Entrega ao Cliente</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
