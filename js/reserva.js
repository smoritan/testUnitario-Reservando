const Reserva = function(horario, cantidadDePersonas, precioPorPersona, codigoDeDescuento){
    this.horario = horario,
    this.cantidadDePersonas = cantidadDePersonas,
    this.precioPorPersona = precioPorPersona,
    this.codigoDeDescuento = codigoDeDescuento
}

Reserva.prototype.precioBase = function(){
    return this.cantidadDePersonas * this.precioPorPersona;
}

Reserva.prototype.precioFinal = function(){
    const precioBase = this.precioBase();
    const adicionales = this.adicionales(precioBase);
    const descuentos = this.descuentos(precioBase);
    return precioBase + adicionales - descuentos;
}


Reserva.prototype.adicionales = function(precioBase){
    return this.adicionalesPorFinDeSemana(precioBase) + this.adicionalesPorHorario(precioBase);
}

Reserva.prototype.adicionalesPorFinDeSemana = function(precioBase){
    let diaDeSemana = this.horario.getDay();

    if(diaDeSemana === 0 || diaDeSemana === 5 || diaDeSemana === 6){
        return precioBase * .10;
    };
    return 0;
}

Reserva.prototype.adicionalesPorHorario = function(precioBase){
    let horarioEspecialDia = this.horario.getHours() === 13 || (this.horario.getHours() === 14 && this.horario.getMinutes() === 0);
    let horarioEspecialNoche = this.horario.getHours() === 20 || (this.horario.getHours() === 21 && this.horario.getMinutes() === 0);
    if(horarioEspecialDia || horarioEspecialNoche){
        return precioBase * .05;
    };
    return 0;
}


Reserva.prototype.descuentos = function(precioBase){
    return this.descuentosGrupales(precioBase) + this.descuentosPorCodigo(precioBase);
}

Reserva.prototype.descuentosGrupales = function(precioBase){
    let descuento = 0;

    if(this.cantidadDePersonas >= 4 && this.cantidadDePersonas <= 6){
        descuento = .05;
    } else if(this.cantidadDePersonas >= 7 && this.cantidadDePersonas <=8){
        descuento = .10;
    } else if(this.cantidadDePersonas > 8){
        descuento = .15;
    }
    return precioBase * descuento;
}

Reserva.prototype.descuentosPorCodigo = function(precioBase){
    let descuento = 0;

    if(this.codigoDeDescuento === 'DES15'){
        descuento = precioBase * .15;
    } else if(this.codigoDeDescuento === 'DES200'){
        descuento = 200;
    } else if(this.codigoDeDescuento === 'DES1'){
        descuento = this.precioPorPersona;
    }
    return descuento;
}