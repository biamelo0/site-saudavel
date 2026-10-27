"use client";

import React, { useState } from "react";
import {
  Utensils,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Truck,
  PlusCircle,
  Leaf,
  PackageCheck,
  Power,
  Flame,
  Printer,
  Store,
} from "lucide-react";
import {
  DeliveryOrder,
  DeliveryProduct,
  OrderStatus,
  formatBRL,
} from "../data";

interface KitchenKdsViewProps {
  orders: DeliveryOrder[];
  products: DeliveryProduct[];
  storeOpen: boolean;
  setStoreOpen: (open: boolean) => void;
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onSimulateIncomingOrder: () => void;
  onToggleProductStock: (productId: number) => void;
}

export default function KitchenKdsView({
  orders,
  products,
  storeOpen,
  setStoreOpen,
  onUpdateOrderStatus,
  onSimulateIncomingOrder,
  onToggleProductStock,
}: KitchenKdsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<"kanban" | "stock">("kanban");
  const [printedTicketId, setPrintedTicketId] = useState<string | null>(null);

  const columns: {
    status: OrderStatus;
    title: string;
    subtitle: string;
    badgeBg: string;
    nextStatus?: OrderStatus;
    actionLabel?: string;
  }[] = [
    {
      status: "pending",
      title: "1. Novos / Pendentes",
      subtitle: "Aguardando aceite da cozinha",
      badgeBg: "bg-amber-500 text-white",
      nextStatus: "preparing",
      actionLabel: "Aceitar & Iniciar Preparo",
    },
    {
      status: "preparing",
      title: "2. Bancada Fria (Preparo)",
      subtitle: "Corte artesanal e montagem",
      badgeBg: "bg-[#1b4332] text-white",
      nextStatus: "ready",
      actionLabel: "Lacrar a 3°C & Marcar Pronto",
    },
    {
      status: "ready",
      title: "3. Pronto p/ Despacho",
      subtitle: "No expositor refrigerado / Coleta",
      badgeBg: "bg-[#3a7d44] text-white",
      nextStatus: "delivering",
      actionLabel: "Despachar com Entregador",
    },
    {
      status: "delivering",
      title: "4. Em Rota Refrigerada",
      subtitle: "Monitoramento de cadeia fria",
      badgeBg: "bg-sky-700 text-white",
      nextStatus: "delivered",
      actionLabel: "Confirmar Entrega Final",
    },
  ];

  const handlePrintTicket = (id: string) => {
    setPrintedTicketId(id);
    setTimeout(() => setPrintedTicketId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Barra de Controle Operacional da Cozinha */}
      <div className="bg-[#123826] text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                storeOpen
                  ? "bg-emerald-400 text-[#123826]"
                  : "bg-rose-500 text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-ping" />
              {storeOpen ? "Cozinha Online • Recebendo Pedidos" : "Loja Pausada Temporariamente"}
            </span>
            <span className="text-xs text-emerald-200/80 font-semibold">
              Câmara Fria: 2.8°C • SLA Médio: 11 min
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            KDS — Painel da Cozinha & Expedição Sunneen
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onSimulateIncomingOrder}
            className="px-4 py-2.5 bg-[#f4a51c] hover:bg-[#e08e24] text-[#123826] text-xs font-black uppercase tracking-wider rounded-full transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Simular Novo Pedido</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveSubTab(activeSubTab === "kanban" ? "stock" : "kanban")
            }
            className="px-4 py-2.5 bg-emerald-900/90 hover:bg-emerald-800 text-white border border-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Store className="w-3.5 h-3.5 text-[#f4a51c]" />
            <span>
              {activeSubTab === "kanban"
                ? "Gerenciar Estoque / Cardápio"
                : "Voltar ao Quadro KDS"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStoreOpen(!storeOpen)}
            className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              storeOpen
                ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30"
                : "bg-emerald-500 text-[#123826]"
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{storeOpen ? "Pausar Loja" : "Reabrir Loja"}</span>
          </button>
        </div>
      </div>

      {activeSubTab === "stock" ? (
        /* GESTOR DE DISPONIBILIDADE DE CARDÁPIO EM TEMPO REAL */
        <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#3a7d44]">
                Sincronizado com o Cardápio do Cliente
              </span>
              <h3 className="text-lg font-black text-[#1b4332]">
                Controle de Disponibilidade de Ingredientes & Pratos
              </h3>
            </div>
            <span className="text-xs font-bold text-zinc-500">
              {products.filter((p) => p.inStock).length} de {products.length} pratos ativos
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {products.map((prod) => (
              <div
                key={prod.id}
                className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                  prod.inStock
                    ? "bg-[#faf9f5] border-zinc-200/90"
                    : "bg-rose-50/50 border-rose-200 opacity-75"
                }`}
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase text-[#3a7d44] block">
                    {prod.category}
                  </span>
                  <h4 className="text-xs font-black text-[#1b4332] truncate">
                    {prod.title}
                  </h4>
                  <span className="text-xs font-bold text-zinc-500">
                    {formatBRL(prod.price)} • Prep: {prod.prepTimeMin} min
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleProductStock(prod.id)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 cursor-pointer transition-colors ${
                    prod.inStock
                      ? "bg-emerald-100 text-[#1b4332] hover:bg-emerald-200"
                      : "bg-rose-600 text-white hover:bg-rose-700"
                  }`}
                >
                  {prod.inStock ? "Ativo" : "Esgotado"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* QUADRO KANBAN KDS DE 4 COLUNAS */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {columns.map((col) => {
            const colOrders = orders.filter((o) => o.status === col.status);
            return (
              <div
                key={col.status}
                className="bg-[#ebe6dc]/60 rounded-2xl p-4 border border-zinc-200/90 space-y-4 min-h-[540px]"
              >
                <div className="flex items-center justify-between border-b border-zinc-300/70 pb-3">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#1b4332]">
                      {col.title}
                    </h3>
                    <span className="text-[10px] text-zinc-500 block">
                      {col.subtitle}
                    </span>
                  </div>
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center ${col.badgeBg}`}
                  >
                    {colOrders.length}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {colOrders.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-xl border border-dashed border-zinc-300 text-zinc-400 text-xs">
                      Nenhum pedido nesta etapa
                    </div>
                  ) : (
                    colOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-xl p-4 border border-zinc-200/90 shadow-xs space-y-3"
                      >
                        {/* Topo da Comanda */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-[#1b4332] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              {order.code}
                            </span>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-[#1b4332]">
                              {order.deliveryMode === "pickup"
                                ? "Retirada"
                                : order.deliveryMode === "scheduled"
                                ? "Agendado"
                                : "Delivery"}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#e08e24]" />
                            {order.createdAt}
                          </span>
                        </div>

                        {/* Cliente & Alerta de Alergia */}
                        <div>
                          <span className="text-xs font-black text-[#1b4332] block">
                            {order.customerName}
                          </span>
                          <span className="text-[10px] text-zinc-500 block truncate">
                            {order.address}
                          </span>
                        </div>

                        {order.allergenAlert && (
                          <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-black flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span>{order.allergenAlert}</span>
                          </div>
                        )}

                        {/* Lista de Itens da Comanda */}
                        <div className="space-y-2 pt-2 border-t border-zinc-100">
                          {order.items.map((item) => (
                            <div
                              key={item.cartItemId}
                              className="bg-[#faf9f5] p-2.5 rounded-lg border border-zinc-200/60 text-xs space-y-1"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-black text-[#1b4332]">
                                  {item.quantity}x {item.title}
                                </span>
                                <span className="text-[10px] font-bold text-[#3a7d44] shrink-0">
                                  {item.size.split(" ")[0]}
                                </span>
                              </div>
                              {item.selectedSauce && (
                                <span className="block text-[10px] text-zinc-600">
                                  • Molho: <strong>{item.selectedSauce}</strong>
                                </span>
                              )}
                              {item.removedIngredients.length > 0 && (
                                <span className="block text-[10px] text-rose-600 font-bold">
                                  • SEM: {item.removedIngredients.join(", ")}
                                </span>
                              )}
                              {item.addedExtras.length > 0 && (
                                <span className="block text-[10px] text-[#3a7d44] font-bold">
                                  • EXTRA: {item.addedExtras.map((e) => e.name).join(", ")}
                                </span>
                              )}
                              {item.customDetails && (
                                <div className="text-[10px] text-zinc-600 space-y-0.5 pt-0.5">
                                  {item.customDetails.map((d) => (
                                    <span key={d} className="block">
                                      • {d}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {item.notes && (
                                <span className="block text-[10px] italic bg-amber-50 text-amber-900 px-2 py-0.5 rounded">
                                  Obs: &ldquo;{item.notes}&rdquo;
                                </span>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Rodapé da Comanda: Etiqueta Nutricional + Ação */}
                        <div className="pt-2 border-t border-zinc-100 space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-zinc-500">
                            <span className="inline-flex items-center gap-1 font-bold text-[#3a7d44]">
                              <Leaf className="w-3 h-3" />
                              {order.ecoPackaging
                                ? "Sem Talheres (Eco)"
                                : "Enviar Talheres Bio"}
                            </span>
                            <button
                              type="button"
                              onClick={() => handlePrintTicket(order.id)}
                              className="inline-flex items-center gap-1 text-zinc-500 hover:text-[#1b4332] font-bold cursor-pointer"
                            >
                              <Printer className="w-3 h-3" />
                              <span>
                                {printedTicketId === order.id
                                  ? "Etiqueta Imprimindo..."
                                  : "Imprimir Rótulo"}
                              </span>
                            </button>
                          </div>

                          {col.nextStatus && (
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateOrderStatus(order.id, col.nextStatus!)
                              }
                              className="w-full py-2.5 px-3 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-[11px] font-black uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <PackageCheck className="w-3.5 h-3.5 text-[#f4a51c]" />
                              <span>{col.actionLabel}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
