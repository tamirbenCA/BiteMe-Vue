<template>
  <section class="fr-page-cnt">
    <div class="box" v-if="pageReady">
      <p class="gt-start">Get Started With Our Best Sellers</p>
      <div class="imgs-container">
        <div class="imgs-btm" v-for="(meal, idx) in meals" :key="idx">
          <div class="animated bounceInRight">
            <img class="img-btm" @click="showDetails(meal)" :src="meal.imgUrl" alt="">
            <div v-if="meal.isNew === true" class="icon-box">
              <div class="white-bckg"></div>
              <img class="new-icn" src="../assets/icons8-new-96.png">
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>


import { LOAD_TOP_MEALS } from '../modules/ShopModule.js';

export default {
  name: 'HomePage',
  data() {
    return {
      pageReady: false
    }
  },
  created() {
    this.$store.dispatch({ type: LOAD_TOP_MEALS })
      .then(data => {
        this.pageReady = true;
      })

  },
  computed: {
    meals() {
      return this.$store.getters.items
    }
  },
  methods: {
    showDetails(meal) {
      this.$router.push('/itemdetails/' + meal._id);
    }
  }

}
</script>

<style>
.new-icn {
  position: relative;
  top: -270px;
  right: -100px;
  width: 80px;
  height: 80px;
  transform: rotateZ(20deg);
  z-index: 999;
}

.white-bckg {
  background-color: white;
  top: -212px;
  right: -210px;
  height: 40px;
  width: 51px;
  position: relative;
}

.gt-start {
  text-align: left;
  font-size: 30px;
  margin-bottom: 0;
  color: #322f2f;
}

.box {
  display: flex;
  flex-direction: column;
  height: 500px;
  justify-content: space-between;
  margin-top: 50px;
}

.fr-page-cnt {
  display: flex;
  justify-content: center;
}

.imgs-btm {

  cursor: pointer;
}

.imgs-container {
  display: flex;
  flex-direction: row;
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


@media screen and (max-width: 480px) {

  .imgs-container {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
   
  }
  .gt-start{
        margin-left: 9px;

  }
  .box{
    height: 100%;
  }

  .imgs-btm{
    height:253px;
    margin-bottom: 50px;
  }
}
</style>
