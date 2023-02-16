import storage from "../../util/storage.js"


const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo=> !todo.complete,
        complete: todo =>todo.complete,
    },
    editIndex: null,

}

const actions = {
    add({todos},title) {
        if(title) {
            todos.push({title, complete: false})
            storage.set(todos)  
        }
      
    },
    toggle({todos},index) { 
        const todo = todos[index]
        todo.complete = !todo.complete
    },
    toggleAll({todos},complete) {
        todos.forEach(todo => todo.complete = complete)
        storage.set(todos)
    },
    destroy({todos},index ) {
        todos.splice(index, 1)
        storage.set(todos)
    },
    switchFilter(state, filter) {
        state.filter = filter
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },
    startEdit(state, index) { 
        state.editIndex = index
    },
    endEdit(state, title) {
        if (state.editIndex !==null) {
            state.todos[state.editIndex].title = title
            state.editIndex = null 
            storage.set(state.todos) 
        }
        
    }

}

export default function reducer(state = init,action,args) {
    actions[action] && actions[action](state,...args)
   return state
}