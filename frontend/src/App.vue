<script setup lang="ts">
import { useOverlay } from "~/stores/overlay.store"

const overlay = useOverlay()
</script>

<template>
  <VanConfigProvider class="h-full w-full">
    <VanOverlay :show="overlay.visible">
      <div class="h-full w-full flex items-center justify-center">
        <div class="rounded-lg px-3 py-3" style="background-color: var(--van-background);">
          <van-loading size="24px" vertical>
            {{ overlay.message }}
          </van-loading>
        </div>
      </div>
    </VanOverlay>
    <RouterView />
  </VanConfigProvider>
</template>

<style>
.van-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}
</style>
