const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const StoreSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Please add a Store ID"],
    unique: true,
    trim: true,
    maxlength: [10, "Store ID must be less than 10 chars"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Geocode and create location
StoreSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  console.log(loc);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };

  // Do not save address
  this.address = undefined;
  next();
});

// OUTPUT
// [
//   {
//     formattedAddress: "Khandagiri Marg, Bhubaneswar, Odisha, IN",
//     latitude: 20.25662,
//     longitude: 85.79702,
//     country: null,
//     city: "Bhubaneswar",
//     stateCode: "Odisha",
//     zipcode: "",
//     streetName: "Khandagiri Marg",
//     streetNumber: null,
//     countryCode: "IN",
//     provider: "mapquest",
//   },
//   {
//     formattedAddress: ", Bhubaneswar, Odisha, IN",
//     latitude: 20.25888,
//     longitude: 85.78848,
//     country: null,
//     city: "Bhubaneswar",
//     stateCode: "Odisha",
//     zipcode: "",
//     streetName: "",
//     streetNumber: null,
//     countryCode: "IN",
//     provider: "mapquest",
//   },
// ];

// const Store = mongoose.model("Store", StoreSchema);
// module.exports = Store;
module.exports = mongoose.model("Store", StoreSchema);
