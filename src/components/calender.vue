<template>
    <div class="calender">
        <div class="week">
            <ul>
                <li>日</li>
                <li>一<li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
            </ul>
        </div>
        {{days}}
    </div>
</template>


<script>
export default {
    name:'calender',
    data(){
        return{
            date:null,
            days:null
        }
    },
    created(){
        let date = new Date()
        let y = date.getFullYear()
        let m = date.getMonth()
        this.days = new Date(y,m,1).getDay()

        
    },
    methods:{

    },
    mounted(){

    },
    computed:{

    },
    watch:{

    }
}
</script>


<style lang="less" scoped>
.calender{
    width: 200px;
    height: 250px;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow:  6px 6px 12px #242424, 
                -6px -6px 12px #2e2e2e;
}
.week{
    width: 90%;
    margin: 2px auto;

    ul{
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;

        li{
            display: block;
        }
    }
}
</style>