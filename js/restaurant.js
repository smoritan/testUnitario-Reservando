var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    let nuevoHorario = this.horarios.filter(function(horario){
        return horario !== horarioReservado;
    })
    this.horarios = nuevoHorario;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } 
    return promedio(this.calificaciones)
}

function sumatoria(numeros){
    return numeros.reduce(function(a, b){
        return a + b;
    },0)
}

function promedio(arregloAPromediar){
    return (sumatoria(arregloAPromediar)) / arregloAPromediar.length;
}