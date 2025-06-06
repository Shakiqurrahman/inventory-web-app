import type { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFormValues } from "../../redux/features/items/itemFormSlice";
import type { RootState } from "../../redux/store";
import AddVariantForm from "./AddVariantForm";

const CreateItemPage = () => {
  const dispatch = useDispatch();
  const { form, attributes, variations } = useSelector(
    (state: RootState) => state.itemForm
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      dispatch(changeFormValues({ [name]: e.target.checked }));
    } else {
      dispatch(changeFormValues({ [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { quantity, ...formData } = form;
    let finalData = JSON.parse(
      JSON.stringify({ ...formData, stock: quantity })
    );
    if (form.isVariantChecked) {
      finalData = { ...finalData, stock: "" };
    }
    if (variations.length > 0) {
      const finalVariations = variations.map((v) => ({
        ...v,
        stock: v.quantity,
        attributes: Object.fromEntries(
          v.attributes.map((item) => {
            const [key, value] = item.split(":");
            return [key, value];
          })
        ),
      }));
      finalData = { ...finalData, attributes, variant: finalVariations };
    }
    console.log(finalData);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <h3 className="text-2xl font-semibold">Item Information</h3>
      <form
        className="mt-5 space-y-4 *:flex *:flex-col *:gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px]"
          ></textarea>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          >
            <option value="Shakil">Shakil</option>
            <option value="Mahdi">Mahdi</option>
            <option value="Shakiqur">Shakiqur</option>
          </select>
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={form.brand}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          />
        </div>
        {!form.isVariantChecked && (
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="border border-gray-300 w-full p-2 outline-none rounded-md"
            />
          </div>
        )}
        <div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              name="isVariantChecked"
              id="isVariantChecked"
              checked={form.isVariantChecked}
              onChange={handleChange}
            />
            <label
              htmlFor="isVariantChecked"
              className="w-full cursor-pointer select-none"
            >
              Add Variations
            </label>
          </div>
        </div>
        {form.isVariantChecked && <AddVariantForm />}
        <div>
          <button
            type="submit"
            className="cursor-pointer ml-auto bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItemPage;
