const numbers = Array(100).fill(0).map((e,i)=>i+1);

var numbersMapped = numbers.map((n) => {
    if ( n % 3 === 0 || n.toString().includes(3) ) {
        return "Fizz";
    } else if ( n % 5 === 0 || n.toString().includes(5) ) {
        return "Buzz";
    } else {
        return n;
    }
});  

console.log(numbersMapped);