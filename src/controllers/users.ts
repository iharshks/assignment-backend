import { RequestHandler } from 'express';
import { userlist } from '../assets/constant/users'

export const createUser: RequestHandler = function(req, res, next) {
    console.log(req)
    if( ['fname', 'mname', 'lname', 'email', 'phone', 'role', 'address'].every(el => el in req.body && req.body[el]) ) {
        if( !req.body.hasOwnProperty('editable')  ) req.body['editable'] = false;
        req.body['id'] = Math.floor(Math.random() * Date.now())
        userlist.push(req.body);
        res.status(200).send({msg: 'User Created', users: userlist})
    } else {
        res.status(400).send({msg: 'Bad Request'})
    }
}

export const getUser: RequestHandler = function(req, res, next) {
    userlist.map((el:any) => {
        el['id'] = Math.floor(Math.random() * Date.now())
    });
    res.status(200).send({users: userlist});
}

export const updateUser: RequestHandler = function(req, res, next) {

    if(req.params.id ) {
        let isUpdated: boolean = false;
        userlist.map((el:any, i) => {
            if(el.id == +req.params.id) {
                for(let key in req.body) {
                    el[key] = req.body[key]
                }
                isUpdated = true;
            }
        });
        isUpdated ? res.status(200).send({users: userlist}) : res.status(404).send({msg: "Resource not found"})

    } else {
        res.status(400).send({msg: 'Bad Request'})
    }
}

export const deleteUser: RequestHandler = function(req, res, next) {
    if(req.params.id ) {
        let isDeleted: boolean = false;

        userlist.map((el:any, i) => {
            if(el.id == +req.params.id) {
                userlist.splice(i, 1);
                isDeleted = true;
            }
        });
        isDeleted ? res.status(200).send({users: userlist}) : res.status(404).send({msg: "Resource not found"})

    } else {
        res.status(400).send({msg: 'Bad Request'})
    }
}