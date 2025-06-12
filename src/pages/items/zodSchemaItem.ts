import { z } from "zod";

// // Base object schema for item form
// const itemFormBaseSchema = z.object({
//     name: z.string().min(1, "Name is required"),
//     costPrice: z
//         .union([z.string(), z.number()])
//         .transform((val) => Number(val))
//         .refine((val) => val >= 0, {
//             message: "Cost price must be a positive number",
//         }),
//     sellPrice: z
//         .union([z.string(), z.number()])
//         .transform((val) => Number(val))
//         .refine((val) => val >= 0, {
//             message: "Sell price must be a positive number",
//         }),
//     discountPercentage: z
//         .union([z.string(), z.number()])
//         .optional()
//         .transform((val) => (val === "" || val == null ? 0 : Number(val)))
//         .refine((val) => val >= 0 && val <= 100, {
//             message: "Discount must be between 0 and 100",
//         }),
//     description: z.string().optional(),
//     categoryId: z.string().optional(),
//     brand: z.string().optional(),
//     stock: z
//         .union([z.string(), z.number()])
//         .transform((val) => (val === "" || val == null ? -1 : Number(val)))
//         .refine((val) => val >= 0, {
//             message: "Stock must be a positive number",
//         }),
//     isVariantChecked: z.boolean(),
// });

// // Base schema for item form with superRefine
// export const itemFormSchema = fullItemFormSchema.superRefine((data, ctx) => {
//     if (!data.isVariantChecked && (data.stock === -1 || isNaN(data.stock))) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "Stock is required when variations are not enabled",
//             path: ["stock"],
//         });
//     }
// });

// // Schema for individual variation
// const variationSchema = z.object({
//     stock: z
//         .union([z.string(), z.number()])
//         .transform((val) => Number(val))
//         .refine((val) => val >= 0, {
//             message: "Variation stock must be a positive number",
//         }),
//     sellPrice: z
//         .union([z.string(), z.number()])
//         .transform((val) => Number(val)),
//     costPrice: z
//         .union([z.string(), z.number()])
//         .transform((val) => Number(val)),
//     attributes: z
//         .array(z.string())
//         .nonempty("Variation must have at least one attribute"),
// });
// // Full form schema including variations
// const fullItemFormBaseSchema = itemFormBaseSchema.extend({
//     attributes: z.array(z.string()).optional(),
//     variations: z.array(variationSchema).optional(),
// });

// export const fullItemFormSchema = fullItemFormBaseSchema.superRefine(
//     (data, ctx) => {
//         if (
//             !data.isVariantChecked &&
//             (data.stock === -1 || isNaN(data.stock))
//         ) {
//             ctx.addIssue({
//                 code: z.ZodIssueCode.custom,
//                 message: "Stock is required when variations are not enabled",
//                 path: ["stock"],
//             });
//         }
//     }
// );

// // Infer TypeScript types (optional)
// export type ItemFormSchemaType = z.infer<typeof fullItemFormSchema>;

const variationInputSchema = z.object({
    stock: z.union([z.string(), z.number()]),
    sellPrice: z.union([z.string(), z.number()]),
    costPrice: z.union([z.string(), z.number()]),
    attributes: z
        .array(z.string())
        .nonempty("Variation must have at least one attribute"),
});

export const fullItemFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    costPrice: z.string().min(1, "Cost Price is required"),
    sellPrice: z.string().min(1, "Sell Price is required"),
    discountPercentage: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.string().optional(),
    brand: z.string().optional(),
    stock: z.string().optional(),
    isVariantChecked: z.boolean(),
    attributes: z.array(z.string()).optional(),
    variations: z.array(variationInputSchema).optional(),
});

export type ItemFormInput = z.infer<typeof fullItemFormSchema>;
