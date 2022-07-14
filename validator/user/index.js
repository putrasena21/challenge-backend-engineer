const Validator = require("fastest-validator");

const v = new Validator({
  useNewCustomCheckerFunction: true, // using new version
  messages: {
    // Register our new error message text
    atLeastOneLetter:
      "The pass value must contain at least one letter from a-z and A-Z ranges!",
    atLeastOneDigit:
      "The pass value must contain at least one digit from 0 to 9!",
  },
});

const { schemaRegis } = require("./schema");

module.exports = {
  validateRegis: (payload) => {
    const check = v.validate(payload, schemaRegis);

    return check;
  },
};
