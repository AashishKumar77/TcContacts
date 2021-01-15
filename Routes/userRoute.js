const commonFunctions = require('../commonFunctions');
var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    body = require('body-parser'),
    _ = require('underscore'),
    upload = multer({});
var RegisterLoginController = require('../Controller/login');
var contactController = require('../Controller/contact');
let catgoryController = require('../Controller/category');

/**=================Social Login Register api============== */

router.post('/login', upload.single('image'), function (req, res, next) {
    RegisterLoginController.login(req.headers, req.body).then(function (login) {
        res.status(200).send(login);
    }, function (err) {
        res.status(400).send(err);
    }).catch(function (e) {
        console.log('500 error', err);
        res.status(500).send(e);
    });
});

/**=================Social Login Register api============== */



/**
 * ================Add category ===============================
 */
router.post('/category', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        catgoryController.addCategory(req.headers, req.body, req.body.userdata).then(function (addCategory) {
            res.status(200).send(addCategory);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});
/**
 * =========================================================
 */

/**
 * ==============get category ====================
 */
router.get('/category', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        catgoryController.getCategory(req.headers, req.body, req.body.userdata).then(function (getCategory) {
            res.status(200).send(getCategory);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});
/**
 * =================================================
 */
/**===============edit category====================== */
router.put('/category', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        catgoryController.editCategory(req.headers, req.body, req.body.userdata).then(function (editCategory) {
            res.status(200).send(editCategory);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});
/**
 * ====================================================
 */


/**================add/ remove people from data  */
router.put('/addremovepeople', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        catgoryController.addremovepeople(req.headers, req.body, req.body.userdata).then(function (addremovepeople) {
            res.status(200).send(addremovepeople);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});

/**=============================================== */


/**
 * ==========get category details ======================
 */

router.post('/categorydetails', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        catgoryController.categorydetails(req.headers, req.body, req.body.userdata).then(function (categorydetails) {
            res.status(200).send(categorydetails);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});
/**
 * ========get catgoey details ========================
 */
/**
 * ===========delete category ==============
 */
router.delete('/category', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        catgoryController.deleteCategory(req.headers, req.body, req.body.userdata).then(function (deleteCategory) {
            res.status(200).send(deleteCategory);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});
/**
 * =======================
 */
/**
 * =======================Add contact ===============
 * 
 */
router.post('/addContact', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        contactController.addContact(req.headers, req.body, req.body.userdata).then(function (addContact) {
            res.status(200).send(addContact);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});

/**
 * ===========get saved contacts ========================
 */


router.get('/getContact', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        contactController.getContact(req.headers, req.body, req.body.userdata).then(function (getContact) {
            res.status(200).send(getContact);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});


/***
 * ==========Edit contact ==================
 */


router.put('/editContact', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        contactController.editContact(req.headers, req.body, req.body.userdata).then(function (editContact) {
            res.status(200).send(editContact);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});

/*
==============GEt profile=================
 */

router.get('/getprofile', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        RegisterLoginController.getprofile(req.headers, req.body, req.body.userdata).then(function (getprofile) {
            res.status(200).send(getprofile);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});

/**
 * =============edit profile =================
 */

router.put('/editprofile', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        RegisterLoginController.editprofile(req.headers, req.body, req.body.userdata).then(function (editprofile) {
            res.status(200).send(editprofile);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});



/**
 * ===========dDelete conatt
 */
router.delete('/deleteContact', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        contactController.deleteContact(req.headers, req.body, req.body.userdata).then(function (deleteContact) {
            res.status(200).send(deleteContact);
        }, function (err) {
            res.status(400).send(err);
        }).catch(function (e) {
            console.log('500 error', err);
            res.status(500).send(e);
        });
    } else {
        res.status(404).json({
            "status": "404",
            "message": req.body.message
        });
    }
});
module.exports = router