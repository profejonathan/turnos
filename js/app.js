const appTurnos = new Vue({
    el: '#app',
    data: {
        turno: {
            id: 0,
            cliente: '',
            fecha: '',
            estado: 'pendiente',
            detalle: ''
        },
        estados: ["pendiente", "confirmado", "cancelado"],
        filtroCliente: '',
        turnos: [],
        pendientes: [],
        confirmados: [],
        cancelados: []
    },
    created (){
        this.turnosCargar();
    },
    computed: {
        confirmadosCantidad: function () {
          return this.confirmados.length;
        },
        listadoFiltrado: function(){
            let lista = [];

            this.confirmados.forEach(turno => {
                if ( turno.cliente.toLowerCase() == this.filtroCliente.toLowerCase() ){
                    lista.push(turno);
                }
            });

            return lista;
        }
    },
    // METODOS
    methods: {
        turnosCargar: function() {
            console.log('Cargando turnos');
            this.pendientes = JSON.parse( localStorage.getItem('pendientes') );
            this.confirmados = JSON.parse( localStorage.getItem('confirmados') );
            this.cancelados = JSON.parse( localStorage.getItem('cancelados') );


        },
        turnoGuardar: function() {
            console.log('guardando turno', this.turno);
            this.pendientes.push({
                cliente: this.turno.cliente,
                fecha: this.turno.fecha,
                estado: this.turno.estado,
                detalle: this.turno.detalle

            });

            this.actualizarDBLocal();
            // Cerrar modal con JS - Hacerlo!

            this.turno.id = 0;
            this.turno.cliente = '';
            this.turno.fecha = '';
            this.turno.estado = 'pendiente';
            this.turno.detalle = '';

        },
        // Cambiar el estado del turno y actualiza DB Local
        turnoConfirmar: function(turno, index) {
            console.log(turno)
            turno.estado = 'confirmado';
            
            console.log(index);
            this.confirmados.push(turno);
            this.pendientes.splice(index, 1);

            this.actualizarDBLocal();
        },
        // Cancela Turno. Cambia el estado del turno
        turnoCancelar: function(turno, index) {
            console.log(turno)
            turno.estado = 'cancelado';

            this.cancelados.push(turno);

            this.pendientes.splice(index, 1);
            this.actualizarDBLocal();
        },
        // Actualizar base local
        actualizarDBLocal: function() {
            localStorage.setItem('pendientes',  JSON.stringify(this.pendientes) );
            localStorage.setItem('confirmados',  JSON.stringify(this.confirmados) );
            localStorage.setItem('cancelados',  JSON.stringify(this.cancelados) );

        }
    }
})