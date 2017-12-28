<template>
  <div class="container">
    <div class="top-page">
      <img class="front-img" src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,w_1000/v1514370410/freshly_press_release_photo3_99980_yvwi41.jpg" />
      <div class="msg">
        <h1>CHEF-COOKED</h1>
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
}

.top-page {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 100px;
}


.msg {
  background-color: lightgray;
  color: #4a4848;
  text-align: left;
  line-height: 50px;
  padding: 10px;
}
</style>
