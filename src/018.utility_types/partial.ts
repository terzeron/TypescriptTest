interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return {...todo, ...fieldsToUpdate};
}

const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
};

const todo2 = {
    description: 'throw out trash'
};

console.log(todo1);
console.log(todo2);

let todo3 = updateTodo(todo1, todo2);
console.log(todo3);