const Yup = require("yup");

const loginSchema = Yup.object().shape({
  email: Yup.string().trim("Cannot include leading and trailing spaces").email("Invalid email").required(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Must match the field password")
    .required(),
});

module.exports = loginSchema;
