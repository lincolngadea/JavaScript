var compraTotal =0;
var valorUnitario = 0;
var estoque = 3;
var saldo = 100;



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

valorUnitario = prompt('Informe o Valor do Produto:');
quantidade = prompt('Informe a quantidade de itens');

console.log(compra(valorUnitario,quantidade));
console.log('Saldo',saldo);
console.log('Estoque', estoque);



