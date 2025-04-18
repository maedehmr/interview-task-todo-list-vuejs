<script lang="ts" setup>
import type { Todo } from '@/types/todo'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleStatus = (index: number, row: Todo) => {
  console.log(index, row)
}

const handleEdit = (index: number, row: Todo) => {
  router.push(`/edit/${row.id}`)
}

const handleDelete = (index: number, row: Todo) => {
  console.log(index, row)
}

const tableData: Todo[] = [
  {
    description: 'Online meeting with project manager',
    status: true,
  },
  {
    description: 'Update README file in GitHub',
    status: true,
  },
  {
    description: 'Review last months financial report',
    status: false,
  },
  {
    description: 'Practice UI design in Figma',
    status: true,
  },
]
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
        <el-button size="small" :type="!scope.row.status ? 'success' : 'warning'" plain @click="handleStatus(scope.$index, scope.row)">
          {{ !scope.row.status ? 'Done' : 'Undone' }}
        </el-button>
        <el-button size="small" type="primary" plain @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button size="small" type="danger" plain @click="handleDelete(scope.$index, scope.row)">
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
