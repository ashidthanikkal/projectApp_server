const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("_____MongoDB Server Connected");
}).catch(err=>{
    console.log(`_____MongoDB server Not Connected Reason::${err}`);
})