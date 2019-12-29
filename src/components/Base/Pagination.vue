<template>
    <div class="">
        <nav>
            <ul class="pagination">
                <!-- 
                    （？）如何实现到达第一页时，上一页按钮灰掉 
                        答：'disabled':posts._meta.page<=1?true:false
                            注意一定要用三元运算符指定true或者false，只写<=1是不对的
                    （？）作为组件，router-link里面的路径怎么写呢？
                        答：写成当前路径$route.path，因为分页组件肯定是在当前路径下完成的。
                -->
                <li v-bind:class="{'page-item':true,'disabled':curPage<=1?true:false}">
                    <router-link 

                        :to="{path:$route.path,query:{page:curPage-1 , per_page:perPage}}" 
                        class="page-link" >
                        &laquo;
                    </router-link>
                </li>
                <!-- 
                    （？）分页怎么让点击的页码突出色显示？
                        1.路由的page（点击的）和当前page（显示的）比较
                        2.如果是从主页进入（即没有路由query），并且页码是1的按钮亮起来。
                -->
                <li v-bind:class="{'page-item':1,'active':$route.query.page==page || (!$route.query.page && page==1)}" v-for="(page,index) in iter_pages" v-bind:key="index">
                    
                    <router-link v-if="page!='NaN'" :to="{path:$route.path,query:{page:page,per_page:perPage}}" class="page-link">{{page}}</router-link>
                    <span class="list-inline-item h-100 ml-2 mr-2 text-secondary" v-else style="line-height:3.5em;">...</span>
                    
                </li>


                <li v-bind:class="{'page-item':true,'disabled':curPage>=totalPage?true:false}">
                    <router-link 
                    :to="{path:$route.path,query:{page:curPage+1 , per_page:perPage}}" 
                    class="page-link" >
                        &raquo;
                    </router-link>
                </li>
            </ul>
        </nav>

    </div>
</template>

<script>
export default {
    props:{
        curPage:{
            require:true
        },
        perPage:{
            require:true
        },
        totalPage:{
            require:true
        },
        leftPages:{
            default:2
        },
        rightPages:{
            default:2
        }
    },
    computed:{
        iter_pages:function(){
            let c = this.curPage
            let arr = [1,c-2,c-1,  c  ,c+1,c+2,this.totalPage] //7 ittems
            arr = arr.filter(item=>{
                return item>0 && item<=this.totalPage
            })
            arr = [...new Set(arr)]
            if(arr.length>1 && arr[0]+1 != arr[1]){
                arr.splice(1,0,'NaN')
            }
            if (arr.length>1 && arr[arr.length-1]-1 != arr[arr.length-2]){
                arr.splice(arr.length-1,0,"NaN")
            }
           return arr
        }
    }
}
</script>