<template>
  <!-- STEPS -->
  <section id="Steps" class="steps-section">
    <carousel
      class="steps-timeline"
      :autoplay="false"
      :nav="false"
      :dots="false"
      :responsive="{0:{items:1,nav:false},600:{items:4}}"
    >
       <!-- <template slot="prev">
        <span class="material-icons navs-carosel prev">keyboard_arrow_left</span>
      </template> -->
      <div class="step">
        <img class="steps-img" src="../../assets/pin.png" alt />
        <h3 class="steps-name">Retro 10/01/2019</h3>
        <p class="steps-description"></p>
      </div>

      <div class="step">
        <img class="steps-img" src="../../assets/pin.png" alt />
        <h3 class="steps-name">Retro 10/01/2019</h3>
        <p class="steps-description"></p>
      </div>

      <div class="step">
        <img class="steps-img" src="../../assets/pin.png" alt />
        <h3 class="steps-name">Retro 10/01/2019</h3>
        <p class="steps-description"></p>
      </div>
      <div class="step">
        <img class="steps-img" src="../../assets/pin.png" alt />
        <h3 class="steps-name">Retro 10/01/2019</h3>
        <p class="steps-description"></p>
      </div>
     <!--  <template slot="next">
        <span class="material-icons navs-carosel next">keyboard_arrow_right</span>
      </template> -->
    </carousel>
    <!-- /.steps-timeline -->
  </section>
</template>
<script>
import carousel from "vue-owl-carousel";
import "./TimeLine.scss"
export default {
  name: "Timeline",
  components: { carousel }
};
</script>
