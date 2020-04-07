<template>
  <main id="app" class="global-easilyer-container">
    <!-- <div class="linear-activity">
        <div class="indeterminate"></div>
    </div>-->
    <div class="p-5">
      <div class="row" v-show="showTitle">
        <div class="col-md-12 col-12 mb-5">
          <h2 class="task-managment">Tasks managment</h2>
        </div>
      </div>

      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      showTitle: false
    }
  },
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.hideTitle)) {
        this.showTitle = false
      } else {
        this.showTitle = true
      }

      next()
    })

    this.$store.dispatch('loadProjects')
  }

})
</script>

<style lang="scss">
  @import "~bootstrap";
  @import "~bootstrap-vue";
  @import "~vue-select/src/scss/vue-select.scss";
  @import "./scss/responsive";
  @import "./scss/styles";
  @import "./scss/animations";
</style>
