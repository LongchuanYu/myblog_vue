export default function clear_comments(args){
  let that = args.that
  let path = `/users/${that.shareState.user_id}/clear-notifications/?type=${args.type}`
  that.$axios.get(path).then(res=>{
  }).catch(e=>{
    console.log('ClearCommentsError:',e.response)
  })

}

