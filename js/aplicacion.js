var Aplicacion = function(listado) {
    this.listado = listado;
    this.dibujarListado(listado.restaurantes)
    this.dibujarFiltros();
    this.registrarEventos();

}

Aplicacion.prototype.registrarEventos = function() {
$(".buscar").click(this.filtrarRestaurantes.bind(this));
}

Aplicacion.prototype.dibujarFiltros = function() {
this.dibujarHorarios();
this.dibujarRubros();
this.dibujarCiudades();

}

Aplicacion.prototype.dibujarListado = function(restaurantes) {
var self = this;

$(".flex").empty();
var elementos = [];

if (restaurantes.length === 0) {
    elementos.push($("<span/>").attr("class", "alerta").html("No se encontraron resultados"));
} else {

    restaurantes.forEach(function(restaurant) {
        elementos.push(self.crearTarjetaDeRestaurante(restaurant));
    });
}

elementos.forEach(function(elemento) {
    elemento.appendTo(".flex");
})
}

Aplicacion.prototype.crearTarjetaDeRestaurante = function(restaurant) {
var self = this;

var card = $(`
<div class="flex-item" id=${restaurant.id}>
    <img class="imagen" src="${restaurant.imagen}">
    <div class="informacion">
        <div class="nombre-puntuacion-container">
            <h4 class="nombre">${restaurant.nombre}</h4>
            <div class="puntuacion-container">
                <span class="puntuacion">${restaurant.obtenerPuntuacion()}</span>
            </div>
        </div>
        <div class="informacion-container">
            <span><i class="fas fa-map-marker-alt"></i></span>
            <span class="ubicacion">${restaurant.ubicacion}</span>
            <span><i class="fas fa-utensils"></i></span>
            <span class="rubro">${restaurant.rubro}</span>
        </div>
    </div>
    <div class="reservas">
        <span class="reserva">¡Reserva tu lugar!</span>
        <div class="horarios-container">
        </div>
    </div>
</div>
`);

card.find(".puntuacion").click(function() {
    self.calificarRestaurant(restaurant);
});

var contenedorHorarios = card.find(".horarios-container");

restaurant.horarios.sort().forEach(function(horario) {
    var nuevoHorario = $("<span/>").attr("class", "horario").html(horario);
    nuevoHorario.click(function() {
        self.reservarUnHorario(restaurant, horario);
    })
    nuevoHorario.appendTo(contenedorHorarios);
});
return card;
}

Aplicacion.prototype.calificarRestaurant = function(restaurant) {
var self = this;
swal("Ingrese su calificación (valor numérico entre 1 y 10) :", {
    content: "input",
}).then((calif) => {
    var nuevaCalificacion = parseInt(calif);
    if (nuevaCalificacion >= 1 && nuevaCalificacion <= 10) {
        self.listado.calificarRestaurant(restaurant.id, nuevaCalificacion);
        var restaurantActualizar = $("#" + restaurant.id);
        restaurantActualizar.find(".puntuacion").html(restaurant.obtenerPuntuacion());
    } else {
        swal({
            title: "Error",
            text: "Ingrese una calificación válida",
            icon: "error",
            button: "Continuar",
        });
    }
});
}


Aplicacion.prototype.reservarUnHorario = function(restaurant, horario) {
this.listado.reservarUnHorario(restaurant.id, horario)


var restaurantActualizar = $("#" + restaurant.id);

var horarioASacar = restaurantActualizar.find("span:contains(" + horario + ")")
    
var cantidadHorarios = restaurantActualizar.find(".horario").length;
if (cantidadHorarios === 1) {
    restaurantActualizar.find(".reserva").html("No hay más mesas disponibles 😪")
}
horarioASacar.remove();

swal({
    title: "!Felicitaciones!",
    text: "Has reservado una mesa en " + restaurant.nombre + " a las " + horario,
    icon: "success",
    button: "Continuar",
});
}

Aplicacion.prototype.dibujarCiudades = function() {
$("#filtro-ciudad").empty();
this.cargarOpcionDefault("filtro-ciudad", "Ciudad");
this.cargarOpcionTodos("filtro-ciudad");

this.listado.obtenerCiudad().forEach(function(ciudad) {
    var nuevaOpcion = $("<option/>").text(ciudad).val(ciudad);
    nuevaOpcion.appendTo("#filtro-ciudad");
});
}

Aplicacion.prototype.dibujarRubros = function() {
$("#filtro-rubro").empty();
this.cargarOpcionDefault("filtro-rubro", "Rubro");
this.cargarOpcionTodos("filtro-rubro")

this.listado.obtenerRubro().forEach(function(rubro) {
    var nuevaOpcion = $("<option/>").text(rubro).val(rubro);
    nuevaOpcion.appendTo("#filtro-rubro");
});

}

Aplicacion.prototype.dibujarHorarios = function() {
$("#filtro-horario").empty();
this.cargarOpcionDefault("filtro-horario", "Horario");
this.cargarOpcionTodos("filtro-horario")

this.listado.obtenerHorario().forEach(function(horario) {
    var nuevaOpcion = $("<option/>").text(horario).val(horario);
    nuevaOpcion.appendTo("#filtro-horario");
});
}

Aplicacion.prototype.cargarOpcionDefault = function(idFiltro, defecto) {
var opcionDefault = $("<option/>").text(defecto).val(0).prop("disabled", true).prop("selected", true);
opcionDefault.appendTo("#" + idFiltro);
}


Aplicacion.prototype.cargarOpcionTodos = function(idFiltro) {
var opcionTodos = $("<option/>").text("Todos").val(1);
opcionTodos.appendTo("#" + idFiltro);
}

Aplicacion.prototype.filtrarRestaurantes = function() {
if ($("#filtro-rubro option:selected").val() === "1" || $("#filtro-rubro option:selected").val() === "0") {
    var filtroRubro = null;
} else {
    var filtroRubro = $("#filtro-rubro option:selected").val();
}

if ($("#filtro-ciudad option:selected").val() === "1" || $("#filtro-ciudad option:selected").val() === "0") {
    var filtroCiudad = null;
} else {
    var filtroCiudad = $("#filtro-ciudad option:selected").val();
}

if ($("#filtro-horario option:selected").val() === "1" || $("#filtro-horario option:selected").val() === "0") {
    var filtroHorario = null;
} else {
    var filtroHorario = $("#filtro-horario option:selected").val();
}

var restaurantesFiltrados = this.listado.obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario);
this.dibujarListado(restaurantesFiltrados);
}

var aplicacion = new Aplicacion(listado);