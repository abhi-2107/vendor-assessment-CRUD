import PaginationUi from "@/components/PaginationUi";
import SelectDropdown from "@/components/SelectDropdown";
import { Input } from "@/components/ui/input";
import VendorTable from "@/components/VendorTable";
import { getData } from "@/utils/getData";
import { FaDownload, FaFilter } from "react-icons/fa";
import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { downloadCSV } from "@/utils/getCsv";
import { toast } from "react-toastify";
import EditVendorModal from "@/components/EditVendorModal";

const DEFAULT_API_STATE = {
  data: null,
  error: null,
  loading: false,
};
function VendorList() {
  const [vendorsResponse, setVendorsResponse] = useState(DEFAULT_API_STATE);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [search, setSearch] = useState({
    type: "name",
    value: "",
  });
  const [filters, setFilters] = useState({
    category: "None",
    type: "None",
    region: "None",
    status: "None",
    fromDate: "None",
    toDate: "None",
  });

  const handleClearFilters = () => {
    setFilters({
      category: "None",
      type: "None",
      region: "None",
      status: "None",
      fromDate: "None",
      toDate: "None",
    });
  };

  const filterStr = useMemo(() => {
    let queryStr = [];
    if (filters.category !== "None") {
      queryStr.push(`category=${filters.category}`);
    }
    if (filters.type !== "None") {
      queryStr.push(`type=${filters.type}`);
    }
    if (filters.region !== "None") {
      queryStr.push(`region=${filters.region}`);
    }
    if (filters.status !== "None") {
      queryStr.push(`status=${filters.status}`);
    }
    if (filters.fromDate !== "None") {
      queryStr.push(`createdAt=${filters.fromDate}`);
    }
    if (filters.toDate !== "None") {
      queryStr.push(`createdAt=${filters.toDate}`);
    }
    if (search.value !== "None") {
      queryStr.push(`${search.type}=${search.value}`);
    }

    return queryStr.join("&");
  }, [filters, search]);

  useEffect(() => {
    console.log(filterStr);
    setVendorsResponse({ ...vendorsResponse, loading: true, error: false });
    getData(pageNo, pageSize, filterStr)
      .then((data) => {
        setVendorsResponse({ ...vendorsResponse, data, error: false });
      })
      .catch((error) => {
        setVendorsResponse({ ...vendorsResponse, error, loading: false });
        console.log(error);
      });
  }, [pageNo, pageSize, filterStr]);

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-3 ">Vendors List</h1>
      <div className="mb-5 flex justify-between flex-col gap-2">
        <div className="flex flex-wrap sm:flex-row items-center justify-between gap-5">
          <div className="inline-flex items-center gap-5 flex-wrap">
            <div className="inline-flex  items-center relative px-2 py-1 bg-gray-100 rounded-full w-full sm:w-auto justify-between ">
              <Input
                className=" w-auto sm:w-sm border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 !ring-0 shadow-none "
                placeholder="Search..."
                value={search.value}
                onChange={(e) =>
                  setSearch({ ...search, value: e.target.value })
                }
              />
              <span className="">
                <SelectDropdown
                  className="border-0 shadow-none"
                  options={["name", "vendorID", "category", "location"]}
                  value={search.type}
                  onChange={(type) => setSearch({ value: "", type: type })}
                />
              </span>
            </div>
          </div>
          <div className="flex  gap-5">
            <span onClick={() => setShowAddVendorModal(true)}>
              <Button className="border-2 me-auto py-5 rounded-full bg-white text-green-700 hover:bg-green-50 cursor-pointer hover:text-green-800 active:scale-97 hover:border-green-500 border-green-200 ">
                Add Vendor
              </Button>
            </span>
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
        </div>

        <div>
          <span className="flex items-center gap-2 sm:gap-5 flex-wrap">
            <FaFilter />
            <span className="flex items-center gap-1">
              Category
              <SelectDropdown
                placeholder="Category"
                options={[
                  "None",
                  "IT",
                  "Civil",
                  "Diesel",
                  "Electronics",
                  "Mechanical",
                  "Electrical",
                ]}
                size={50}
                value={filters.category}
                onChange={(type) => setFilters({ ...filters, category: type })}
              />
            </span>
            <span className="flex items-center gap-1">
              Type
              <SelectDropdown
                placeholder="Type"
                options={["None", "SAP", "Temp"]}
                size={50}
                value={filters.type}
                onChange={(type) => setFilters({ ...filters, type: type })}
              />
            </span>
            <span className="flex items-center gap-1">
              Region
              <SelectDropdown
                placeholder="Region"
                options={["None", "Central", "East", "North", "South", "West"]}
                size={50}
                value={filters.region}
                onChange={(type) => setFilters({ ...filters, region: type })}
              />
            </span>

            <span className="flex items-center gap-1">
              Status
              <SelectDropdown
                placeholder="Status"
                options={["None", "Active", "Inactive"]}
                size={50}
                value={filters.status}
                onChange={(type) => setFilters({ ...filters, status: type })}
              />
            </span>
            <span className="flex items-center gap-1">
              From
              <DatePicker
                onChange={(type) => setFilters({ ...filters, fromDate: type })}
              />
            </span>
            <span className="flex items-center gap-1">
              To
              <DatePicker
                value={filters.toDate}
                onChange={(type) => setFilters({ ...filters, toDate: type })}
              />
            </span>
            <Button
              className="bg-red-700 cursor-pointer hover:bg-red-600 active:scale-97"
              onClick={handleClearFilters}
            >
              {" "}
              clear
              <FaFilter />{" "}
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

      <EditVendorModal
        title="Add Vendor"
        open={showAddVendorModal}
        onClose={() => setShowAddVendorModal(false)}
        vendor=""
        onUpdate={(update) => {
          toast(JSON.stringify(update) + " vendor created successfully...");
          setShowAddVendorModal(false);
        }}
      />
    </div>
  );
}

export default VendorList;
