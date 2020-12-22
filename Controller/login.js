var constantMessage = require('../constantMessages'),
    responses = require('../response.js'),
    Services = require('../Services/user'),
    userModel = require('../Models/userModel'),
    CommonFunction = require('../commonFunctions');

ObjectId = require('mongodb').ObjectID;

let _ = require('underscore');
module.exports = {
    login, getprofile, editprofile
}

function login(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            if (body.uniqueId == "" || body.uniqueId == undefined) {
                reject(responses.required_fields("Unique Id is not to be empty"));
            } else if (body.type == "" || body.type == undefined) {
                reject(responses.required_fields("Unique Id is not to be empty"));
            }
            let criteria = { uniqueId: body.uniqueId, }
            let payloadData = { token: CommonFunction.randomNumberGenrate(), type: body.type }
            userModel.findOne({ uniqueId: body.uniqueId, type: body.type }, async function (err, result) {
                console.log(err, result, "err, result")
                if (err) reject(responses.unknown_error())
                else if (result != null) {
                    console.log(result, "result")
                    await userModel.findOneAndUpdate(criteria, { $set: payloadData }, { new: true }, await function (uperr, upresult) {
                        if (uperr) reject(responses.unknown_error())
                        resolve(responses.verification_successfully('Login successfully', upresult))
                    })
                } else {
                    let User = new userModel({
                        uniqueId: body.uniqueId,
                        token: CommonFunction.randomNumberGenrate(),
                        type: body.type
                    })
                    User.save().then(res => {
                        resolve(responses.verification_successfully('Login successfully', res))
                    }).catch(err => {
                        console.log(err, "--err")
                        reject(responses.unknown_error())
                    })
                }

            })



        } catch (err) {
            console.log(err, "==")
            reject(responses.unknown_error())
        }
    });
}



function getprofile(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            user = userdata[0]
            resolve(responses.data_insertion_successfully('Contacts  list get successfully', user))
        } catch (err) {
            reject(responses.unknown_error())
        }
    });
}


function editprofile(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            var data = {
                characterstics: body.characterstics,
                knowfrom: body.knowfrom,
                info: body.info,
                notes: body.notes,
                image: body.image,
            }
            userModel.findOneAndUpdate({ _id: userdata[0]._id },
                {
                    $set: {
                        email: body.email, name: body.name, characterstics: body.characterstics,
                        knowfrom: body.knowfrom,
                        info: body.info,
                        notes: body.notes,
                        image: body.image
                    }
                }, { new: true }, function (uperr, upresult) {
                    if (uperr) reject(responses.unknown_error())
                    userModel.findOne({ _id: userdata[0]._id }, function (err, result) {
                        resolve(responses.data_insertion_successfully('Edit Profile successfully', result))

                    })
                })
        } catch (err) {
            reject(responses.unknown_error())
        }
    });
}