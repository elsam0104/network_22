/*
true;
false;
var e = 1;
console.log(e==true);
console.log(e===true);

var args = process.argv;
console.log(args);
if(args[2] == 'C1')
{
  console.log('C1');
}else console.log('C2');

for(var i = 0; i<100; i++)
{
  console.log('A');

}
*/
var arr1 = [1,'a',2];
console.log(arr1);
arr1.push(3);
arr1.unshift(0);
arr1.splice(2,0,5);
console.log(arr1);
arr1.splice(0,1);
console.log(arr1);
function Func(a,b) {
  return a+b;
}
console.log(Func(5,2));
console.log(Func('a',2));
