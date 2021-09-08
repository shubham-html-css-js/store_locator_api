const express=require('express');
app=express();
const mongoose=require('mongoose');
const axios=require('axios');
require('dotenv').config()
mongoose.connect(`mongodb+srv://user_pwj:${process.env.DATABASE_PASSWORD}@cluster0.qccgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true});
const store=require('./models/store');
const GoogleMapsService=require('./services/googleMapServices');
const googleMapServices=new GoogleMapsService();
app.use(express.json({limit:"50 mb"}));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*");
    next();
})
app.get('/api/stores',(req,res)=>
{    const zipCode=req.query.zip_code;
   googleMapServices.getCoordinates(zipCode).then((coordinate)=>{
   store.find({location:{
       $near:{
           $maxDistance:3218,
           $geometry:{
               type:"Point",
               coordinates:coordinate
           }
       }
   }
},(err,stores)=>{
   if(err)
   {
       res.status(500).send(err);
   }
else
{
    res.status(200).send(stores);
}
})
   console.log(coordinate)

   
}).catch((err)=>{
    console.log(err);
})
    // store.find({},(err,stores)=>{
    //     if(err)
    //     {
    //         res.status(500).send(err);
    //     }
    //     else
    //     {
    //         res.status(200).send(stores);
    //     }
    // })
})
app.post('/api/stores',(req,res)=>{
    let dbStores=req.body;
    let data=[];
    dbStores.forEach((store_info)=>{
        data.push({
            storeName:store_info.name,
            phoneNumber:store_info.phoneNumber,
            address:store_info.address,
            openStatusText:store_info.openStatusText,
            addressLines:store_info.addressLines,
            location:{
                type:'Point',
                coordinates:[store_info.coordinates.longitude,store_info.coordinates.latitude]
            }
        })
    })
    store.create(data,(err,dbStores)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(dbStores);
        }
    })
    console.log(data);
})
app.delete('/api/stores',(req,res)=>
{
    store.deleteMany({},(err)=>{
        res.status(200).send();
    })
})
app.listen(3000,()=>{
    console.log("Listening on Port 3000");
})