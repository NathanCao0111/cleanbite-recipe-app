const Yup = require("yup");

const emailSchema = Yup.object().shape({
  recipientEmail: Yup.string().email("Invalid email").required("Required"),
});

module.exports = emailSchema;
