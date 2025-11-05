const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    since: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// genarete slug from name
brandSchema.pre("save", function (next) {
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
// generate slug automatically
brandSchema.pre("save", async function (next) {
  const slug = await this.constructor.findOne({ slug: this.slug });
  if (slug && slug._id.toString() !== this._id.toString()) {
    throw new coustomError(401, "brand name already exists");
  }
  next();
});


const brandModel = mongoose.model("Brand", brandSchema);
module.exports = brandModel;
