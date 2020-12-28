const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Contact name is required"],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, "Contact email is required"],
    minlength: 10,
  },
  phone: { type: String, required: [true, "Contact phone number is required"] },
  subscription: Schema.Types.String,
  password: Schema.Types.String,
  token: Schema.Types.String,
});
const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
