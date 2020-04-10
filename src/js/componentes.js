//importaciones 
import {Todo}     from '../classes'
import {todoList} from '../index.js'

//referencias en el html
const divTodoList    = document.querySelector('.todo-list');
const txtInput       = document.querySelector('.new-todo');
const btnBorrarTodos = document.querySelector('.clear-completed');
const btnFilstros    = document.querySelector('.filters');
const anchorFiltros  = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) =>{

    const htmlTodo = ` 
    <li class="${ (todo.completado)? 'completed':'' }" data-id="${todo.id}">
        <div class="view">
            
            <input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>

        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    //lo que hacemos con el firstElementChild es tomar el primer elemento hijo del div el cual es el li y lo inserta en el .todo-list
    divTodoList.append(div.firstElementChild);
    
    return div.firstElementChild;
}

//eventos
txtInput.addEventListener('keyup', ( event ) =>{
    
    if(event.keyCode === 13 && txtInput.value.length > 0){ //verificamos que precione enter y que tenga algo el inputtext
        
        const nuevoTodo = new Todo(txtInput.value); //obtenemos el valor 
        todoList.nuevoTodo(nuevoTodo); //agregamos el todo al arreglo
        crearTodoHtml(nuevoTodo); //creamos el elemento en el html
        txtInput.value = ''; //limipamos el input 

    }
});

divTodoList.addEventListener('click', ( event ) =>{
   
    const nombreElemento = event.target.localName; //input, label, button ... ya que es lo unico que hay dentro de el elemento
    const todoElemento   = event.target.parentElement.parentElement;//hacemos al referencia al li, ponemos dos porentElement porque el primero nos guia al div que esta dentro de el Li y el segundo sale de ese div y nos da el li
    const todoId         = todoElemento.getAttribute('data-id'); //sacamos el data-id, el cual es un elemento de el li que sacamos anterior mente, aqui podriamos obtener todo tipo de elemento como una classe 
    
    if(nombreElemento.includes('input')) {//significa que hizo click en l checkbox
        
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');//agregamos la classe completed a la lista

    }else if(nombreElemento.includes('button')){ //verificamos que este precionando el botton

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento); //estamos diciendo que quiete del div el el elemento que concuerde con el que fue clickeado

    }
});

btnBorrarTodos.addEventListener('click', ()=>{

    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length-1; i >= 0; i--){
       const elemento = divTodoList.children[i];//obtenemos cada elemento de forma inversa 
       
        if(elemento.classList.contains('completed')){ //validamos que contenga la clase 'completed' ya que signifca que esta comlpeto 
            divTodoList.removeChild(elemento); //si esta completo eliminamos el elemento de el html
        }
    }        
});

btnFilstros.addEventListener('click', (event) =>{
    
    const filtro = event.target.text;

    if(!filtro)  {return;}

    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden'); //la clase hidden solo es una clase en el css que tine display none, lo que hacemos es asegurarnos que niguno tenga esta clase ates de hacer el filtro 
        const completado = elemento.classList.contains('completed'); //vemos que elementos estan completados 

        anchorFiltros.forEach( elem => elem.classList.remove('selected')); //esto le hacemos para que tenga un marco cunado lo seleccionamos
        event.target.classList.add('selected');  //primero lo quietamos de todas las porsiciones y despues la ponemos en el seleccionado

        switch(filtro){ //para saber en cual de los botones preciono el usuario

            case 'Pendientes': 
                if(completado){
                    elemento.classList.add('hidden'); //como queremos mostrar los pendientes, tapamos los acompletados 
                }
            break;    
            case 'Completados': 
            if(!completado){
                elemento.classList.add('hidden'); //como queremos mostrar los completados, tapamos los pendientes 
            }
            break;   
        }
    
    }

});