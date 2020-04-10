import { Todo } from "./todo.class";


export class TodoList{

    constructor(){

        this.cargarLocalStorage();
        //this.todos = [];
    
    }

    //insertamos un todo en el arreglo de todos 
    nuevoTodo( todo ){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    //eliminasmo un todo de la lista
    eliminarTodo( id ){
                            //retonra un nuevo arreglo sin incluir el id que sea igual al indicado  
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage(); 

    }

    //nos permite marcar un todo como completado 
    marcarCompletado( id ){

        for(const todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    //eliminamos todos los todos completados 
    eliminarCompletados(){
                        //retonra un nuevo arreglo sin incluir a los que tengan a todo como true   
          this.todos = this.todos.filter( todo => !todo.completado);
          this.guardarLocalStorage();
    }

    //nos permite guardar en el local storage
    guardarLocalStorage(){
                                //ya que solo podemos guardar string, lo transfrmamos en un json perfecto
         localStorage.setItem('todo', JSON.stringify(this.todos));   
    }

    //nos permite cargar el lolcal storage 
    cargarLocalStorage(){

        //primero verificamo que el localstrage existe 
        this.todos = (localStorage.getItem('todo'))
                    ? JSON.parse(localStorage.getItem('todo'))
                    : [];
                    
        //console.log(JSON.parse(localStorage.getItem('todo')))     ;       
       this.todos = this.todos.map( obj => Todo.fromJson(obj));            
        
        console.log(this.todos);
    }
}