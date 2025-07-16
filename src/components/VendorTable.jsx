import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function VendorTable({ vendors = [] }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-max">Sr.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-max">Vendor Id</TableHead>
            <TableHead className="w-max">Type</TableHead>
            <TableHead className="w-max">Category</TableHead>
            <TableHead className="w-max">Location</TableHead>
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
              <TableCell>{vendor.type}</TableCell>
              <TableCell>{vendor.category}</TableCell>
              <TableCell>{vendor.location}</TableCell>
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
              <TableCell>Action</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default VendorTable;
