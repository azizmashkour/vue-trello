<template>
  <div class="col-12 col-md-6 col-lg-3 mobile-mb-1 px-1 flex-basis-4">
    <div class="tasks-group-content px-2 py-3">
      <h6 class="mb-3 text-elipsis-ovreflow">{{ group.title }}</h6>
      <form class="add-task-input mb-3" @submit.prevent="addTask">
        <div class="d-flex align-items-center">
          <span class="add-more-btn">+</span>
          <input
            v-model="taskTitle"
            type="text"
            class="fieldset-label"
            :class="{ 'is-invalid': submitted && $v.taskTitle.$error }"
          />
          <b-dropdown
            :id="`dropdown-${group.id}_form`"
            size="sm"
            no-caret
            variant="transparent"
            ref="dropdown"
            class="m-2"
            menu-class="dropdown-menu-right-zero"
          >
            <template v-slot:button-content>
              <span class="more-details more-details-rotated">...</span>
            </template>
            <b-dropdown-header variant="danger" v-if="!taskTitle.length">Task tilte is required!!!</b-dropdown-header>
            <b-dropdown-form form-class="px-2" @submit.prevent :disabled="!taskTitle.length">
              <b-form-group label="Description" :label-for="`description-${group.id}`">
                <b-form-textarea
                  v-model="taskDescription"
                  :id="`description-${group.id}`"
                  size="sm"
                  rows="2"
                  placeholder="Task description"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group label="Start Date" :label-for="`start-date-${group.id}`">
                <b-form-input
                  v-model="taskStartDate"
                  :id="`start-date-${group.id}`"
                  size="sm"
                  placeholder="Choose Date"
                  type="date"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Due Date" :label-for="`due-date-${group.id}`">
                <b-form-input
                  :id="`due-date-${group.id}`"
                  v-model="taskDueDate"
                  size="sm"
                  placeholder="Choose Date"
                  type="date"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Assignees" :label-for="`members-${group.id}`">
                <v-select
                  :id="`members-${group.id}`"
                  v-model="assignees"
                  :options="members"
                  label="name"
                  multiple
                ></v-select>
              </b-form-group>
            </b-dropdown-form>
          </b-dropdown>
        </div>
        <div
          v-if="submitted && !$v.taskTitle.required"
          class="invalid-feedback"
        >Task title is required(12 characters minimum)</div>
      </form>
      <div class="card-overflow-hidden">
        <draggable :list="group.tasks" :clone="cloneTask" group="tasks" @end="dragEnded">
          <task
            @duplicate="duplicateTask"
            v-for="(task, index) in group.tasks"
            :key="index"
            :task="task"
            @edit="editTask"
            @delete="deleteTask"
          ></task>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import Task from '@/components/Task.vue'
import draggable from 'vuedraggable'
import { Group, Task as TaskModel } from '../models'

export default Vue.extend({
  name: 'TaskGroup',
  components: {
    Task,
    draggable
  },
  props: {
    group: Group,
    members: Array
  },
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      taskStartDate: '',
      taskDueDate: '',
      assignees: [],
      submitted: false
    }
  },
  validations: {
    taskTitle: { required, minLength: minLength(12) }
  },
  methods: {
    ...mapActions(['persistData']),
    addTask () {
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      const task = new TaskModel(this.taskTitle, {
        description: this.taskDescription,
        task: this.taskStartDate,
        due: this.taskDueDate
      })

      if (this.assignees.length) {
        task.assignees = this.assignees
      }

      this.group.addTask(task)
      this.clear()
      this.persistData()
    },
    clear () {
      this.taskTitle = ''
      this.taskDescription = ''
      this.taskStartDate = ''
      this.taskDueDate = ''
      this.assignees = []
    },
    cloneTask (task) {
      return new TaskModel(task.title, task)
    },
    duplicateTask (task: TaskModel) {
      this.group.addTask(task)
      this.persistData()
    },
    dragEnded () {
      this.persistData()
    },
    editTask (task: TaskModel) {
      this.$emit('editTask', this.group, task)
    },
    deleteTask (task: TaskModel) {
      const index = this.group.tasks.findIndex(item => item.id === task.id)

      if (index > -1) {
        this.group.tasks.splice(index, 1)
        this.persistData()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .flex-basis-4 {
    flex-basis: 24%;
  }
</style>
