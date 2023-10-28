// using File sysytem (fs) Module
const fs = require('fs');
// const http=require('http')

//////////////////////
///// FILES
//Blocking synchronous way
// const text_read=fs.readFileSync('./1-NODE-FARM/txt/input.txt' ,  'utf-8' , ) //That will read Our file from the location 
// console.log(text_read);
//  // for write 
// const text_out=`This is what we know about avocado : ${text_read} .\nCreated on ${Date.now()}`;
// //So now we will write the above Output in newly created File
// fs.writeFileSync('./1-NODE-FARM/txt/output.txt' , text_out)
// console.log('File written ');
// // This above code is example of synchronous code and it's called blocking code , as for executing next line previous line of code should be completed ,so it has to wait for execution , so it will take longer time to execute the code

// // Non Blocking Asynchronous Code
// fs.readFile('./1-NODE-FARM/txt/start.txt' , 'utf-8' ,  (err,data1)=> {
//     fs.readFile(`./1-NODE-FARM/txt/${data1}.txt` , 'utf-8' ,  (err,data2)=> {
//         console.log(data2) ; 
//         fs.readFile('./1-NODE-FARM/txt/append.txt' , 'utf-8' ,  (err,data3)=> {
//             console.log(data3) ;
            
//             fs.writeFile('./1-NODE-FARM/txt/finals.txt' , `${data2}\n${data3}`,'utf-8' , err=>{
//                 console.log('Your fie has been written '); 

//             })

//         })
//     })
// });
// console.log("Ayush have You Got The File"); // this will execute 1st as the callback code ius still in process 
// This above is called callback hell as so many Call-backs are there in that   

//////////////////////
///// SERVERS

// const server = http.createServer((req, res )=> {
//     console.log(req);
//     res.end("Hello This is my 1st server ");
// });
// server.listen (8000, '127.0.0.1' , () =>{
//     console.log('Listening to the request on Port 8000');
// });


const http = require('http'); // Make sure to require the 'http' module
const path = require('path');

// const server = http.createServer((req, res) => {
//     // console.log(req);
//     res.end("Hello, This is my 1st server");
// });

// server.listen(8000, '127.0.0.1', () =>{
//     console.log('Listening to requests on Port 8000');
// });


//////////////
/// SERVER
const url =require('url');
const replaceTemplate=require('./1-NODE-FARM/modules/replaceTemplete')


const tempoverview =fs.readFileSync(`${__dirname}/1-NODE-FARM/templates/template-overview.html` , 'utf-8')
const tempcard =fs.readFileSync(`${__dirname}/1-NODE-FARM/templates/template-card.html` , 'utf-8')
const tempProduct =fs.readFileSync(`${__dirname}/1-NODE-FARM/templates/template-product.html` , 'utf-8')
const data =fs.readFileSync(`${__dirname}/1-NODE-FARM/dev-data/data.json` , 'utf-8')
const dataObj=JSON.parse(data);


const server = http.createServer((req,res) => {
    const {query , pathname} = url.parse(req.url,true);
    //query: [Object: null prototype] { id: '1' },  pathname: '/product',

    

    
    // OVERVIEW PAGE
    if (pathname === '/' || pathname ==='/overview') {
        res.writeHead(200 , {'content-type':'text/html'});

        const cardHtml=dataObj.map(el => replaceTemplate(tempcard,el)).join('')
        const output =tempoverview.replace('{%PRODUCT_CARDS%}' , cardHtml)
        res.end(output)
    // PRODUCT PAGE
     } else if (pathname==='/product'){
        res.writeHead(200 , {'content-type':'text/html'}); 
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct , product)
        res.end(output)
    // API 
     } else if (pathname==='/api'){
        res.writeHead(200 , {'content-type':'application/json'});
        res.end(data)
     }
     
    //// NOT FOUND 
     else{
        res.writeHead(404 , {
            'content-type' : 'text/html' ,
            'my-own-header' : 'Hello world'
        });
         res.end('<h1>Page Not Found ! </h1>');

    }
    
})
server.listen(8000, '127.0.0.1', () =>{
    console.log('Listening to requests on Port 8000');
});