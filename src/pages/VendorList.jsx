import PaginationUi from "@/components/PaginationUi";
import SelectDropdown from "@/components/SelectDropdown";
import { Input } from "@/components/ui/input";
import VendorTable from "@/components/VendorTable";
import { getData } from "@/utils/getData";
import { FaDownload, FaFilter, FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { CSVDownload, CSVLink } from "react-csv";
import { downloadCSV } from "@/utils/getCsv";

const DEFAULT_API_STATE = {
  data: null,
  error: null,
  loading: false,
};
function VendorList() {
  const [vendorsResponse, setVendorsResponse] = useState(DEFAULT_API_STATE);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(12);
  

  useEffect(() => {
    setVendorsResponse({ ...vendorsResponse, loading: true, error: false });
    getData(pageNo, pageSize)
      .then((data) => {
        setVendorsResponse({ ...vendorsResponse, data, error: false });
      })
      .catch((error) => {
        setVendorsResponse({ ...vendorsResponse, error, loading: false });
        console.log(error);
      });
  }, [pageNo, pageSize]);

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-3 ">Vendors List</h1>
      <div className="mb-5 flex justify-between flex-col gap-2">
        <div className="flex flex-wrap sm:flex-row items-center justify-between gap-5">
          <div className="inline-flex items-center relative px-2 py-1 bg-gray-100 rounded-full self-start ">
            <Input
              className="w-auto border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 !ring-0 shadow-none "
              placeholder="Search..."
            />
            <span className="">
              <SelectDropdown
                className="border-0 shadow-none"
                options={["name", "vendorId", "category", "city"]}
                value={"name"}
              />
            </span>
            <FaSearch className="me-2 text-gray-800  rounded-full" size={20} />
          </div>
          <div>
            <span className="flex items-center gap-2 flex-wrap">
              <FaFilter />
              <SelectDropdown
                placeholder="Category"
                options={["All", "Category", "Type", "Region", "city"]}
                size={50}
                onChange={setPageSize}
              />
              <SelectDropdown
                placeholder="Type"
                options={["SAP", "Temp"]}
                size={50}
                onChange={setPageSize}
              />
              <SelectDropdown
                placeholder="Region"
                options={["All", "Category", "Type", "Region", "city"]}
                size={50}
                onChange={setPageSize}
              />
              <SelectDropdown
                placeholder="Status"
                options={["All", "Category", "Type", "Region", "city"]}
                size={50}
                onChange={setPageSize}
              />
              <span className="flex items-center gap-1">
                From:
                <DatePicker />
              </span>

              <span className="flex items-center gap-1">
                To:
                <DatePicker />
              </span>
            </span>
          </div>
        </div>
        <div className="flex justify-end flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 font-semibold">
            Page Size{" "}
            <SelectDropdown
              placeholder=""
              options={[10, 25, 50, 100]}
              size={50}
              value={pageSize}
              onChange={setPageSize}
            />
            <Button
              className="cursor-pointer bg-green-800 hover:bg-green-700"
              onClick={() => downloadCSV(vendorsResponse.data.data ?? [])}
            >
              <FaDownload />
            </Button>
          </span>
        </div>
      </div>
      {vendorsResponse.loading && <div className="loader-bar"></div>}
      {vendorsResponse.error && (
        <p className="text-red-600">
          *Error loading data, Please refresh the page!
        </p>
      )}
      {vendorsResponse.data && (
        <>
          <VendorTable vendors={vendorsResponse.data?.data} />
          <PaginationUi
            {...vendorsResponse.data}
            onChange={(pn) => setPageNo(pn)}
          />
        </>
      )}
    </div>
  );
}

export default VendorList;
