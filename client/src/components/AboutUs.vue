<template>
  <div class="container">
    <div class="how-work">
      <img class="how-work-img" src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,w_500/v1514378353/images_lhhfvl.jpg" />
      <div class="details">
        <a name="how-it-works">
          <h1>How it works</h1>
        </a>
        <br> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </div>
    <div class="mission">
      <a name="our-mission" id="our-mission">
        <h1>Our mission</h1>
        <br>
         <h2>Make the world taste better</h2>
      </a>

     
      <br>
      <div class="imgs">
        <img class="partner" src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,w_300/v1514234179/Ben_h2kuyh.png" />
        <img class="partner" src="http://res.cloudinary.com/dl58rg6j8/image/upload/v1514704865/FB_IMG_1475170769079_zjibhn.jpg" />
        <!-- <img class="partner" src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,w_300/v1514379263/Moshiko_nm44c7.png" /> -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AboutUs',
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

.partner{
      background-size: cover;
    background-position: center;
    width: 200px;
    height: 200px;
}
.imgs {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.how-work {
  width: 100%;
  max-width: 1000px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 100px;
  border-bottom: 1px solid lightgrey;
}

.details {
  width: 40%;
}

.mission {
  margin-top: -50px;
  margin-bottom: 100px;
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
</style>
