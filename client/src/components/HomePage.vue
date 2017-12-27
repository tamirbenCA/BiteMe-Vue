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

    <div class="how-work">
      <img class="how-work-img" src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,w_500/v1514378353/images_lhhfvl.jpg" />
      <div class="details">
        <h1>How it works</h1>
        <br> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </div>

    <div class="our-mission">
      <h1>Our mission</h1>
      <br>
      <h2>Make the world taste better</h2>
      <br>
      <div class="imgs">
        <img src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,w_300/v1514234179/Ben_h2kuyh.png" />
        <img src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,w_300/v1514234189/May_q8y1qc.jpg" />
        <img src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,w_300/v1514379263/Moshiko_nm44c7.png" />

      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'HomePage',
  components: {
    // HeaderBar,
    // TagsBar
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.imgs{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.how-work {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 100px;
}

.details {
  width: 40%;
}

.our-mission{
   margin-bottom: 100px;
}

/* .how-work-img{
 width:600px;
 height:300px;
} */

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
