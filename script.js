window.addEventListener('load',()=>{
    
      
    let longitude;
    let latitude;
    let status=document.querySelector("body > main > div > div.description-values > div.weather.status > h2");
    let temperature=document.querySelector("body > main > div.content > div.description-values > div.temperature-value > h2");
    let speeds=document.querySelector("body > main >  div > div.description-values > div.Windspeed.value > h2");
     let humidityy=document.querySelector("body > main > div >div.description-values > div.humidity-value > h2");
     let timezones=document.querySelector("body > main > div > div.location > div.timezone > h2");
     let icons=document.querySelector(".current-icon");
     let usertime=document.querySelector(".user-time");
     let sunrisetime=document.querySelector(".sunrise");
     let sunsettime=document.querySelector(".sunset");
     let hours=document.querySelectorAll("h3");
     let city=document.querySelector(".cityname");
      

       const apikey="659662f0657d2bd732d4518c8dfe6944";
       timeupdate();
     if(navigator.geolocation)
   {
       navigator.geolocation.getCurrentPosition(x=>{
           longitude=x.coords.longitude;
            latitude=x.coords.latitude;
         console.log(x);
           console.log(longitude +" "+latitude);
      
          //const api=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
         // console.log(apim);
        //   console.log(futureapi);
         
              
       const api=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${apikey}`;
        console.log(api);
             
        
           fetch(api).then(data=>data.json()).then(response=>{
                  console.log(response);

                  const {description}=response.current.weather[0];
                  const{temp,humidity}=response.current;
                  const{wind_speed}=response.current;
                  //const{name}=response;
                  let {icon}=response.current.weather[0];
                //  const{country}=response.sys;
                console.log(wind_speed); 
                   const {sunrise}=response.current;
                   const{sunset}=response.current;
                   const{timezone}=response;
                 
                   let convertedTime=id=>{

                    let  a = id;
                    //let unix_timestamp1=sunset;
                    // Create a new JavaScript Date object based on the timestamp
                    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                    let date = new Date(a * 1000);
                    // Hours part from the timestamp
                    let hours = date.getHours();
                    // Minutes part from the timestamp
                    let minutes = "0" + date.getMinutes();
                    // Seconds part from the timestamp
                    let seconds = "0" + date.getSeconds();
                    
                    // Will display time in 10:30:23 format
                    let convertedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                      return convertedTime;
                     
                   }

                       sunrisetime.textContent=convertedTime(sunrise);
                       
                        sunsettime.textContent=convertedTime(sunset);

                 status.textContent=description;
                 temperature.textContent=temp;
                 speeds.textContent=wind_speed;
                 humidityy.textContent=humidity+"%";
                  timezones.textContent=timezone;

                icons.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
                 
                 
                 for(let i=0;i<5;i++)
                 {
                     
                       let time=response.hourly[i].dt;
                      hours[i].textContent=convertedTime(time);
                       
                      let x=`day-${i+1}`;
                    

                 }
                    
                 for(let i=0;i<5;i++)
                 {
                      let a=document.querySelector(`.temp${i+1}`);
                      let b=document.querySelector(`.humid${i+1}`);
                      let c=document.querySelector(`.speed${i+1}`);
                      let d=document.querySelector(`.status${i+1}`);
                      let e=document.querySelector(`.img${i+1}`);
                   //  console.log(a);
                        a.textContent=response.hourly[i].temp;

                      b.textContent=response.hourly[i].humidity+"%";
                      c.textContent=response.hourly[i].wind_speed;
                       d.textContent=response.hourly[i].weather[0].description;
 
                         let ic=response.hourly[i].weather[0].icon;
                        e.setAttribute("src",`http://openweathermap.org/img/wn/${ic}@2x.png`)

                 }
         
                  


              });

         // api to extract city name   
        const api2=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;

           fetch(api2).then(data=>data.json()).then(response=>{

                 city.textContent=response.name;

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

       function timeupdate() {
           let current = new Date();
           let  time =`${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
          // console.log(time);
            usertime.textContent = time;
          setTimeout(timeupdate, 1000);
      }     
   

});