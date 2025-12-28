// src/data/menu.ts
// import { MenuItem } from '../types';
import type { MenuItem } from "../types";
export const menuDatabase: MenuItem[] = [
  // --- BREAKFAST ---
  {
    id: "all-star",
    name: "All-Star Special",
    price: 1050,
    category: "breakfast",
  },
  { id: "t-bone", name: "T-Bone & Eggs", price: 1300, category: "breakfast" },
  { id: "waffle", name: "Classic Waffle", price: 495, category: "breakfast" },
  {
    id: "cheese-eggs",
    name: "Cheese 'N Eggs",
    price: 775,
    category: "breakfast",
  },

  // --- SIDES ---
  { id: "hb", name: "Hashbrowns", price: 315, category: "sides" },
  { id: "bacon", name: "Side Bacon", price: 400, category: "sides" },

  // --- MODIFIERS (The "Scatter" Options) ---
  {
    id: "mod-smothered",
    name: "Smothered (Onions)",
    price: 50,
    category: "sides",
    isModifier: true,
  },
  {
    id: "mod-covered",
    name: "Covered (Cheese)",
    price: 50,
    category: "sides",
    isModifier: true,
  },
  {
    id: "mod-chunked",
    name: "Chunked (Ham)",
    price: 60,
    category: "sides",
    isModifier: true,
  },
  {
    id: "mod-diced",
    name: "Diced (Tomatoes)",
    price: 50,
    category: "sides",
    isModifier: true,
  },
  {
    id: "mod-peppered",
    name: "Peppered (Jalapenos)",
    price: 50,
    category: "sides",
    isModifier: true,
  },

  // --- BEVERAGES ---
  { id: "coffee", name: "Coffee", price: 265, category: "beverages" },
  { id: "coke", name: "Coca-Cola", price: 265, category: "beverages" },
];
