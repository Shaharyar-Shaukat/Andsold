<<<<<<< HEAD
"use strict";
=======
'use strict';
>>>>>>> john-dev

/**
 * Get unique error field name
 */
const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error.message.substring(
<<<<<<< HEAD
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
=======
            error.message.lastIndexOf('.$') + 2,
            error.message.lastIndexOf('_1')
>>>>>>> john-dev
        );
        output =
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
<<<<<<< HEAD
            " already exists";
    } catch (ex) {
        output = "Unique field already exists";
=======
            ' already exists';
    } catch (ex) {
        output = 'Unique field already exists';
>>>>>>> john-dev
    }

    return output;
};

/**
<<<<<<< HEAD
 * Get the erroror message from error object
 */
exports.errorHandler = error => {
    let message = "";
=======
 * Get the error message from error object
 */
exports.errorHandler = (res, error) => {
    let message = '';
>>>>>>> john-dev

    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
<<<<<<< HEAD
                message = "Something went wrong";
        }
    } else {
        for (let errorName in error.errorors) {
            if (error.errorors[errorName].message)
                message = error.errorors[errorName].message;
        }
    }

    return message;
=======
                message = 'Something went wrong';
        }
    } else {
        for (let errorName in error.errors) {
            if (error.errors[errorName].message)
                message = error.errors[errorName].message;
        }
    }

    return res.status(400).json({
        error: message
    });
>>>>>>> john-dev
};

