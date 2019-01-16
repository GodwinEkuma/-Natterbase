const jwt = require('jsonwebtoken');
require('dotenv').config();
const data = require('../store')

 class Main{

    static login(req, res){
        let username = req.body.username;
        let password = req.body.password;

        if(typeof username !== "string" && typeof password !== "string"){
            return res.status(401).json({message: 'Invalid parameter types'})
        }

        if(username.trim() !=="admin" && password.trim() !== "admin"){
            return res.status(401).json({message: "username or password incorrect"});
        }

        const token = jwt.sign({username, password}, process.env.JWT_SECRET, {expiresIn: '24h'});

        return res.status(200).json({token, message:'Success'})
    }

    static add(req, res){
        let country = req.body.country;
        if(!country) return res.status(400).json({message:'country required'});
        data.push(country);
        return res.status(201).json({message:'success'});
    }

    static getCountries(req, res){
        return res.status(200).json({message: 'success', countries: data});
    }

    static delete(req, res){
        let country = req.body.country;
        
        if(!country) return res.status(400).json({message:'country required'});

        let index = data.findIndex((nation) => nation === country);
        if(index === -1) return res.status(404).json({message: 'country not found'});
        data.splice(index, 1);
        return res.status(204)
    }

}

module.exports = Main;