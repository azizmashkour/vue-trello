import Vue from 'vue'
import Vuex from 'vuex'
import { IState } from './types'
import { Project } from '@/models'

Vue.use(Vuex)

const state = (): IState => {
  return {
    projects: []
  }
}

const storageKey = 'myProjects'

export default new Vuex.Store({
  state,
  mutations: {
    setProjects (state, payload: Project[]) {
      state.projects = payload
    },
    addProject (state, payload: Project) {
      state.projects.push(payload)
    },
    updateProject (state, payload: Project) {
      const index = state.projects.findIndex(item => item.id === payload.id)

      if (index > -1) {
        state.projects.splice(index, 1, payload)
      }
    }
  },
  actions: {
    loadProjects ({ commit }) {
      const data = localStorage.getItem(storageKey)

      if (data) {
        const objs: object[] = JSON.parse(data)
        const projects = objs.map((item) => Project.build(item))

        commit('setProjects', projects)
      }
    },
    createProject ({ commit }, payload) {
      commit('addProject', payload)
    },
    saveProject ({ commit }, payload) {
      commit('updateProject', payload)
    },
    persistData ({ state }) {
      const data = state.projects.map(project => project.toJson())

      localStorage.setItem(storageKey, JSON.stringify(data))
    }
  },
  getters: {
    projects (state) {
      return state.projects
    },
    getById (state) {
      return (id: string) => state.projects.find((project) => project.id === id)
    }
  }
})
