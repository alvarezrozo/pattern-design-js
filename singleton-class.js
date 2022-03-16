class Singleton {

  constructor(){
    if(Singleton.instance){
      return Singleton.instance
    }

    Singleton.instance = this
  }

  setInfo(data) {
    this.instance = { ...this.instance, ...data };
  };

  deleteKey(key) {
    delete this.instance[key];
  };

  getInstance() {
    return this.instance;
  };
};

const singleton = new Singleton()

singleton.setInfo({ nombre: "Miguelito" });
singleton.setInfo({ apellido: "Perez" });
singleton.setInfo({ edad: 22 });
singleton.setInfo({ edad: 27 });

let instance1 = new Singleton();
let instance2 = new Singleton(); 

instance2.setInfo({ impuestos: true });

console.log('====================================');
console.log(singleton.getInstance());
console.log(instance1.getInstance());
console.log(instance2.getInstance());
console.log('====================================');