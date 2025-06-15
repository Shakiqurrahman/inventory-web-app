export type ISaleHistory = {
    id?: number;
    invoiceId: string;
    customer: { id?: number; name: string; phone: string };
    dueAmount: string;
    itemBrand: string;
    itemName: string;
    paidAmount: string;
    paymentMethod: string;
    status: boolean;
    totalPrice: string;
    saleStatus: "PAID" | "DUE";
    payments: { amount: number; method: string }[];
};
