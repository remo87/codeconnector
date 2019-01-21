const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title cannot be empty';
    }
    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company cannot be empty';
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date cannot be empty';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}