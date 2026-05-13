export type PurchaseType = "once" | "subscribe";

export type CartAddon = {
  id: string;
  name: string;
  price: number;
};

export type CartLine = {
  id: string;
  productId: string;
  title: string;
  image: string;
  unitPrice: number;
  quantity: number;
  color: string;
  size: string;
  addons: CartAddon[];
  customMessage: string;
  customNote: string;
  deliveryDate: string;
  deliveryTime: string;
  extraItemsCount: string;
  floralOption: string;
  additionalOption: string;
  purchaseType: PurchaseType;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  body: string;
  hideName: boolean;
  createdAt: string;
  /** Reviews the visitor added can be edited or deleted */
  isEditable: boolean;
};
