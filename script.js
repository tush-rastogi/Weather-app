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
     let enter=document.querySelector("input"); 
       const apikey="659662f0657d2bd732d4518c8dfe6944";
       
        timeupdate();
     
     
       if(navigator.geolocation)
   {
   
   
    navigator.permissions.query({ name: 'geolocation' })
      .then(status=>{

         if(status.state=="denied")
         {
           alert("Hey..You just denied me to access your location... Go to settings -> Site Settings -> locations -> Blocked -> click the link on with .html extension->Refresh the page....");
         
         }


    });
    
    
    
    
    navigator.geolocation.getCurrentPosition(x=>{

           

           longitude=x.coords.longitude;
            latitude=x.coords.latitude;
         console.log(x);
           console.log(longitude +" "+latitude);
      
       let api=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${apikey}`;
        console.log(api);
             
        
           fetch(api).then(data=>data.json()).then(response=>{
                  console.log(response);

                  const {description}=response.current.weather[0];
                  const{temp,humidity}=response.current;
                  const{wind_speed}=response.current;
                  
                  let {icon}=response.current.weather[0];
               
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
                    // console.log(seconds);
                    // Will display time in 10:30:23 format
                    let convertedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                      return convertedTime;
                     
                   }

                       sunrisetime.textContent=convertedTime(sunrise);
                       
                        sunsettime.textContent=convertedTime(sunset);

                 status.textContent=description;
                 temperature.innerHTML=Math.ceil(temp-273.5)+`&deg;C`;
                 speeds.textContent=wind_speed+" m/s";
                 humidityy.textContent=humidity+"%";
                  timezones.textContent=timezone;

                icons.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
                 
                 
                for(let i=0;i<5;i++)
                 {
                     
                       let time=response.hourly[i].dt;
                      hours[i].textContent=convertedTime(time);
                    
                 }
               
                 for(let i=0;i<5;i++)
                 {
                      let a=document.querySelector(`.temp${i+1}`);
                      let b=document.querySelector(`.humid${i+1}`);
                      let c=document.querySelector(`.speed${i+1}`);
                      let d=document.querySelector(`.status${i+1}`);
                      let e=document.querySelector(`.img${i+1}`);
                   //  console.log(a);
                        a.innerHTML=Math.ceil((response.hourly[i].temp-273.5))+`&deg;C`;
                          

                      b.textContent=response.hourly[i].humidity+"%";
                      c.textContent=response.hourly[i].wind_speed+" m/s";
                       d.textContent=response.hourly[i].weather[0].description;
 
                         let ic=response.hourly[i].weather[0].icon;
                        e.setAttribute("src",`http://openweathermap.org/img/wn/${ic}@2x.png`)

                 }
                 



                       let search=document.querySelector(".button");

                      let searching =function () {

                    // a.preventDefault();
        // timezone.textContent=cityname.value;
           let cityname=document.querySelector(".citysearch");
       
         const cityapi=`https://api.openweathermap.org/data/2.5/weather?q=${cityname.value}&appid=${apikey}`  

             
         
         console.log(cityapi);
        
           
          
              fetch(cityapi).then(data=>{
                 
                 if(data.ok)
                  return data.json();
                 
                else
                {
                  alert("City not found");
                }
                
                
              })
              .then(response=>{
      
            const{sunrise,sunset}=response.sys;
                  
            sunrisetime.textContent=convertedTime(sunrise);
            sunsettime.textContent=convertedTime(sunset);
            const{lon,lat}=response.coord;
            console.log(lon, lat);

               api=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apikey}`;
                console.log(api);
               fetch(api).then(data=>data.json()).then(response=>{

                const{timezone}=response;
                 const{dt}=response.current;
                 
                  timezones.textContent=timezone;
                  
                    city.textContent=cityname.value; 

                     
                        const{icon}=response.current.weather[0];
                        icons.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
                 
 
                            const{temp,humidity,wind_speed}=response.current;

                             temperature.innerHTML=Math.ceil(temp-273.5)+"&deg;C";
                             const{description}=response.current.weather[0];
                              status.textContent=description;
                              humidityy.textContent=humidity+"%";
                              
                               speeds.innerHTML=wind_speed+" m/s";

                               for(let i=0;i<5;i++)
                               {
                                    let a=document.querySelector(`.temp${i+1}`);
                                    let b=document.querySelector(`.humid${i+1}`);
                                    let c=document.querySelector(`.speed${i+1}`);
                                    let d=document.querySelector(`.status${i+1}`);
                                    let e=document.querySelector(`.img${i+1}`);
                                 //  console.log(a);
                                 a.innerHTML=Math.ceil((response.hourly[i].temp-273.5))+`&deg;C`;
              
                                    b.textContent=response.hourly[i].humidity+"%";
                                    c.textContent=response.hourly[i].wind_speed+" m/s";
                                     d.textContent=response.hourly[i].weather[0].description;
               
                                       let ic=response.hourly[i].weather[0].icon;
                                      e.setAttribute("src",`http://openweathermap.org/img/wn/${ic}@2x.png`)
              
                               }
                       


                               


               });
 

           icons.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
   });
  

              };


                
              search.addEventListener('click',searching);
              enter.addEventListener('keydown',(event)=>{
                if(event.code==="Enter")
               {  
                 event.preventDefault();  
                
                  searching();
               }
              });
                  

              




         // api to extract city name   
        const api2=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;

           fetch(api2).then(data=>data.json()).then(response=>{

                 city.textContent=response.name;
                });

                 

       });
   
          
    },
    
      err=>{
         alert("May be you don't open your device location or denied me to access your location");
         let x=document.querySelector("html");

          x.style.display="none";
      
        }
    
    );
   
  
  }
    


       function timeupdate() {
           let current = new Date();
            const time =`${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
          // console.log(time);
            usertime.textContent = time;
          setTimeout(timeupdate, 1000);
        }     

    });