class carro{

    constructor(){
        this.cor =prompt('Informe a Cor do veículo');
        this.modelo =prompt('Informe o modelo do veículo');

    }

    ligar(){
        alert('Uma ligação');
        return alert('ligando');

    }

}

let objeto = new carro();

alert(objeto.cor);
alert(objeto.modelo);
objeto.ligar();