function adiciona(x){
    //parâmetro x é uma variável interna

    function add(y){//função interna 
        return y+x;

    }
    return add;
}

var plusOne = adiciona(1);
var plusTwo = adiciona(10);

console.log(plusOne(3));//acessa a função interna de adiciona(x) - resultado 4 <----- 1 + 3
console.log(plusOne(41)); //Mesma situação, Resultado é 42 <-----1 + 41

console.log(plusTwo(13)); // resultado é 23 <----- 10 +13