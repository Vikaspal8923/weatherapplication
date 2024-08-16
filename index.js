  
  let mylocation = document.getElementById('mylocation');
  let  typeofweather = document.getElementById("typeofweather");
   let temperature =   document.getElementById('temp');
   let  windspeed = document.getElementById("value1");
   let  humidity = document.getElementById("value2");
   let  clouds  = document.getElementById("value3")
  let   cityname = document.getElementById("name");
 let afterloader = document.getElementById("afterloader");
 let loader = document.getElementById("loader");
 let searchingbtn = document.getElementById("searching");
 let  inputfromuser  =  document.getElementById("otherlocationsearch");
 let  searchdiv = document.getElementById("search");
 let searchbtn  = document.getElementById("otherlocation");
 let  error = document.getElementById("error");

  let finalresult;
  let latitude;
  let longitude;
  let address;
  let a= false;
  let b= false;
     document.addEventListener("DOMContentLoaded",mylocationresult) ;
  
  function fetchMyLocation() {
      return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
                   navigator.geolocation.getCurrentPosition( function (position) {

                      
                      latitude = position.coords.latitude;                    
                      longitude = position.coords.longitude;                 
                      resolve({ latitude, longitude });
                  },
                  function (error) {
                      reject(error);
                  } );
          } else {
              reject(new Error("Geolocation is not supported by this browser."));
          }
      });
  }
  
  async function getWeatherByLocation() {
      try {
          // console.log("I am here");
          // console.log("Latitude is:", latitude);
          // console.log("Longitude is:", longitude);
          
          const apiKey = '222eb0558bfd4fbe5c2a2346efdc4fc9';
         
          
          let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
          let result = await response.json();
          return result;

      } catch (error) {
          console.error('Error:', error);
      }
  }
  

  async  function  getWeatherByuserinput(city){
                       
                            try{
                                const apiKey2 = '222eb0558bfd4fbe5c2a2346efdc4fc9';
                                let response2 =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey2}&units=metric`) ;
                                let result2 = await response2.json();

                                 if(!response2.ok){
                                      
                                    console.log("enter the correct city name");
                                    console.log(response2);
                                 }
                                 else{
                                           return result2;
                                 }


                            }catch(e){
                                            console.log("error in 2nd api");
                            }
  }



       function  typeweather(){
                                    
                    typeofweather.innerText = finalresult.weather[0].main;
       }

       function temp(){
                            
                          temperature.innerText = finalresult.main.feels_like  + "°C";   
                                              
       }
       function  wind(){
                           windspeed.innerText = finalresult.wind.speed + "m/s";
                         
       }
       function humd(){
                             humidity.innerText =  finalresult.main.humidity + "%";
                           
       }
       function cloud(){
                           clouds.innerText =   finalresult.clouds.all + "%";
                       
       }
    function  namefun(){
                          cityname.innerText = finalresult.name;
                          console.log("my city name is :", finalresult.name);
       }

       function showerror(){
                   
        afterloader.classList.remove("afterloader2");
        error.classList.add("error404");
        
                     
    }

    function notshowerror(){
                 b=false;
        afterloader.classList.add("afterloader2");
        error.classList.remove("error404");
                
    }

    async function  mylocationresult() {
       
                  
        try {
            
            
            let info = await fetchMyLocation();
            
            
             finalresult = await getWeatherByLocation();
            console.log(finalresult);
  
             typeweather();
            temp();
            wind();
            humd();
            cloud();
            namefun();
           
            loader.style.display = "none";
            afterloader.classList.add("afterloader2");
          
            
        } catch (error) {
            console.error('Error:', error);
        }
  
  
             
                      
    }
     
    searchbtn.addEventListener('click',function(){
        a = true;
       console.log(" search div");
      //  console.log(searchdiv);
    searchdiv.classList.add("searchjava");
});
   

  mylocation.addEventListener('click',function(){
               
                     if(a==false){
                          mylocationresult();
                     }
                     else{
                            a=false;
                            searchdiv.classList.remove("searchjava");
                             mylocationresult();
                        
                     }
  });
       
          searchingbtn.addEventListener("click",async function(){
                        let  citysearch  =  inputfromuser.value.trim();
                                        console.log(citysearch);
                                       finalresult = await getWeatherByuserinput(citysearch);
                                       console.log(finalresult);
                    if(finalresult == undefined){
                                //    console.log( " my api is showing : " ,finalresult.status);
                               showerror();
                               b=true; // error aya toh 404 set liya
                    }
                    else{
                         
                        if(b==false){
                            typeweather();
                            temp();
                            wind();
                            humd();
                            cloud();
                            namefun();
                        }
                       else{
                        notshowerror();
                        typeweather();
                        temp();
                        wind();
                        humd();
                        cloud();
                        namefun();

                       } 
                       
                    }
                                     


          });
           
       
     