const mongoose = require("mongoose");
const slugify = require("slugify");
const coustomError = require("../../utils/coustomError");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Generate slug from name
subCategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      replacement: "-",
      lower: true,
      strict: false,
      locale: "bn",
      trim: true,
    });
  }
  next();
});

subCategorySchema.pre("findOneAndUpdate", function (next) {
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
// Check if slug already exists
subCategorySchema.pre("save", async function (next) {
  const existingSlug = await this.constructor.findOne({ slug: this.slug });
  if (existingSlug && existingSlug._id.toString() !== this._id.toString()) {
    throw new coustomError(401, "SubCategory name already exists");
  }
  next();
});

module.exports =
  mongoose.model.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);
