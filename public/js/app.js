console.log("Client side js file loaded")



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

// messageOne.textContent='From JavaScript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value
    console.log(location)
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((res)=>{
    res.json().then((data)=>{
      
             if(data.error){
   messageOne.textContent=data.error
             }else{
           messageOne.textContent=data.location;
           messageTwo.textContent="Its is currently "+data.forecast.temperature+" degrees and feels like "+data.forecast.feelsLike+" degrees"
             }
    })
})
  
})