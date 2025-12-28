<script setup lang="ts">
import { ref, computed } from "vue";
import { menuDatabase } from "./data/menu";
import { MenuItem, TicketItem } from "./types";

// --- THE LOGIC ---

// 1. STATE: The Ticket (The bill)
const ticket = ref<TicketItem[]>([]);

// 2. STATE: The Active Tab (Default to Breakfast)
const activeCategory = ref<"breakfast" | "lunch" | "sides" | "beverages">(
  "breakfast"
);

// 3. COMPUTED: Filter the menu based on the active tab
const filteredMenu = computed(() => {
  return menuDatabase.filter((item) => item.category === activeCategory.value);
});

// 4. ACTION: Add an item to the ticket
const addItem = (item: MenuItem) => {
  // SCATTER LOGIC: If it's a modifier, add it to the LAST item
  if (item.isModifier) {
    if (ticket.value.length > 0) {
      const lastItem = ticket.value[ticket.value.length - 1];
      lastItem.modifiers.push(item);
    }
    return;
  }

  // NORMAL ITEM: Create a new row
  const newItem: TicketItem = {
    ...item,
    uuid: crypto.randomUUID(),
    modifiers: [],
  };
  ticket.value.push(newItem);
};

// 5. ACTION: Remove an item
const removeItem = (uuid: string) => {
  ticket.value = ticket.value.filter((item) => item.uuid !== uuid);
};

// 6. MATH: Calculate Grand Total
const grandTotal = computed(() => {
  return ticket.value.reduce((total, item) => {
    const modsCost = item.modifiers.reduce((sum, mod) => sum + mod.price, 0);
    return total + item.price + modsCost;
  }, 0);
});

// 7. HELPER: Format Money
const formatMoney = (cents: number) => {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
</script>

<template>
  <div class="flex h-screen w-full bg-gray-100 overflow-hidden font-sans">
    <div
      class="w-1/3 bg-white flex flex-col shadow-2xl z-20 border-r border-gray-300"
    >
      <div
        class="p-4 bg-gray-900 text-yellow-400 text-center font-black text-xl uppercase tracking-widest"
      >
        Waffle Calc
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        <div
          v-if="ticket.length === 0"
          class="text-center text-gray-400 mt-10 italic"
        >
          Ticket is empty...
        </div>

        <ul class="space-y-4">
          <li
            v-for="item in ticket"
            :key="item.uuid"
            class="border-b border-gray-100 pb-2"
          >
            <div
              class="flex justify-between items-center font-bold text-gray-900 text-lg"
            >
              <span>{{ item.name }}</span>
              <span>{{ formatMoney(item.price) }}</span>
            </div>

            <div v-if="item.modifiers.length > 0" class="pl-4 mt-1 space-y-1">
              <div
                v-for="(mod, index) in item.modifiers"
                :key="index"
                class="flex justify-between text-sm text-gray-600"
              >
                <span>+ {{ mod.name }}</span>
                <span>{{ formatMoney(mod.price) }}</span>
              </div>
            </div>

            <button
              @click="removeItem(item.uuid)"
              class="text-xs text-red-500 mt-2 hover:text-red-700 font-semibold uppercase"
            >
              [ Remove ]
            </button>
          </li>
        </ul>
      </div>

      <div class="p-6 bg-yellow-400 text-black border-t-4 border-black">
        <div class="flex justify-between items-center text-4xl font-black">
          <span>TOTAL</span>
          <span>{{ formatMoney(grandTotal) }}</span>
        </div>
      </div>
    </div>

    <div class="w-2/3 bg-gray-200 flex flex-col h-full">
      <div class="flex bg-white shadow-md z-10">
        <button
          @click="activeCategory = 'breakfast'"
          class="flex-1 py-4 font-black uppercase tracking-wider border-b-4 transition-colors"
          :class="
            activeCategory === 'breakfast'
              ? 'border-yellow-400 bg-yellow-50 text-black'
              : 'border-transparent text-gray-400 hover:bg-gray-50'
          "
        >
          Breakfast
        </button>
        <button
          @click="activeCategory = 'lunch'"
          class="flex-1 py-4 font-black uppercase tracking-wider border-b-4 transition-colors"
          :class="
            activeCategory === 'lunch'
              ? 'border-red-600 bg-red-50 text-black'
              : 'border-transparent text-gray-400 hover:bg-gray-50'
          "
        >
          Lunch
        </button>
        <button
          @click="activeCategory = 'sides'"
          class="flex-1 py-4 font-black uppercase tracking-wider border-b-4 transition-colors"
          :class="
            activeCategory === 'sides'
              ? 'border-amber-800 bg-amber-50 text-black'
              : 'border-transparent text-gray-400 hover:bg-gray-50'
          "
        >
          Sides
        </button>
        <button
          @click="activeCategory = 'beverages'"
          class="flex-1 py-4 font-black uppercase tracking-wider border-b-4 transition-colors"
          :class="
            activeCategory === 'beverages'
              ? 'border-blue-500 bg-blue-50 text-black'
              : 'border-transparent text-gray-400 hover:bg-gray-50'
          "
        >
          Drinks
        </button>
      </div>

      <div class="p-4 overflow-y-auto flex-1">
        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="item in filteredMenu"
            :key="item.id"
            @click="addItem(item)"
            class="h-32 rounded-xl shadow-md flex flex-col items-center justify-center p-2 transition-transform active:scale-95 border-b-4 border-black/10 text-white"
            :class="{
              'bg-yellow-400 hover:bg-yellow-300 text-black':
                item.category === 'breakfast',
              'bg-red-600 hover:bg-red-500': item.category === 'lunch',
              'bg-amber-800 hover:bg-amber-700': item.category === 'sides',
              'bg-blue-500 hover:bg-blue-400': item.category === 'beverages',
            }"
          >
            <span class="text-xl font-bold text-center leading-tight">{{
              item.name
            }}</span>
            <span class="mt-1 text-sm opacity-80 font-mono">{{
              formatMoney(item.price)
            }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
