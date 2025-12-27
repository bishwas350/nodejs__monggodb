const mongoose = require("mongoose");
const coustomError = require("../../utils/coustomError");
const slugify = require("slugify");

const discountSchema = new mongoose.Schema(
  {
    discountName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
    },

    discountValidFrom: {
      type: Date,
      required: true,
    },

    discountValidTo: {
      type: Date,
      required: true,
    },

    discountValueByAmount: {
      type: Number,
      default: 0,
    },

    discountValueByPercentance: {
      type: Number,
      default: 0,
    },

    discountType: {
      type: String,
      enum: ["tk", "percentance"],
      required: true,
    },

    discountPlan: {
      type: String,
      enum: ["flat", "category", "product", "subcategory"],
      required: true,
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
    this.slug = slugify(this.discountName, {
       lower: true,
        strict: false,
      lower:true,
      trim:true,
      replacement:'-',
    });
  }

  // ✅ Step 2: Check unique slug
  const slug = await this.constructor.findOne({ slug: this.slug });
  if (slug && slug._id.toString() !== this._id.toString()) {
    throw new coustomError(400, "Discount name already exists");
  }

  next();
});

//
// ✅ Step 3: Validation for date
//
discountSchema.pre("findOneAndUpdate", function (next) {
 const update = this.getUpdate();
 console.log(update)
 if (update.name) {
    update.slug = slugify(update.name, {
      replacement: "-",
      lower: true,
      strict: false,
      trim: true,
    });
    this.setUpdate(update)
  }
  next()
});

module.exports = mongoose.model("Discount", discountSchema);
