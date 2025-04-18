<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { createTodo, updateTodo, getTodoById } from '@/services/todoService'

const router = useRouter()
const route = useRoute()

const textarea = ref('')
const isEdit = ref(false)
const todoId = ref<number | null>(null)

onMounted(() => {
  const idParam = route.params.id
  if (idParam) {
    isEdit.value = true
    todoId.value = Number(idParam)

    const existingTodo = getTodoById(todoId.value)
    if (existingTodo) {
      textarea.value = existingTodo.description
    } else {
      ElMessage.error('Task not found.')
      router.push('/')
    }
  }
})

const handleSubmit = () => {
  const trimmed = textarea.value.trim()

  if (!trimmed) {
    ElMessage.error('Task description is required.')
    return
  }

  if (isEdit.value && todoId.value !== null) {
    const updated = updateTodo(todoId.value, trimmed)
    if (updated) {
      ElMessage.success('Task updated!')
    } else {
      ElMessage.error('Update failed.')
      return
    }
  } else {
    createTodo(trimmed)
    ElMessage.success('Task created!')
  }

  textarea.value = ''
  router.push('/')
}
</script>

<template>
  <h2>{{ isEdit ? 'Edit' : 'Create' }} Todo</h2>
  <div class="mt-1">
    <el-input v-model="textarea" :rows="2" type="textarea" placeholder="task description" />
  </div>
  <el-button class="mt-1" type="primary" @click="handleSubmit">
    {{ isEdit ? 'Update' : 'Create' }}
  </el-button>
</template>

<style scoped>
.mt-1 {
  margin-top: 1rem;
}
</style>
