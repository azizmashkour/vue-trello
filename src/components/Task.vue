<template>
  <div class="card card-items text-dark mb-2">
    <div class="card-body p-2">
      <div class="d-flex">
        <input
          class="styled-checkbox"
          :id="'styled-checkbox-' + task.id"
          type="checkbox"
          v-model="task.checked"
        />
        <label :for="'styled-checkbox-' + task.id"></label>
        <h6 class="card-title mb-1 text-elipsis-ovreflow">{{ task.title }}</h6>
        <div class="btn-group">
          <b-dropdown
            id="dropdown-1"
            no-caret
            size="sm"
            toggle-class="bg-transparent"
            variant="transparent"
          >
            <template v-slot:button-content>
              <span class="more-details">...</span>
            </template>
            <b-dropdown-item @click="edit">Edit</b-dropdown-item>
            <b-dropdown-item @click="remove">Delete</b-dropdown-item>
            <b-dropdown-item @click="duplicate">Duplicate</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <p class="card-text card-due-date mb-1">Due date {{ task.due | date }}</p>
      <a
        href="#"
        v-for="(tag, index) in task.tags"
        :key="index"
        class="btn btn-sm p1 btn-tag text-white mr-1"
        :class="[`btn-${tagColors[index]}`]"
      >{{ tag }}</a>
      <div class="image-badges d-flex py-1">
        <div
          class="image-badge extra-small has-value"
          v-for="(assignee, index) in task.assignees"
          :key="index"
        >
          <div class="badge-content">
            <span class="badge-initials">{{ assignee.titled }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Task } from '../models'

export default Vue.extend({
  name: 'Task',
  props: {
    task: Task
  },
  data () {
    return {
      tagColors: ['primary', 'success', 'warning', 'info', 'secondary', 'light', 'dark', 'danger']
    }
  },
  mounted () {
    this.$watch('task.status', (value) => {
      // console.log('Task status changed', value)
      this.persistData()
    })
  },
  methods: {
    ...mapActions(['persistData']),
    edit () {
      this.$emit('edit', this.task)
    },
    duplicate () {
      this.$emit('duplicate', this.task.clone())
    },
    async remove () {
      const result = await this.$bvModal.msgBoxConfirm('Do you confirm this action ?', { title: 'Delete a task', size: 'sm', centered: true, okVariant: 'danger' })

      if (result) {
        this.$emit('delete', this.task)
      }
    }
  }
})
</script>
