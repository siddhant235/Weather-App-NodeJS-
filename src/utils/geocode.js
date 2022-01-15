const request=require('request')

const geoCode=(address,callback)=>{
     
    const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGVjaG5vMDAiLCJhIjoiY2t5OXo1cHdmMDBnODJubGlodGIycDA4OCJ9.C4CpbRS-2IjgJbjPcwjtOw'
request({url:geoUrl,json:true},(error,response)=>{
    if(error){
      callback('Unable to connect to location services',undefined)
    }else if(response.body.features.length==0){
        callback('Unable to find location try another search',undefined)
    }else{
        callback(undefined,{
            latitude:response.body.features[0].center[0],
            longitude:response.body.features[0].center[1],
            location:response.body.features[0].place_name
        })
    }

})
     
}

module.exports=geoCode