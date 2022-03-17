class Observer {
  constructor() {
    this.observers = [];
  }

  attach(callback) {
    this.observers.push(callback);
  }

  detach(callback) {
    let callbackIncluded = this.observers.includes(callback);
    
    if (!callbackIncluded) {
      console.error('Callback not found');
      return;
    }
    
    this.observers = this.observers.filter((e) => e !== callback);
  }

  notify(payload) {
    this.observers.forEach((e) => {
      e(payload);
    });
  }
}

const observerInstance1 = new Observer();
const observerInstance2 = new Observer();

const funct1 = (payload) => {
  console.log('Llamando la 1 ' + payload);
};

const funct2 = (payload) => {
  console.log('Llamando la 2 ' + payload);
};

const funct3 = (payload) => {
  console.log('Llamando la 3 ' + payload);
};

observerInstance1.attach(funct1);
observerInstance1.attach(funct2);
observerInstance1.attach(funct3);

observerInstance1.notify('OBSERVER 1');
observerInstance1.detach(funct2);
observerInstance1.notify('OBSERVER 1 SEGUNDA VEZ');

observerInstance2.attach(funct3)

observerInstance2.notify('OBSERVER 2');

