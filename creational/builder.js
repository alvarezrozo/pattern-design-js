/* Arma tu perrito de perritos */

// interface IPerrito {
//   base: "salchicha" | "tocineta";
//   hasCheese?: boolean;
//   hasSalad?: boolean;
//   onion?: "caramelizada" | "en cubos" | "rama" | null;
//   hasSauce?: boolean;
// }

class Perrito {
    constructor() {
        this.hasBread = true;
    }

    setBase(base) {
      this.base = base
      return this
    }

    setHasCheese(hasCheese) {
      this.hasCheese = hasCheese
      return this
    }
    
    setHasSalad(hasSalad) {
      this.hasSalad = hasSalad
      return this
    }

    setOnionType(onionType) {
      this.onionType = onionType
      return this
    }

    setHasSauce(hasSauce) {
      this.hasSauce = hasSauce
      return this
    }

    getPerrito() {
      return this;
    }
}

const primerPerrito = new Perrito();
const segundoPerrito = new Perrito();

primerPerrito.setHasCheese(true).setHasSalad(true).setOnionType('caramelizada').setBase('tocineta')
segundoPerrito.setHasCheese(true).setHasSalad(false).setOnionType('en cubos').setBase('salchicha')

console.log("====================================");
console.log(primerPerrito.getPerrito());
console.log(segundoPerrito.getPerrito());
console.log("====================================");
