let c = 1
let total_pages = 1
let arr = [1,c-2,c-1,  c  ,c+1,c+2,total_pages] 
//去除小于1，且大于total_pages的项
arr = arr.filter(item=>{
    return item>0 && item<=total_pages
})
arr = [...new Set(arr)]

console.log(arr)

if(arr[0]+1 != arr[1]){
    arr.splice(1,0,'NaN')
}
if (arr[arr.length-1]-1 != arr[arr.length-2]){
    arr.splice(arr.length-1,0,"NaN")
}


console.log(arr)