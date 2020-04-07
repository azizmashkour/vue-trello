<template>
  <div class="row">
    <div class="col-md-12 col-12">
      <button id="new-project-element"
          data-toggle="popover"
          data-content="Click here to create your new project and esealy assign your team members to your project tasks.😍"
          data-container="body"
          type="button"
          @click="showEditor"
          class="btn btn-outline-dark mb-5">New project
      </button>
    </div>

    <div class="col-md-12 col-12 mb-5" v-if="!projects.length">
        <div class="bg-white p-5 text-dark text-center border-radius-6">
            <h4>No project added yet 😔</h4>
            <p>No projects based on your rules have taken place</p>
        </div>
    </div>

    <project v-for="(project, index) in projects" :project="project" :key="index"></project>

    <new-project :show="openEditor" @close="hideEditor"></new-project>
  </div>
</template>

<script>
// @ is an alias to /src
import Project from '@/components/Project'
import NewProject from '@/components/NewProject'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Project,
    NewProject
  },
  data () {
    return {
      openEditor: false
    }
  },
  computed: {
    ...mapGetters(['projects'])
  },
  methods: {
    showEditor () {
      this.openEditor = true
    },
    hideEditor () {
      this.openEditor = false
    }
  }
}
</script>
