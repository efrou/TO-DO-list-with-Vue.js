const BASE_URL='http://192.168.10.103:3000/';
const TAREAS_URL = BASE_URL + 'tareas/';

var app = new Vue({
    el: '#app',
    data:{
        nuevaTarea: null,
        tareas:[]
    },
    computed:{
        tareasPendientes: function(){
           return this.tareas.filter(function(tarea, indice){
                return !tarea.finalizada;
            }).length;
        }
    },
    methods: {
        agregarTarea: function(){
            if (this.nuevaTarea.trim()!==''){
            //VALIDAR ANTES DE CREAR
            let nuevaTarea = {
                texto: this.nuevaTarea,
                finalizada:false,
            };

            axios.post(TAREAS_URL, nuevaTarea)
            .then(response=>{ 
                this.tareas.push(response.data);
                this.nuevaTarea='';
            })
            .catch(error=>{
                console.error('agregarTarea', error);
            });

           

        }else {
                //agregar estilos
            }
        },

        finalizarTarea: function (index){
            const id = this.tareas[index].id;
            const finalizada = !this.tareas[index].finalizada;

            axios.patch(TAREAS_URL + id, {
                finalizada: finalizada
            })
            .then(response=>{
                this.tareas[index].finalizada=finalizada;
            })
            .catch(error=>{
                console.error('finalizarTarea', error);
            });    
        },

        eliminarTarea: function(evento,index){
        
        const id= this.tareas[index].id
        axios.delete(TAREAS_URL + id)
        .then(response=>{
            this.tareas.splice(index,1);
        })
        .catch(error=>{
            console.error('eliminarTarea', error);
        })
        evento.stopPropagation();
        },
        
        limpiarTareas:function(){
            this.tareas= [];
        },
    },
    created: function(){
        console.log('la instancia de vue se creo exitosamente');

        axios.get(TAREAS_URL)
        .then(response => {
            console.log('respuesta', response);
            this.tareas= response.data;
        })
        .catch(error => {
            console.log('error', error);
        });
        console.log('hola promesa');
    }
});