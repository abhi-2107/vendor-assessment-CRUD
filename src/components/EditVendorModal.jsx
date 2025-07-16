"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function EditVendorModal({ vendor, open, onClose, onUpdate }) {
  const [form, setForm] = useState({
    vendorId: "",
    name: "",
    email: "",
    category: "",
    type: "",
    region: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    if (vendor) {
      setForm({
        vendorId: vendor.vendorID,
        name: vendor.name || "",
        email: vendor.email || "",
        category: vendor.category || "",
        type: vendor.type || "",
        region: vendor.region || "",
        location: vendor.location || "",
        status: vendor.status || "",
      });
    }
  }, [vendor]);

  const handleChange = (field) => (valueOrEvent) => {
    const value =
      typeof valueOrEvent === "string"
        ? valueOrEvent
        : valueOrEvent.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onUpdate({ ...vendor, ...form });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (val == false) {
            console.log('onclose if k andar')
          onClose();
        }
        console.log(val)
      }}
    >
      <form>
        <DialogContent className="max-w-md ">
          <DialogHeader>
            <DialogTitle>Edit Vendor</DialogTitle>
          </DialogHeader>

          <div className="flex flex-wrap gap-4 py-2">
            <div>
              <Label>
                Name
                <Input value={form.name} onChange={handleChange("name")} />
              </Label>
            </div>

            <div>
              <Label>
                Email
                <Input value={form.email} onChange={handleChange("email")} />
              </Label>
            </div>

            <div>
              <Label>
                Category
                <Select
                  value={form.category}
                  onValueChange={handleChange("category")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Civil">Civil</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
            </div>

            <div>
              <Label>
                Type
                <Select value={form.type} onValueChange={handleChange("type")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAP">SAP</SelectItem>
                    <SelectItem value="Temp">Temp</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
            </div>

            <div>
              <Label>
                Region
                <Select
                  value={form.region}
                  onValueChange={handleChange("region")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="North">North</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                    <SelectItem value="East">East</SelectItem>
                    <SelectItem value="West">West</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
            </div>

            <div>
              <Label>
                Location
                <Input
                  value={form.location}
                  onChange={handleChange("location")}
                />
              </Label>
            </div>

            <div>
              <Label>
                Status
                <Select
                  value={form.status}
                  onValueChange={handleChange("status")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild onClick={onClose}>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
