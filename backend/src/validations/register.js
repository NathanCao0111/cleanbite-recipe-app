const Yup = require("yup");

const registerSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Too short!")
    .max(70, "Too long!")
    .required("Required"),
  username: Yup.string()
    .min(6, "Too short!")
    .max(20, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password requires a number, a lowercase letter, an uppercase letter & a symbol"
    )
    .required("Required"),
});

module.exports = registerSchema;
