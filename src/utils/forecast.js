const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=0af1530301e9efb9dffb5d374231c98f&query='+longitude+','+latitude

console.log(url)

    request({url:url,json:true},(error,{body})=>{
        
        if(error){
            callback("Unable to connect to service!",undefined)
        }else if(body.error){
            callback("Unable to find",undefined)
        }else{
           
            callback(undefined,{
                temperature:body.current.temperature,
                feelsLike:body.current.feelslike
            })
        }
     
    })
}

module.exports=forecast