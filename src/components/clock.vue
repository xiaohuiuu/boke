<template>
    <div class="clock">
        <span>{{hour}}</span><span> : </span><span>{{minute}}</span> {{second}}
    </div>
</template>

<script>
export default {
    name:'clock',
    data(){
        return{
            hour:null,
            minute:null,
            second:null
        }
    },
    methods:{
        get_time(){
                let date = new Date()
                this.hour = date.getHours()
                if(date.getMinutes() <= 9){
                    this.minute = '0' + date.getMinutes()
                }else{
                    this.minute = date.getMinutes()
                }
                if(date.getSeconds() <= 9){
                    this.second = '0' + date.getSeconds()
                }else{
                    this.second = date.getSeconds()
                }
                
                
        }
    },
    mounted(){
        this.get_time()
        setInterval(this.get_time, 1000);
    }
}
</script>


<style lang="less" scoped>
@width:200px;
.clock{
    width: @width;
    height: 50px;
    border-radius: 15px;
    border-radius: 31px;
    // background: linear-gradient(145deg, #252525, #2c2c2c);
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow:  6px 6px 12px #242424, 
                -6px -6px 12px #2e2e2e;
    text-align: center;
    color: white;

    span{
        line-height: 50px;
        text-align: center;
        font-size: 2rem;
        color: #2bac8f;
    }
}

</style>