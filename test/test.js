
var expect = chai.expect;

describe("Testeo función reservaHorario()", function(){
    var restoPrueba;
    beforeEach(function(){
        restoPrueba  = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
    });

    it("Probando que el horario reservado se elimine del array", function(){
        restoPrueba.reservarHorario("13:00")
        expect(restoPrueba.horarios).not.to.include("13:00")
    })
    it("Probando que horario no disponible no cambie el array", function(){
        var arrayOrigin =  [...restoPrueba.horarios];
        restoPrueba.reservarHorario("21:00")
        expect(restoPrueba.horarios).to.eql(arrayOrigin);
    })
    it("Probando que si la función se ejecura sin el horario en los parametro, el array no se modifique", function(){
        var arrayOrigin = [...restoPrueba.horarios];
        restoPrueba.reservarHorario()
        expect(restoPrueba.horarios).to.eql(arrayOrigin);
    })
});
describe("Testeo función obtenerPuntuación()", function(){
    var restoPrueba;
    beforeEach(function(){
        restoPrueba  = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
    });

    it("")
})