const axios=require('axios');
let geoURL;
class GoogleMaps
{
    async getCoordinates(zipCode)
    { let coordinate=[];
        geoURL=`https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json`
       await axios.get(geoURL,{params:{
            access_token:`${process.env.ACCESS_TOKEN}`
        }
    }).then((response)=>{
       const data=response.data;
        coordinate=[
           data.features[0].geometry.coordinates[0],
           data.features[0].geometry.coordinates[1]
       ]
    }).catch((err)=>{
        throw new Error(err);
    });
    return coordinate;
    }
}
module.exports=GoogleMaps;