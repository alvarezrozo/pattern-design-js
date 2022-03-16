class CarPrototype {
  constructor(proto) {
    this.proto = proto;
    return this.clone();
  }

  clone() {
    let car = new Car();

    car.color = this.proto.color;
    car.brand = this.proto.brand;
    car.kilometers = this.proto.kilometers;
    // car.people = this.proto.people;
    // car.isRunning = this.proto.isRunning;

    return car;
  }
}

class Car {
  constructor(color, brand, kilometers) {
    this.color = color;
    this.brand = brand;
    this.kilometers = kilometers;
    this.people = 0;
    this.isRunning = false;
  }

  addPerson() {
    if (this.people !== 5) {
      this.people++;
    }
  }

  run() {
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  getCarDetails() {
    return this;
  }
}

const originalGreenCar = new Car("green", "honda", 0);

originalGreenCar.addPerson();
originalGreenCar.run();

const firstCloneGreenCar = new CarPrototype(originalGreenCar)
const secondCloneGreenCar = new CarPrototype(originalGreenCar)

console.log("====================================");
console.log(originalGreenCar);
console.log(firstCloneGreenCar);
console.log(secondCloneGreenCar);
console.log("====================================");
