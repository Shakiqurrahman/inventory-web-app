import { useState, type ChangeEvent } from "react";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { FaMinus, FaPlus, FaUserPlus } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCustomersQuery,
  type ICustomer,
} from "../../redux/features/customers/customersApi";
import { useGetEmployeeListQuery } from "../../redux/features/employees/employeeApi";
import type { IEmployee } from "../../redux/features/employees/employeeSlice";
import {
  setCustomer,
  setCustomerId,
  setSelectedEmployee,
} from "../../redux/features/sales/salesFormSlice";
import type { RootState } from "../../redux/store";

const SalesInformation = () => {
  const dispatch = useDispatch();

  const {
    salesForm: { selectedEmployee, customer, customerId },
  } = useSelector((state: RootState) => state.salesForm);

  const { data: employeesData } = useGetEmployeeListQuery(null);

  const [openNewCustomerBox, setOpenNewCustomerBox] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState("");

  const {
    data,
    isLoading: isSuggestionsLoading,
    isFetching: isSuggestionsFetching,
  } = useGetCustomersQuery(
    {
      search: searchCustomer,
    },
    { skip: searchCustomer.length < 2 }
  );

  const suggestions = data?.data;

  const selectedCustomer = suggestions?.find(
    (cus: ICustomer) => cus.id === customerId
  );

  const handleEmployeeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedEmployee(e.target.value));
  };

  const handleNewCustomerBox = () => {
    if (openNewCustomerBox) {
      const customer = {
        name: "",
        phone: "",
      };
      setOpenNewCustomerBox(false);
      dispatch(setCustomer(customer));
    } else {
      setSearchCustomer("");
      setOpenNewCustomerBox(true);
    }
  };

  const handleChangeNewCustomerValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const customerValues = {
      ...customer,
      [name]: value,
    };
    dispatch(setCustomer(customerValues));
  };

  const handleChangeCustomerId = (id: string) => {
    if (id) {
      dispatch(setCustomerId(id));
      dispatch(setCustomer({ name: "", phone: "" }));
    }
  };

  const handleRemoveCustomerId = () => {
    dispatch(setCustomerId(""));
    setSearchCustomer("");
    dispatch(setCustomer({ name: "", phone: "" }));
  };

  return (
    <div className="bg-white dark:bg-stone-700">
      <h1 className="bg-primary text-white font-medium px-5 py-3">
        Sales Information
      </h1>
      <div className="p-5 dark:text-gray-300">
        <label htmlFor="employee" className="block mb-3">
          Select Employee <span className="text-red-500">*</span>
        </label>
        <select
          name="employee"
          id="employee"
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          className="border border-gray-200 dark:border-gray-500 outline-none p-2 w-full block bg-gray-100 dark:bg-stone-600"
          required
        >
          {!selectedEmployee && <option value="Shakil">Select Employee</option>}
          {employeesData?.map((employee: IEmployee, index: number) => (
            <option key={index} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        {!openNewCustomerBox && !customerId && (
          <div className="flex mt-5 relative">
            <button
              type="button"
              onClick={handleNewCustomerBox}
              className="shrink-0 bg-primary w-[40px] py-2 text-white flex items-center justify-center cursor-pointer"
            >
              <FaPlus />
            </button>
            <input
              type="text"
              placeholder="Type customer name"
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
              className="p-2 border border-gray-200 text-sm outline-none block w-full"
            />
            {suggestions?.length > 0 &&
              !isSuggestionsFetching &&
              !isSuggestionsLoading &&
              searchCustomer.trim().length > 1 && (
                <ul className="absolute max-h-[400px] overflow-y-auto z-[999] top-full shadow left-0 w-full bg-white *:p-3 *:border-b *:border-gray-200 *:hover:bg-gray-100 *:last:border-none *:select-none *:cursor-pointer *:text-sm">
                  {suggestions?.map((cus: ICustomer, index: number) => (
                    <li
                      key={index}
                      onClick={() => handleChangeCustomerId(cus.id)}
                    >
                      <h1 className="text-gray-700">{cus?.name || ""}</h1>
                      <p className="text-gray-500">{cus?.phone || ""}</p>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        )}
        {!openNewCustomerBox && customerId && selectedCustomer && (
          <div className="flex items-center justify-between gap-2 border border-primary border-dashed p-3 mt-5">
            <div className="text-sm text-gray-700">
              <h1>{selectedCustomer?.name}</h1>
              <p>{selectedCustomer?.phone}</p>
            </div>
            <button type="button" onClick={handleRemoveCustomerId}>
              <IoIosCloseCircle className="text-xl cursor-pointer text-red-500" />
            </button>
          </div>
        )}
        {openNewCustomerBox && (
          <div className="p-3 border border-gray-200 mt-5">
            <label
              htmlFor="employee"
              className="flex items-center justify-between mb-3"
            >
              Customer Details
              <button
                type="button"
                className="cursor-pointer text-gray-500"
                onClick={handleNewCustomerBox}
              >
                <FaMinus />
              </button>
            </label>
            <div className="flex mb-2">
              <div className="shrink-0 bg-primary w-[40px] py-2 text-white flex items-center justify-center">
                <FaUserPlus className="text-sm" />
              </div>
              <input
                type="text"
                name="name"
                onChange={handleChangeNewCustomerValues}
                className="p-2 border border-gray-200 text-sm outline-none block w-full"
                placeholder="Type customer name"
              />
            </div>
            <div className="flex mb-2">
              <div className="shrink-0 bg-primary w-[40px] py-2 text-white flex items-center justify-center">
                <BsFillTelephonePlusFill className="text-sm" />
              </div>
              <input
                type="number"
                name="phone"
                onChange={handleChangeNewCustomerValues}
                className="p-2 border border-gray-200 text-sm outline-none block w-full"
                placeholder="Type customer number"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesInformation;
