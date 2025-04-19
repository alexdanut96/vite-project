import Billing from "../model/Billing.js";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

// Get billing
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const foundBill = await Billing.findOne({ userId: req.params.id });
    if (foundBill) {
      foundBill.address.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    res.status(200).json(foundBill);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add new billing
router.post("/new", verifyTokenAndAdmin, async (req, res) => {
  try {
    const foundBill = await Billing.findOne({ userId: req.body.userId });
    if (foundBill) {
      const alreadyExists = foundBill.address.find((address) => {
        if (
          Object.entries(address).length ===
          Object.entries(req.body.address[0]).length
        ) {
          if (
            address.postalCode.toString() ===
              req.body.address[0].postalCode.toString() &&
            address.country.toString() ===
              req.body.address[0].country.toString() &&
            address.city.toString() === req.body.address[0].city.toString() &&
            address.street.toString() ===
              req.body.address[0].street.toString() &&
            address.phoneNumber.toString() ===
              req.body.address[0].phoneNumber.toString() &&
            address.name.toString() === req.body.address[0].name.toString() &&
            address.countryCode.toString() ===
              req.body.address[0].countryCode.toString()
          ) {
            return address;
          }
        }
      });
      if (alreadyExists) {
        return res.status(403).json({ message: "Bill already exists" });
      }

      foundBill.address.push(req.body.address[0]);
      const result = await foundBill.save();
      res.json(result);
    } else {
      const { userId, address } = req.body;

      if (
        !userId ||
        !address[0].postalCode ||
        !address[0].country ||
        !address[0].city ||
        !address[0].street ||
        !address[0].phoneNumber ||
        !address[0].name ||
        !address[0].countryCode
      ) {
        return res
          .status(400)
          .json({ message: "All the fields are required!" });
      }

      const newBillingData = new Billing({
        userId: userId,
        address: address,
      });

      const savedBillingData = await newBillingData.save();
      res.status(201).json(savedBillingData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err._message);
  }
});

// Edit bill
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const allowedData = [
    "postalCode",
    "country",
    "city",
    "street",
    "phoneNumber",
    "countryCode",
    "name",
  ];
  try {
    if (req.params.id) {
      const updatedBill = await Billing.findOne({ userId: req.params.id });

      if (!updatedBill) return;

      const updatedAddress = updatedBill.address.find((address) => {
        return address._id.toString() === req.body.billId;
      });

      if (!updatedAddress) return;

      const filteredAddresses = updatedBill.address.filter((address) => {
        return address._id.toString() !== req.body.billId;
      });

      updatedAddress.postalCode = req.body.postalCode;
      updatedAddress.country = req.body.country;
      updatedAddress.city = req.body.city;
      updatedAddress.street = req.body.street;
      updatedAddress.phoneNumber = req.body.phoneNumber;
      updatedAddress.countryCode = req.body.countryCode;
      updatedAddress.name = req.body.name;

      const newAddressArray = [...filteredAddresses, updatedAddress];
      updatedBill.address = newAddressArray;

      const result = await updatedBill.save();
      res.json(result);
    } else {
      res.status(401).json({ message: "Product Id is required" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete bill
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "ID parameter is required!" });
  }

  try {
    const foundBill = await Billing.findOne({ userId: req.params.id });

    if (!foundBill) return;

    const filteredAddresses = foundBill.address.filter((address) => {
      return address._id.toString() !== req.body.billId;
    });

    if (filteredAddresses.length === 0) {
      await Billing.findOneAndDelete({ userId: req.params.id });
      res.status(200).json({
        message: `Bill with the ID ${req.body.billId} has been removed!`,
      });
    } else {
      foundBill.address = filteredAddresses;

      await foundBill.save();

      res.status(200).json({
        message: `Bill with the ID ${req.body.billId} has been removed!`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
