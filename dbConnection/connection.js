const mongoose=require('mongoose')
const dbConnection=process.env.CONNECTION_STRING


mongoose.connect(dbConnection).then(res=>{
    console.log('MONGODB ATLAS connected successfully with bloggoServer');
}).catch(err=>{
    console.log('CONNECTION FAILED');
    console.log(err);
    
})
