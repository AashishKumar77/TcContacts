var constantMessage = require('../constantMessages'),
    responses = require('../response.js'),
    Services = require('../Services/user'),
    contactModel = require('../Models/addContactModel'),
    CommonFunction = require('../commonFunctions');

ObjectId = require('mongodb').ObjectID;

let _ = require('underscore');
module.exports = {
    addContact, getContact, editContact, deleteContact, favContact, getfavContact
}
function getfavContact(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {

            let userId = userdata[0]._id

            contactModel.find({ userId: userId, fav: true }, function (err, res) {
                resolve(responses.data_insertion_successfully('fav Contact Successfully', res))
            })
        } catch (err) {
            console.log(err, "---error")
            reject(responses.unknown_error())

        }
    })
}

function favContact(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            if (body.type == 1) {
                data = {
                    fav: true
                }
            } else {
                data = {
                    fav: false
                }
            }
            let userId = userdata[0]._id

            contactModel.updateOne({ _id: body.id }, data, function (err, res) {
                resolve(responses.data_insertion_successfully('Contact Add to fav. Successfully'))
            })
        } catch (err) {
            console.log(err, "---error")
            reject(responses.unknown_error())

        }
    })
}

function addContact(headers, body, userdata, file) {
    return new Promise(function async(resolve, reject) {
        try {
            let fileUrl = '';
            if (file !== undefined) {
                fileUrl = `http://13.58.174.221:3000/${file.originalname}`
            }
            let userId = userdata[0]._id
            var contact = new contactModel({
                name: body.name,
                email: body.email,
                phoneNumber: body.phoneNumber,
                gender: body.gender,
                characterstics: body.characterstics,
                knowfrom: body.knowfrom,
                info: body.info,
                notes: body.notes,
                image: fileUrl,
                userId: userId,
                bgcolor: body.bgcolor
            });
            contact.save().then(res => {
                resolve(responses.data_insertion_successfully('Contact Saved successfully', res))

            }).catch(err => {
                console.log(err, "---error")
                reject(responses.unknown_error())

            })
        } catch (err) {
            console.log(err, "---error")
            reject(responses.unknown_error())

        }
    })
}



function getContact(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            let userId = userdata[0]._id

            contactModel.find({ userId: userId, isDeleted: false }).exec(function (err, res) {
                console.log(err, res)
                if (res.length > 0) {
                    resolve(responses.data_insertion_successfully('Contacts  list get successfully', res))

                } else if (res == null) {
                    resolve(responses.data_insertion_successfully('Contacts  list get successfully', []))
                } else {
                    resolve(responses.data_insertion_successfully('Contacts  list get successfully', []))

                }
            })

        } catch (err) {

        }
    });
}


function editContact(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            let fileUrl = '';
            if (file !== undefined) {
                fileUrl = `http://13.58.174.221:3000/${file.originalname}`
            }
            let userId = userdata[0]._id
            var data = {
                name: body.name,
                email: body.email,
                phoneNumber: body.phoneNumber,
                gender: body.gender,
                characterstics: body.characterstics,
                knowfrom: body.knowfrom,
                info: body.info,
                notes: body.notes,
                image: fileUrl,
                userId: userId,
                bgcolor: body.bgcolor
            }
            contactModel.updateOne({ _id: body.id }, data, function (err, res) {
                resolve(responses.data_insertion_successfully('Contact update successfully'))

            })



        } catch (err) {
            reject(responses.unknown_error())

        }
    })
}

function deleteContact(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            let userId = userdata[0]._id
            data = {
                isDeleted: true
            }
            contactModel.updateOne({ _id: body.id }, data, function (err, res) {
                resolve(responses.data_insertion_successfully('Contact delete successfully'))

            })



        } catch (err) {
            reject(responses.unknown_error())

        }
    })
}