const mongoose = require("mongoose");
const coustomError = require("../utils/coustomError");
const slugify = require("slugify");

const discountSchema = new mongoose.Schema(
  {
    discountName: {
      type: String,
      required: [true, "Discount name ta dorkar"],
      trim: true,
      minlength: [2, "Discount name at least 2 character hote hobe"],
      maxlength: [100, "Discount name maximum 100 character hote pare"],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    discountValidFrom: {
      type: Date,
      required: [true, "Discount start date dorkar"],
    },

    discountValidTo: {
      type: Date,
      required: [true, "Discount end date dorkar"],
    },

    discountValueByAmount: {
      type: Number,
      default: 0,
      min: [0, "Discount amount negative hote parbe na"],
    },

    discountValueByPercentance: {
      type: Number,
      default: 0,
      min: [0, "Discount percent negative hote parbe na"],
      max: [100, "Discount percent 100 er beshi hote parbe na"],
    },

    discountType: {
      type: String,
      enum: ["tk", "percentance"],
      required: [true, "Discount type dorkar (tk/percentance)"],
    },

    discountPlan: {
      type: String,
      enum: ["flat", "category", "product"],
      required: [true, "Discount plan dorkar (flat/category/product)"],
    },

    targetProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    targetCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    targetSubcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//
// ✅ Step 1: Slug generate before save
//
discountSchema.pre("save", async function (next) {
  if (this.isModified("discountName")) {
    this.slug = slugify(this.discountName, { lower: true, strict: true });
  }

  // ✅ Step 2: Check unique slug
  const existing = await this.constructor.findOne({ slug: this.slug });
  if (existing && existing._id.toString() !== this._id.toString()) {
    throw new coustomError(400, "Discount name already exists");
  }

  next();
});

//
// ✅ Step 3: Validation for date
//
discountSchema.pre("validate", function (next) {
  if (this.discountValidFrom && this.discountValidTo) {
    if (this.discountValidTo < this.discountValidFrom) {
      return next(new coustomError(400, "Discount end date must be after start date"));
    }
  }
  next();
});

module.exports = mongoose.model("Discount", discountSchema);
