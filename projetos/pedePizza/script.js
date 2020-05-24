
let cart = [];
let modalQt = 1;
let modalKey = 0;
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);




//listagem das pizzas

pizzaJson.map((item, index)=>{ //realiza o mapeamento para listar os dados
    //console.log(item);//testa o mapeamento no console
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key',index);    //captura o index do array e coloca em uma tag data-key
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
   
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{ //evento para abrir o modal
        e.preventDefault();//cancela comportamento padrão da tag
        //console.log('Clicou e está ok...');

        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1; //inicia a variável com 1 pra definir o valor mínimo da quantidade de pizzas
        modalKey = key;//armazena o índice da pizza atual
        c('.pizzaBig img').src = pizzaJson[key].img; //adiciona a imagem da pizza atual
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;//adiciona o nome da pizza atual
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;//adiciona a descrição da pizza atual
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
            
            if(sizeIndex == 2){
                
                size.classList.add('selected'); //força o modal iniciar com a pizza grande selecionada.

            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        
        c('.pizzaInfo--qt').innerHTML = modalQt; //adiciona a quantidade mínima de pizza no modal

        //bloco de transição de abertura do modal
        c('.pizzaWindowArea').style.opacity = '0'; //inicia transição com valor
        c('.pizzaWindowArea').style.display = 'flex'; //define o display como flex...
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = '1';//final da transição de abertura do modal
        },200); //define o timout de 200milesegundos
        //final do bloco de abertura do modal

    });

    c('.pizza-area').append(pizzaItem); //adiciona todos os dados na dv .pizza-area

});//close pizza list

//modal events

function closeModal(){ //função para fechar o modal

    //transição de fechamento do modal
    c('.pizzaWindowArea').style.opacity = '0';
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    },500);
    //final da transição

}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click',closeModal);//fecha modal tanto no desktop quanto mobile

});

//incrementa quantidade da pizza e adiciona no modalqt a nova quantidade
c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;    
});
//end

//decrementa a quantidade da pizza respeitando o valor mínimo de 1 e adiciona o novo valor no modalqt
c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    modalQt--;
    if(modalQt < 1){
        modalQt = 1;
    }
    c('.pizzaInfo--qt').innerHTML = modalQt;
    
});
//end

//adiciona comando de selecionar os tamanhos da pizza
cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
   
    size.addEventListener('click',(e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');//remove o tamanho que estava selecionado
        size.classList.add('selected');//seleciona o novo tamanho
    });
});
//end


c('.pizzaInfo--addButton').addEventListener('click',()=>{

    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));//armazena o tamanho selecionado e transforma o valor em inteiro
    
    let identifier = pizzaJson[modalKey/**index da pizza atual */].id+'@'+size;//cria um identificador para armazenar as quantidades das pizzas e os tamanhos no mesmo índice de acordo com o tipo da pizza, sendo que cada pizza é um novo index.

    let key = cart.findIndex((item)=>item.identifier == identifier); //se o identifier do item já existir retorna maior que -1 senão retorna -1

    if(key > -1){
        cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });
    }   
    updateCart();
    closeModal();
});
c('.menu-openner').addEventListener('click',()=>{
    if(cart.length > 0){
        c('aside').style.left='0';
    }
});

c('.menu-closer').addEventListener('click',()=>{
    c('aside').style.left='100vw';
});

//inicia função para atualizar o carrinho
function updateCart(){

    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        for(let i in cart){

            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            
            subtotal += pizzaItem.price * cart[i].qt;
            
            switch(cart[i].size){

                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{

                if(cart[i].qt > 1){

                    cart[i].qt--;
                }else{
                    cart.splice(i,1);
                }
                updateCart()

            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{

                cart[i].qt++;
                updateCart();

            });


            c('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
    c('.cart--finalizar').addEventListener('click',()=>{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    });

}//end function