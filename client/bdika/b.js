// function isPangram(string){
//   let theString=string.toLowerCase();
//   let letters="abcdefghijklmnopqrstuvwxyz";
//   let lettersArr=letters.split("");
//   console.log(lettersArr)
//   let check=true;
//   lettersArr.forEeach((e)=>{if (!theString.includes(e)){check=false}})
//   return check
// }

// isPangram("string")
function deleteNth(arr,n){
  let newArr=[];
  arr.forEach((e)=>{
    let num=0;
    for (j=0;num=n;j++){
      if (e===arr[j]){num++; newArr.push(e)}
    }
  })
  return newArr
}

deleteNth([20,37,20,21], 1)