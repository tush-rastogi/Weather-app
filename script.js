window.addEventListener('load',()=>{
  
    let longitude;
    let latitude;
    let status=document.querySelector("body > main > div > div.description-values > div.weather.status > h2");
    let temperature=document.querySelector("body > main > div.content > div.description-values > div.temperature-value > h2");
    let speeds=document.querySelector("body > main >  div > div.description-values > div.Windspeed.value > h2");
     let humidityy=document.querySelector("body > main > div >div.description-values > div.humidity-value > h2");
     let timezone=document.querySelector("body > main > div > div.location > div.timezone > h2");
     let icons=document.querySelector("body > main > div > div.location > div.icons > img");
       const apikey="659662f0657d2bd732d4518c8dfe6944";
  
     if(navigator.geolocation)
   {
       navigator.geolocation.getCurrentPosition(x=>{
           longitude=x.coords.longitude;
            latitude=x.coords.latitude;
         console.log(x);
           console.log(longitude +" "+latitude);
          const api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          const futureapi=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
        //   console.log(api);
        //   console.log(futureapi);
         
              
        let forecastapi=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${apikey}`;
        console.log(forecastapi);
              fetch(api).then(data=>data.json()).then(response=>{
                  console.log(response);

                  const {description}=response.weather[0];
                  const{temp,humidity}=response.main;
                  const{speed}=response.wind;
                  const{name}=response;
                  let {icon}=response.weather[0];
                  const{country}=response.sys;
 
                     
                  

                    
                 status.textContent=description;
                 temperature.textContent=temp;
                 speeds.textContent=speed;
                 humidityy.textContent=humidity+"%";
                 timezone.textContent=name+"/"+country;

                 icons.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
                 
            
               
            


              });

           




       });
   
          
    }


    let cityname=document.querySelector(".city");
    let search=document.querySelector("button");
     
          
       search.addEventListener('click',(a)=>{

             a.preventDefault();
           timezone.textContent=cityname.value;

            
            const cityapi=`https://api.openweathermap.org/data/2.5/weather?q=${cityname.value}&appid=${apikey}`  

                   
             fetch(cityapi).then(data=>data.json()).then(response=>{
           
           
            const {description}=response.weather[0];
            const{temp,humidity}=response.main;
            const{speed}=response.wind;
            const{name}=response;
            let {icon}=response.weather[0];
            const{country}=response.sys;


             

            status.textContent=description;
            temperature.textContent=temp;
            speeds.textContent=speed;
            humidityy.textContent=humidity+"%";
            timezone.textContent=name+"/"+country;

            icons.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
        });

       });

        


});