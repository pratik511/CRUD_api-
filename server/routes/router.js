const express = require('express');
const users = require('../model/userScheama');
const router = express.Router();

// router.get("/",(req,res) => {
//     console.log("connect");
// });


// register user

router.post("/register", async(req,res) => {
    // console.log(req.body);
    const {name,email,age,mobile,work,add,desc} =req.body;

    if(!name || !email || !age || !mobile || !work || !add || !desc){
        res.status(422).json("Please Enter youre data");
    }
    try {
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            // alert("this is data already present");
            res.status(422).json("this is data already present");
        }else{
            const adduser = new users({
                name,email,age,mobile,work,add,desc
            })

            await adduser.save();
            res.status(201).json(adduser)
            console.log("adduser",adduser);
        }

    } catch (error) {
        res.status(422).json(error)
    }
});

//get userdata home page

router.get("/getdata", async (req,res) => {
    try {
        const userdata = await users.find();
        res.status(201).json(userdata);
        console.log("userdata",userdata);      
    } catch (error) {
        res.status(422).json(error); 
    }
})

//get individual user 

router.get("/getuser/:id", async(req,res) =>{
    try {
        console.log(req.params);
        const {id} = req.params;
        
        const userindividual = await users.findById({_id:id});
        console.log("userindividual",userindividual);
        res.status(201).json(userindividual);
    } catch (error) {
        res.status(422).json(error)
    }
})

//update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})



module.exports = router;