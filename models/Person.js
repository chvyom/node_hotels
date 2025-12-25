const mongoose= require('mongoose')
const bcrypt=require('bcrypt')

const personSchema= new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:{chef:'chef',waiter:'waiter',manager:'manager'},
        required : true
    },
    mobile:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type:String,
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})
personSchema.pre('save',async function(){
    const person=this
    if(!person.isModified('password')) return ;
    const salt=await bcrypt.genSalt(10)

    const hashedPassword=await bcrypt.hash(person.password,salt)
    person.password=hashedPassword
   
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    }catch(err){
        throw err
    }
}
const Person= mongoose.model('Person',personSchema)
module.exports=Person