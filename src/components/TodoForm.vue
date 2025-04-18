<script lang="ts" setup>
import { ref } from 'vue'
const textarea = ref('')
</script>

<template>
  <div class="description-wrapper">
    <el-input v-model="textarea" :rows="2" type="textarea" placeholder="task description" />
  </div>
  <el-button class="submit-btn" type="primary">Primary</el-button>
</template>

<style scoped>
.description-wrapper {
  margin-top: 1rem;
}

.submit-btn {
  margin-top: 1rem;
}
</style>
