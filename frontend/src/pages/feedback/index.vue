<script setup lang="ts">
import { useRouter } from "vue-router"

const rating = ref(0)

const router = useRouter()
function setRating(value: number) {
  rating.value = value
}

function navigate() {
  router.push("/home")
}
</script>

<template>
  <div class="relative box-border h-full w-full flex flex-col items-center justify-center px-8">
    <div class="text-2xl text-primary font-semibold text-center mb-8">Thank You for completing the quest!</div>
    <div class="mb-8 text-center"> We hope you had a fantastic experience!</div>

    <div class="rating-box p-4 rounded-lg shadow-lg flex flex-col items-center mb-6">
      <div class="font-medium mb-2 self-start ml-2">Rate Your Experience</div>
      <div class="text-xs text-gray-500 mb-6 self-start ml-2">How would you rate your Experience?</div>

      <div class="stars flex space-x-2 mb-4">
        <div v-for="n in 5" :key="n" :class="[
          'star',
          n <= rating ? 'i-solar:star-bold text-yellow-500' : 'i-solar:star-linear text-gray-300',
        ]" @click="setRating(n)"></div>
      </div>
    </div>

    <VanButton type="primary" @click="navigate"> Submit Feedback</VanButton>
    <img class="mt-12 h-[34px] w-[35px]" src="/lyf-logo-orange.png">
  </div>
</template>

<style scoped>
.rating-box {
  background-color: #ffffff;
  width: 320px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.text-width-div {
  width: 340px;
}

.stars .star {
  font-size: 2rem;
  cursor: pointer;
}

.feedback-textarea {
  padding: 10px;
  resize: vertical;
  height: 120px;
}

.feedback-textarea::placeholder {
  padding-left: 8x;
}
</style>
