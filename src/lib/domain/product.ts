export const STORAGE_CART = "farah-cart-v1";
export const STORAGE_REVIEWS = "farah-reviews-v1";

export type UpsellItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export const PRODUCT = {
  id: "rosy-delight",
  category: "Fresh flowers",
  name: "Rosy Delight",
  code: "000000000000",
  rating: 4.5,
  reviewCount: 24,
  price: 90,
  compareAt: 120,
  discountLabel: "15% OFF",
  inStock: true,
  description:
    "A luxurious hand-tied bouquet featuring premium David Austin roses in soft peach, blush, and ivory. Subtle fragrance, long vase life, and a timeless presentation perfect for celebrations or quiet moments at home.",
  tags: ["Top-rated bouquet", "Eco-friendly", "Includes free gift card"],
  images: ["/ea65190585b596adcc9f616c7b51eb1211b08013.jpg"] as const,
  colors: [
    { id: "black", label: "Black", hex: "#1a1a1a" },
    { id: "grey", label: "Grey", hex: "#9ca3af" },
    { id: "white", label: "White", hex: "#f3f4f6" },
  ],
  sizes: ["XS", "S", "M", "L", "XL"] as const,
  upsells: [
    {
      id: "combo-1",
      name: "Gift set",
      price: 45,
      image: "/1d2b7c229590c94576caf4fd72cdc2ee9319c49b.png",
    },
    {
      id: "combo-2",
      name: "Candle",
      price: 55,
      image: "/212750382ca93b1afa00b251b4254051d124ce4b.png",
    },
    {
      id: "combo-3",
      name: "Fragrance",
      price: 89,
      image: "/a0915f0906f1ddd50f3fc305ea6d70043729835e.png",
    },
    {
      id: "combo-4",
      name: "Decor box",
      price: 65,
      image: "/ac46da9398945145d394abbe8321229537d3cc1d.png",
    },
    {
      id: "combo-5",
      name: "Premium add-on",
      price: 75,
      image: "/img%20(1).png",
    },
    {
      id: "combo-6",
      name: "Accessory",
      price: 40,
      image: "/img.png",
    },
  ] satisfies UpsellItem[],
  related: [
    {
      slug: "rattan-grapefruit",
      name: "Rattan Grapefruit",
      price: 48,
      image: "/1d2b7c229590c94576caf4fd72cdc2ee9319c49b.png",
    },
    {
      slug: "lime-matcha",
      name: "Lime & Matcha",
      price: 52,
      image: "/212750382ca93b1afa00b251b4254051d124ce4b.png",
    },
    {
      slug: "cozy-nights",
      name: "Cozy Nights",
      price: 55,
      image: "/a0915f0906f1ddd50f3fc305ea6d70043729835e.png",
    },
    {
      slug: "morning-dew",
      name: "Morning Dew",
      price: 49,
      image: "/ac46da9398945145d394abbe8321229537d3cc1d.png",
    },
  ],
} as const;

export const FLORAL_OPTIONS = [
  { value: "", label: "Add floral options" },
  { value: "extra-greenery", label: "Extra greenery (+15 SAR)" },
  { value: "premium-wrap", label: "Premium wrap (+25 SAR)" },
] as const;

export const ADDITIONAL_OPTIONS = [
  { value: "", label: "Additional options" },
  { value: "gift-bag", label: "Gift bag (+10 SAR)" },
  { value: "ribbon", label: "Silk ribbon (+8 SAR)" },
] as const;
