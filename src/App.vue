<script setup lang="ts">
import { ref, computed } from "vue";
import { menuDatabase } from "./data/menu";
import type { MenuItem, TicketItem } from "./types";

// --- THE LOGIC ---

// 1. STATE: The current ticket starts empty
const ticket = ref<TicketItem[]>([]);
const selectedItemUuid = ref<string | null>(null);

// ACTION: Select an item on the ticket to modify it
const selectItem = (uuid: string) => {
  // If clicking the same item, deselect it. Otherwise, select the new one.
  selectedItemUuid.value = selectedItemUuid.value === uuid ? null : uuid;
};

// 2. ACTION: Add an item to the ticket
const addItem = (item: MenuItem) => {
  // MODIFIER LOGIC: Add to the SELECTED item, or fall back to the LAST item.
  if (item.isModifier) {
    let itemToModify: TicketItem | undefined;

    // 1. Try to find the currently selected item.
    if (selectedItemUuid.value) {
      itemToModify = ticket.value.find(
        (t) => t.uuid === selectedItemUuid.value
      );
    }

    // 2. If no item is selected (or was not found), fall back to the last item on the ticket.
    if (!itemToModify && ticket.value.length > 0) {
      itemToModify = ticket.value[ticket.value.length - 1];
    }

    // 3. If we have an item to modify, add the modifier.
    if (itemToModify) {
      itemToModify.modifiers.push(item);
    }

    return; // Stop here. Do not create a new row.
  }

  // NORMAL ITEM: Create a new row on the ticket
  const newItem: TicketItem = {
    ...item,
    uuid: crypto.randomUUID(),
    modifiers: [],
  };
  ticket.value.push(newItem);
  selectedItemUuid.value = newItem.uuid; // Auto-select the new item
};

// 3. ACTION: Remove an item from the ticket
const removeItem = (uuid: string) => {
  ticket.value = ticket.value.filter((item) => item.uuid !== uuid);
  // If the removed item was selected, clear the selection
  if (selectedItemUuid.value === uuid) {
    selectedItemUuid.value = null;
  }
};

// 4. MATH: Calculate the Grand Total automatically
const grandTotal = computed(() => {
  return ticket.value.reduce((total, item) => {
    // Add up the modifiers for this specific item
    const modsCost = item.modifiers.reduce((sum, mod) => sum + mod.price, 0);
    // Add Item Price + Modifiers Price to the total
    return total + item.price + modsCost;
  }, 0);
});

// 5. HELPER: Make it look like money ($10.50)
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
      class="w-1/3 bg-white flex flex-col shadow-2xl z-10 border-r border-gray-300"
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
            @click="selectItem(item.uuid)"
            class="p-2 rounded-lg cursor-pointer transition-all border-b border-gray-200"
            :class="{
              'bg-yellow-100 ring-2 ring-yellow-400':
                selectedItemUuid === item.uuid,
              'hover:bg-gray-50': selectedItemUuid !== item.uuid,
            }"
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
              @click.stop="removeItem(item.uuid)"
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

    <div class="w-2/3 bg-gray-200 p-4 overflow-y-auto">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">Menu</h2>

      <div class="grid grid-cols-3 gap-4">
        <button
          v-for="item in menuDatabase"
          :key="item.id"
          @click="addItem(item)"
          class="h-32 rounded-xl shadow-md flex flex-col items-center justify-center p-2 transition-transform active:scale-95 border-b-4 border-black/10"
          :class="{
            'bg-yellow-400 hover:bg-yellow-300 text-black':
              item.category === 'breakfast',
            'bg-red-600 hover:bg-red-500 text-white': item.category === 'lunch',
            'bg-amber-800 hover:bg-amber-700 text-white':
              item.category === 'sides',
          }"
        >
          <span class="font-bold text-center">{{ item.name }}</span>
          <span class="text-sm">{{ formatMoney(item.price) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
