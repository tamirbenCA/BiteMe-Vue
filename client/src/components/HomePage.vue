<template>
  <!-- <div class="container"> -->
  <!-- <div class="msg">
                <h1>HOME COOKED</h1>
                <h1>HEALTHY MEALS</h1>
                <h1>DELIVERED TO YOU</h1>
              </div> -->
  <!-- <div class="frnt-img">
              <img src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514927973/food-eating-potatoes-beer-8313_xwqvz3.jpg" alt="">
            </div> -->
  <div class="imgs-btm">
    <div class="animated bounceInRight"> <img class="img-btm" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514928793/pexels-photo-566345_l9uouq.jpg" alt=""></div>
<div class="animated bounceInRight"><img class="img-btm" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514928793/food-prawn-asian_mbxnej.jpg" alt=""></div>
    
   <div class="animated bounceInRight"><img class="img-btm" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514928793/pexels-photo-76093_xlkq0h.jpg" alt=""></div>
    

    <div class="animated bounceInRight">
      <img class="img-btm" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514928795/pexels-photo-265393_c1j4rl.jpg" alt="">
      <!-- <i style="position:absolute;font-size:30px;" class="fa fa-user-o" aria-hidden="true"></i> -->
    </div>
    <div class="animated bounceInRight">
      <img class="img-btm" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514928795/sushi-japan-soya-rice-681586_axfola.jpg" alt="">
      <!-- <i style="position:absolute;font-size:30px;" class="fa fa-user-o" aria-hidden="true"></i> -->
    </div>
  </div>

  <!-- </div> -->
</template>

<script>

export default {
  name: 'HomePage',

}
</script>

<style>
.imgs-btm {
  display: flex;
  justify-content: space-around;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.img-btm {
  width: 250px;
  height: 250px;
  border-radius: 125px;
  margin-left: 20px;
}

.img-btm:hover {
  animate: pulse;
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
