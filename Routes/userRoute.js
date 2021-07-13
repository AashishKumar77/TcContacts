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
let userModel = require('../Models/userModel');

var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload_profile = multer({ storage: storage1, limits: { fileSize: 1024 * 1024 * 50 } });
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

router.post('/updatePlan', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {

    if (req.body.userdata != undefined) {
        let user = req.body.userdata[0];
        let paymentStatus;
        if (user.paymentStatus == "0") {
            paymentStatus = "1"
        } else {
            paymentStatus = "0"
        }
        userModel.updateOne({ _id: user._id }, { $set: { paymentStatus: paymentStatus } }, { new: true }, function (err, resu) {
            res.status(200).json({
                "status": "200",
                "message": "Plan Update successfully",
                "paymntStatus": paymentStatus
            });
        })

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

/**==================Fav Contact ====================== */
router.put('/favContact', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        contactController.favContact(req.headers, req.body, req.body.userdata).then(function (favContact) {
            res.status(200).send(favContact);
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
/**================Fav Contact ========================= */
/**=====================Get Fav.===================== */
router.get('/getfavContact', upload.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        contactController.getfavContact(req.headers, req.body, req.body.userdata).then(function (getfavContact) {
            res.status(200).send(getfavContact);
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
/**================================================= */
/**
 * =======================Add contact ===============
 * 
 */
router.post('/addContact', upload_profile.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        console.log(req.file, "---req.files", req.files)
        contactController.addContact(req.headers, req.body, req.body.userdata, req.file).then(function (addContact) {
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


router.put('/editContact', upload_profile.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        contactController.editContact(req.headers, req.body, req.body.userdata, req.file).then(function (editContact) {
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

router.put('/editprofile', upload_profile.single('image'), commonFunctions.userTokenValidation, function (req, res, next) {
    if (req.body.userdata != undefined) {
        RegisterLoginController.editprofile(req.headers, req.body, req.body.userdata, req.file).then(function (editprofile) {
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