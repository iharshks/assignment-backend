import { RequestHandler } from 'express';
import { userlist } from '../assets/constant/users'
import { queryFun } from '../database/db'

export const createUser: RequestHandler = async function(req, res, next) {
    try {
        if( ['fname', 'mname', 'lname', 'email', 'phone', 'role', 'address'].every(el => el in req.body && req.body[el]) ) {
            if( !req.body.hasOwnProperty('editable')  ) req.body['editable'] = false;
            
            const { fname, mname, lname, email, phone, role, address} = req.body;
            const newUser = await queryFun(
            "INSERT INTO userr(fname,lname, mname, role, address,email, phone) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
             [ fname,lname, mname, role, address,email, phone]);
            console.log( newUser.rows)
            // if(newUser && newUser.user.rows)
            res.status(200).send({msg: 'User Created', users: newUser.rows});
            // res.status(404).send({msg: 'User Created', users: newUser});

        } else {
            res.status(400).send({msg: 'Bad Request'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({msg: error})

    }

    
}

export const getUser: RequestHandler = async function(req, res, next) {
    try {
        
        const newUser = await queryFun(
            "SELECT * FROM userr"
        )
        res.status(200).send({users: newUser.rows});
    } catch (error) {
        console.error(error);
        res.status(500).send({msg: error})
    }

  
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