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
  <div
    class="flex flex-col w-full min-h-screen font-sans lg:flex-row bg-zinc-900"
  >
    <!-- TICKET PANEL -->
    <div
      class="relative z-20 flex flex-col w-full lg:w-1/3 max-h-[45vh] sm:max-h-[50vh] lg:max-h-none bg-white shadow-2xl"
    >
      <div
        class="absolute -bottom-2 w-full h-4 bg-transparent bg-size-[20px_20px] bg-repeat-x"
        style="
          background-image: radial-gradient(circle, transparent 50%, white 55%);
        "
      ></div>

      <div
        class="p-6 text-center text-yellow-400 bg-black border-b-4 border-yellow-400"
      >
        <h1
          class="text-3xl font-black tracking-widest uppercase"
          style="text-shadow: 2px 2px 0px #333"
        >
          WAFFLE HOUSE
        </h1>
        <p class="mt-1 text-xs tracking-widest uppercase text-zinc-400">
          Guest Check #{{ Math.floor(Math.random() * 9000) + 1000 }}
        </p>
      </div>

      <div class="flex-1 p-2 overflow-y-auto bg-zinc-50">
        <ul class="space-y-1">
          <li
            v-for="item in ticket"
            :key="item.uuid"
            class="relative p-3 bg-white border shadow-sm border-zinc-200 group"
          >
            <div class="flex items-baseline justify-between">
              <span class="text-lg font-black uppercase text-zinc-900">
                {{ item.name }}
              </span>
              <span class="font-mono font-bold text-zinc-700">
                {{ formatMoney(item.price) }}
              </span>
            </div>

            <div
              v-if="item.modifiers.length > 0"
              class="pl-2 mt-1 ml-4 border-l-2 border-zinc-300"
            >
              <div
                v-for="(mod, index) in item.modifiers"
                :key="index"
                class="flex justify-between text-sm font-medium text-zinc-500"
              >
                <span>+ {{ mod.name }}</span>
                <span v-if="mod.price > 0" class="font-mono">
                  {{ formatMoney(mod.price) }}
                </span>
              </div>
            </div>

            <button
              @click="removeItem(item.uuid)"
              class="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white transition-opacity bg-red-600 rounded-full shadow-md opacity-100 -top-2 -right-2 lg:opacity-0 lg:group-hover:opacity-100"
            >
              X
            </button>
          </li>
        </ul>

        <div
          v-if="ticket.length === 0"
          class="flex flex-col items-center justify-center h-64 text-zinc-300"
        >
          <span class="text-6xl font-black opacity-20">WH</span>
          <span class="mt-2 text-sm font-bold tracking-widest uppercase">
            Ready for Order
          </span>
        </div>
      </div>

      <div class="p-6 border-t-2 bg-zinc-100 border-zinc-300">
        <div class="flex items-center justify-between">
          <span
            class="text-sm font-bold tracking-wider uppercase text-zinc-500"
          >
            Tax (Included)
          </span>
          <span class="font-mono text-sm text-zinc-400">$0.00</span>
        </div>
        <div
          class="flex items-center justify-between pt-4 mt-2 text-4xl font-black border-t border-zinc-300 text-zinc-900"
        >
          <span>TOTAL</span>
          <span>{{ formatMoney(grandTotal) }}</span>
        </div>
      </div>
    </div>

    <!-- MENU PANEL -->
    <div class="flex flex-col flex-1 w-full lg:w-2/3 bg-zinc-200">
      <div class="flex p-2 space-x-2 overflow-x-auto bg-black shadow-md">
        <button
          v-for="cat in ['breakfast', 'lunch', 'sides', 'beverages', 'temps']"
          :key="cat"
          @click="activeCategory = cat as any"
          class="py-3 text-sm font-black tracking-wider uppercase transition-all duration-150 rounded-sm min-w-30"
          :class="
            activeCategory === cat
              ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          "
        >
          {{ cat }}
        </button>
      </div>

      <div class="flex-1 p-4 overflow-y-auto bg-zinc-200">
        <div
          class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
        >
          <button
            v-for="item in filteredMenu"
            :key="item.id"
            @click="addItem(item)"
            class="flex flex-col items-center justify-center p-3 transition-all bg-white border-2 rounded-lg shadow-sm h-28 border-zinc-300 active:scale-95 active:bg-yellow-400 active:border-black active:text-black group hover:border-zinc-400 hover:shadow-md"
          >
            <span
              class="text-lg font-black leading-tight text-center text-zinc-800 group-active:text-black"
            >
              {{ item.name }}
            </span>

            <span
              v-if="item.price > 0"
              class="px-2 py-1 mt-2 text-xs font-bold rounded bg-zinc-100 text-zinc-500 group-active:bg-black/10 group-active:text-black"
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
