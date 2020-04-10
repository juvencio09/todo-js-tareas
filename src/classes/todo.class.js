
export class Todo{

     static fromJson({id, tarea, completado, creado}){
        
         const tempTodo = new Todo(tarea);

         tempTodo.id           = id;
         tempTodo.completado   = completado;
         tempTodo.creado       = creado;    

         return tempTodo;
    }
    
    constructor( tarea ){

        //la tarea que mandamos a hacer 
        this.tarea      = tarea;

        //valores por defecto 
        this.id         = new Date().getTime(); // esto retrona 165165 represetnacion de la hora, minuto, segundo y milisegundo actual
        this.Completado = false;
        this.creado     = new Date();

    }

}