<template>
  <div class="row groups-container" v-if="project">
    <task-group
      v-for="(group, index) in project.groups"
      :key="index"
      :group="group"
      :members="project.members"
      @editTask="editTask"
    ></task-group>
    <new-group @create="addGroup"></new-group>

    <b-modal
      id="editTaskModal"
      header-class="bg-white mb-3 align-items-center border-0"
      body-class="bg-transparent my-3 edit-task-modal-content px-0"
      content-class="bg-transparent border-0"
      size="lg"
      hide-footer
    >
      <template v-slot:modal-header="{ close }">
        <h6
          class="modal-title edit-task-modal-title"
          id="editTaskModalLabel"
        >{{ project.name }} > {{ selectedGroup.title }} > {{ editingTask.title }}</h6>
        <button
          @click="close()"
          type="button"
          class="close close-edit-task-header"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span class="add-more-btn border-0 close-edit-task-modal">+</span>
        </button>
      </template>

      <template v-slot:default="{ }">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-6">
            <div class="bg-white task-edit-container p-3 mobile-mb-1">
              <div class="form-group">
                <label for="TaskTitle">Title</label>
                <input type="text" v-model="editingTask.title" class="form-control" id="TaskTitle" />
              </div>
              <div class="row">
                <div class="col-12 col-md-6 col-lg-6 form-group">
                  <label for="TaskStart">Start date</label>
                  <input
                    v-model="editingTask.start"
                    type="date"
                    class="form-control"
                    id="TaskStart"
                  />
                </div>
                <div class="col-12 col-md-6 col-lg-6 form-group">
                  <label for="TaskDue">Due date</label>
                  <input v-model="editingTask.due" type="date" class="form-control" id="TaskDue" />
                </div>
              </div>
              <div class="form-group">
                <label for="TaskMember">Assignee</label>
                <v-select
                  v-model="editingTask.assignees"
                  :options="selectedGroup.members"
                  taggable
                  multiple
                  label="name"
                  id="TaskMember"
                ></v-select>
              </div>
              <div class="form-group">
                <label for="taskStatus">Status</label>
                <select v-model="editingTask.status" class="form-control" id="taskStatus">
                  <option value="New">New</option>
                  <option value="In progress">In progress</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Archieved">Archieved</option>
                </select>
              </div>
            </div>
            <button
              @click="saveTask"
              type="button"
              class="btn btn-success mt-3 web-only"
            >Save changes</button>
          </div>
          <div class="col-12 col-md-6 col-lg-6">
            <div class="bg-white task-edit-container p-3">
              <div class="form-group">
                <label for="taskDescription">Description</label>
                <textarea
                  v-model="editingTask.description"
                  name="name"
                  rows="2"
                  cols="10"
                  class="form-control"
                  id="taskDescription"
                ></textarea>
              </div>
            </div>
            <div class="bg-white task-edit-container p-3 mt-3">
              <div class="form-group">
                <label for="taskComments">Comments</label>
                <textarea
                  v-model="editingTask.comments"
                  name="name"
                  rows="2"
                  cols="10"
                  class="form-control"
                  id="taskComments"
                ></textarea>
              </div>
            </div>
            <div class="bg-white task-edit-container p-3 mt-3">
              <div class="form-group">
                <label for="taskTags">Custom tags</label>
                <v-select id="taskTags" v-model="editingTask.tags" taggable multiple push-tags></v-select>
              </div>
            </div>
            <button
              @click="saveTask"
              type="button"
              class="btn btn-success mt-3 mobile-only"
            >Save changes</button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import NewGroup from '@/components/NewGroup.vue'
import TaskGroup from '@/components/TaskGroup.vue'
import { Group, Project, Task } from '../models'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = (): Record<string, any> => {
  return {
    editingTask: null,
    selectedGroup: null
  }
}

export default Vue.extend({
  name: 'ProjectView',
  props: {
    id: String
  },
  components: {
    NewGroup,
    TaskGroup
  },
  data,
  computed: {
    ...mapGetters(['getById']),
    project (): Project {
      return this.getById(this.id)
    }
  },
  methods: {
    ...mapActions(['persistData', 'saveProject']),
    addGroup (group: Group) {
      this.project.addGroup(group)

      this.persistData()
    },
    editTask (group: Group, task: Task) {
      this.editingTask = task
      this.selectedGroup = group

      this.$bvModal.show('editTaskModal')
    },
    async saveTask () {
      // console.log('Call to save task')
      const index = this.selectedGroup.tasks.findIndex(item => item.id === this.editingTask.id)

      if (index > -1) {
        this.$set(this.selectedGroup.tasks, index, this.editingTask)
      }
      await this.saveProject(this.project)
      this.$nextTick(() => this.persistData())
      this.$bvModal.hide('editTaskModal')
    }
  }
})
</script>

<style lang="scss" scoped>
  .groups-container {
    display: flex;
    flex-wrap: nowrap;
    // overflow-x: auto;
    padding-bottom: 4rem;
  }
</style>
