<template>
  <div class="home">
    <AmplifyConnect
      :query="listTodosQuery"
      :subscription="createTodoSubscription"
      :on-subscription-msg="onCreateTodo"
    >
      <template slot-scope="{ loading, data, errors }">
        <div v-if="loading">
          Loading...
        </div>

        <div v-else-if="errors.length > 0" />

        <div v-else-if="data">
          <TodoList :items="data.listTodos.items" />
        </div>
        <div v-else>
          adsf
        </div>
      </template>
    </AmplifyConnect>
    <CreateTodo />
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue'
import TodoList from './TodoList.vue'
import CreateTodo from './CreateTodo.vue'

const ListTodosQuery = `query ListTodos {
    listTodos {
      items {
        id
        name
      }
    }
  }`
const OnCreateTodoSubscription = `subscription OnCreateTodo {
      onCreateTodo {
        id
        name
      }
    }`
export default {
  components: {
    TodoList,
    CreateTodo,
    ...components,
  },
  computed: {
    listTodosQuery() {
      return this.$Amplify.graphqlOperation(ListTodosQuery)
    },
    createTodoSubscription() {
      return this.$Amplify.graphqlOperation(OnCreateTodoSubscription)
    },
  },
  methods: {
    onCreateTodo(prevData, newData) {
      console.log('New todo from subscription...')
      const newTodo = newData.onCreateTodo
      prevData.data.listTodos.items.push(newTodo)
      return prevData.data
    },
  },
}
</script>
