var expect = chai.expect;
describe("Testeo function reservaHorario", function(){
    it("Probando que el horario reservado se elimine del array", function(){
        expect(reservarHorario(11.00)).to.be.true;
    })
})