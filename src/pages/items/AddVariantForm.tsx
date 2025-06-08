import { useEffect, useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useGetAttributesQuery } from "../../redux/features/attributes/attributeApiSlice";
import {
  getAttributes,
  type IAttribute,
} from "../../redux/features/attributes/attributeSlice";
import {
  addAttributeToItem,
  autoGenerateVariations,
  newAutoGenerateVariations,
  removeAttributeFromItem,
  removeAttributeValuesFromItem,
  removeVariationAttributesFromItem,
  removeVariationField,
  restoreAttributeValuesFromTrash,
  restoreVariationAttributesFromTrash,
  updateVariationValues,
} from "../../redux/features/items/itemFormSlice";
import type { RootState } from "../../redux/store";
import { generateVariations } from "../../utils/generateVariations";

const AddVariantForm = () => {
  const dispatch = useDispatch();

  const { data, isLoading: attributesLoading } = useGetAttributesQuery(null);

  const editableRefs = useRef<Array<HTMLDivElement | null>>([]);
  const editableVariationRefs = useRef<Array<HTMLDivElement | null>>([]);

  const { attributes: attributesData } = useSelector(
    (state: RootState) => state.attributes
  );
  const { attributes, variations } = useSelector(
    (state: RootState) => state.itemForm
  );

  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data && !attributesLoading) {
      const filterAttributes = data?.map((attr: IAttribute) => ({
        id: attr.id || "",
        name: attr.name || "",
        attributeValues: attr.values || "",
      }));
      dispatch(getAttributes(filterAttributes));
    }
  }, [data, attributesLoading, dispatch]);

  const handleSelectAttribute = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAttribute(e.target.value);
  };

  const handleChangeVariationValues = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedVariation = {
      ...variations[index],
      [name]: value,
    };
    dispatch(
      updateVariationValues({
        index,
        updatedVariation,
      })
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    const el = editableRefs.current[index];
    const inputValue = el?.innerText.trim() || "";

    if (e.key === "Backspace" && inputValue === "") {
      e.preventDefault();

      // remove last attribute value
      const removedValue =
        attributes[index].attributeValues[
          attributes[index].attributeValues.length - 1
        ];
      const updatedValues = attributes[index].attributeValues.slice(0, -1);
      const updatedAttribute = {
        ...attributes[index],
        attributeValues: updatedValues,
        trashValues: [...(attributes[index].trashValues || []), removedValue],
      };
      if (removedValue) {
        dispatch(removeAttributeValuesFromItem({ index, updatedAttribute }));
      }
    }
  };

  const handleVariationKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    const el = editableVariationRefs.current[index];
    const inputValue = el?.innerText.trim() || "";

    if (e.key === "Backspace" && inputValue === "") {
      e.preventDefault();

      // remove last attribute value
      const removedValue =
        variations[index].attributes[variations[index].attributes.length - 1];
      const updatedValues = variations[index].attributes.slice(0, -1);
      const updatedAttribute = {
        ...variations[index],
        attributes: updatedValues,
        trashAttributes: [
          ...(variations[index].trashAttributes || []),
          removedValue,
        ],
      };
      if (removedValue) {
        dispatch(
          removeVariationAttributesFromItem({ index, updatedAttribute })
        );
      }
    }
  };

  const handleAddAttribute = () => {
    if (selectedAttribute) {
      const findAttribute = attributesData.find(
        (attr) => attr?.id?.toString() === selectedAttribute
      );
      if (findAttribute) {
        dispatch(addAttributeToItem(findAttribute));
        setSelectedAttribute("");
      }
    } else {
      toast.error("Please Select an attribute");
    }
  };

  const handleDeleteAttribute = (index: number) => {
    dispatch(removeAttributeFromItem(index));
    const newVariations = attributes.filter((_, i) => i !== index);

    const variationsArray = generateVariations(newVariations, []);

    const generateVariationValues = variationsArray.map((v) => ({
      name: v.join(", "),
      attributes: v,
      quantity: "",
      costPrice: "",
      sellPrice: "",
    }));

    dispatch(newAutoGenerateVariations(generateVariationValues));
  };

  const handleRestoreValues = (index: number, attrIndex: number) => {
    const original = attributes[index];
    const restoreValue = original.trashValues[attrIndex];

    const updatedTrash = original.trashValues.filter((_, i) => i !== attrIndex);
    const updatedAttribute = {
      ...original,
      attributeValues: [...original.attributeValues, restoreValue],
      trashValues: updatedTrash,
    };

    if (restoreValue) {
      dispatch(restoreAttributeValuesFromTrash({ index, updatedAttribute }));
    }
  };

  const handleRestoreVariationAttributes = (
    index: number,
    attrIndex: number
  ) => {
    const original = variations[index];
    const restoreValue = original.trashAttributes[attrIndex];

    const updatedTrash = original.trashAttributes.filter(
      (_, i) => i !== attrIndex
    );
    const updatedAttribute = {
      ...original,
      attributes: [...original.attributes, restoreValue],
      trashAttributes: updatedTrash,
    };

    if (restoreValue) {
      dispatch(
        restoreVariationAttributesFromTrash({ index, updatedAttribute })
      );
    }
  };

  // Your handler function (example React handler)
  const handleAutoGenerate = () => {
    if (attributes.length === 0) {
      toast.error("You have to select an attribute to generate");
      return;
    }

    // Map existing variations WITHOUT the index prefix
    const existingVariations: string[][] = variations.map((v) => v.attributes);

    const variationsArray = generateVariations(attributes, existingVariations);

    const generateVariationValues = variationsArray.map((v) => ({
      name: v.join(", "),
      attributes: v,
      quantity: "",
      costPrice: "",
      sellPrice: "",
    }));

    dispatch(autoGenerateVariations(generateVariationValues));
  };

  // const handleAddVariationField = () => {
  //   if (attributes.length > 0) {
  //     const variationField = {
  //       name: "",
  //       attributes: [],
  //       quantity: "",
  //       price: "",
  //     };
  //     dispatch(addVariationField(variationField));
  //   } else {
  //     toast.error("You have to select an attribute to create");
  //   }
  // };

  return (
    <div className="border border-gray-300 rounded-md">
      <h1 className="bg-[#dbdbdb] p-3 font-medium">Variant</h1>
      <div className="p-3">
        <div>
          <label htmlFor="attribute">Attribute</label>
          <div className="flex mt-2">
            <select
              name="attribute"
              id="attribute"
              value={selectedAttribute}
              onChange={handleSelectAttribute}
              className="border border-gray-300 w-full p-2 outline-none"
            >
              {!selectedAttribute && (
                <option value="Shakil">Select Attribute</option>
              )}
              {attributesData
                .filter(
                  (attr) => !attributes.some((sel) => sel.name === attr.name)
                )
                .map((att, i) => (
                  <option key={i} value={att?.id}>
                    {att.name}
                  </option>
                ))}
            </select>
            <button
              type="button"
              onClick={handleAddAttribute}
              className="py-2 px-4 text-sm bg-blue-500 text-white cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
        {attributes?.length > 0 && (
          <div className="flex items-center py-2 gap-4 border-b border-gray-200 text-sm mt-5">
            <div className="w-[30%]">Name</div>
            <div className="w-[60%]">Values</div>
            <div className="w-[10%] shrink-0">Delete</div>
          </div>
        )}
        {attributes?.map((attr, i) => (
          <div
            key={i}
            className="flex items-center py-2 gap-4 border-b border-gray-200 text-sm hover:bg-[#f0f0f0] overflow-x-auto md:overflow-visible"
          >
            <div className="w-[30%] px-2">{attr.name}</div>
            <div className="w-[60%] px-2 py-1 border border-gray-300 outline-none focus-within:border-blue-500 flex flex-wrap gap-2 relative">
              {attr.attributeValues.map((v, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                >
                  {v}
                </button>
              ))}
              {attr.trashValues?.length > 0 && focusedIndex === i && (
                <div className="absolute top-full mt-2 left-0 bg-white z-[999] shadow max-w-[300px] border border-gray-200 flex flex-wrap gap-1 p-2">
                  {attr.trashValues?.map((v, id) => (
                    <button
                      key={id}
                      type="button"
                      className="cursor-pointer p-2 bg-gray-200"
                      onClick={() => handleRestoreValues(i, id)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
              <div
                ref={(el) => {
                  editableRefs.current[i] = el;
                }}
                className="min-w-[100px] flex-1 p-1 outline-none"
                contentEditable={true}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onFocus={() => {
                  setTimeout(() => setFocusedIndex(i), 150);
                }}
                onBlur={() => {
                  setTimeout(() => setFocusedIndex(null), 150);
                }}
              ></div>
            </div>
            <div className="w-[10%] shrink-0">
              <button
                type="button"
                onClick={() => handleDeleteAttribute(i)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {variations.length > 0 && (
          <div className="mt-5 overflow-x-auto md:overflow-visible">
            <table className="w-full border-collapse rounded-md text-gray-700">
              <thead>
                <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                  <th className="p-3">Name</th>
                  <th className="p-3">Attributes</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Cost Price</th>
                  <th className="p-3">Sell Price</th>
                  <th className="p-3 w-[100px]">Delete</th>
                </tr>
              </thead>
              <tbody>
                {variations.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                  >
                    <td className="">
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={(e) => handleChangeVariationValues(e, index)}
                        className="outline-none border-gray-200 border p-2 w-full block"
                      />
                    </td>
                    <td className="p-3">
                      <div className="px-2 py-1 border border-gray-300 outline-none focus-within:border-blue-500 flex flex-wrap gap-2 relative">
                        {item.attributes.map((v, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                          >
                            {v}
                          </button>
                        ))}
                        {item.trashAttributes?.length > 0 &&
                          focusedIndex === index && (
                            <div className="absolute top-full mt-2 left-0 bg-white z-[999] shadow max-w-[300px] border border-gray-200 flex flex-wrap gap-1 p-2">
                              {item.trashAttributes?.map((v, id) => (
                                <button
                                  key={id}
                                  type="button"
                                  className="cursor-pointer p-2 bg-gray-200"
                                  onClick={() =>
                                    handleRestoreVariationAttributes(index, id)
                                  }
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          )}
                        <div
                          ref={(el) => {
                            editableVariationRefs.current[index] = el;
                          }}
                          className="min-w-[100px] flex-1 p-1 outline-none"
                          contentEditable={true}
                          onKeyDown={(e) => handleVariationKeyDown(e, index)}
                          onFocus={() => {
                            setTimeout(() => setFocusedIndex(index), 150);
                          }}
                          onBlur={() => {
                            setTimeout(() => setFocusedIndex(null), 150);
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleChangeVariationValues(e, index)}
                        className="outline-none border-gray-200 border p-2 w-full block"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        name="costPrice"
                        value={item.costPrice}
                        onChange={(e) => handleChangeVariationValues(e, index)}
                        className="outline-none border-gray-200 border p-2 w-full block"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        name="sellPrice"
                        value={item.sellPrice}
                        onChange={(e) => handleChangeVariationValues(e, index)}
                        className="outline-none border-gray-200 border p-2 w-full block"
                      />
                    </td>
                    <td className="flex items-center gap-1 p-3">
                      <button
                        type="button"
                        className="text-red-500 cursor-pointer select-none"
                        onClick={() => dispatch(removeVariationField(index))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* <div>
          <button
            type="button"
            className="mt-5 cursor-pointer text-blue-500 hover:text-blue-600 text-sm"
            onClick={handleAddVariationField}
          >
            Add Item Variation
          </button>
        </div> */}
        <div className="mt-10">
          <button
            type="button"
            className="bg-green-500 text-sm p-2 text-white cursor-pointer hover:bg-green-600"
            onClick={handleAutoGenerate}
          >
            Generate Variant
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVariantForm;
