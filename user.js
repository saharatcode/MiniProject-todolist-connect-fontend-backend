const db = require("../models");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const {username, password, name} = req.body;
    const targetUser = await db.User.findOne({ where: {username: username}});
    if (targetUser) {
        res.status(400).send({ message: "Username alredy taken."})
    } else {
        const salt = bcryptjs.genSaltSync(12); //generate salt 12 ตัว
        const hashedPassword = bcryptjs.hashSync(password, salt);

        await db.User.create({
            username: username,
            password: hashedPassword,
            name: name,
        });

        res.status(201).send({ message: "User Created."});
    }
    
};

const loginUser = async (req,res) => {
    const {username, password} = req.body;
    const targetUser = await db.User.findOne({ where: {username :username}})
    if(!targetUser) {
        res.status(400).send({message: "Username or Password is wrong!"})
    } else {
        const isCorrectPassword = bcryptjs.compareSync(password, targetUser.password) //ถ้าถูกต้อง isCorrectPassword เป็น true หมายความว่า password ถูกต้อง
        if(isCorrectPassword){
            //สร้าง token
            const payload = {
                name: targetUser.name,
                id: targetUser.id,
            };
            const token = jwt.sign(payload,"c0dEc4Mp", {expiresIn: 3600}); // c0dEc4Mp เป็น key ห้ามให้ใครรู้ และ expiresIn: 3600 คือ ระยะเวลาอายุของ token

            res.status(200).send({
                token: token,
                message: "Login successfull."
            });
        } else{
            res.status(400).send({message: "Username or Password is wrong!"})
        }
    }
};  

module.exports = {
    registerUser,
    loginUser
}