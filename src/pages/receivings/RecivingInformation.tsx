import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { setSuppierId } from "../../redux/features/receiving/receivingFormSlice";
import { useGetSupplierQuery } from "../../redux/features/suppliers/supplierApi";
import type { ISupplier } from "../../redux/features/suppliers/supplierSlice";
import { useAppSelector } from "../../redux/hook";

export const RecivingInformation = () => {
  const dispatch = useDispatch();

  const {
    receivingForm: { supplierId },
  } = useAppSelector((state) => state.receivingForm);

  const [searchSupplier, setSearchSupplier] = useState("");

  const {
    data,
    isLoading: isSuggestionsLoading,
    isFetching: isSuggestionsFetching,
  } = useGetSupplierQuery(
    {
      search: searchSupplier,
    },
    { skip: searchSupplier.length < 2 }
  );

  const suggestions = data?.data;

  const selectedSupplier = suggestions?.find(
    (cus: ISupplier) => cus.id === supplierId
  );

  const handleChangeSupplierId = (id: string) => {
    if (id) {
      dispatch(setSuppierId(id));
      setSearchSupplier("");
    }
  };

  const handleRemoveSupplierId = () => {
    dispatch(setSuppierId(""));
    setSearchSupplier("");
  };

  return (
    <div className="bg-white">
      <h1 className="bg-primary text-white font-medium px-5 py-3">Supplier</h1>

      {/* <button className="text-gray-500 cursor-pointer flex gap-1 items-center mx-auto p-2 rounded-lg text-xs mb-2 mt-4 bg-red-100 border border-red-300">
        <MdCancel /> Cancel Receiveing.
      </button> */}

      <div className="p-5">
        {!supplierId && (
          <div className="flex items-center gap-2 border border-gray-300 rounded-md relative">
            <Link
              to={"/suppliers/new-supplier"}
              className="bg-primary text-white p-3"
            >
              <FaPlus />
            </Link>
            <input
              className="border-0 outline-0 w-full text-sm"
              type="text"
              value={searchSupplier}
              onChange={(e) => setSearchSupplier(e.target.value)}
              placeholder="Type Supplier's Name"
            />
            {suggestions?.length > 0 &&
              !isSuggestionsFetching &&
              !isSuggestionsLoading &&
              searchSupplier.trim().length > 1 && (
                <ul className="absolute max-h-[400px] overflow-y-auto z-[999] top-full shadow left-0 w-full bg-white *:p-3 *:border-b *:border-gray-200 *:hover:bg-gray-100 *:last:border-none *:select-none *:cursor-pointer *:text-sm">
                  {suggestions?.map((supp: ISupplier, index: number) => (
                    <li
                      key={index}
                      onClick={() => handleChangeSupplierId(supp.id)}
                    >
                      <h1 className="text-gray-700">{supp?.fullName || ""}</h1>
                      <p className="text-gray-500">{supp?.phone || ""}</p>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        )}
        {supplierId && (
          <div className="flex items-center justify-between gap-2 border border-primary border-dashed p-3">
            <div className="text-sm text-gray-700">
              <h1>{selectedSupplier?.fullName || ""}</h1>
              <p>{selectedSupplier?.phone || ""}</p>
            </div>
            <button type="button" onClick={handleRemoveSupplierId}>
              <IoIosCloseCircle className="text-xl cursor-pointer text-red-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
