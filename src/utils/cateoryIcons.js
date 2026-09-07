import {
  Utensils,
  Car,
  BusFront,
  ShoppingBag,
  Film,
  Receipt,
  HeartPulse,
  CircleEllipsis,
  House,
  CircleDollarSign,
} from "lucide-react";

export const categoryIcons = {
  Food: Utensils,

  // Support both names
  Transport: BusFront,
  Transportation: Car,

  Rent: House,

  Shopping: ShoppingBag,

  Entertainment: Film,

  Bills: Receipt,

  Health: HeartPulse,

  Other: CircleEllipsis,
};

export const getCategoryIcon = (category) => {
  return categoryIcons[category] || CircleDollarSign;
};
