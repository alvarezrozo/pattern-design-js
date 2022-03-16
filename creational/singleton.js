const Singleton = {
  instance: {},
  setInfo: function (data){
    this.instance = { ...this.instance, ...data };
  },
  deleteKey: function(key) {
    delete this.instance[key];
  },
  getInstance: function() {
    return this.instance;
  },
};

Singleton.setInfo({ nombre: "Miguelito" });
Singleton.setInfo({ apellido: "Perez" });
Singleton.setInfo({ edad: 22 });
Singleton.setInfo({ edad: 27 });
Singleton.deleteKey("nombre");

let instance1 = Singleton;
let instance2 = Singleton;

instance2.setInfo({ impuestos: true });

console.log("====================================");
console.log(instance1.getInstance());
console.log(instance2.getInstance());
console.log("====================================");
