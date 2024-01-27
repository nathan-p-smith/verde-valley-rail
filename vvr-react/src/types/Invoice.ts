import { InvoiceItem } from "./InvoiceItem";

export type Invoice = {
    items?: InvoiceItem[];
    tax: number;
    totalPrice: number;
    grandTotal: number;
    customerId: number;    
  }