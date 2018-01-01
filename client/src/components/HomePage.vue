<template>
  <div class="container">
    <div class="top-page">
      <img class="front-img" src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,h_500,w_900/v1514534807/mafrum_650_grgpwx.jpg" />
      <div class="msg">
        <h1>HOME-COOKED</h1>
        <h1>HEALTHY MEALS</h1>
        <h1>DELIVERED TO YOU</h1>
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
  max-width: 1150px;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 100px;
  box-shadow: 1px 2px 6px 0px black;
}


.msg {
  background-color: lightgray;
  color: #4a4848;
  text-align: left;
  line-height: 50px;
  padding: 10px;
}

</style>
