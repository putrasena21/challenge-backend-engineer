const schema = {
  email: "email|required",
  password: {
    type: "string",
    custom: (v, errors) => {
      if (!/[0-9]/.test(v)) errors.push({ type: "atLeastOneDigit" });
      if (!/[a-zA-Z]/.test(v)) errors.push({ type: "atLeastOneLetter" });
      return v;
    },
    min: 8,
    max: 20,
    messages: {
      stringPattern: "pass value must contain a digit",
      stringMin: "Your pass value is too short",
      stringMax: "Your pass value is too large",
    },
  },
};

module.exports = { schema };
