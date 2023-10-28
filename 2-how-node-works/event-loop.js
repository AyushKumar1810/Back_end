const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("----------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));

//   crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512"); // so Here is sync function used so it will block event Loop ( As we have 1 thread it will subdivided into 4 subthreads(Threads Pool size) so it can 4 async callback function at same time but when we will use sync function so only 1 thread will be activate so it will take longer time  )
//   console.log(Date.now() - start, "Password encrypted");

//   crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
//   console.log(Date.now() - start, "Password encrypted");

//   crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
//   console.log(Date.now() - start, "Password encrypted");

//   crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
//   console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512" , () =>{
  console.log(Date.now() - start, "Password encrypted");//That is Async Version of that 
  })

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512" , () =>{
    console.log(Date.now() - start, "Password encrypted");
  })
    
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512" , () =>{
    console.log(Date.now() - start, "Password encrypted");
  })
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512" , () =>{
    console.log(Date.now() - start, "Password encrypted");
  })


});

console.log("Hello from the top-level code");

//here important things we have observe is that in sync function only 1 loop (thread) is allowed to use by our function so it will take so much ime but in async the function completed only in same 1.6sec but in sync it required 6.4 second to complete 

// for chossing how many Thraeds we can use "process.env.UV_THREADPOOL_SIZE = 4;"
// we wll use it 