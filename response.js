module.exports = {
    'success': function (message, token = undefined, page_number = undefined) {
        return {
            status: 200,
            message: message,
            token: token
        };
    },
    'invalid_error': function (message = 'Invalid Data.', error = undefined) {
        return {
            status: 203,
            message: message,
            error: error
        };
    },
    'database_error': function (message = "Something went wrong.", error = undefined) {
        return {
            status: 202,
            message: message,
            error: error
        };
    },
    'unknown_error': function (message = "SomeThing Went Wrong.", error = undefined) {
        return {
            status: 204,
            message: message,
            error: error
        };
    },
    'no_record': function (message) {
        return {
            status: 205,
            message: (message) ? message : 'No Record Found.'
        };
    },
    'required_fields': function (message) {
        return {
            status: 201,
            message: (message) ? message : 'Please fill required fields.'
        };
    },
    'incorrect_pasword': function (message) {
        return {
            status: 201,
            message: (message) ? message : 'Password is incorrect.'
        };
    },
    'authorization_failed': function (message) {
        return {
            status: 404,
            message: (message) ? message : 'Authorization failed.'
        };
    },
    'deactivate_account': function (message) {
        return {
            status: 403,
            message: (message) ? message : 'Your account is deactivated. Please contact to admin for further details.'
        };
    },
    'deleted_account': function (message) {
        return {
            status: 403,
            message: (message) ? message : 'Your account has been disabled. Please check your email for more information.'
        };
    },
    'invalidNumber': function (message, result = undefined) {
        return {
            status: 206,
            message: (message) ? message : 'Invalid Number.'
        };
    },
    'phone_number_already_register': function (message, result = undefined) {
        return {
            status: 409,
            message: (message) ? message : 'Phone Number is already Registered.'
        };
    },
    'registered_statusfully': function (message) {
        return {
            status: 200,
            message: (message) ? message : 'Phone Number Registered statusfully'
        };
    },
    'Code_Sent_To_Number': function (message) {
        return {
            status: 200,
            message: (message) ? message : 'Code Sent to Your Number'
        };
    },
    'verification_successfully': function (message, result) {
        return {
            status: 200,
            token: result.token,
            message: message
        };
    },
    'Invalid_Authentication': function (message, result) {
        return {
            status: 400,
            message: "Authentication failed"
        };
    },
    'logout_statusfully': function (message, result) {
        return {
            status: 200,
            message: "Logout statusfully."
        };
    }
    ,
    'already_registered': function (message, result) {
        return {
            status: 400,
            message: message
        };
    }
    ,
    'data_insertion_successfully': function (message, result) {
        return {
            status: 200,
            message: message,
            data: result
        };
    }
    ,
    '_notFound': function (message, result) {
        return {
            status: 404,
            message: message
        };
    }
};