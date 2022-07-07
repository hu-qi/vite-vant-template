<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, onMounted } from 'vue'
import { getZen, getRepositories } from '@/api'
import { useHomeStore } from '@/store/modules/home'
const zen = ref('')
const store = useHomeStore()
const loading = ref(false)

onMounted(async () => {
  loading.value = true

  await _getZen()
  await store.fetchrepos('hu-qi')
  loading.value = false
  // _getRepositories('hu-qi')
})

const _getZen = async () => {
  await getZen().then((res) => {
    console.log(res)
    zen.value = res.data
  })
}

// const _getRepositories = async (data: String) => {
//   // await getRepositories(data).then((res: any) => {
//   //   console.log(res)
//   //   reposList.value = res.data
//   // })
//   store.fetchrepos('hu-qi')
// }
</script>

<template>
  <p>
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <p>Zen: {{ zen }}</p>
  <van-grid :column-num="loading ? 1 : 3" :loading="loading">
    <van-grid-item v-if="loading">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </van-grid-item>

    <van-grid-item
      v-for="item in store.getrepos?.data"
      v-else
      :key="item['id']"
      icon="bag-o"
      :url="item['html_url']"
      :text="item['name']"
    />
  </van-grid>
</template>

<style lang="scss" scoped>
.van-grid :deep .van-grid-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
