<template>
  <div class="col-12 col-md-6 col-lg-3 mobile-mb-1 mb-4">
    <router-link :to="{name: 'project-details', params: {id: project.id}}" class="card card-items">
      <h5 class="card-header text-elipsis-ovreflow border-0">{{ project.name }}</h5>
      <div class="card-body px-0 border-top-1">
        <div class="item-cell">
          <div class="cell-content d-flex align-items-center">
            <span class="cell-label mr-1">Status:</span>
            <div class="fieldset status-indicator-dropdown">
              <div
                class="select-value-item color-dark has-color-tag"
                style="background-color: #ffc107;"
              >{{ project.status }}</div>
            </div>
          </div>
        </div>
        <div class="item-cell d-flex">
          <div class="cell-content d-flex align-items-center">
            <span class="cell-label mr-2">Members:</span>
            <span class="mr-2 text-primary font-12" v-if="!project.members.length">No members</span>
          </div>
          <div class="image-badges d-flex">
            <div
              class="image-badge extra-small has-value"
              v-for="(member, index) in project.members"
              :key="index"
            >
              <div class="badge-content">
                <span class="badge-initials">{{member.titled}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item-cell">
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped"
              :class="progressCls"
              role="progressbar"
              :style="{width: project.progress + '%'}"
              :aria-valuenow="project.progress"
              aria-valuemin="0"
              aria-valuemax="100"
            >{{ project.progress }}%</div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Project } from '../models'

export default Vue.extend({
  name: 'Project',
  props: {
    project: Project
  },
  data () {
    return {
      progressCls: {
        'bg-danger': this.project.progress <= 30,
        'bg-info': this.project.progress <= 70,
        'bg-primary': this.project.progress <= 99,
        'bg-success': this.project.progress === 100
      }
    }
  }
})
</script>
