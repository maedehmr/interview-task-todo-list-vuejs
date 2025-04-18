<script lang="ts" setup>
import type { Todo } from '@/types/todo'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { deleteTodo, getTodos, toggleStatus } from '@/services/todoService'

const router = useRouter()
const tableData = ref<Todo[]>([])

onMounted(() => {
  tableData.value = getTodos()
})

const handleStatus = (row: Todo) => {
  tableData.value = toggleStatus(row.id)
}

const handleEdit = (row: Todo) => {
  router.push(`/edit/${row.id}`)
}

const handleDelete = (row: Todo) => {
  tableData.value = deleteTodo(row.id)
}
</script>

<template>
  <el-table :data="tableData" stripe class="table">
    <el-table-column type="index" width="50" />
    <el-table-column label="Description" prop="description" min-width="200" />
    <el-table-column label="Status" min-width="130">
      <template #default="scope">
        <el-tag :type="scope.row.status ? 'success' : 'warning'" disable-transitions>
          {{ scope.row.status ? 'Completed' : 'Not Completed' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column align="right" fixed="right" min-width="90">
      <template #default="scope">
        <el-button
          size="small"
          :type="!scope.row.status ? 'success' : 'warning'"
          plain
          @click="handleStatus(scope.row)"
        >
          {{ !scope.row.status ? 'Done' : 'Undone' }}
        </el-button>
        <el-button size="small" type="primary" plain @click="handleEdit(scope.row)">
          Edit
        </el-button>
        <el-button size="small" type="danger" plain @click="handleDelete(scope.row)">
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.table {
  width: 100%;
  margin-top: 1rem;
}
</style>
