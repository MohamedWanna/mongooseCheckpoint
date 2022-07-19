const express = require('express');
const mongoose = require('mongoose');
const personModel = require('./personmodel')
//require("dotenv").config();
//var validator = require('validator');
//console.log(process.env)
const app = express();
const port = 4000;

//coonect to MongoDB Atlas
const connectionToDB = async () => {
mongoose.connect('mongodb+srv://MohamedWanna:alphaomega2022@cluster0.isyo3.mongodb.net/profile?retryWrites=true&w=majority', 
	{
	    useNewUrlParser: true,
	    useUnifiedTopology: true,
	})
.then(()=>{
	console.log('connected');
	})
.catch((e)=>{
	console.log("Something went wrong", e);
	})
};
connectionToDB();

//processing
const person1 = new personModel({    
    name: "Mohamed",
    age: 34,
    favoriteFoods: ["Couscous", "metabega", "strawberry jus"]
});
person1
.save().then(doc => {console.log(doc)})
.catch((error)=>console.log(error));

personModel.create([
    {
        name: "Alex",
        age: 25,
        favoriteFoods: ["Lasagne blolognaise", "Cheesecake", "Red Bull"]
    },
    {
    name:"Samah",
    age:   20,
    favouritefood: ["Pizza","Hamburger","Milkshake"]
    },
    {
    name:"Nidal",
    age:   28,
    favouritefood: ["Makloub","Sandwich kebda","Pepsi","burritos"],
    },
],(err,data)=> err ? console.log(err) : console.log(data));

//Use model.find() to Search Your Database
const getall = async () => {
    try {
        const allpeople = await personModel.find({});
        console.log(allpeople);
    } catch (error) {
        console.log(error);
    }
};
getall();

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findOneAndUpdate = async () => {
    try {
        const oneperson = await personModel.findOneAndUpdate({name:"Alex"}, {$set:{age:20}}, {new:true});
        await oneperson.save();
        console.log(oneperson)
    } catch (error) {
        console.log(error)
    }
};
findOneAndUpdate();

//Find just one person which has a certain food in the person's favorites
personModel.findOne({ favouritefood: 'Makloub' })

//Use model.findById() to Search Your Database By _id
personModel.findById('62d68d65ad95b8680266ffb6').then(doc =>{
    console.log(doc)
}).catch(err =>{
    console.error(err)
})

//Delete One Document Using model.findByIdAndRemove
const findByIdAndRemove = async () => {
    try {
        const oneperson = await personModel.findByIdAndRemove("62d69252451bb2f59b06e6d6");
        await oneperson.save();
        console.log(oneperson)
    } catch (error) {
        console.log(error)
    }
};
findByIdAndRemove();

//Delete Many Documents with model.remove()
const personModelremove = async () => {
    try {
        const res = await personModel.remove({ name: 'Mohamed' });
        res.deletedCount; // Number of documents removed;
        console.log(res)
    } catch (error) {
        console.log(error)
    }
};
personModelremove();

//Find people who like burritos
personModel.find({$in:{favouritefood: "burritos"}},{age:0})
.sort({name: 1})
.limit(2)
.select({name:true})
.exec()
.then(docs =>{
    console.log(docs)
})
.catch(err =>{
    console.error(err)
});






app.listen(port, (err) =>
err ? console.log(err) : console.log(`Server is running on port ${port}`)
);
