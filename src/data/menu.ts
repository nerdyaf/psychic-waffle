// src/data/menu.ts
import type { MenuItem } from "../types";

export const menuDatabase: MenuItem[] = [
  // ==========================================
  // BREAKFAST (Waffles, Eggs, Bowls, Biscuits)
  // ==========================================

  // --- SPECIALS ---
  {
    id: "all-star",
    name: "All-Star Special",
    price: 1050,
    category: "breakfast",
  },

  // --- WAFFLES (SINGLE) ---
  { id: "waffle", name: "Single Waffle", price: 460, category: "breakfast" },
  {
    id: "waffle-pecan",
    name: "Pecan Waffle",
    price: 510,
    category: "breakfast",
  },
  {
    id: "waffle-chip",
    name: "Choc Chip Waffle",
    price: 510,
    category: "breakfast",
  },
  {
    id: "waffle-blue",
    name: "Blueberry Waffle",
    price: 510,
    category: "breakfast",
  }, // NEW
  {
    id: "waffle-pb",
    name: "Peanut Butter Waffle",
    price: 510,
    category: "breakfast",
  },

  // --- WAFFLES (DOUBLE) ---
  {
    id: "waffle-double",
    name: "Double Waffle",
    price: 650,
    category: "breakfast",
  },
  {
    id: "waffle-double-pecan",
    name: "Dbl Pecan Waffle",
    price: 750,
    category: "breakfast",
  }, // NEW
  {
    id: "waffle-double-chip",
    name: "Dbl Choc Chip Waffle",
    price: 750,
    category: "breakfast",
  }, // NEW
  {
    id: "waffle-double-blue",
    name: "Dbl Blueberry Waffle",
    price: 750,
    category: "breakfast",
  }, // NEW
  {
    id: "waffle-double-pb",
    name: "Dbl Peanut Butter Waffle",
    price: 750,
    category: "breakfast",
  }, // NEW

  // --- EGGS ---
  { id: "eggs-1", name: "Single Egg Bfst", price: 500, category: "breakfast" },
  { id: "eggs-2", name: "Double Egg Bfst", price: 550, category: "breakfast" },
  { id: "eggs-3", name: "Triple Egg Bfst", price: 600, category: "breakfast" },
  {
    id: "eggs-cheese",
    name: "Cheese 'N Eggs",
    price: 775,
    category: "breakfast",
  },

  // --- STEAK & EGGS ---
  {
    id: "t-bone-eggs",
    name: "T-Bone & Eggs",
    price: 1300,
    category: "breakfast",
  },
  {
    id: "ribeye-eggs",
    name: "Delmonico (Ribeye) & Eggs",
    price: 1300,
    category: "breakfast",
  },
  {
    id: "sirloin-eggs",
    name: "Sirloin & Eggs",
    price: 1150,
    category: "breakfast",
  },
  {
    id: "pork-chop-eggs",
    name: "Pork Chops & Eggs",
    price: 1050,
    category: "breakfast",
  },
  {
    id: "country-ham-eggs",
    name: "Country Ham & Eggs",
    price: 950,
    category: "breakfast",
  },
  {
    id: "chicken-eggs",
    name: "Chicken & Eggs",
    price: 950,
    category: "breakfast",
  },

  // --- OMELETS ---
  {
    id: "omelet-cheese",
    name: "Cheese Omelet",
    price: 650,
    category: "breakfast",
  },
  {
    id: "omelet-ham",
    name: "Ham & Cheese Omelet",
    price: 750,
    category: "breakfast",
  },
  {
    id: "omelet-fiesta",
    name: "Fiesta Omelet",
    price: 780,
    category: "breakfast",
  },
  {
    id: "omelet-cheesesteak",
    name: "Cheesesteak Omelet",
    price: 800,
    category: "breakfast",
  },

  // --- BOWLS ---
  {
    id: "bowl-sausage",
    name: "Sausage Egg Bowl",
    price: 850,
    category: "breakfast",
  },
  {
    id: "bowl-bacon",
    name: "Bacon Egg Bowl",
    price: 850,
    category: "breakfast",
  },
  { id: "bowl-ham", name: "Ham Egg Bowl", price: 850, category: "breakfast" },

  // --- BISCUITS & SANDWICHES ---
  { id: "biscuit-egg", name: "Egg Biscuit", price: 250, category: "breakfast" },
  {
    id: "biscuit-sausage",
    name: "Sausage Biscuit",
    price: 300,
    category: "breakfast",
  },
  {
    id: "biscuit-bacon",
    name: "Bacon Biscuit",
    price: 300,
    category: "breakfast",
  },
  {
    id: "biscuit-sec",
    name: "Sausage Egg Cheese Biscuit",
    price: 450,
    category: "breakfast",
  },
  {
    id: "biscuit-bec",
    name: "Bacon Egg Cheese Biscuit",
    price: 450,
    category: "breakfast",
  },
  {
    id: "sandwich-egg",
    name: "Egg Sandwich",
    price: 300,
    category: "breakfast",
  },
  {
    id: "sandwich-bec",
    name: "Bacon Egg Cheese Sand.",
    price: 500,
    category: "breakfast",
  },
  {
    id: "sandwich-sec",
    name: "Sausage Egg Cheese Sand.",
    price: 500,
    category: "breakfast",
  },

  // --- TEXAS BREAKFAST MELTS (NEW) ---
  {
    id: "tmelt-bec",
    name: "Texas Bacon Egg Cheese Melt",
    price: 650,
    category: "breakfast",
  }, // NEW
  {
    id: "tmelt-sec",
    name: "Texas Sausage Egg Cheese Melt",
    price: 650,
    category: "breakfast",
  }, // NEW
  {
    id: "tmelt-hec",
    name: "Texas Ham Egg Cheese Melt",
    price: 650,
    category: "breakfast",
  }, // NEW

  // ==========================================
  // LUNCH / DINNER
  // ==========================================

  // --- MELTS ---
  { id: "melt-patty", name: "Texas Patty Melt", price: 930, category: "lunch" },
  {
    id: "melt-chicken",
    name: "Texas Chicken Melt",
    price: 930,
    category: "lunch",
  },
  {
    id: "melt-cheesesteak",
    name: "Tx Bacon Cheesesteak",
    price: 980,
    category: "lunch",
  },
  {
    id: "melt-sausage",
    name: "Tx Sausage Melt",
    price: 850,
    category: "lunch",
  },

  // --- BURGERS ---
  { id: "burger-q", name: "Quarter Pounder", price: 550, category: "lunch" },
  { id: "burger-d", name: "Double Quarter", price: 750, category: "lunch" },
  {
    id: "burger-bacon",
    name: "Bacon Angus Burger",
    price: 850,
    category: "lunch",
  },

  // --- CLASSIC DINNERS ---
  { id: "dinner-tbone", name: "T-Bone Dinner", price: 1400, category: "lunch" },
  {
    id: "dinner-ribeye",
    name: "Delmonico (Ribeye) Dinner",
    price: 1400,
    category: "lunch",
  },
  {
    id: "dinner-sirloin",
    name: "Sirloin Dinner",
    price: 1200,
    category: "lunch",
  },
  {
    id: "dinner-pork",
    name: "Pork Chop Dinner",
    price: 1100,
    category: "lunch",
  },
  {
    id: "dinner-chicken",
    name: "Grilled Chicken Dinner",
    price: 1000,
    category: "lunch",
  },
  { id: "dinner-chili", name: "Bowl of Chili", price: 450, category: "lunch" },

  // ==========================================
  // SIDES
  // ==========================================

  // --- MAJOR MEATS (Side Orders) ---
  {
    id: "side-quarter",
    name: "Quarter (Patty)",
    price: 300,
    category: "sides",
  },
  {
    id: "side-chicken",
    name: "Chicken Breast (Side)",
    price: 400,
    category: "sides",
  },
  {
    id: "side-pork",
    name: "Pork Chop (1 Side)",
    price: 450,
    category: "sides",
  },
  {
    id: "side-steak-meat",
    name: "Cheesesteak Meat (Side)",
    price: 400,
    category: "sides",
  },
  {
    id: "side-tbone",
    name: "T-Bone Steak (Side)",
    price: 1000,
    category: "sides",
  },
  {
    id: "side-ribeye",
    name: "Delmonico Steak (Side)",
    price: 1000,
    category: "sides",
  },

  // --- HASHBROWNS ---
  { id: "hb-reg", name: "Hashbrowns (Reg)", price: 315, category: "sides" },
  { id: "hb-large", name: "Hashbrowns (Lrg)", price: 500, category: "sides" },
  {
    id: "hb-triple",
    name: "Hashbrowns (Triple)",
    price: 700,
    category: "sides",
  },

  // --- HASHBROWN MODIFIERS ---
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
  {
    id: "mod-capped",
    name: "Capped (Mushrooms)",
    price: 60,
    category: "sides",
    isModifier: true,
  },
  {
    id: "mod-topped",
    name: "Topped (Chili)",
    price: 60,
    category: "sides",
    isModifier: true,
  },
  {
    id: "mod-country",
    name: "Country (Gravy)",
    price: 60,
    category: "sides",
    isModifier: true,
  },

  // --- BREAKFAST MEAT SIDES ---
  { id: "side-bacon", name: "Bacon (Side)", price: 400, category: "sides" },
  { id: "side-sausage", name: "Sausage (Side)", price: 400, category: "sides" },
  { id: "side-ham-city", name: "City Ham", price: 450, category: "sides" },
  {
    id: "side-ham-country",
    name: "Country Ham",
    price: 550,
    category: "sides",
  },

  // --- TOAST & BREAD ---
  { id: "side-toast", name: "White Toast", price: 200, category: "sides" },
  {
    id: "side-toast-wheat",
    name: "Wheat Toast",
    price: 200,
    category: "sides",
  },
  {
    id: "side-toast-raisin",
    name: "Raisin Toast",
    price: 215,
    category: "sides",
  },
  {
    id: "side-toast-texas",
    name: "Texas Toast",
    price: 220,
    category: "sides",
  },
  { id: "side-biscuit", name: "Biscuit (Side)", price: 200, category: "sides" },

  // --- OTHER SIDES ---
  { id: "side-grits", name: "Bowl of Grits", price: 300, category: "sides" },
  {
    id: "side-eggs",
    name: "Order of Eggs (Side)",
    price: 250,
    category: "sides",
  },

  // ==========================================
  // BEVERAGES
  // ==========================================
  { id: "bev-coffee", name: "Coffee", price: 265, category: "beverages" },
  { id: "bev-decaf", name: "Decaf Coffee", price: 265, category: "beverages" },
  { id: "bev-oj", name: "Orange Juice", price: 290, category: "beverages" },
  { id: "bev-milk", name: "Milk", price: 290, category: "beverages" },
  {
    id: "bev-choc-milk",
    name: "Chocolate Milk",
    price: 290,
    category: "beverages",
  },
  { id: "bev-coke", name: "Coca-Cola", price: 265, category: "beverages" },
  { id: "bev-diet-coke", name: "Diet Coke", price: 265, category: "beverages" },
  {
    id: "bev-pibb",
    name: "Mr. Pibb / Pibb Xtra",
    price: 265,
    category: "beverages",
  },
  { id: "bev-sprite", name: "Sprite", price: 265, category: "beverages" },
  { id: "bev-hic", name: "Hi-C", price: 265, category: "beverages" },
  { id: "bev-tea", name: "Iced Tea", price: 265, category: "beverages" },
  { id: "bev-lemonade", name: "Lemonade", price: 265, category: "beverages" },
];
