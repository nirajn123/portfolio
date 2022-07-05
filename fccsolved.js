
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
*
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
