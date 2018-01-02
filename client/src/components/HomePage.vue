<template>
  <div class="container">
    <div class="top-page">
      <carousel>
        <slide>
          <img src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514884248/pexels-photo-209459_azskkd.jpg" alt="">
        </slide>
          <slide>
          <img src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514884229/meat-vegetables-gemuesepiess-mushrooms-111131_d18bzi.jpg" alt="">
        </slide>
          <slide>
          <img src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514884227/food-dinner-lemon-rice_jzhqvv.jpg" alt="">
        </slide>
        <slide>
          <img src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514884750/pexels-photo-103886_apbffm.jpg" alt="">
        </slide>
        <slide>
          <img src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514884813/pexels-photo-691114_xs5kjf.jpg" alt="">
        </slide>
      </carousel>
      <div class="msg">
        <h1>HOME-COOKED</h1>
        <h1>HEALTHY MEALS</h1>
        <h1>DELIVERED TO YOU</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'HomePage',
  components: {
    Carousel,
    Slide
  }
}
</script>

<style>
h1 {
  font-size: 25px;
  font-weight: bold;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 50px;
}

.top-page {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1050px;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 100px;
  box-shadow: 1px 2px 6px 0px black;
}

slide{
  height:100px;
  width:900px;
}

img{
      height: 300px;

}
.msg {
  background-color: lightgray;
  color: #4a4848;
  text-align: left;
  line-height: 50px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* padding-left: 5px; */
}
</style>
