# POO y Herencia en Javascript

La programación orientada a objetos comienza como todas las historias de programación, por un problema de complejidad. Abordandolo desde una de las filosofías nos dice que la complejidad puedes manejarla separándola entre pequeños compartimentos que están aislados entre sí. Estos compartimentos han acabado llamándose **objetos**.
Un objeto es una cáscara dura que oculta la complejidad pegajosa dentro de ella y nos ofrece en cambio algunos botones y conectores (como los métodos) que presentan una interfaz a través de la cual el objeto va a ser utilizado. La idea es que la interfaz es relativamente simple y todas las cosas complejas que ocurren dentro del objeto pueden ser ignoradas cuando se trabaja con él.

## Metodos

Los métodos son simplemente propiedades que contienen valores de funciones. Esto sería un ejemplo de un método

```js
var rabbit = {};
rabbit.speak = function(line) {
  console.log("The rabbit says '" + line + "'");
};

rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'
```
Normalmente un método necesita hacer algo con el objeto en el que ha sido llamado. Cuando una función es llamada como un método se mira como una propiedad y inmediatamente es llamada como en **object.method()**, la variable especial **this** en el cuerpo apuntará al objeto por el cuál fue llamado.

```js
function speak(line) {
  console.log("The " + this.type + " rabbit says '" +
              line + "'");
}
var whiteRabbit = {type: "white", speak: speak};
var fatRabbit = {type: "fat", speak: speak};

whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
fatRabbit.speak("I could sure use a carrot right now.");
// → The fat rabbit says 'I could sure use a carrot
//   right now.'
```

El código utiliza la palabra clave **this** para dar salida al tipo de conejo que está hablando. Recuerde que los métodos **apply** y **bind** toman un primer argumento que se puede utilizar para simular llamadas de método, de hecho este primer argumento se utiliza para darle un valor a **this**.

## Prototipos

```js
var empty = {};
console.log(empty.toString);
// → function toString(){…}
console.log(empty.toString());
// → [object Object]
```
Mirando atentamente el código nos damos cuenta que saca una propiedad de un objeto vacío, pero realmente no es así ya que, todos los objetos tienen un prototipo. Un prototipo es otro objeto que se utiliza como una fuente alternativa de propiedades. Cuando un objeto obtiene una solicitud para una propiedad que no tiene, se buscará su prototipo para la propiedad, entonces se obtendrá el prototipo del prototipo y así sucesivamente.

Entonces en este caso el prototipo del objeto vacío es el gran prototipo ancestral, la entidad que se encuentra detrás de casi todos los objetos **Object.prototype**.

```js
console.log(Object.getPrototypeOf({}) ==
            Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null
```

Las relaciones prototipos de objetos JavaScript forman una estructura en forma de árbol, y en la raíz de esta estructura se encuentra el **Object.prototype** que proporciona algunos métodos que aparecen en todos los objetos.

Muchos objetos no tienen directamente el **Object.prototype** como su prototipo, sino que tienen otro objeto, que proporciona sus propias propiedades predeterminadas. Las funciones derivan de **Function.prototype**, y loa arrays se derivan por ejemplo de **Array.prototype**.

```js
console.log(Object.getPrototypeOf(isNaN) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
            Array.prototype);
// → true
```
El objeto prototipo tendrá por sí mismo un prototipo, a menudo **Object.prototype**, de modo que todavía indirectamente proporciona métodos como toString.

La función **Object.getPrototypeOf** obviamente devuelve el prototipo de un objeto. Puede utilizar **Object.create** para crear un objeto específico.

```js
var protoRabbit = {
  speak: function(line) {
    console.log("The " + this.type + " rabbit says '" +
                line + "'");
  }
};
var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");
// → The killer rabbit says 'SKREEEE!'
```
El "proto" rabbit actúa como container para las propiedades que se han compartido por todos los rabbit. Un objeto rabbit individual como el rabbit asesino por ejemplo que contiene propiedades que sólo se aplican a sí mismo(en este caso su tipo) y deriva propiedades compartidas de su prototipo.

Para más información sobre la programación orientada a objetos en JavaScript pinche [aquí](http://eloquentjavascript.net/06_object.html)

## Herencia

Para explicar la herencia vamos a seguir un ejemplo que ilustra como se establece la herencia:

```js
function Car(numberOfCylinders, carType){

  //Private member variables. They can be set only during object construction.
  var type = carType;
  var cylinders = numberOfCylinders;
  var volumeOfCylinder = 250;

  this.getCC = function(){
                return cylinders * volumeOfCylinder * this.factor;
              };

  //Public properties. These properties can be set from outside the object.
  this.color = 'White';
  this.sunRoof = false;
  this.factor = 1;
}

//Shared method
Car.prototype.start = function(){
  console.log('The car with ' + this.getCC() + 
              ' engine and color ' + this.color + ' is starting...');
}

Car.prototype.stop = function(){
  console.log('The car has stopped');
}

Car.prototype.constructor = Car;

function Sedan(numberOfCylinder, carType){
    //Calling the base constructor. All private vars and other properties are initialized. 
    Car.call(this, numberOfCylinder, carType);
    //Instance method. The first in the method resolution chain.
    this.start = function(){
      console.log('The Sedan with ' + this.getCC() + 
                  ' engine and color ' + this.color + ' is starting...');
   }
}

//Set the inheritance - this is the magic line
Sedan.prototype = new Car();
Sedan.prototype.constructor = Sedan;



var honda = new Sedan(4, 'sedan');
honda.start();
honda.stop();
```
En este ejemplo se usan una clase **Cars** y una clase **Sedan**

Se establece la herencia de esta forma:

```js
 Sedan.prototype = new Car();
 Sedan.prototype.constructor = Sedan;
```
Para llamar al constructor padre se usa **Car.call**:

```js
function Sedan(numberOfCylinder, carType){
              //Calling the base constructor. All private vars and other properties are initialized. 
              Car.call(this, numberOfCylinder, carType);
              //Instance method. The first in the method resolution chain.
              this.start = function(){
                               console.log('The Sedan with ' + this.getCC() + ' engine and color ' + this.color + ' is starting...');
                           }
          }
```

Para ver más ejemplos utilizando la herencia puedes verlos en este [repositorio](https://github.com/SYTW/js-inheritance-examples)
