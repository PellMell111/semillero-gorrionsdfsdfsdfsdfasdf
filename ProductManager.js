const { promises: fs } = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.idCounter = 1;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts();
            const id = this.generateId();

            const newProduct = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

            products.push(newProduct);

            await this.saveProducts(products);

            return newProduct;
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            return null;
        }
    }

    generateId() {
        const id = this.idCounter;
        this.idCounter++;
        return id;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            console.error("Error al leer el archivo de productos:", error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find((item) => item.id === id);
            return product || "Producto no encontrado.";
        } catch (error) {
            console.error("Error al buscar el producto por ID:", error);
            return "Producto no encontrado.";
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((item) => item.id === id);

            if (index !== -1) {
                updatedProduct.id = id;
                products[index] = updatedProduct;
                await this.saveProducts(products);
            } else {
                console.log("Producto no encontrado.");
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((item) => item.id === id);

            if (index !== -1) {
                products.splice(index, 1);
                await this.saveProducts(products);
            } else {
                console.log("Producto no encontrado.");
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }

    async saveProducts(products) {
        try {
            const data = JSON.stringify(products, null, 2);
            await fs.writeFile(this.path, data, 'utf8');
        } catch (error) {
            console.error("Error al guardar los productos:", error);
        }
    }
}

const productManager = new ProductManager('./products.json');

(async () => {
    const initialProducts = await productManager.getProducts();
    console.log("Productos iniciales:", initialProducts);

    const newProduct = await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    console.log("Producto agregado:", newProduct);

    const updatedProducts = await productManager.getProducts();
    console.log("Productos actualizados:", updatedProducts);

    const productId = newProduct.id;
    const foundProduct = await productManager.getProductById(productId);
    console.log("Producto encontrado por ID:", foundProduct);

    newProduct.price = 250;
    await productManager.updateProduct(productId, newProduct);
    console.log("Producto actualizado:", newProduct);

    await productManager.deleteProduct(productId);
    console.log("Producto eliminado.");

    const deletedProduct = await productManager.getProductById(productId);
    console.log("Producto eliminado encontrado por ID:", deletedProduct);
})();
