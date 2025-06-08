import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAttributesQuery,
  useSaveAttributesMutation,
} from "../../redux/features/attributes/attributeApiSlice";
import {
  addAttribute,
  deleteAttribute,
  getAttributes,
  updateAttribute,
  type IAttribute,
} from "../../redux/features/attributes/attributeSlice";
import type { RootState } from "../../redux/store";
import { getErrorMessage } from "../../utils/errorHandler";

const AttributesPage = () => {
  const dispatch = useDispatch();

  const { attributes } = useSelector((state: RootState) => state.attributes);

  const { data, isLoading } = useGetAttributesQuery(null);
  const [saveAttributes, { isLoading: saveLoading }] =
    useSaveAttributesMutation();

  const editableRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (data && !isLoading) {
      const formattedData = data?.map((v: IAttribute) => ({
        id: v.id || "",
        name: v.name || "",
        attributeValues: v.values || [],
      }));
      dispatch(getAttributes(formattedData));
    }
  }, [data, dispatch, isLoading]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    const el = editableRefs.current[index];
    const inputValue = el?.innerText.trim() || "";

    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue) {
        const existingValues = attributes[index].attributeValues;

        // ✅ Prevent duplicates
        if (existingValues.includes(inputValue)) return;

        const updatedAttribute = {
          ...attributes[index],
          attributeValues: [...existingValues, inputValue],
        };

        dispatch(updateAttribute({ index, updatedAttribute }));

        if (el) el.innerText = "";
      }
    }

    if (e.key === "Backspace" && inputValue === "") {
      e.preventDefault();

      // remove last attribute value
      const updatedAttribute = {
        ...attributes[index],
        attributeValues: attributes[index].attributeValues.slice(0, -1),
      };

      dispatch(updateAttribute({ index, updatedAttribute }));
    }
  };

  const handleChangeAttributeName = (index: number, value: string) => {
    const updatedAttribute = {
      ...attributes[index],
      name: value,
    };
    dispatch(
      updateAttribute({
        index,
        updatedAttribute,
      })
    );
  };

  const handleAddAttribute = () => {
    const newAttribute = {
      name: "",
      attributeValues: [],
    };
    dispatch(addAttribute(newAttribute));
  };

  const handleSave = async () => {
    // Here you can implement the logic to save the attributes
    const filterAttributes = attributes
      .filter(
        (attr) => attr.name.trim() !== "" && attr.attributeValues.length > 0
      )
      .map((attr) => ({ name: attr.name, values: attr.attributeValues }));
    console.log("Attributes saved:", attributes);
    if (filterAttributes.length > 0) {
      try {
        await saveAttributes(filterAttributes).unwrap();
        toast.success("Attributes saved successfully!");
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <h1 className="p-3 bg-[#F9F9F9] text-sm border-b border-gray-200">
        Manage Attributes
      </h1>
      <div className="p-3 overflow-x-auto">
        <div className="flex py-2 items-center gap-4 border-b border-gray-200 text-sm">
          <span className="w-[30%]">Name</span>
          <span className="w-[60%]">Values</span>
          <span className="w-[10%] shrink-0">Delete</span>
        </div>
        {isLoading ? (
          <div className="text-grey-500 text-sm">Loading Attributes...</div>
        ) : !isLoading && attributes.length > 0 ? (
          attributes.map((attribute, i) => (
            <div
              className="flex items-center py-2 gap-4 border-b border-gray-200 text-sm"
              key={i}
            >
              <div className="w-[30%]">
                <input
                  type="text"
                  value={attribute.name}
                  onChange={(e) => handleChangeAttributeName(i, e.target.value)}
                  placeholder="Attribute Name"
                  className="w-full border border-gray-300 p-2 outline-none focus:border-blue-500 block"
                />
              </div>
              <div className="w-[60%] px-2 py-1 border border-gray-300 outline-none focus-within:border-blue-500 flex flex-wrap gap-2">
                {attribute.attributeValues.map((attr, index) => (
                  <button
                    key={index}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                  >
                    {attr}
                  </button>
                ))}
                <div
                  ref={(el) => {
                    editableRefs.current[i] = el;
                  }}
                  className="min-w-[100px] flex-1 p-1 outline-none"
                  contentEditable={true}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                ></div>
              </div>
              <div className="w-[10%] shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    console.log(i);
                    dispatch(deleteAttribute(i));
                  }}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm py-2">
            No attributes available. Click "Add Attribute" to create one.
          </div>
        )}
        {!isLoading && (
          <div className="flex gap-5 items-center justify-between mt-5 text-sm">
            <button
              type="button"
              onClick={handleAddAttribute}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              Add Attribute
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saveLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer disabled:bg-blue-500/50"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttributesPage;
