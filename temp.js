let romanToInt = function(s,me) {
    class Roman {constructor (name,value,order){ this.name=name, this.value=value, this.order=order; }}
    let myMap = new Map();
    myMap.set("I",new Roman("I",1,1));
    myMap.set("V",new Roman("V",5,2));
    myMap.set("X",new Roman("X",10,3));
    myMap.set("L",new Roman("L",50,4));
    myMap.set("C",new Roman("C",100,5));
    myMap.set("D",new Roman("D",500,6));
    myMap.set("M",new Roman("M",1000,7));

    let myArr = [...s];
    let retuNum = 0;
    let lastOrder = 0;
    for(let i = myArr.length-1; i >= 0; i--) {
        const currentNum = myMap.get(myArr[i]);
        if(currentNum.order>=lastOrder) {retuNum += currentNum.value;}
        else {retuNum -= currentNum.value;}
        lastOrder = currentNum.order;
    }
    
    return retuNum;
};

const myElement = document.getElementById("ResponseOut");
myElement.innerHTML = "The message for XIV is : " + romanToInt("XVI") + 
"<br>The message for CXLVIII is : " + romanToInt("CXLVIII") + 
"<br>The message for MCDXIV is : " + romanToInt("MCDXIV") + 
"<br>The message for IV is : " + romanToInt("IV");




/*
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

alert("For 2 - The message is: "+ isPalindrome(2));
alert("For 1221 - the message is: "+ isPalindrome(1221));
alert("For 12421 - The message is: "+ isPalindrome(12421));
alert("For 81221 - The message is: "+ isPalindrome(81221));
alert("For -11221 - The message is: "+ isPalindrome(-11221));
alert("For 812218 - The message is: "+ isPalindrome(812218));
alert("For 22 - The message is: "+ isPalindrome(22));
alert("For 8124218 - The message is: "+ isPalindrome(8124218));

*/