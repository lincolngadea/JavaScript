var a = 2;

foo();                  // funciona porque a declaração `foo()`
                        // é "hoisted"

function foo() {
    a = 3;

    console.log( a );   // 3

    var a;              // a declaração é "hoisted"
                        // para o topo de `foo()`
}

console.log( a ); 