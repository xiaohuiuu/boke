<template>
    <div id="welcome">
        <div class="box">
			<div class="big" @click="btnclick">
				<div class="big_top"></div>
				<div class="big_bottom"></div>
				<div class="big_before"></div>
				<div class="big_right"></div>
				<div class="big_behand"></div>
				<div class="big_left"></div>
			</div>
		</div>
    </div>
</template>

<script>
export default {
    name:'welcome',
    methods:{
        btnclick(){
            this.$router.push('/blog')
        }
    }
}
</script>



<style lang="less" scoped>
#welcome{
    height: 100vh;
    min-width: 630px;
    // background-image: url('../assets/img/bg1.jpg');
    // background-size: cover;
    // background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    

    &::before{
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width:100vw;
        height: 100vh;
        background-image: url('../assets/img/bgnew.jpg') ;
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
        z-index: -1;
        filter: blur(5px)
    }
}
.box{
	width: 300px;
	height: 300px;
	// position:absolute;
	// top: 30%;
	// left: 43%;
	/* animation: donghua1 5s infinite linear; */
}
.big{
	/* transform: rotateY(15deg) rotateX(75deg); */
	width: 300px;
	height: 300px;
	transform-style: preserve-3d;
	transform-origin: 50% 50%;
	animation: donghua1 15s linear infinite;
	/* perspective: 1000px; */
}
.big:hover{
	cursor: pointer;
	.big_behand{
	transform: translateZ(-200px);
	background-image: url('../assets/img/welcome/11.jpg');
}
	.big_before{
		transform: translateZ(200px);
		background-image: url('../assets/img/welcome/22.jpg');
	}
	.big_left{
		transform: rotateY(-90deg) translateZ(200px) ;
		background-image: url('../assets/img/welcome/33.jpg');
	}
	.big_right{	
		transform: rotateY(90deg) translateZ(200px);
		background-image: url('../assets/img/welcome/44.jpg');
	}
	.big_top{
		transform: rotateX(-90deg) translatez(200px) ;
		background-image: url('../assets/img/welcome/55.jpg');
	}
	.big_bottom{
		transform: rotateX(90deg) translateZ(200px) ;
		background-image: url('../assets/img/welcome/66.jpg');
	}
}
.big_top,.big_before,.big_behand,.big_bottom,.big_left,.big_right{
	width: 300px;
	height: 300px;
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0.85;
	background-size: cover;
	transition: all 0.5s;
}
.big_behand{
	transform: translateZ(-150px);
	background-image: url('../assets/img/welcome/11.jpg');
}
.big_before{
	transform: translateZ(150px);
	background-image: url('../assets/img/welcome/22.jpg');
}
.big_left{
	transform: rotateY(-90deg) translateZ(150px) ;
	background-image: url('../assets/img/welcome/33.jpg');
}
.big_right{	
	transform: rotateY(90deg) translateZ(150px);
	background-image: url('../assets/img/welcome/44.jpg');
}
.big_top{
	transform: rotateX(-90deg) translatez(150px) ;
	background-image: url('../assets/img/welcome/55.jpg');
}
.big_bottom{
	transform: rotateX(90deg) translateZ(150px) ;
	background-image: url('../assets/img/welcome/66.jpg');
}
@keyframes donghua1{
	0%{transform: rotateY(0) rotateX(0);}
	100%{transform: rotateY(360deg) rotateX(360deg);}
}
</style>