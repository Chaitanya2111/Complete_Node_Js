const fs = require("fs");

// syn..............
// fs.writeFileSync("./test.txt",'Hey chaitanya.........');

//asy
// fs.writeFile("./test1.txt","hey pallavi" ,(err)=>{});

//sync file read
// const result = fs.readFileSync("./test.txt",'utf-8');
// console.log(result);

fs.readFile("./test1.txt", "utf-8", (err, res) => {
  if (err) {
    // console.log(err)
  } else {
    // console.log(res)
  }
});

// fs.appendFileSync("./test1.txt",`hey rutuja1 \n`)

// fs.unlinkSync("./test1.txt");
// console.log(fs.statSync("./test.txt"))

// console.log(fs.statSync("./test.txt").isFile())


// console.log("1");

// const result = fs.readFileSync("contact.txt", "utf-8");
// console.log(result);

// console.log("2");



console.log("3");

fs.readFile("contact.txt", "utf-8", (err, result) => {
  console.log(result);
});

console.log("4");
