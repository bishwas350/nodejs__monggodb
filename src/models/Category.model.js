const mongoose = require("mongoose");
const slugify = require("slugify");
const coustomError = require("../../utils/coustomError");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },

},{  timestamps: true}
);

// make a slug using name
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "bn", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    next();
  }
});

// check is already exist slug or not

categorySchema.pre("save", async function (next) {
  const slug = await this.constructor.findOne({ slug: this.slug });
  if (slug && slug._id.toString() !== this._id.toString()) {
    throw new coustomError(401, "Category Name already exist");
  }
  next();
});

module.exports =
  mongoose.model.Category || mongoose.model("Category", categorySchema);
