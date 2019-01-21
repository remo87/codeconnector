const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    

    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    

    if (!Validator.isLength(data.handle, {min:2, max: 40})) {
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }
    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle cannot be empty';
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = 'Profile status cannot be empty';
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Profile skills cannot be empty';
    }
    console.log(data.website, !isEmpty(data.website))
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Profile website is not a valid url';
        }
    }
    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Profile twitter is not a valid url';
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Profile youtube is not a valid url';
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Profile facebook is not a valid url';
        }
    }
    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Profile linkedin is not a valid url';
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Profile instagram is not a valid url';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}