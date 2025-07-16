import VendorTable from "@/components/VendorTable";
import { getData } from "@/utils/getData";
import React, { useEffect, useState } from "react";

function VendorList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [vendors, SetVendors] = useState(null);
  useEffect(() => {
    setLoading(true);
    const timerId = setTimeout(() => {
      getData()
        .then((data) => {
          SetVendors(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
          console.log(err);
        });
    }, Math.random() * 1000);
    return () => clearTimeout(timerId);
  }, []);
  console.log(vendors);
  return (
    <div>
      {loading ? (
        "Loading..."
      ) : error ? (
        <p className="text-red-600">
          *Error loading data, Please refresh the page!
        </p>
      ) : (
        <VendorTable vendors={vendors?.data} />
      )}
    </div>
  );
}

export default VendorList;
