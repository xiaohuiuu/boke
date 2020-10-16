<template>
    <div id="detail" v-if="blog!=null">
        
        <div class="body" v-html="blog.body"></div>
    </div>
</template>

<script>
import {request} from '../../network/request'
export default {
    name:'detail',
    data(){
        return{
            blog:null,
        }
    },
    mounted(){
        //获取blog
        let id = this.$route.query.id
        request({
            url:'blog_id',
            params:{
                id:id
            }
        }).then(res => {
            this.blog = res.data[0]
        })
    }
}
</script>


<style lang="less" scoped>
@keyframes top1{
    from{transform: translateY(100vh);}
    to{transform: translateY(0);}
}
#detail{
    background-color: rgba(255,255,255,0.1);
    border-radius: 15px;
    animation: top1 .7s;
}
.body{
    width: 90%;
    margin:0 auto;
    padding: 30px 0;
    overflow: hidden;

    img{
        width: 100%;
    }
}
</style>