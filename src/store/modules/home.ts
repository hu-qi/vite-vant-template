import { defineStore } from 'pinia'
import { store } from '@/store'
import { getRepositories } from '@/api'

export interface RepoItem {
  id: number,
  html_url: string,
  name: string,
}

export interface RepoList {
  data: RepoItem[]
}
declare type Nullable<T> = T | null
interface HomeState {
  repos: Nullable<RepoList>
}

export const useHomeStore = defineStore({
  id: 'app-home',
  state: (): HomeState => ({
    // repos
    repos: null
  }),
  getters: {
    getrepos (): Nullable<RepoList> {
      return this.repos || null
    }
  },
  actions: {
    setrepos (repos: Nullable<RepoList>) {
      this.repos = repos
    },
    resetState () {
      this.repos = null
    },
    /**
     * @description: login
     */
    async fetchrepos (data: String) {
      const res = await getRepositories(data)
      if (res) {
        // save token
        this.setrepos(res)
      }
      return res
    }
  }
})

// Need to be used outside the setup
export function useHomeStoreWithOut () {
  return useHomeStore(store)
}
