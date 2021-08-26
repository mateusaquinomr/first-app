/**
 * @description Code to create a delay  between min and max values
 * @description Code based in https://github.com/boo1ean/express-delay
 */
 let timers = require('timers');

 let getRandomByInterval = (min, max,isInt)=>{
    if(isInt==true){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return (Math.random() * (max - min)) + min;
    }

 }

 let delay = (min, max)=>{
     let useRandomDelay = (arguments.length === 2);

     return (req, res, next)=>{
         let send = res.send;
         let time = useRandomDelay ? getRandomByInterval(min, max,true) : min;

         res.send = function (){
             let args = arguments;

             timers.setTimeout(()=>{
                 send.apply(res, args);
             }, time);
         };

         next();
     };
 };

 module.exports = {delay,getRandomByInterval};
