const mongoose=require('mongoose');

const storeSchema=mongoose.Schema({
    storeName:String,
    phoneNumber:String,
     address:{},
     openStatusText:String,
     addressLine:Array,
     location:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
     }    
})

storeSchema.index({location:"2dsphere"});
module.exports=mongoose.model('store',storeSchema);