const express =require("express");
const app= express();
const bodyParser=require("body-parser");
const https = require("https"); //since it is external package no need to install

app.use(bodyParser.urlencoded({extended:true}));
// app.get("/",function(req,res)
// {
//     const url="https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=4b190053c06dfd4b08b3afdfcbba2a10&units=metric";
//     https.get(url,function(response)
//     {
//         // console.log(response.statusCode);
//         response.on("data",function(data)
//         {
//             const WeatherData= JSON.parse(data);
//             console.log(WeatherData);

//         });
//     }); 
//     // res.send("Hello should we start!!");
// });

app.get("/",function(req,res)
{
   res.sendFile(__dirname+"/index.html");
});//app.get

app.post("/",function(req,res)
{
    // console.log(req.body.cityName);
    // console.log("dye uyt");
 // res.send("Hello");
 const query=req.body.cityName;
 const apikey="4b190053c06dfd4b08b3afdfcbba2a10";
 const units="metric";
 const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query + "&appid=" + apikey+ "&units="+ units;
// console.log(url);
https.get(url,function(response)
{
//  console.log(response.statusCode);
response.on("data",function(data)
{
// console.log(data);//data wrapped

const WeatherData= JSON.parse(data); //data unwrapped

// console.log(WeatherData);


//Different Features of Weather data
const weatherDescription= WeatherData.weather[0].description;
console.log(weatherDescription);//Haze

const temp= WeatherData.main.temp;
console.log(temp);//31.7

const icon =WeatherData.weather[0].icon;
const imageUrl="http://openweathermap.org/img/wn/"+ icon + "@2x.png";


res.write("<h1>The temperature of " + query +" is "+ temp+ " degree</h1>" );
res.write("<p> The Weather is currently "+ weatherDescription+ "</p>")
res.write("<img src="+ imageUrl + ">");
res.send();

}); //response.on

});//https.get

});






app.listen(3000,function()
{
    console.log("Server started to function...");
});//app.listen