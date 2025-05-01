export const createUserValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 8,
        max: 32,
      },
      errorMessage:
        "Password must be at least 8 characters with a max of 32 characters",
    },
  },
};
