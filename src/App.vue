<script setup lang="ts">
import { ref, computed } from "vue";
import { menuDatabase } from "./data/menu";
import type { MenuItem, TicketItem } from "./types";

// --- THE LOGIC ---

// 1. STATE: The Ticket
const ticket = ref<TicketItem[]>([]);

// 2. STATE: The Active Tab (Default to Breakfast)
const activeCategory = ref<
  "breakfast" | "lunch" | "sides" | "beverages" | "temps"
>("breakfast");

// 3. COMPUTED: Filter menu
const filteredMenu = computed(() => {
  return menuDatabase.filter((item) => item.category === activeCategory.value);
});

// 4. ACTION: Add Item
const addItem = (item: MenuItem) => {
  if (item.isModifier) {
    if (ticket.value.length > 0) {
      const lastItem = ticket.value[ticket.value.length - 1];
      if (lastItem) {
        lastItem.modifiers.push(item);
      }
    }
    return;
  }

  const newItem: TicketItem = {
    ...item,
    uuid: crypto.randomUUID(),
    modifiers: [],
  };
  ticket.value.push(newItem);
};

// 5. ACTION: Remove Item
const removeItem = (uuid: string) => {
  ticket.value = ticket.value.filter((item) => item.uuid !== uuid);
};

// 6. MATH: Totals
const grandTotal = computed(() => {
  return ticket.value.reduce((total, item) => {
    const modsCost = item.modifiers.reduce((sum, mod) => sum + mod.price, 0);
    return total + item.price + modsCost;
  }, 0);
});

// 7. HELPER: Money Format
const formatMoney = (cents: number) => {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
</script>

<template>
  <div class="flex h-screen w-full bg-zinc-900 overflow-hidden font-sans">
    <div class="w-1/3 bg-white flex flex-col shadow-2xl z-20 relative">
      <div
        class="absolute -bottom-2 w-full h-4 bg-transparent bg-size-[20px_20px] bg-repeat-x"
        style="
          background-image: radial-gradient(circle, transparent 50%, white 55%);
        "
      ></div>

      <div
        class="p-6 bg-black text-yellow-400 text-center border-b-4 border-yellow-400"
      >
        <h1
          class="font-black text-3xl tracking-widest uppercase"
          style="text-shadow: 2px 2px 0px #333"
        >
          WAFFLE HOUSE
        </h1>
        <p class="text-xs text-zinc-400 mt-1 uppercase tracking-widest">
          Guest Check #{{ Math.floor(Math.random() * 9000) + 1000 }}
        </p>
      </div>

      <div class="flex-1 overflow-y-auto p-2 bg-zinc-50">
        <ul class="space-y-1">
          <li
            v-for="item in ticket"
            :key="item.uuid"
            class="bg-white p-3 border border-zinc-200 shadow-sm relative group"
          >
            <div class="flex justify-between items-baseline">
              <span class="font-black text-zinc-900 text-lg uppercase">{{
                item.name
              }}</span>
              <span class="font-mono font-bold text-zinc-700">{{
                formatMoney(item.price)
              }}</span>
            </div>

            <div
              v-if="item.modifiers.length > 0"
              class="mt-1 ml-4 border-l-2 border-zinc-300 pl-2"
            >
              <div
                v-for="(mod, index) in item.modifiers"
                :key="index"
                class="flex justify-between text-sm text-zinc-500 font-medium"
              >
                <span>+ {{ mod.name }}</span>
                <span v-if="mod.price > 0" class="font-mono">{{
                  formatMoney(mod.price)
                }}</span>
              </div>
            </div>

            <button
              @click="removeItem(item.uuid)"
              class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md text-xs font-bold"
            >
              X
            </button>
          </li>
        </ul>

        <div
          v-if="ticket.length === 0"
          class="flex flex-col items-center justify-center h-64 text-zinc-300"
        >
          <span class="text-6xl opacity-20 font-black">WH</span>
          <span class="mt-2 text-sm uppercase font-bold tracking-widest"
            >Ready for Order</span
          >
        </div>
      </div>

      <div class="p-6 bg-zinc-100 border-t-2 border-zinc-300">
        <div class="flex justify-between items-center">
          <span class="text-zinc-500 font-bold uppercase tracking-wider text-sm"
            >Tax (Included)</span
          >
          <span class="font-mono text-zinc-400 text-sm">$0.00</span>
        </div>
        <div
          class="flex justify-between items-center mt-2 pt-4 border-t border-zinc-300 text-4xl font-black text-zinc-900"
        >
          <span>TOTAL</span>
          <span>{{ formatMoney(grandTotal) }}</span>
        </div>
      </div>
    </div>

    <div class="w-2/3 flex flex-col h-full bg-zinc-200">
      <div class="flex bg-black p-1 space-x-1 overflow-x-auto shadow-md">
        <button
          v-for="cat in ['breakfast', 'lunch', 'sides', 'beverages', 'temps']"
          :key="cat"
          @click="activeCategory = cat as any"
          class="flex-1 py-4 font-black uppercase tracking-wider text-sm transition-all duration-150 rounded-sm"
          :class="
            activeCategory === cat
              ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          "
        >
          {{ cat }}
        </button>
      </div>

      <div class="p-4 overflow-y-auto flex-1 bg-zinc-200">
        <div class="grid grid-cols-3 xl:grid-cols-4 gap-3">
          <button
            v-for="item in filteredMenu"
            :key="item.id"
            @click="addItem(item)"
            class="h-28 bg-white border-2 border-zinc-300 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 transition-all active:scale-95 active:bg-yellow-400 active:border-black active:text-black group hover:border-zinc-400 hover:shadow-md"
          >
            <span
              class="text-lg font-black text-center leading-tight text-zinc-800 group-active:text-black"
            >
              {{ item.name }}
            </span>

            <span
              v-if="item.price > 0"
              class="mt-2 text-xs font-bold bg-zinc-100 text-zinc-500 px-2 py-1 rounded group-active:bg-black/10 group-active:text-black"
            >
              {{ formatMoney(item.price) }}
            </span>

            <span
              v-else
              class="mt-2 text-[10px] font-black uppercase text-zinc-300 tracking-widest group-active:text-black/50"
            >
              MOD
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
