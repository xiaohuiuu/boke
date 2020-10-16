<template>
    <div id="blog" @click="click">
        
        <navbar ref="width"></navbar>
        <div class="body">
            <div class="blog">
                <!-- 子路由 -->
                <router-view></router-view>
            </div>
            <div class="other">
                
                <div class="new">
                    <div class="top">热门文章</div>
                    <div class="item" v-for="(item,index) of blogs" :key="index"><span>{{index+1}}</span><span>{{item.title}}</span></div>
                </div>
            </div>
        </div>




        <!-- 鼠标点击  产生随机的小心 -->
        <div class="xin" ref="xin" :style="{top:top + 'px',left:left + 'px',backgroundColor:color,display:display}">
            <div class="xin1" :style="{backgroundColor:color}"></div>
            <div class="xin2" :style="{backgroundColor:color}"></div>
        </div>

        <!-- 时钟 -->
        <clock class="clock" :style="{left:width/2-100 + 'px'}"></clock>

        <!-- 音乐播放器 -->
        <music class="music" :style="{left:width/2-100 + 'px'}"></music>

        <!-- 日历 -->
        <calender :style="{left:width/2-100 + 'px',top:height/2-125 + 'px'}" class="calender"></calender>


    </div>
</template>

<script>
import navbar from './child/navbar'
import {request} from '../../network/request'
import clock from '../../components/clock'
import music from './child/music'
import calender from '../../components/calender'

export default {
    name:'blog',
    components:{
        navbar,
        clock,
        music,
        calender
    },
    data(){
        return{
            top:null,
            left:null,
            color:'#de1c31',
            display:'none',
            blogs:null,
            width:null,
            height:null
            
        }
    },
    methods:{
        //鼠标点击动画
        click(event){
            // console.log(event)
            this.color = '#de1c31'
            this.display = 'block'
            this.top = event.pageY
            this.left = event.pageX
            setTimeout(()=>{
                this.top -=  20
                this.color = '#2bac8f'
            },200)
            setTimeout(()=>{
                this.top -=  20
                this.color = '#1E90FF'
            },400)
            setTimeout(() => {
                this.display = 'none'
            }, 600);
             
        },

        //获取top的blog
        getnewblog(page,pagesize){
            request({
                url:'/select',
                method:'get',
                params:{
                    sql:'select title,blog_id from blog order by read_count desc limit 0,6'
                }
            }).then(
                res =>{
                    this.blogs = res.data
                    // console.log(this.blogs);
                }
            )
        }
    },
    mounted(){
        this.getnewblog(1,6)
        // console.log(this.$refs.width.$el.offsetLeft)
        this.width = this.$refs.width.$el.offsetLeft
        this.height = this.$el.clientHeight
        window.onresize = ()=>{
            this.width = this.$refs.width.$el.offsetLeft
            this.height = this.$el.clientHeight
        }
    },
}
</script>



<style lang="less" scoped>
@keyframes left1{
    from{transform: translateX(-500px);}
    to{transform: translateX(0);}
}
@keyframes scale1{
    from{transform: scale(0.3);}
    to{transform: scale(1.0);}
}
#blog{
    min-height: 100vh;
    background-color: #3f414e;
    background-image: url('../../assets/img/bg2.png');
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    user-select: none;

}

// 鼠标点击动画
.xin{
    @width: 15px;
    @color3: #de1c31;
    width:@width;
    height: @width;
    background-color: @color3;
    transform: rotate(-45deg);
    position: absolute;
    display: none;
    transition: all 0.2s;
    z-index: 10;

    .xin1{
        width: @width;
        height: @width;
        background-color: @color3;
        border-radius: 50%;
        transform: translateX(@width/2)
    }
    .xin2{
        width: @width;
        height: @width;
        background-color: @color3;
        border-radius: 50%;
        transform: translateY(-@width*3/2)
    }
}

.body{
    width: 50%;
    min-width: 600px;
    max-width: 940px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .blog{
        width: 70%;
    }
    .other{
        width: 29%;

        .new{
            width: 90%;
            box-shadow:  7px 7px 1px #3d3f4c, 
                    -7px -7px 1px #414350;
            margin-top: 8px;
            float: right;
            border-radius: 10px;
            transform-style: preserve-3d;
            transition: all 0.2s;
            animation: scale1 0.7s;
            // background-color: rgba(255, 255, 255, 0.1);
            background-image: url('../../assets/img/bg6.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            opacity: 0.7;

            &:hover{
                transform: translateY(-3px);
            }

            .top{
                width: 100%;
                line-height: 40px;
                text-align: center;
                font-weight: bold;
                // color: #d9a40e;
                font-size: 20px;
                
            }

            .item{
                width: 95%;
                color: #1f1c26;
                overflow: hidden;
                line-height: 40px;
                text-overflow: ellipsis;
                white-space: nowrap;

                &:hover{
                    cursor: pointer;
                    text-decoration: underline;
                }
                

                span{
                    margin: 0 15px;
                }
            }
        }
    }
}
//时钟
.clock{
    position: fixed;
    top: 50px;
    // left: 10px;
    animation: left1 0.7s;
}
//index

.first{
    background-color: #55b9f3;
}
.second{
    background-color: #2ce27b;
}
.third{
    background-color: #f55656;
}

//music
.music{
    position: fixed;
    bottom: 50px;
    animation: left1 0.7s;
}
//日历
.calender{
    position: fixed;
    z-index: 10;
    top: 45%;
    animation: left1 0.7s;
}
</style>