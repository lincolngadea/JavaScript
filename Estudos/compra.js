var compraTotal =0;
var valorUnitario = 0;
var estoque = 3;
var saldo = 4000;



function compra(valor,quantidade){

    let valorTotal = valor * quantidade;
    
    if(saldo >= valor && estoque >= quantidade){
        saldo -= valorTotal;     
        estoque -= quantidade; 
        return '$'+String(valorTotal)+',00'; 
    }else if(saldo < valor){
        return alert('Saldo Insuficiente');
    }else{
        return alert('Fora de Estoque');
    }
}


do{
    var continuarComprando = prompt("Digite 1 para continuar comprando e 2 para finalizar a compra:");
}while(continuarComprando == 2){
    var listaCompras = prompt("1 - Celular(R$2000,00) <br> 2- Phone(R$300,00)");
    quantidade = prompt("Informe a quantidade:");
    switch (listaCompras) {
        case '1':
            valorUnitario = 2000;
            break;
        
        case '2':
            valorUnitario = 300;
            break;
    }
    compra(valorUnitario,quantidade);
    var continuarComprando = prompt("Digite 1 para continuar comprando e 2 para finalizar a compra:");
}

console.log('Saldo',saldo);
console.log('Estoque', estoque);



