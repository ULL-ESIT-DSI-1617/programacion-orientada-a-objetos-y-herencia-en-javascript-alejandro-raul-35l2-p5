"use strict"; // Use ECMAScript 5 strict mode in browsers that support it


function calculate() {
    
    var datoTemp = original.value;    //guarda el texto que se inserta en la web
    
    var regexp = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([fFkKcCmMiI])\s*(?:to)?\s*([fFkKcCmMiI])\s*$/;
    
    var miValor = datoTemp.match(regexp);

    if (miValor) {
          
        var num = miValor[1];
        var type = miValor[2].toLowerCase();
        var typeTo = miValor[3].toLowerCase();
        
        num = parseFloat(num);
        
        switch (type) {
            
            case 'c': {
            
                var celsius = new Celsius(num);
                if (typeTo == 'f') {
                    converted.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
                }
                else if (typeTo == 'k') {
                    converted.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
                }
                break;
            }
            
            case 'f': {
            
                var farenheit = new Farenheit(num);
                if (typeTo == 'c') {
                    converted.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
                }
                else if (typeTo == 'k') {
                    converted.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
                }
                break;
            }
            
            case 'k': {
            
                var kelvin = new Kelvin(num);
                if (typeTo == 'c') {
                    converted.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
                }
                else if (typeTo == 'f') {
                    converted.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
                }
                break;
            }
            
            case 'm': {
            
                var metros = new Metros(num);
                if (typeTo == 'i') {
                    converted.innerHTML = metros.toPulgadas().toFixed(2) + " Pulgadas";
                }
                break;
            }
            
            case 'i': {
                
                var pulgadas = new Pulgadas(num);
                if (typeTo == 'm') {
                    converted.innerHTML = pulgadas.toMetros().toFixed(2) + " Metros";
                }
                break;
            }
            
            default: {
                converted.innerHTML = "ERROR! Try something like '-4.2C' instead";
            }
        }
    }
    else {
        converted.innerHTML = "ERROR! Try something like '-4.2C' instead";
    }
}


// Clase medida
function Medida(valor, tipo) {
    
    this.valor = valor;
    this.tipo = tipo;
}


// Clase temperatura hereda de medida
function Temperatura(valor, tipo) {
    
    Medida.call(this, valor, tipo);
}

Temperatura.prototype = new Medida();
Temperatura.prototype.constructor = Temperatura;


// Clase celsius heredada de temperatura
function Celsius(valor) {
    
    Temperatura.call(this, valor);
}

Celsius.prototype = new Temperatura();
Celsius.prototype.constructor = Celsius;

Celsius.prototype.toFarenheit = function () {
    return (this.valor * 9 / 5 + 32);
};
Celsius.prototype.toKelvin = function () {
    return (this.valor + 273.15);
};



// Clase farenheit heredada de temperatura
function Farenheit(valor) {
    
    Temperatura.call(this, valor);
}

Farenheit.prototype = new Temperatura();
Farenheit.prototype.constructor = Farenheit;

Farenheit.prototype.toCelsius = function () {
    return ((this.valor - 32) * 5 / 9);
};
Farenheit.prototype.toKelvin = function () {
    return ((this.valor - 32) * 5 / 9 + 273.15);
};


// Clase kelvin heredada de temperatura
function Kelvin(valor) {
    
    Temperatura.call(this, valor);
}

Kelvin.prototype = new Temperatura();
Kelvin.prototype.constructor = Kelvin;

Kelvin.prototype.toCelsius = function () {
    return (this.valor - 273.15);
};
Kelvin.prototype.toFarenheit = function () {
    return ((this.valor -273.15) * 9 / 5 + 32);
};



// Clase metrica hereda de medida
function Metrica(valor, tipo) {
    
    Medida.call(this, valor, tipo);
}

Metrica.prototype = new Medida();
Metrica.prototype.constructor = Metrica;


// Clase pulgada heredada de metrica
function Pulgadas(valor) {
    
    Metrica.call(this, valor);
}

Pulgadas.prototype = new Metrica();
Pulgadas.prototype.constructor = Pulgadas;

Pulgadas.prototype.toMetros = function () {
    return (this.valor * 0.0254);
};


// Clase metros heredada de metrica
function Metros(valor) {
    
    Metrica.call(this, valor);
}

Metros.prototype = new Metrica();
Metros.prototype.constructor = Metros;

Metros.prototype.toPulgadas = function () {
    return (this.valor * 39.3701);
};
