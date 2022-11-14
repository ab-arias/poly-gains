const Validator = require("validator");
const isEmpty = require("is-empty");

function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    } else if (!Validator.isLength(data.name, { max: 30 })) {
        errors.password = "Name must be 30 characters or less";
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = "Username empty";
    } else if (!Validator.matches(data.username, "^[a-zA-Z0-9_.-]*$")) {
        errors.username = "Only use letters, numbers, _ , . , and -";
    } else if (!Validator.isLength(data.username, { max: 30 })) {
        errors.username = "Username must be 30 characters or less";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is of invalid form";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be 6 - 30 characters";
    } else if (Validator.contains(data.password, " ")) {
        errors.password = "Password cannot contain spaces";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    } else if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = validateRegisterInput;
