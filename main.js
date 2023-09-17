class ProductManager {
    //Constructor que inicializa el array vacio que contedrá los productos y el valor inicial de "id" que se asignará a cada producto
    constructor() {
        this.products = [];
        this.idCounter = 1;
    }

    //Método para agregar productos.
    addProduct(tittle, description, price, thumbnail, code, stock) {
        //Estructura que itera en el array "products" y busca sí el "code" ingresado por el usuario es el mismo que alguno de un producto que ya está en el array y detiene el método en caso de que devuelva "true".
        const codeExists = this.products.some(product => product.code === code);
        if(codeExists) {
            console.log("Error: El código ya existe.");
            return;
        }

        //Se ejecuta el método "generateId". Más información adelante.
        const id = this.generateId();

        //Gestión de los valores que tienen que ser ingresados por el usuario.
        this.products.push({
            id,
            tittle,
            description,
            price,
            thumbnail,
            code,
            stock
        });
    }

    //Método que genera un identificador único en relación a cada producto generado en una instancia de la clase.
    generateId() {
        const id = this.idCounter;
        this.idCounter++;
        return id;
    }

    //Método que devuelve el array completo con todos los productos añadidos en la instancia.
    getProducts() {
        return this.products;
    }

    //Método que devuelve un producto específico en relación a un id solicitado por el usuario, en caso de no encontrar el id solicitado devuelve un mensaje de error.
    getProductById(id) {
        const productById = this.products.find(product => product.id === id);

        if(productById) {
            return productById;
        } else {
            return "Producto no encontrado.";
        }
    }
}

//Generación de la instancia y testing correspondiente.
const productManager = new ProductManager();

productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc124", 25);
productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc125", 25);

console.log("Todos los productos:", productManager.getProducts());

console.log("Producto buscado por id:", productManager.getProductById(2));
console.log("Producto buscado por id:", productManager.getProductById(4));