import PaginationUi from "@/components/PaginationUi";
import VendorTable from "@/components/VendorTable";
import { getData } from "@/utils/getData";
import React, { useEffect, useState } from "react";

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
    setVendorsResponse({ ...DEFAULT_API_STATE, loading: true });
    getData(pageNo, pageSize)
      .then((data) => {
        setVendorsResponse({ ...DEFAULT_API_STATE, data });
      })
      .catch((error) => {
        setVendorsResponse({ ...DEFAULT_API_STATE, error });
        console.log(error);
      });
  }, [pageNo, pageSize]);
  console.log(vendorsResponse);

  return (
    <div>
      {vendorsResponse.loading && "Loading..."}
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
