<template>
  <div class="col-12 col-md-6 col-lg-3 mobile-mb-1">
    <form @submit.prevent="addGroup">
      <div class="tasks-group-content px-2 py-3">
        <div class="add-task-input">
          <div class="d-flex align-items-center">
            <span class="add-more-btn">+</span>
            <input
              type="text"
              name="group-name"
              v-model="name"
              class="fieldset-label"
              placeholder="Create new task group"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Group } from '../models'

export default Vue.extend({
  name: 'NewGroup',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    addGroup () {
      const group = new Group(this.name)

      this.$emit('create', group)
      this.clear()
    },
    clear () {
      this.name = ''
    }
  }
})
</script>
