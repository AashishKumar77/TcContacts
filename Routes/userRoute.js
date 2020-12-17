const commonFunctions = require('../commonFunctions');
var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    body = require('body-parser'),
    _ = require('underscore'),
    upload = multer({});
var RegisterLoginController = require('../Controller/login');
var contactController = require('../Controller/contact');

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
module.exports = router