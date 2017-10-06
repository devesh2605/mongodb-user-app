var express = require('express'),
    user = express.Router(),
    userModel = require('../model/userModel');

/**
 * Get all users
 */ 
user.get('/listUsers',function(req,res){
    var appData = {};
    userModel.find({},function(err,data){
        if(err){
            appData['error'] = 1;
            appData['message'] = 'Error fetching data';
            res.status(404).json(appData);
        }else{
            appData['error'] = 0;
            appData['data'] = data;
            res.status(200).json(appData);
        }
    });
});

/**
 * Get a user by id
 */
user.get('/listUsers/:id',function(req,res){
    var appData = {};
    var id = req.params.id;

    userModel.findById(id,function(err,data){
        if(err){
            appData['error'] = 1;
            appData['message'] = 'Error fetching data';
            res.status(500).json(appData);
        }else{
            appData['error'] = 0;
            appData['data'] = data;
            res.status(200).json(appData);
        }
    });
});

/**
 * Create a user
 */
user.post('/insert',function(req,res){
    var appData = {};
    var db = new userModel();
    db.username = req.body.username;
    db.password = require('crypto')
                    .createHash('sha1')
                    .update(req.body.password)
                    .digest('base64');

    db.save(function(err){
        if(err){
            appData['error'] = 1;
            appData['message'] = 'Error adding data';
            res.status(500).json(appData);
        }else{
            appData['error'] = 0;
            appData['message'] = 'Data added';
            res.status(201).json(appData);
        }
    });
});

/**
 * Update a user by id, username, and password
 */
user.put('/update/:id',function(req,res){
    var appData = {};
    var id = req.params.id;
    var username = req.body.username;
    var password = req.body.password;

    userModel.findById(id,function(err,data){
        if(err){
            appData['error'] = 1;
            appData['message'] = 'Error fetching data';
            res.status(500).json(appData);
        }else{
            if(username !== undefined){
                data.username = username;
            }
            if(password !== undefined){
                data.password = require('crypto')
                                    .createHash('sha1')
                                    .update(password)
                                    .digest('base64');
            }

            data.save(function(err){
                if(err){
                    appData['error'] = 1;
                    appData['message'] = 'Error updating data';
                    res.status(500).json(appData);
                }else{
                    appData['error'] = 0;
                    appData['message'] = 'Data updated successfully!';
                    res.status(201).json(appData);
                }
            });
        }
    });
});

/**
 * Delete a user by id
 */
user.delete('/delete/:id',function(req,res){
    var appData = {};
    var id = req.params.id;

    userModel.findById(id,function(err,data){
        if(err){
            appData['error'] = 1;
            appData['message'] = 'Error fetching data';
            res.status(404).json(appData);
        }else{
            userModel.remove({_id:id},function(err){
                if(err){
                    appData['error'] = 1;
                    appData['message'] = 'Error deleting data';
                    res.status(500).json(appData);
                }else{
                    appData['error'] = 0;
                    appData['message'] = 'Data deleted successfully';
                    res.status(200).json(appData);
                }
            });
        }
    });
});

module.exports = user;