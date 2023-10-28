const EventEmitter = require("events");
const myEmitter= new EventEmitter();
myEmitter.on("newSale" , () =>{
    console.log("There is a new sale Happening"); 
})
myEmitter.on("newSale" , () =>{
    console.log("Costumer name : Ayush Kumar");
    console.log("I am very Rich");
});
myEmitter.emit("newSale")