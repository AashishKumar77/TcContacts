var crypto = require('crypto');
var usermodel = require('./Models/userModel');
ObjectId = require('mongodb').ObjectID;
//==========get random genrate function =================
function randomNumberGenrate() {
    var random_num = Math.floor(Math.random() * 900000) + 100000,
        de_token = random_num.toString(),
        mykey = crypto.createCipher('aes-128-cbc', 'token'),
        token_en = mykey.update(de_token, 'utf8', 'hex') + mykey.final('hex');
    return token_en;
}
//==========get random genrate function =================

//===========passes the data in each function==============
function eachData(val, userId, data) {
    let likedStatus;
    let value = val.likeBy.indexOf(ObjectId(userId))
    // console.log(value)
    if (value == -1) {
        likedStatus = false
    } else {
        likedStatus = true
    }
    data.push({
        "name": val.name,
        "nameArabic": val.nameArabic,
        "status": val.status,
        "image": val.image,
        "previmage": val.previmage,
        "likestatus": likedStatus,
        "price": val.price,
        "isDeleted": val.isDeleted,
        "protein": val.protein,
        "fat": val.fat,
        "calories": val.calories,
        "carb": val.carb,
        "_id": val._id,
        "categoryId": val.categoryId,
        "createdAt": val.createdAt,
        "updatedAt": val.updatedAt
    })
    return data
}
//===========passes the data in each function==============


//=========Admin token validation function ===================
function adminTokenValidation(req, res, next) {
    try {
        // adminmodel.find({ "token": req.headers.token }, function (err, result) {
        //     if (err) {
        //         req.body.message = "Invalid Token"
        //         next()
        //     } else if (result.length > 0) {
        //         req.body.admindata = result
        //         next();
        //     } else {
        //         req.body.message = "Invalid Token"
        //         next()
        //     }
        // })
    } catch (err) {
        res.json(400).send({ status: '404', message: 'Some thing went wrong' })
    }
}
//=============Admin token validation function ============

//==========User validation function ======================
function userTokenValidation(req, res, next) {
    try {
        usermodel.find({ "token": req.headers.token }, function (err, result) {
            if (err) {
                req.body.message = "Invalid Token"
                next()
            } else if (result.length > 0) {
                req.body.userdata = result
                next();
            } else {
                req.body.message = "Invalid Token"
                next()
            }
        })
    } catch (err) {
        res.json(400).send({ status: '404', message: 'Some thing went wrong' })
    }
}
//==========User validation function ======================



module.exports = {
    randomNumberGenrate, adminTokenValidation, userTokenValidation, eachData
}