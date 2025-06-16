import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import {
  useGetSingleItemQuery,
  type IProductVariant,
} from "../../redux/features/items/itemApiSlice";

type Attribute = {
  [key: string]: string;
};

type VariantType = {
  id: string;
  name: string;
  barcode: string;
  stock: number;
  sellPrice: number;
  costPrice: number;
  attributes: Attribute[];
  productId: string;
  isDeleted: boolean;
  trashAttributes: Record<string, string> | null;
  createdAt: string;
  updatedAt: string;
};

const GenerateItemFormPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleItemQuery(itemId, {
    skip: !itemId,
  });

  const [variants, setVariants] = useState<VariantType[]>([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");

  useEffect(() => {
    if (!isLoading && data && data?.variant?.length > 0) {
      const itemVariants = data?.variant?.map((v: IProductVariant) => {
        if (v?.attributes) {
          const attributeArray = Object.entries(v?.attributes).map(
            ([key, value]) => ({ [key]: value })
          );
          return {
            ...v,
            attributes: attributeArray,
          };
        } else {
          return v;
        }
      });

      setVariants(itemVariants);
    }
  }, [data, isLoading]);

  const selectedVariantObj: VariantType | null = selectedVariant
    ? variants?.find((v: VariantType) => v?.id === selectedVariant) || null
    : null;

  const handleGenerate = () => {
    const generateItem = {
      item: selectedVariantObj,
      printQuantity: parseInt(selectedQuantity),
    };
    if (parseInt(selectedQuantity) > 0) {
      navigate("/print-item-barcode", { state: generateItem });
    } else {
      toast.error("Select Quantity to Print!");
    }
  };

  return isLoading ? (
    <div className="p-4 bg-white">Loading...</div>
  ) : data && data?.variant?.length > 0 && !isLoading ? (
    <div className="p-4 bg-white">
      <h1 className="font-medium mb-5">Generate Item Barcodes</h1>
      <select
        name="selectedVariant"
        value={selectedVariant}
        onChange={(e) => setSelectedVariant(e.target.value)}
        className="block p-2.5 border border-gray-200 text-gray-600 outline-none cursor-pointer text-sm"
      >
        <option value="">Select Variant</option>
        {variants?.map((v: VariantType) => (
          <option key={v?.id} value={v?.id}>
            {v?.name}
          </option>
        ))}
      </select>
      {selectedVariantObj && (
        <>
          <div className="border border-dashed border-gray-300 p-3 space-y-2.5 mt-5 text-sm">
            <div className="flex gap-2 items-center">
              <h1 className="shrink-0 w-1/6 text-right">Name:</h1>
              <span className="border border-gray-200 p-2.5 w-full">
                {selectedVariantObj?.name || "N/A"}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <h1 className="shrink-0 w-1/6 text-right">Price:</h1>
              <span className="border border-gray-200 p-2.5 w-full">
                {selectedVariantObj?.sellPrice}
              </span>
            </div>
            {selectedVariantObj?.attributes?.length > 0 &&
              selectedVariantObj?.attributes?.map((attr, i) => {
                const [key, value] = Object.entries(attr)[0];
                return (
                  <div key={i} className="flex gap-2 items-center">
                    <h1 className="shrink-0 w-1/6 text-right">{key}:</h1>
                    <span className="border border-gray-200 p-2.5 w-full">
                      {value}
                    </span>
                  </div>
                );
              })}
          </div>
          <select
            name="quantity"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(e.target.value)}
            className="block p-2.5 border border-gray-200 text-gray-600 outline-none cursor-pointer mt-5 text-sm"
          >
            <option value="">Select Quantity</option>
            {Array.from({ length: 50 }, (_, i) => i + 1).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleGenerate}
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm inline-block mt-5 cursor-pointer"
          >
            Generate
          </button>
        </>
      )}
    </div>
  ) : (
    <div className="p-4 bg-white text-red-500">Not Found</div>
  );
};

export default GenerateItemFormPage;
