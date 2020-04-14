<template>
  <div class="row">
    <div class="logo-container">
      <div class="logo-part-1"></div>
      <div class="logo-part-2"></div>
      <div class="logo-part-3"></div>
    </div>
    <div class="col-md-10 mx-auto">
      <b-alert show dismissible variant="warning">
        This website will use your cookies to save datas on your local machine. CLick the <b>x</b> button at the top-right of your screen to acceppt the cookies policies and start enjoying 😅.
      </b-alert>
    </div>
    <div class="col-md-12 col-12 mb-5">
      <div class="p-5 text-dark text-center border-radius-6">
        <h4 class="mb-2">Tasker for teams</h4>
        <h1 class="a-better-way animated fadeInUp">A better way to work together</h1>
        <p class="app-desc animated fadeInUp">
          Tasker is an
          <b>Open-source</b> apps that brings teams together to work through problems, move ideas forward, and get updates on your project progress from each other along the way.
        </p>
        <router-link
          to="/projects"
          class="my-5 btn btn-lg btn-outline-primary"
        >Try our live demo now</router-link>
        <div class="container mt-5 pt-5">
          <div class="row">
            <div class="col-md-12 col-12 col-lg-6">
              <div class="desc-container">
                <div class="rounded-border tasks-worldwide">
                  <h2>100k</h2>
                  <p>Tasks worlwide</p>
                </div>
                <div class="rounded-border businesses-companies">
                  <h4>10k</h4>
                  <p>Businesses & Companies</p>
                </div>
                <div class="rounded-border projects-worldwide">
                  <h4>20k</h4>
                  <p>Projects worlwide</p>
                </div>
              </div>
            </div>
            <div class="col-md-12 col-12 col-lg-6">
              <div class="desc-shadow card text-left" style="width: 28rem;">
                <div class="card-body">
                  <p class="card-text">
                    Easily create and manage your project tasks with the largest
                    <b>open-source</b> community
                  </p>
                </div>
              </div>
              <div class="desc-shadow card text-left mt-3" style="width: 25rem;">
                <div class="card-body">
                  <p
                    class="card-text"
                  >From ideas, thinking with a great team to bring your ideas to reality quickly.</p>
                </div>
              </div>
              <div class="desc-shadow card text-left mt-3" style="width: 21rem;">
                <div class="card-body">
                  <p class="card-text">
                    Weither private, small, public and big organization,
                    <b>Tasker</b> is made for you.😅
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 mt-5 pt-5">
              <h1 class="get-started">— Join the millions of teams and companies already using Tasker to share their tasks, work together, and build amazing things.</h1>
              <p class="mt-5"> <a href="https://github.com/azizmashkour/vue-trello" class="text-dark text-unlerline">👉🏼 Check our Open-source code</a> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Landing',
  components: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
  .app-desc {
    padding: 0 20rem !important;
    font-size: 19px;
    line-height: 1.5;
  }
  .rounded-border {
    border-radius: 50%;
    color: #fff;
  }
  .tasks-worldwide {
    background-color: orange;
    width: 15rem;
    height: 15rem;
    text-align: center;
    padding-top: 5rem;
    font-size: 2rem;
  }
  .businesses-companies {
    background-color: #007bff;
    width: 10rem;
    height: 10rem;
    text-align: center;
    padding-top: 3rem;
    margin-left: 18rem;
    margin-top: -10rem;
  }
  .projects-worldwide {
    border-radius: 50%;
    background-color: rebeccapurple;
    width: 7rem;
    height: 7rem;
    text-align: center;
    padding-top: 1.5rem;
    margin-left: 13rem;
  }
  .desc-shadow {
    box-shadow: 0 0 18px 0 rgba(19, 48, 66, 0.07);
    border: 0 !important;
  }
  .a-better-way {
    font-size: 5rem;
    font-weight: 300;
  }
  .get-started {
    font-weight: 300;
  }
  .text-unlerline {
    text-decoration: underline!important;
  }
  .logo-container {
    width: 40px;
    height: 40px;
    display: inline-block;
    transform: rotate(45deg);
  }
  .logo-part-1 {
    width: 20px;
    height: 20px;
    display: inline-block;
    background: black;
  }
  .logo-part-2 {
    width: 20px;
    height: 20px;
    display: inline-block;
    background: #f3a433;
  }
  .logo-part-3 {
    width: 20px;
    height: 20px;
    display: block;
    background: rebeccapurple;
    margin-top: -2px;
  }

</style>
