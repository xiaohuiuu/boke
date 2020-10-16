<template>
    <div class="music">
        <div class="name" v-if="musiclist">{{musiclist[nowplay].name}}</div>
        <div class="control">
            <div @click="prv"><img src="../../../assets/img/music/上一曲.png" alt=""></div>
            <div @click="playclick">
                <div v-if="play"><img src="../../../assets/img/music/暂停.png" alt=""></div>
                <div v-else><img src="../../../assets/img/music/播放.png" alt=""></div>
            </div>
            <div @click="next"><img src="../../../assets/img/music/下一曲.png" alt=""></div>
            <div @click="show_list"><img src="../../../assets/img/music/列表.png" alt=""></div>
            <div class="volume" @click="volclick">
                <img src="../../../assets/img/music/音量.png" alt="">
        <!-- 调节音量 -->
                <div class="volume_box" ref="volume" @click="set_volume">
                    <div :style="{height:volheight * 50 +'px'}"></div>
                </div>
            </div>
        </div>

        <!-- 音频 -->
        <audio :src="musurl" ref="music" @ended="next"></audio>

        <!-- 歌曲图像 -->
        <div class="img" v-if="musiclist">
            <img :src="musiclist[nowplay].img_url" alt="">
        </div>

        <!-- 进度条 -->
        <div class="progress" @click="pro_click">
            <div class="pro" :style="{width:prowidth + 'px'}"></div>
        </div>

        <!-- 播放列表 -->
        <div class="music_list" v-if="isshow">
            <div class="item" v-for="(item,index) of musiclist" @click="list_item_click(index)" :key="index">
                <div class="item_play" v-if="nowplay === index"><img src="../../../assets/img/music/播放2.png" alt=""></div>
                <div class="item_name" :style="isactive(index)">{{item.name}}</div>
                <div class="item_singer" :style="isactive(index)">{{item.singer}}</div>
            </div>
        </div>

    </div>
</template>

<script>
import {request} from '../../../network/request'
export default {
    name:'music',
    data(){
        return{
            play: false,
            musurl: 'https://music.163.com/song/media/outer/url?id=490602392.mp3',
            musiclist:null,  //音乐列表
            nowplay:0,       //当前 音乐 索引
            // isend:null,
            isshow:false,    //控制 音乐列表 是否显示
            prowidth:1,      //当前音乐播放进度条
            nowtime:null,    //有音乐播放当前时间
            volheight:0.2,   //音量大小
            volisshow:false,  //控制 音量显示
        }
    },
    computed:{
        
    },
    methods:{
        isplay(){
            if(this.play === true){
                this.$refs.music.play()
            }else{
                this.$refs.music.pause()
            }
        },
        isactive(index){
            return this.nowplay === index ? {color: '#2bac8f'} : {}
        },
        playclick(){
            this.play = !this.play
            this.isplay()
        },
        prv(){
            if(this.nowplay === 0){
                this.nowplay = this.musiclist.length - 1

            }else{
                this.nowplay--
            }
            this.musurl = this.musiclist[this.nowplay].url
        },
        next(){
            if(this.nowplay === this.musiclist.length-1){
                this.nowplay = 0
            }else{
                this.nowplay++
            }
            this.musurl = this.musiclist[this.nowplay].url
        },
        show_list(){
            this.isshow = !this.isshow
        },
        list_item_click(index){
            this.nowplay = index
            // console.log(this.nowplay)
            this.musurl = this.musiclist[this.nowplay].url
        },
        //点击进度条 调整歌曲 时间
        pro_click(event){
            console.log(event.offsetX)
            this.$refs.music.currentTime = this.$refs.music.duration  * event.offsetX / 200
            this.prowidth = event.offsetX
        },
        //显示调节音量
        volclick(){
            this.volisshow = !this.volisshow
            if(this.volisshow){
                this.$refs.volume.style.display = 'block'
            }else{
                this.$refs.volume.style.display = 'none'
            }
        },
        //设置音量大小
        set_volume(event){
            // console.log(event.offsetY)
            this.volheight = (50 - event.offsetY) / 50
            this.$refs.music.volume = this.volheight
            console.log(this.volheight)
        }

    },
    created(){
        request({ 
            url:'select',
            params:{
                sql:'select * from music'
            }
        }).then((res)=>{
            this.musurl = res.data[0].url
            this.musiclist = res.data
            // console.log(this.musiclist)
        })
    },
    mounted(){
        // console.log(this.$refs.music)
        this.$refs.music.volume = this.volheight
        this.isend = this.$refs.music.ended
        setTimeout(() => {
            setInterval(()=>{
            this.nowtime = this.$refs.music.currentTime
            },1000)
        }, 500);
        
        
    },
    watch:{
        nowplay(newold){
            this.$refs.music.load()
            this.play = true
            setTimeout(()=>{
                this.$refs.music.play()
            },500)
        },
        nowtime(newtime){
            // console.log(newtime)
            // console.log(this.prowidth)
            // console.log(this.$refs.music.duration)
            this.prowidth = (newtime / this.$refs.music.duration).toFixed(2) * 200
            
        }

    }
}
</script>


<style lang="less" scoped>
@keyframes donghua1 {
    0%{transform: rotateX(180deg) translateX(-30px);opacity: 0;}
    40%{transform: rotateX(-30deg);}
    80%{transform: rotateX(30deg);}
    100%{transform: rotateX(0) translateX(0);opacity: 1;}
}
@keyframes donghua2{
    from{height: 0;}
    to{height: 200px;}
}
.music{
    color: white;
    width: 200px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    // text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: relative;

    .name{
        width: 75%;
        font-size: 12px;
        text-align: center;
        overflow: hidden;
        height: 52%;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .control{
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-direction: row;

            div{
            width: 15px;
            height: 15px;
            &:hover{
                cursor: pointer;
                }


            img{
                width: 100%;
                }
            }
            //音量
            .volume{
                .volume_box{
                    width: 5px;
                    height: 50px;
                    background-color: rgba(255, 255, 255, 0.9);
                    position: absolute;
                    top: -25px;
                    left: 178px;
                    display: none;

                    div{
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        background: linear-gradient(#2bac8f,#d79914);
                    }
                }
            }
    }
    
    &:hover{
        //鼠标enter 显示 歌曲图片 和 进度条
        .img{
            display: block;
            animation: donghua1 1s;
        }
    }

    .img{
        width: 50px;
        position: absolute;
        height: 50px;
        background-color: #fff;
        left: -55px;
        border-radius: 50%;
        border: 1px solid #fff;
        overflow: hidden;
        display: none;

        img{
            width: 100%;
        }
    }
    .progress{
        position: absolute;
        width: 200px;
        height: 3px;
        background: #fff;
        top: 60px;

        &:hover{
            cursor: pointer;
        }

        .pro{
            height: 100%;
            background: linear-gradient(to right,#2bac8f,#3678e2);
        }
    }
    .music_list{
        position: absolute;
        width: 200px;
        height: 200px;
        background-color: rgba(255,255,255,0.1);
        top: -208px;
        overflow: auto;
        animation: donghua1 1s;

        .item{
            width: 90%;
            margin: 0 auto;
            font-size: 12px;
            line-height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            transition: all 0.3s;
            
            .item_play{
                width: 12px;
                height: 12px;
                transition: all 0.3s;

                img{
                    width: 90%;
                }
            }
            .item_name{
                width: 50%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                transition: all 0.3s;
            }
            .item_singer{
                width: 30%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                transition: all 1s;
            }

            &:hover{
                cursor: pointer;
            }
        }
    }
}
</style>