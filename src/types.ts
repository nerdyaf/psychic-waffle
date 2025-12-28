// src/types.ts

// This defines the shape of a menu item in our database
export interface MenuItem {
  id: string;
  name: string;
  price: number; // Price in CENTS ($1.00 = 100)
  category: "breakfast" | "lunch" | "sides" | "beverages";
  isModifier?: boolean; // True for stuff like "Smothered" or "Cheese"
}

// This defines an item that has been added to the customer's bill
export interface TicketItem extends MenuItem {
  uuid: string; // A unique ID for the receipt row
  modifiers: MenuItem[]; // A list of add-ons (e.g., Smothered)
}
