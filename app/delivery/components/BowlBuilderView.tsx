"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Check,
  Flame,
  Dumbbell,
  Leaf,
  ShoppingBag,
  RotateCcw,
  Plus,
} from "lucide-react";
import { BOWL_BUILDER_OPTIONS, CartItem, formatBRL } from "../data";

interface BowlBuilderViewProps {
  onAddCustomBowl: (item: CartItem) => void;
}

export default function BowlBuilderView({ onAddCustomBowl }: BowlBuilderViewProps) {
  const [selectedFormat, setSelectedFormat] = useState(BOWL_BUILDER_OPTIONS.formats[0]);
  const [selectedBase, setSelectedBase] = useState(BOWL_BUILDER_OPTIONS.bases[0]);
  const [selectedProtein, setSelectedProtein] = useState(BOWL_BUILDER_OPTIONS.proteins[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([
    "top-abacate",
    "top-tomate",
    "top-sementes",
  ]);
  const [selectedSauce, setSelectedSauce] = useState(BOWL_BUILDER_OPTIONS.sauces[0]);
  const [customName, setCustomName] = useState("");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [addedSuccess, setAddedSuccess] = useState(false);

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 6) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const chosenToppingObjs = BOWL_BUILDER_OPTIONS.toppings.filter((t) =>
    selectedToppings.includes(t.id)
  );

  // Free up to 4 toppings; each extra topping beyond 4 costs R$ 3.50
  const extraToppingsCount = Math.max(0, selectedToppings.length - 4);
  const extraToppingsCost = extraToppingsCount * 3.5;

  const totalPrice =
    selectedFormat.basePrice + selectedProtein.priceExtra + extraToppingsCost;

  const totalCalories =
    selectedFormat.calories +
    selectedBase.calories +
    selectedProtein.calories +
    chosenToppingObjs.reduce((acc, t) => acc + t.calories, 0) +
    selectedSauce.calories;

  const totalProtein =
    selectedFormat.protein +
    selectedBase.protein +
    selectedProtein.protein +
    chosenToppingObjs.reduce((acc, t) => acc + t.protein, 0);

  const totalFiber =
    selectedBase.fiber + chosenToppingObjs.reduce((acc, t) => acc + t.fiber, 0);

  const handleReset = () => {
    setSelectedFormat(BOWL_BUILDER_OPTIONS.formats[0]);
    setSelectedBase(BOWL_BUILDER_OPTIONS.bases[0]);
    setSelectedProtein(BOWL_BUILDER_OPTIONS.proteins[0]);
    setSelectedToppings(["top-abacate", "top-tomate", "top-sementes"]);
    setSelectedSauce(BOWL_BUILDER_OPTIONS.sauces[0]);
    setCustomName("");
    setDietaryNotes("");
  };

  const handleAddToBag = () => {
    const bowlTitle = customName.trim()
      ? `Criação do Chef: ${customName.trim()}`
      : `Monte seu ${selectedFormat.name.split(" ")[0]} (${selectedProtein.name.split(" ")[0]})`;

    const details = [
      `Base: ${selectedBase.name}`,
      `Proteína: ${selectedProtein.name}`,
      `Toppings (${chosenToppingObjs.length}): ${chosenToppingObjs.map((t) => t.name).join(", ") || "Nenhum"}`,
      `Molho: ${selectedSauce.name}`,
    ];

    const newItem: CartItem = {
      cartItemId: `custom-${Date.now()}`,
      productId: 999,
      title: bowlTitle,
      image:
        selectedFormat.id === "wrap-int"
          ? "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80"
          : "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      size:
        selectedFormat.id === "bowl-450"
          ? "450g (Grande)"
          : "300g (Regular)",
      unitPrice: totalPrice,
      quantity: 1,
      calories: totalCalories,
      protein: totalProtein,
      removedIngredients: [],
      addedExtras: [],
      selectedSauce: selectedSauce.name,
      notes: dietaryNotes.trim() || undefined,
      isCustomBowl: true,
      customDetails: details,
    };

    onAddCustomBowl(newItem);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Cabeçalho da Visão */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] rounded-2xl p-6 sm:p-8 text-white shadow-md mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 bg-[#f4a51c] text-[#1b4332] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Laboratório Nutricional Sunneen
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Monte sua Tigela ou Wrap Personalizado
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Escolha cada ingrediente colhido hoje e acompanhe em tempo real o cálculo de calorias, proteínas e fibras da sua refeição.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Etapas do Construtor (8 colunas) */}
        <div className="lg:col-span-8 space-y-6">
          {/* PASSO 1: FORMATO & TAMANHO */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3a7d44]">
                  Passo 01 • Obrigatório
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#1b4332]">
                  Escolha o Formato & Porção
                </h3>
              </div>
              <span className="text-[11px] font-bold bg-emerald-50 text-[#1b4332] px-2.5 py-1 rounded-full">
                1 opção
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {BOWL_BUILDER_OPTIONS.formats.map((fmt) => {
                const active = selectedFormat.id === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      active
                        ? "bg-[#1b4332] border-[#1b4332] text-white shadow-md"
                        : "bg-[#faf9f5] border-zinc-200/80 text-zinc-800 hover:border-[#3a7d44]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black">{fmt.name}</span>
                        {active && <Check className="w-4 h-4 text-[#f4a51c] shrink-0" />}
                      </div>
                      <p
                        className={`text-[11px] mt-1 leading-relaxed ${
                          active ? "text-emerald-100/80" : "text-zinc-500"
                        }`}
                      >
                        {fmt.desc}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between">
                      <span className={`text-xs font-black ${active ? "text-[#f4a51c]" : "text-[#1b4332]"}`}>
                        {formatBRL(fmt.basePrice)}
                      </span>
                      <span className="text-[10px] opacity-75">Base inclusa</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASSO 2: BASE NUTRITIVA */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3a7d44]">
                  Passo 02 • Obrigatório
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#1b4332]">
                  Escolha a Base Orgânica
                </h3>
              </div>
              <span className="text-[11px] font-bold bg-emerald-50 text-[#1b4332] px-2.5 py-1 rounded-full">
                Incluso no valor
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {BOWL_BUILDER_OPTIONS.bases.map((base) => {
                const active = selectedBase.id === base.id;
                return (
                  <button
                    key={base.id}
                    type="button"
                    onClick={() => setSelectedBase(base)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      active
                        ? "bg-[#1b4332] border-[#1b4332] text-white shadow-sm"
                        : "bg-[#faf9f5] border-zinc-200/80 text-zinc-800 hover:border-[#3a7d44]"
                    }`}
                  >
                    <div>
                      <span
                        className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 ${
                          active
                            ? "bg-[#f4a51c] text-[#1b4332]"
                            : "bg-emerald-100 text-[#1b4332]"
                        }`}
                      >
                        {base.tag}
                      </span>
                      <h4 className="text-xs font-black">{base.name}</h4>
                      <span
                        className={`text-[10px] block mt-0.5 ${
                          active ? "text-emerald-100/80" : "text-zinc-500"
                        }`}
                      >
                        {base.calories} kcal • {base.protein}g Prot • {base.fiber}g Fibras
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        active ? "bg-[#f4a51c] text-[#1b4332]" : "border border-zinc-300"
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASSO 3: PROTEÍNA PRINCIPAL */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3a7d44]">
                  Passo 03 • Obrigatório
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#1b4332]">
                  Escolha a Proteína Principal
                </h3>
              </div>
              <span className="text-[11px] font-bold bg-emerald-50 text-[#1b4332] px-2.5 py-1 rounded-full">
                1 porção generosa
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {BOWL_BUILDER_OPTIONS.proteins.map((prot) => {
                const active = selectedProtein.id === prot.id;
                return (
                  <button
                    key={prot.id}
                    type="button"
                    onClick={() => setSelectedProtein(prot)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      active
                        ? "bg-[#1b4332] border-[#1b4332] text-white shadow-sm"
                        : "bg-[#faf9f5] border-zinc-200/80 text-zinc-800 hover:border-[#3a7d44]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            active
                              ? "bg-[#f4a51c] text-[#1b4332]"
                              : "bg-amber-100 text-[#1b4332]"
                          }`}
                        >
                          {prot.tag}
                        </span>
                        {prot.priceExtra > 0 && (
                          <span className="text-[10px] font-extrabold text-[#e08e24]">
                            +{formatBRL(prot.priceExtra)}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-black">{prot.name}</h4>
                      <span
                        className={`text-[10px] block mt-0.5 ${
                          active ? "text-emerald-100/80" : "text-zinc-500"
                        }`}
                      >
                        {prot.calories} kcal • {prot.protein}g Proteína
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        active ? "bg-[#f4a51c] text-[#1b4332]" : "border border-zinc-300"
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASSO 4: TOPPINGS & CROCANTE */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3a7d44]">
                  Passo 04 • Até 4 inclusos gratuitamente
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#1b4332]">
                  Ingredientes Frescos & Toppings ({selectedToppings.length}/6)
                </h3>
              </div>
              <span className="text-[11px] font-bold bg-amber-50 text-[#e08e24] px-2.5 py-1 rounded-full">
                {selectedToppings.length <= 4
                  ? `${4 - selectedToppings.length} grátis restantes`
                  : `+${extraToppingsCount} extra (${formatBRL(extraToppingsCost)})`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {BOWL_BUILDER_OPTIONS.toppings.map((top) => {
                const active = selectedToppings.includes(top.id);
                return (
                  <button
                    key={top.id}
                    type="button"
                    onClick={() => toggleTopping(top.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      active
                        ? "bg-emerald-950 border-[#1b4332] text-white shadow-xs"
                        : "bg-[#faf9f5] border-zinc-200/80 text-zinc-700 hover:border-[#3a7d44]"
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-extrabold block truncate">
                        {top.name}
                      </span>
                      <span
                        className={`text-[10px] block ${
                          active ? "text-[#f4a51c]" : "text-zinc-400"
                        }`}
                      >
                        +{top.calories} kcal • {top.protein}g prot
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                        active ? "bg-[#f4a51c] text-[#1b4332]" : "border border-zinc-300"
                      }`}
                    >
                      {active ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3 text-zinc-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASSO 5: MOLHO ARTESANAL & NOME */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#3a7d44]">
                Passo 05 • Toque Final da Casa
              </span>
              <h3 className="text-base sm:text-lg font-black text-[#1b4332]">
                Molho Artesanal Sem Conservantes
              </h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-2.5">
              {BOWL_BUILDER_OPTIONS.sauces.map((sauce) => {
                const active = selectedSauce.id === sauce.id;
                return (
                  <button
                    key={sauce.id}
                    type="button"
                    onClick={() => setSelectedSauce(sauce)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? "bg-[#1b4332] border-[#1b4332] text-white"
                        : "bg-[#faf9f5] border-zinc-200/80 text-zinc-700 hover:border-[#3a7d44]"
                    }`}
                  >
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider block ${
                        active ? "text-[#f4a51c]" : "text-[#3a7d44]"
                      }`}
                    >
                      {sauce.tag}
                    </span>
                    <span className="text-xs font-black block mt-0.5">{sauce.name}</span>
                    <span className="text-[10px] opacity-75 block mt-0.5">
                      +{sauce.calories} kcal
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-100">
              <div>
                <label className="block text-[11px] font-bold text-[#1b4332] mb-1">
                  Dê um nome para sua criação (opcional)
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ex: Bowl Pós-Treino da Mari"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 bg-[#faf9f5] focus:bg-white focus:outline-none focus:border-[#3a7d44]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1b4332] mb-1">
                  Instruções para a cozinha
                </label>
                <input
                  type="text"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder="Ex: Enviar molho em potinho separado"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 bg-[#faf9f5] focus:bg-white focus:outline-none focus:border-[#3a7d44]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Painel Nutricional ao Vivo & Resumo (4 colunas sticky) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#3a7d44] block">
                  Raio-X em Tempo Real
                </span>
                <h3 className="text-base font-black text-[#1b4332]">
                  Sua Refeição Personalizada
                </h3>
              </div>
              <button
                type="button"
                onClick={handleReset}
                title="Reiniciar combinação"
                className="p-2 rounded-lg text-zinc-400 hover:text-[#1b4332] hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Medidores Nutricionais */}
            <div className="grid grid-cols-3 gap-2.5 text-center bg-[#f4f7f4] p-3.5 rounded-xl border border-emerald-900/10">
              <div className="bg-white rounded-lg p-2 shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-[#e08e24] mx-auto mb-0.5" />
                <span className="block text-sm font-black text-[#1b4332]">
                  {totalCalories}
                </span>
                <span className="block text-[9px] font-bold uppercase text-zinc-400">
                  Kcal Totais
                </span>
              </div>
              <div className="bg-white rounded-lg p-2 shadow-2xs">
                <Dumbbell className="w-3.5 h-3.5 text-[#3a7d44] mx-auto mb-0.5" />
                <span className="block text-sm font-black text-[#3a7d44]">
                  {totalProtein}g
                </span>
                <span className="block text-[9px] font-bold uppercase text-zinc-400">
                  Proteínas
                </span>
              </div>
              <div className="bg-white rounded-lg p-2 shadow-2xs">
                <Leaf className="w-3.5 h-3.5 text-[#1b4332] mx-auto mb-0.5" />
                <span className="block text-sm font-black text-[#1b4332]">
                  {totalFiber}g
                </span>
                <span className="block text-[9px] font-bold uppercase text-zinc-400">
                  Fibras
                </span>
              </div>
            </div>

            {/* Lista de Camadas Selecionadas */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500 font-medium">Formato:</span>
                <span className="font-black text-[#1b4332] text-right">
                  {selectedFormat.name}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500 font-medium">Base:</span>
                <span className="font-bold text-zinc-800 text-right">
                  {selectedBase.name}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500 font-medium">Proteína:</span>
                <span className="font-bold text-[#3a7d44] text-right">
                  {selectedProtein.name}
                </span>
              </div>
              <div className="py-1.5 border-b border-zinc-100 space-y-1.5">
                <span className="text-zinc-500 font-medium block">
                  Toppings Selecionados ({chosenToppingObjs.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {chosenToppingObjs.map((t) => (
                    <span
                      key={t.id}
                      className="text-[10px] font-semibold bg-[#faf9f5] border border-zinc-200 px-2 py-0.5 rounded-full text-[#1b4332]"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-zinc-500 font-medium">Molho:</span>
                <span className="font-bold text-zinc-800 text-right">
                  {selectedSauce.name}
                </span>
              </div>
            </div>

            {/* Preço Final & Botão Adicionar */}
            <div className="pt-3 border-t border-zinc-200 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-zinc-500 uppercase">
                  Valor Total
                </span>
                <span className="text-2xl font-black text-[#1b4332]">
                  {formatBRL(totalPrice)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddToBag}
                className="w-full py-3.5 px-5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#f4a51c]" />
                <span>
                  {addedSuccess
                    ? "Adicionado à Sacola com Sucesso!"
                    : "Adicionar Criação à Sacola"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
