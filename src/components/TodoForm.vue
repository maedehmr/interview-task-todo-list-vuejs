<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { createTodo } from '@/services/todoService'
import { useRouter } from 'vue-router'

const router = useRouter()
const textarea = ref('')

const handleCreate = () => {
  const trimmed = textarea.value.trim()

  if (!trimmed) {
    ElMessage.error('Task description is required.')
    return
  }

  createTodo(trimmed)
  ElMessage.success('Task created!')
  textarea.value = ''
  router.push('/')
}
</script>

<template>
  <div class="description-wrapper">
    <el-input v-model="textarea" :rows="2" type="textarea" placeholder="task description" />
  </div>
  <el-button class="submit-btn" type="primary" @click="handleCreate">Create</el-button>
</template>

<style scoped>
.description-wrapper {
  margin-top: 1rem;
}

.submit-btn {
  margin-top: 1rem;
}
</style>
