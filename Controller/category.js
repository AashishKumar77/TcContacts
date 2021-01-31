var constantMessage = require('../constantMessages'),
    responses = require('../response.js'),
    Services = require('../Services/user'),
    categoryModel = require('../Models/category'),
    CommonFunction = require('../commonFunctions');

ObjectId = require('mongodb').ObjectID;

let _ = require('underscore');
module.exports = {
    addCategory, editCategory, getCategory, deleteCategory, addremovepeople, categorydetails
}


function categorydetails(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            let userId = userdata[0]._id
            var query = { _id: body.catid }
            categoryModel.findOne(query).populate('people').exec((itErr, Result) => {
                if (itErr) {
                    reject(responses.unknown_error("Invalid id"))
                } else {
                    resolve(responses.data_insertion_successfully("Catgoey details get Successfully!", Result))
                }
            });
        } catch (err) {
            reject(responses.unknown_error())

        }
    })
}
function addremovepeople(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            let userId = userdata[0]._id
            var query = { _id: body.catid }
            categoryModel.findOne(query).exec((itErr, Result) => {
                if (itErr) {
                    reject(responses.unknown_error("Invalid id"))
                } else {
                    let Array = []
                    let peopleArray = body.people.split(',');
                    console.log(peopleArray.length, "--")
                    if (body.type == 1) {
                        //Add people 
                        console.log(peopleArray, "peopleArray")
                        // if (Result.people.length == 0) {
                        categoryModel.findOneAndUpdate(query, { $set: { people: peopleArray, userId: userId } }, { new: true }, { upsert: true }).exec(res => {
                            resolve(responses.data_insertion_successfully("People Added Successfully!"))
                        })
                        // } else {
                        // console.log(peopleArray, "peopleArray")
                        // peopleArray = body.people.split(',')
                        // categoryModel.findOneAndUpdate(query, { $addToSet: { people: peopleArray } }, { upsert: true }).exec(res => {
                        //     resolve(responses.data_insertion_successfully("People Added Successfully!"))
                        // })
                        // }


                    } else if (body.type == 0) {
                        peopleArray.map((item, indx) => {
                            let index = Result.people.indexOf(item)
                            Result.people.splice(index, 1)
                            categoryModel.findOneAndUpdate(query, { $set: { people: Result.people, userId: userId } }).exec(res => {
                                if (peopleArray.length - 1 == indx) {
                                    resolve(responses.data_insertion_successfully("People Removed Successfully!"))
                                }
                            })
                        })
                    } else {
                        reject(responses.unknown_error("Type is required send 0, 1 "))

                    }
                    //if index -1 , then id not found in array 
                    // if (index == -1) {
                    //   // Push the id in likeBy Array , Mean like the item 
                    //   Result.likeBy.push(userId)
                    //   itemModel.findOneAndUpdate(query, { likeBy: Result.likeBy }).exec((updateErr, updateResult) => {
                    //     if (updateErr) {
                    //       reject(responses.unknown_error("Something went Wrong while like items"))
                    //     } else {
                    //       resolve(responses.data_insertion_successfully("Item Liked Successfully"))
                    //     }
                    //   });
                    // } else {
                    //   // Pull the id from likeBy Array , Mean Dislike the item 
                    //   Result.likeBy.splice(index, 1);
                    //   itemModel.findOneAndUpdate(query, { likeBy: Result.likeBy }).exec((updateErr, updateResult) => {
                    //     if (updateErr) {
                    //       reject(responses.unknown_error("Something went Wrong while dislike items"))
                    //     } else {
                    //       resolve(responses.data_insertion_successfully("Item DisLiked Successfully"))
                    //     }
                    //   });
                    // }
                }
            })
        } catch (err) {

            reject(responses.unknown_error())

        }
    })
}
function addCategory(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            let userId = userdata[0]._id
            var category = new categoryModel({
                title: body.title,
                userId: userId,
                bgcolor: body.bgcolor
            });
            category.save().then(res => {
                resolve(responses.data_insertion_successfully('Catgory Saved successfully', res))

            }).catch(err => {
                reject(responses.unknown_error())

            })
        } catch (err) {
            reject(responses.unknown_error())

        }
    })
}



function getCategory(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            let userId = userdata[0]._id
            categoryModel.find({ userId: userId, isDeleted: false }, function (err, res) {
                console.log(err, res)
                if (res.length > 0) {
                    array = []
                    res.map((it, index) => {
                        array.push({
                            title: it.title,
                            peopleCount: it.people.length,
                            bgcolor: it.bgcolor,
                            _id: it._id
                        })
                        if (index == res.length - 1) {
                            resolve(responses.data_insertion_successfully('Catgory  list get successfully', array))

                        }
                    })

                } else if (res == null) {
                    resolve(responses.data_insertion_successfully('Catgory  list get successfully', []))
                } else {
                    resolve(responses.data_insertion_successfully('Catgory  list get successfully', []))

                }
            })

        } catch (err) {

        }
    });
}


function editCategory(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            let userId = userdata[0]._id
            var data = {
                title: body.title,
                bgcolor: body.bgcolor
            }
            categoryModel.updateOne({ _id: body.id }, data, function (err, res) {
                console.log(err, res, "err, res")
                resolve(responses.data_insertion_successfully('Category update successfully'))
            })
        } catch (err) {
            reject(responses.unknown_error())

        }
    })
}

function deleteCategory(headers, body, userdata) {
    return new Promise(function async(resolve, reject) {
        try {
            let userId = userdata[0]._id
            data = {
                isDeleted: true
            }
            categoryModel.updateOne({ _id: body.id }, data, function (err, res) {
                resolve(responses.data_insertion_successfully('Category delete successfully'))
            })
        } catch (err) {
            console.log(err, "---error")
            reject(responses.unknown_error())

        }
    })
}