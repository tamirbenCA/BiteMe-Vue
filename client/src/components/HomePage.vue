<template>
  <div class="box">
    <p class="gt-start">Get Started With Our Top Sellers</p>
    <div class="imgs-btm">
      <div class="animated bounceInRight"> <img class="img-btm" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514928793/pexels-photo-566345_l9uouq.jpg" alt=""></div>
      <div class="animated bounceInRight"><img class="img-btm" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514928793/food-prawn-asian_mbxnej.jpg" alt=""></div>

      <div class="animated bounceInRight">
        <img class="img-btm" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514928793/pexels-photo-76093_xlkq0h.jpg" alt="">
        <img src="../assets/icons8-new-40.png" style="position:relative; top:0;left: -70px;width:40px;height:40px">

      </div>

      <div class="animated bounceInRight">
        <img class="img-btm" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514928795/pexels-photo-265393_c1j4rl.jpg" alt="">
      </div>
      <div class="animated bounceInRight">
        <img class="img-btm" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514928795/sushi-japan-soya-rice-681586_axfola.jpg" alt="">
        <img src="../assets/icons8-new-40.png" style="position:relative; top:0;left: -70px;width:40px;height:40px;">

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomePage',

}
</script>

<style>

.gt-start{
  text-align: left;
  font-size: 30px;
  margin-bottom: 0;
  font-weight: 600;
  margin-left: 50px;
}
.box{
  display: flex;
  flex-direction: column;
  height: 400px;
  margin-top: 150px;
}
.imgs-btm {
  display: flex;
  justify-content: space-around;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 400px;
  cursor: pointer;
}

.img-btm:hover {
  box-shadow: 1px 2px 6px 0px black;
}

.img-btm {
  width: 250px;
  height: 250px;
  border-radius: 125px;
  margin-left: 20px;
}



h1 {
  font-size: 25px;
  font-weight: bold;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  justify-content: space-around;
  margin: auto;
  width: 100%;
  margin-top: 30px;
}

img {
  height: 400px;
  width: 1150px;
}

slide {
  height: 100px;
  width: 900px;
}

.msg {
  background-color: lightgray;
  color: #4a4848;
  text-align: left;
  line-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 40px;
  align-items: center;
}
</style>
