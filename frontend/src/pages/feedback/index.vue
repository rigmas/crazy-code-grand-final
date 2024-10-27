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
    <div class="text-2xl text-primary font-semibold text-center mb-8">Thank You for Staying at Lyf Funan!</div>
    <div class="mb-10 text-center"> We hope you had a fantastic experience!</div>
    <div class="rating-box p-4 rounded-lg shadow-lg flex flex-col items-center">
      <div class="font-medium mb-2 self-start ml-2">Rate Your Stay</div>
      <div class="text-xs text-gray-500 mb-6 self-start ml-2">How would you rate your stay?</div>

      <div class="stars flex space-x-2 mb-4">
        <div v-for="n in 5" :key="n" :class="[
          'star',
          n <= rating ? 'i-solar:star-bold text-yellow-500' : 'i-solar:star-linear text-gray-300',
        ]" @click="setRating(n)"></div>
      </div>
    </div>
    <div class="rating-box p-4 rounded-lg shadow-lg flex flex-col items-center mt-6">
      <div class="self-start font-medium ml-2 mb-2">
        Your Feedback
      </div>
      <div class="text-xs text-gray-500 mb-4 self-start ml-2">We appreciate your input!</div>
      <textarea name="textarea" rows="5" cols="30" placeholder="Feedback"
        class="b-rounded-2xl mb-4 feedback-textarea"></textarea>
    </div>

    <div class="text-center mt-6 mb-6 text-sm text-width-div">
      Your comfort and enjoyment are our top priorities, and we would love to hear your thoughts.
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
