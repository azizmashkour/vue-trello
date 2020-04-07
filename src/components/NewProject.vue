<template>
  <transition name="bounce-in-left">
    <!-- <div class="linear-activity" v-if="loader">
      <div class="indeterminate"></div>
    </div> -->
    <div class="new-project-sidebar" v-show="show">
      <div class="sidebar-closer-btn" @click="close">
        <div class="sidebar-closer-rotate-left">
          <div class="sidebar-closer-rotate-right"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-12">
          <div class="sidebar-header">Create new project</div>
          <div class="sidebar-content">
            <form @submit.prevent="saveProject">
              <div class="form-group">
                <label for="ProjectName">Project name</label>
                <input v-model="name" type="text" class="form-control" id="ProjectName" :class="{ 'is-invalid': submitted && $v.name.$error }"/>
                <div v-if="submitted && !$v.name.required" class="invalid-feedback">Project name is required(4 characters minimum)</div>
              </div>
              <div class="form-group">
                <label for="ProjectMembers">Members</label>
                <v-select id="ProjectMembers" v-model="members" taggable multiple push-tags></v-select>
              </div>
              <button type="submit" class="btn btn-success btn-block btn-sm mt-5">Save project</button>
            </form>
          </div>
          <div class="sidebar-footer"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import { Project } from '../models'

export default Vue.extend({
  name: 'NewProject',
  props: {
    show: Boolean
  },
  data () {
    return {
      name: '',
      members: [],
      progress: 0,
      closed: true,
      loader: false,
      submitted: false
    }
  },
  validations: {
    name: { required, minLength: minLength(4) }
  },
  methods: {
    ...mapActions(['createProject', 'persistData']),
    saveProject () {
      this.loader = true
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      const project = new Project(this.name, this.progress, this.members)
      this.createProject(project)
        .then(() => {
          this.resetForm()
          this.close()
          this.persistData()
          this.loader = false
        })
    },
    close () {
      this.$emit('close')
    },
    resetForm () {
      this.name = ''
      this.members = []
    }
  }
})
</script>
