<template>
    <div id="blogbody">
        <div class="item" v-for="(item,index) of blogs" :key="index">
            <div class="title">
                <span>【{{item.label}}】</span><span class="title_1" @click="itemclick(item.blog_id)">{{item.title}}</span>
            </div>
            <div class="detail">
                <span>作者：{{item.author}}</span><span>发布于：{{item.create_time}}</span>
            </div>
            <div class="body" v-html="item.body" style="{color: #d9a40e}"></div>
        </div>
    </div>
</template>

<script>
import {request} from '../../../network/request'
export default {
    name:'blogbody',
    data(){
        return{
            blogs:null,
            page:1,
            pagesize:10,
        }
    },
    methods:{
        getblogs(page,pagesize){
            request({
                url:'/blog',
                method:'get',
                params:{
                    page:page,
                    pagesize:pagesize
                }
            }).then(res => {
                this.blogs = res.data
            })
        },
        // 跳转详情页
        itemclick(id){
            this.$router.push({
                path:'/blog/detail',
                query:{id:id}
            })
        }
    },
    mounted(){
        this.getblogs(1,10)
    }
}
</script>



<style lang="less" scoped>
@keyframes item{
    0%{transform: scale(0.3);}
    100%{transform: scale(1.0);}
}
#blogbody{
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .item{
        @size:50px;
        width: 90%;
        height: 176px;
        min-height: 170px;
        max-height: 200px;
        border-radius: 14px;
        background: #3f414e;
        
        margin: 25px 0;
        background-image: url('../../../assets/img/bg5.png');
        background-size: cover;
        opacity: 0.7;
        transition: all 0.3s;
        animation: item 0.7s;
        overflow: hidden;

        &:hover{
            transform: translateY(3px);
            box-shadow:  5px 5px 8px #1a1a1a, 
             -5px -5px 8px #232323;
        }

        .title{
            span{
                line-height: @size;
                font-size: 20px;
                margin: 0 10px;
                // color: #d9a40e;
                font-weight: bold;
            }
            .title_1{
                &:hover{
                    color: #2bac8f;
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
        }
        .detail{
            span{
                line-height: @size/2;
                font-size: 16px;
                margin: 0 10px;
                color: #050bad;
            }
        }
        .body{
            margin: 20px 10px;
            height: 62px;
            overflow: hidden;
        }
    }
}
</style>