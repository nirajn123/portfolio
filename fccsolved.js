
//finding missing letter

function fearNotLetter(str) {
  let arr=str.split("");
  let letters="abcdefghijklmnopqrstuvwxyz";
  let arrLet=letters.split("");
  let j=0;
  let indStart=arrLet.findIndex(lett=>lett==arr[0]);
  let indEnd=arrLet.findIndex(lett=>lett==arr[arr.length-1]);
  console.log(arr.length," =>",indStart," & ",indEnd);
  if(arr.length>(indEnd-indStart)) return undefined;
  for(let i=indStart;i<indEnd;i++)
  {
    if(arr[j]!==arrLet[i])return arrLet[indStart+j];
    j++;
  }
  return str;
}

console.log(fearNotLetter("abce"));


//finding the unique numbers in multi-dimmensional array without changing the order they appear

function uniteUnique(...arr) {
  //First combine all args into one array
  //we do this by using reduce function and concatinating each second dimmensional array
  let onearr = arr.reduce((prev,next) => prev.concat(next));
  //we now have the total array, and need to filter that 
  // based on whether the current index matches the very first index of that item
  //filter function has the item and index, we need to find the first Index unding findIndex function
  arr = onearr.filter((item,i,arra)=> {
    //console.log(item,"-",i,"-",arra.findIndex((fitem)=> fitem===item));
    if(i === arra.findIndex((fitem)=> fitem===item)) return true;
    else return false;});
  return arr;
}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));


//HTML Escape chars replacement

function convertHTML(str) {

    //Create key value pairs
  let Obj = {
    "&" : "&amp;",
    "<" : "&lt;",
    ">" : "&gt;",
    "\""  : "&quot;",
    "\'"  : "&apos;"
  };

  //loop through the key value pairs to obtain the matching items one by one
    for (let itm in Obj){
        //create a new RegExp so we can add g at the end for recurring escape chars, and then simply replace.
    const newReg = new RegExp(itm,"g")
    str = str.replace(newReg,Obj[itm]);
  }
  
  return str;
}

// Another option (from FCC ->) 
// Using a regex, replace characters with it's corresponding html entity
// return str.replace(/([&<>\"'])/g, match => htmlEntities[match]);

console.log(convertHTML("Dolce & Gabbana"));
console.log(convertHTML('Stuff in "quotation marks"'));


/**
 * **************
 * Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than or equal to 10 are 1, 1, 3, and 5.
 */


function sumFibs(num) {

    //Define the series to hold fibbonacci, and current number to compare 
  let series = [1,1];
  let currentnum = 1;;

    //While the current number is less than the input param
  while (true){
      const last = series.length;
      //assign new current number by adding last two digits from the fibbonacci series
    currentnum = series[last-2]+series[last-1];
      if (currentnum>num) break;
      //if we haven't reached the input number yet then add the number to the series
    series.push(currentnum);
  }
    //now sum the odd numbers in the series
  return series.reduce((sum,num)=> {
    if(num%2 !=0) 
    {
      return sum+num;
    }
  else return sum;}); 
}

console.log(sumFibs(75025));


/**
 * Fibbonnaci number - given a number calculate the sum.
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    //Define the series to hold fibbonacci, and current number to compare 
  if (n==0) return 0;
  if (n==1) return 1;
  let series = [0,1];
  let currentnum = 1;

    //While the current number is less than the input param
  while (true){
      const last = series.length;
      if (last>n) break;
      //assign new current number by adding last two digits from the fibbonacci series
    currentnum = series[last-2]+series[last-1];
      //if we haven't reached the input number yet then add the number to the series
    series.push(currentnum);
  }
  
  return currentnum;
};

console.log(fib(7));
console.log(fib(6));
console.log(fib(4));

/**
 * *******
 * A prime number is a whole number greater than 1 with exactly two divisors: 1 and itself. For example, 2 is a prime number because it is only divisible by 1 and 2. In contrast, 4 is not prime since it is divisible by 1, 2 and 4
 * Rewrite sumPrimes so it returns the sum of all prime numbers that are less than or equal to num.
 */


function sumPrimes(num) {
  //First declare an array to store the primes
  let retArray = []
  if (num===2) return 2;
  else if (num>2) retArray = [2]
  let i = 3;
  let flag = true;
  //loop for each number, with just 2 in the array
  while (num>=i){
    //now with-in the loop, divide each number by primes identified so far
    //innocent till proven guilty so set the number to true (a prime)
    flag = true;
    for (let j=0;j<=retArray.length;j++)
    {
      //if the number is divisible by existing prime, it is not a prime
      //so set the flag to false (not a prime)
      if(i%retArray[j] ===0)flag = false;
    }
    //if the number was still proved to be a prime add to array
    if(flag) retArray.push(i);
    i++;
  }
  return retArray.reduce((sum,num)=> sum+num);

}

console.log(sumPrimes(10));


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let numOneMed,numTwoMed;
    let numOneLen=nums1.length;
    let numTwoLen=nums2.length;
    if(numOneLen == 0) numOneMed = 0;
    else numOneMed = nums1.reduce((sum,next)=>sum+next)/numOneLen;
    if(numTwoLen == 0) numTwoMed = 0;
    else numTwoMed = nums2.reduce((sum,next)=>sum+next)/numTwoLen;   
    return ( numOneMed + numTwoMed)/2; 
};



/*************
*
*
**/

let primeNum = [2,3,5,7,11,13,17,19,23, 29, 31, 37, 41];
function smallestCommons(arr) {
  let newArr=[];
  let factoredArr = [];
  let vanIn = [];
  let vanOut = [];
  let vanFlag = false;
  let searchItem = 0;
  let k=0;
  //First check that arr is the right numerical order
  //if no, sort it.
  if(arr[0]>arr[1]) arr.sort((a,b)=>a-b);
  //Now add all the numbers in the sequence
  for(let i=arr[0];i<=arr[1];i++) newArr.push(i);
  //New let's create factors for each
  for (let j=0;j<newArr.length;j++){
    //Only create factor if number is 2 or larger
    if(newArr[j]>1){
      factoredArr.push(factorise(newArr[j]));
    }    
  }
  //console.log(factoredArr);

  //Now we need to create two separate arrays to capture Ven diagram
  //so first will loop through all the sub-arrays
  while(k<factoredArr.length){
    //make sure the flag is set to false
    vanFlag = false;
    //for each of the sub-array, we check if the length is not zero, if yes go to the next sub-array
    if (factoredArr[k].length ==0) k++;
    else{
      //pick the first item and delete it from the array
      console.log(factoredArr);
      searchItem = factoredArr[k][0];
      factoredArr[k].shift();
      for (let l=k+1;l<factoredArr.length;l++){
            //now search the item in the next non empty array
          if (factoredArr[l].length !=0){
             for (let m=0;m<factoredArr[l].length;m++)
             {
               if (searchItem==factoredArr[l][m]){
                //if a match is found in the next set of arrays set flag to true
                //and delete the item
                vanFlag = true;
                factoredArr[l].splice(m,1);
                break;
               }
             } 
          }
        }
        //if match was found put it in the In array, if not the out array
        if(vanFlag) vanIn.push (searchItem);
        else vanOut.push(searchItem);
      }   
  }
  console.log("In ",vanIn, "Out ",vanOut);
  return vanIn.reduce((prod,item)=>prod*item)*vanOut.reduce((prod,item)=>prod*item);
}

//A recursive function to find the factors
function factorise(n){
  let i=0;
  let fArr=[];
  while(i<primeNum.length||n>primeNum[i])
  {
    if(n%primeNum[i]==0){
      fArr.push(primeNum[i]);
      fArr.push(...factorise(n/primeNum[i]));
      break;
    } 
    i++;
  }
  return fArr;
}

console.log(smallestCommons([2,10]));

/*********
* Drop elemments using a functions until the function returns first true
*
***********/


function dropElements(arr, func) {
  let newArr=[...arr];
  for(let i=0;i<arr.length;i++){
    if(func(arr[i])===false)
    {
      console.log("Here")
      newArr.shift(0);
    }
    else break;
  }
  console.log(newArr);
  return newArr;
}

dropElements([1, 2, 3, 4], function(n) {return n >= 3;})


/*********
* Flatten a nested array. You must account for varying levels of nesting.
*
***********/

function steamrollArray(arr) {
  let newArr =[]
  for(let i=0;i<arr.length;i++)
  {
    if(Array.isArray(arr[i])) {
      newArr.push(...steamrollArray(arr[i]));}
    else newArr.push(arr[i]);
  }
  return newArr;
}

console.log(steamrollArray([1, [2], [3, [[4]]]]));


/*********
* Return an English translated sentence of the passed binary string.
* The binary string will be space separated.
*
***********/

function binaryAgent(str) {
  return str.split(" ").reduce((sum,item)=>sum+String.fromCharCode(parseInt(item,2)),""); 
}

console.log(binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"));


/*********
* Everything Be True
* Check if the predicate (second argument) is truthy on all elements of a collection (first argument).
* In other words, you are given an array collection of objects. The predicate pre will be an object property and you need to return true if its value is truthy. Otherwise, return false.
* In JavaScript, truthy values are values that translate to true when evaluated in a Boolean context.
* Remember, you can access object properties through either dot notation or [] notation.
*
***********/


function truthCheck(collection, pre) {
  return collection.every((obj)=> obj[pre]);
}

truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "isBot");



/***********
* Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.
* For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.
* Calling this returned function with a single argument will then return the sum:
* var sumTwoAnd = addTogether(2);
* sumTwoAnd(3) returns 5.
* If either argument isn't a valid number, return undefined.
*****/

function addTogether(...args) {
  if(args.length==1){
    //firstVal = args.length[0];
    if(typeof(args[0]) !== "number") return undefined;
    else{
    return function(y){
      if(typeof(y) !== "number") return undefined;
      else return args[0]+y;}
    }
  }
  else{
    if(typeof(args[0]) !== "number"||typeof(args[1]) !== "number") return undefined;
    else return args[0]+args[1];
  }
}

addTogether(2,3);

/*****************
* Fill in the object constructor with the following methods below:
* 
* getFirstName()
* getLastName()
* getFullName()
* setFirstName(first)
* setLastName(last)
* setFullName(firstAndLast)

* Run the tests to see the expected output for each method. The methods that take an argument must accept only one argument and it has to be a string. These methods must be the only available means of interacting with the object.
**************/

const Person = function(firstAndLast) {
  // Only change code below this line
  // Complete the method below and implement the others similarly
  let firstName ="",lastName="";
  this.getFullName = function() {
    return firstName + " "+lastName;
  };
  this.getFirstName = function() {
    return firstName;
  };
  this.getLastName = function() {
    return lastName;
  };
  this.setFirstName = function(first){
    firstName = first;
  };
  this.setLastName = function(last){
    lastName = last;
  };
  this.setFullName = function(firstnLast){
    firstName = firstnLast.split(" ")[0];
    lastName = firstnLast.split(" ")[1];
  }
  this.setFullName(firstAndLast);
  return firstAndLast;
};

const bob = new Person('Bob Ross');
console.log(Object.keys(bob));
console.log(bob.getFullName());
console.log(bob.getFirstName());
console.log(bob.getLastName());
bob.setFirstName("Pants");
console.log(bob.getFullName());
bob.setLastName("Shirts");
console.log(bob.getFullName());
console.log(bob.getFirstName());
console.log(bob.getLastName());
bob.setFullName("Black White");
console.log(bob.getFullName());
console.log(bob.getFirstName());
console.log(bob.getLastName());

/****************
* According to Kepler's Third Law, the orbital period T

of two point masses orbiting each other in a circular or elliptic orbit is:

T=2πa3μ‾‾‾√

    a

is the orbit's semi-major axis
μ=GM
is the standard gravitational parameter
G
is the gravitational constant,
M

    is the mass of the more massive body.

Return a new array that transforms the elements' average altitude into their orbital periods (in seconds).

The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.

The values should be rounded to the nearest whole number. The body being orbited is Earth.

The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km3s-2.

**********/

function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;
  const retArr = []
  arr.forEach((item) => {
  let newObj = {};
  newObj.name = item.name;
  let semiMajorAx = item.avgAlt + earthRadius;
  newObj.orbitalPeriod = Math.round(Math.sqrt(Math.pow(semiMajorAx,3)/GM)*2*Math.PI);
  retArr.push(newObj);
  });
  return retArr;
}

console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]));


/*****
* Leetcode palindrom checker
*
*
**********/

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x<0) return false;
    else{
        let myfunction = num => Number(num);
        let myarr = Array.from(String(x),myfunction);
        for (let i=0; i<myarr.length/2; i++) {
            if(myarr[i]!=myarr[myarr.length-i-1]) return false;
        }
        return true;
    }
};


/******
* FCC Palindrom Checker
*
*********/

function palindrome(str) {
  //Return false for empty string
  if(str.length<=0) return false;
  //Remove all non-alpha chars
  str = str.replace(/(\W)|(_)/g,"").toLowerCase();
  let myarr = str.split("");
  if (myarr.length ==0) return true;
  for (let i=0; i<myarr.length/2; i++) {
    if(myarr[i]!=myarr[myarr.length-i-1]) return false;
  }        
    return true;
}

console.log(palindrome("eye"));
console.log(palindrome("1 eye for of 1 eye."));

/***********
* Roman Numeral Converter
*
*
**********/
function convertToRoman(num) {
let valMap = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}
let remVal = num;
let str ="";
while(remVal>0){
  for(let key in valMap){
    let calc = Math.floor(remVal/valMap[key]);
    for (let i=0;i<calc;i++)
    {
      str+=key;
      remVal -= valMap[key];
    }
  }
}
 return str;
}

/********
* ROT13 Cipher
*
***********/
function rot13(str) {
  let alphaStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let alphaArr = alphaStr.split("");
  //console.log(alphaArr.length);
  let ciArr = str.split("");
  let retStr = ""

  for(let i=0;i<ciArr.length;i++){
    let index = alphaArr.findIndex((item) => ciArr[i]===item);
    retStr += index>=0 ? (index<13? alphaArr[index+13]: alphaArr[((index+13)%26)]) : ciArr[i];       
  }
  console.log(retStr);
  return retStr;
}

rot13("SERR PBQR PNZC");


console.log(convertToRoman(3999));


/******
* US Phone number Regex
*
*******/


function telephoneCheck(str) {
  let newRegx = /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/; 
  return newRegx.test(str);
}

telephoneCheck("555-555-5555");
telephoneCheck("1 555 555 5555");
telephoneCheck("(5551A) 555-5555");
telephoneCheck("555-555-5555");


/*******
* Cash Register - final project
*
*********/



function checkCashRegister(price, cash, cid) {
  let currency = { "ONE HUNDRED": 10000,
  "TWENTY": 2000,
  "TEN":1000,
  "FIVE":500,
  "ONE":100,
  "QUARTER":25,
  "DIME":10,
  "NICKEL":5,
  "PENNY":1
  }
  //Find the change in penny
  let remVal = (cash-price)*100;
  let change = [];
  for(let key in currency){
    //for each key in currency divide the change
    let calc = Math.floor(remVal/currency[key]);
    if(calc>=1){
    //If the change to be given is lower than the bill
    //check how many bills do we have in register
    //it is important that this is checked for the right type of bill
        let maxAvail = 0;
          for(let j=0;j<cid.length;j++){
            if(cid[j][0]===key) maxAvail = cid[j][1];
          }
        const obj =[];
        //now populate the change array
        obj[0] = key;
        obj[1] = (Math.min(calc*currency[key],maxAvail*100))/100;
        change.push(obj);
        remVal -= obj[1]*100;     
    }
}
  let retObj = {};
  if (remVal>0) {
    retObj.status = "INSUFFICIENT_FUNDS";
    retObj.change = [];
  }
  else{
    //TODO: Amend the code so we track the register values and set status
    remVal ==0? retObj.status = "CLOSED": retObj.status = "OPEN";
    retObj.change = [...change];
  }   
  return retObj;
}

//console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
//console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));


