<template>
    <div id="navbar">
        <div class="bar" v-for="(item,index) of title" :key="index" @click="routerto(item.url)">{{item.name}}</div>
    </div>
</template>


<script>
export default {
    name:'navbar',
    data(){
        return{
            title:[
                {name:'博客',url:'/blog/blogbody'},
                {name:'相册',url:'/blog/pic'},
                {name:'分享',url:'/blog/share'},
                {name:'关于',url:'/blog/about'},

            ]
        }
    },
    methods:{
        routerto(url){
            this.$router.replace(url)
        }
    }
}
</script>

<style lang="less" scoped>
#navbar{
    margin: 0 auto;
    height: 150px;
    width: 50%;
    min-width: 600px;
    max-width: 940px;   
    display: flex;
    justify-content: space-between;
    align-items: center;
    // color: #d9a40e;
    color: #000;
    font-weight: bold;
    font-family: 方正舒体;


    .bar{
        @width:50px;
        width: @width*2;
        height: @width;
        border-radius: 15px;
        border-radius: 15px;
        box-shadow:  5px 5px 10px #393b47, 
                    -5px -5px 10px #454755;
        text-align: center;
        line-height: @width;
        transition: all 0.3s;
        font-size: 1.25rem;

        &:hover{
            cursor: pointer;
            border-radius: 50px;
            background: #d0dbe1;
            color: #08293a;
            box-shadow:  5px 5px 10px #363742, 
                    -5px -5px 10px #484b5a;
        }
    }

}
</style>