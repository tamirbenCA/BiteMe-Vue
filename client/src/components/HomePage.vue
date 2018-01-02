<template>
  <div class="container">
    <div class="msg">
      <h1>HOME COOKED</h1>
      <h1>HEALTHY MEALS</h1>
      <h1>DELIVERED TO YOU</h1>
    </div>
    <div class="frnt-img">
      <img src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514918245/food-eating-potatoes-beer-8313_xwqvz3.jpg" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomePage',

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
  justify-content: space-around;
  margin: auto;
  width: 72%;
      margin-top: 30px;

}

/* img{
  width:100%;
} */

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
