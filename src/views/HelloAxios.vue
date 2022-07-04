<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, onMounted } from 'vue'
import { getZen, getRepositories } from '@/api'
const zen = ref('')
onMounted(() => {
  _getZen()
  _getRepositories('hu-qi')
})
const reposList = ref([])
const _getZen = async () => {
  await getZen().then((res) => {
    console.log(res)
    zen.value = res.data
  })
}

const _getRepositories = async (data: String) => {
  await getRepositories(data).then((res: any) => {
    console.log(res)
    reposList.value = res.data
  })
}
</script>

<template>
  <p>
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <p>Zen: {{ zen }}</p>
  <van-grid :column-num="3">
    <van-grid-item
      v-for="item in reposList"
      :key="item['id']"
      icon="bag-o"
      :url="item['html_url']"
      :text="item['name']"
    />
  </van-grid>
</template>

<style lang="scss" scoped>
.van-grid ::v-deep .van-grid-item  span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
