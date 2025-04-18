import TodoFormView from '@/views/CreateTodoView.vue'
import TodoListView from '@/views/TodoListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoListView,
    },
    { path: '/create', component: TodoFormView },
    { path: '/edit/:id', component: TodoFormView, props: true },
  ],
})

export default router
