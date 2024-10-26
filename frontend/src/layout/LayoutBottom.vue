<script setup lang="ts">
const activeMenu = ref(0)
</script>

<template>
  <div>
    <slot />

    <van-tabbar v-model="activeMenu">
      <van-tabbar-item>
        <template #icon>
          <i class="i-solar:home-2-linear" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <i class="i-solar:home-2-linear" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o">
        Tab
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">
        Tab
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>

</style>
