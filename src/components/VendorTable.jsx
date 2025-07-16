import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import EditVendorModal from "./EditVendorModal";

function VendorTable({ vendors = [] }) {
  const [openModalId, setOpenModalId] = useState(null);
  return (
    <div>
      <ToastContainer />
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-200 rounded-lg hover:bg-zinc-200">
            <TableHead className="w-max">Sr.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-max">Vendor Id</TableHead>
            <TableHead className="w-max">Date</TableHead>
            <TableHead className="w-max">Type</TableHead>
            <TableHead className="w-max">Category</TableHead>
            <TableHead className="w-max">Location</TableHead>
            <TableHead className="w-max">Region</TableHead>
            <TableHead className="w-max">Status</TableHead>
            <TableHead className="w-max">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor, index) => (
            <TableRow
              key={vendor.vendorID}
              className={`${index % 2 !== 0 && "bg-gray-100"}`}
            >
              <TableCell>{vendor.id}</TableCell>
              <TableCell className="w-sm">{vendor.name}</TableCell>
              <TableCell> {vendor.vendorID}</TableCell>
              <TableCell> {vendor.createdAt}</TableCell>
              <TableCell>{vendor.type}</TableCell>
              <TableCell>{vendor.category}</TableCell>
              <TableCell>{vendor.location}</TableCell>
              <TableCell>{vendor.region}</TableCell>
              <TableCell>
                {" "}
                <span
                  className={
                    vendor.status === "Active"
                      ? "bg-green-100 text-green-800 border-green-300 border rounded-sm shadow px-1"
                      : "bg-red-100 text-red-800 border border-red-300 rounded-sm shadow px-1"
                  }
                >
                  {vendor.status}
                </span>{" "}
              </TableCell>
              <TableCell>
                <span className="inline-flex gap-3">
                  <span
                    className="text-blue-800 rounded-full cursor-pointer hover:bg-blue-200 p-1"
                    onClick={() => setOpenModalId(vendor.vendorID)}
                  >
                    <FaUserEdit />{" "}
                  </span>
                  <EditVendorModal
                    key={vendor.vendorID}
                    open={openModalId === vendor.vendorID}
                    onClose={() => {
                      setOpenModalId(null);
                      console.log("onclose paraent k andar" + vendor.vendorID);
                    }}
                    vendor={vendor}
                    onUpdate={(updated) => {
                      console.log("Updated", updated);
                      setOpenModalId(null);
                      toast("Content updated successfully...");
                    }}
                  />
                  <span
                    className="text-green-800 cursor-pointer rounded-full hover:bg-green-200 p-1"
                    onClick={() => toast(`Email sent to ${vendor.email}`)}
                  >
                    <BsFillSendArrowUpFill />{" "}
                  </span>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default VendorTable;
