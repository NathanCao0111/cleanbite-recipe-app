const Yup = require("yup");

const registerSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Too short!")
    .max(70, "Too long!")
    .trim("Cannot include leading and trailing spaces")
    .required(),
  username: Yup.string()
    .min(6, "Too short!")
    .max(20, "Too long!")
    .trim("Cannot include leading and trailing spaces")
    .required(),
  email: Yup.string()
    .trim("Cannot include leading and trailing spaces")
    .email("Invalid email")
    .required(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password requires a number, a lowercase letter, an uppercase letter & a symbol"
    )
    .required(),
});

module.exports = registerSchema;
