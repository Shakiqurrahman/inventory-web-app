import { useState, type ChangeEvent } from "react";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { FaMinus, FaPlus, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useGetEmployeeListQuery } from "../../redux/features/employees/employeeApi";
import type { IEmployee } from "../../redux/features/employees/employeeSlice";
import {
  setCustomer,
  setSelectedEmployee,
} from "../../redux/features/sales/salesFormSlice";
import type { RootState } from "../../redux/store";

const SalesInformation = () => {
  const dispatch = useDispatch();

  const {
    salesForm: { selectedEmployee, customer },
  } = useSelector((state: RootState) => state.salesForm);

  const { data: employeesData } = useGetEmployeeListQuery(null);

  const [openNewCustomerBox, setOpenNewCustomerBox] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState("");

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

  return (
    <div className="bg-white">
      <h1 className="bg-primary text-white font-medium px-5 py-3">
        Sales Information
      </h1>
      <div className="p-5">
        <label htmlFor="employee" className="block mb-3">
          Select Employee <span className="text-red-500">*</span>
        </label>
        <select
          name="employee"
          id="employee"
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          className="border border-gray-200 outline-none p-2 w-full block bg-gray-100"
          required
        >
          {!selectedEmployee && <option value="Shakil">Select Employee</option>}
          {employeesData?.map((employee: IEmployee, index: number) => (
            <option key={index} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        {!openNewCustomerBox && (
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
            {/* <ul className="absolute max-h-[400px] overflow-y-auto z-[999] top-full shadow left-0 w-full bg-white *:p-3 *:border-b *:border-gray-200 *:hover:bg-gray-100 *:last:border-none *:select-none *:cursor-pointer *:text-sm">
                    <li>
                      <h1 className="text-gray-700">Shakil Ahmed</h1>
                      <p className="text-gray-500">01706202696</p>
                    </li>
                  </ul> */}
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
