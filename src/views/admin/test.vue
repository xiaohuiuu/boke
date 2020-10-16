<template>
    <div id="editor">
        <div class="title">
            <input type="text" placeholder="请输入标题" class="input" v-model="title">
            <div class="detail">
                <span>选择标签</span>
                <span>
                    <input type="radio" id="原创" value="原创" v-model="label">原创
                    <input type="radio" id="前端" value="前端" v-model="label">前端
                    <input type="radio" id="面试" value="面试" v-model="label">面试
                    <input type="radio" id="后端" value="后端" v-model="label">后端
                </span>
                <span>
                    作者：<input type="text" placeholder="请输入作者" class="author" v-model="author">
                </span>
            </div>
        </div>
        <div class="editor" ref="editor"></div>
            
        <div class="btnbox">
            <div class="submit" @click="clickbtn">发布</div>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'
import {request} from '../../network/request'

export default {
    name:'test',
    data(){
        return{
            editor:null,
            label:null,
            content:null,
            author:null,
            title:null,
        }
    },
    methods:{
        clickbtn(){
            this.content = this.editor.$textElem[0].innerHTML
            if(this.title ===null || this.author === null || this.content === null || this.label === null){
                let body = [this.title,this.author,this.content,this.label]
                let body1 = ['标题','作者','内容','标签']
                let alert1 = ''
                for(let i=0;i<body.length;i++){
                    if(body[i] === null){
                        alert1 += body1[i] + ' '
                    }
                }
                alert('请填写' + ' ' + alert1)
                alert1 = ''
                
            }else{
                request({
                    url:'add',
                    method:'post',
                    params:{
                        title:  this.title,
                        author: this.author,
                        label: this.label,
                        content: this.content,
                    }
                }).then(res =>{
                    console.log(res)
                    if(res.status === 200)[
                        alert('success!')
                    ]

                })
            }
        }
    },
    mounted(){
        this.editor = new E(this.$refs.editor)
        this.editor.create()
    }
}
</script>

<style lang="less" scoped>
@width:900px;
.opacty{
    background-color: #fff;
    opacity: 0.7;
    margin-bottom: 20px;
}
#editor{
    min-height: 100vh;
    background-image: url('../../assets/img/bg2.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    user-select: none;

}
.editor{
    max-width: 900px;
    margin: 0 auto;
    .opacty();
}
.title{
    position: relative;
    margin: 0 auto;
    width: @width;
    height: 101px;
    .opacty();

    .detail{
        position: absolute;
        bottom: 0;
        height: 50px;
    }

    .input{
        width:99.5%;
        height: 50px;
        font-size: 1.5rem;
        outline-style: none;
        border: none;

        &:focus{
                border-bottom: 2px solid #35a4e3;
            }
    }
    span{
        line-height: 50px;
        margin: 0 20px;

        .author{
            outline-style: none;
            height: 25px;
            border: none;
            font-size: 1rem;

            &:focus{
                border-bottom: 2px solid #35a4e3;
            }
        }
    }

}
.btnbox{
    width: @width;
    height: 100px;
    margin: 0 auto;

    .submit{
        width: 100px;
        height: 50px;
        background-color: #116392;
        opacity: 0.7;
        border-radius: 10px;
        text-align: center;
        line-height: 50px;
        font-family: 华文行楷;
        font-size: 1.5rem;
        transition: all 0.5s;
        float: right;
        &:hover{
            background-color: #55b9f3;
            cursor: pointer;
        }
    }
}
</style>