//importamos estilos
import './styles.css';

//importamos archivos js
import {Todo, TodoList} from './classes';
import { crearTodoHtml } from './js/componentes';


//hacemos una nueva instancia de la lista de todo
export const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHtml(todo));
 

