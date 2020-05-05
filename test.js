items = [{
  recipient:{
    id:1
  }
},{
  recipient:{
    id:5
  }
},{
  recipient:{
    id:6
  }
}]

var ret = items.some((item,idx)=>{
  if(item.recipient.id==5){
    console.log(idx)
    return true
  }
})
console.log(ret)