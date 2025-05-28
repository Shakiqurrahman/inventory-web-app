// types/supplier.ts
import { z } from "zod";

export const supplierSchema = z.object({
    companyName: z.string(),
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address1: z.string(),
    address2: z.string().optional(),
    comments: z.string().optional(),
    internalNotes: z.string().optional(),
    account: z.string(),
});

export type SupplierForm = z.infer<typeof supplierSchema>;
