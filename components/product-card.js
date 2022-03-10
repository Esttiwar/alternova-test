const IMAGES = [
  "https://tiendatellevo.com/wp-content/uploads/2021/05/U5d202acd9077442e8130ad130e071e3cv.jpg",
  "https://www.comedera.com/wp-content/uploads/2019/11/arroz-blanco-cocido-500x375.jpg",
  "https://larebajavirtual.com/images/productos/sii/F/300x300/papa_margarita_limon-59097-1567544565.png",
  "https://static.diariovasco.com/www/multimedia/201906/03/media/cortadas/carne-roja-kS1C-R5uqUSGFlSqj84mn1I9bQuN-624x385@Diario%20Vasco.jpg"
]

export default function ProductCard(productInfo, imageIndex) {
  this.product = {...productInfo}
  this.selectedStock = this.product.stock > 0 ? 1 : 0


  this.setStock = (e) => {
    this.selectedStock = e.target.value

    this.update()
  }

  this.calculateNewStock = () => {
    if (this.product.stock >= this.selectedStock) {
      this.product.stock -= this.selectedStock
      this.selectedStock = this.product.stock === 0 ? 0 : 1

      this.update()
    }
  }


  this.addToCart = () => {
    if (this.product.stock >= this.selectedStock) {
      const bc = new BroadcastChannel('addProduct')

      bc.postMessage({
        name: this.product.name,
        quantity: Number(this.selectedStock),
        price: this.product.unit_price
      })

    } else {
      alert('No puede agregar ...')
    }
    this.calculateNewStock()
  }

  this.update = () => {
    this.$cardStock.textContent = this.product.stock ? `Stock: ${this.product.stock}`: "No hay stock";
    this.$cardButton.disabled = this.product.stock === 0 || Number(this.selectedStock) === 0;
    this.$cardInput.disabled = this.product.stock === 0;
    this.$cardInput.value = this.selectedStock;
    this.$cardInput.max = this.product.stock;

    this.$cardBody.append(
      this.$cardTitle,
      this.$cardInput,
      this.$cardStock,
      this.$cardPrice,
      this.$cardButton
    );
  }

  this.render = () => {
    this.$stockContainer = document.querySelector(".store__stock")
    this.$containerCard = document.createElement("div");
    this.$containerCard.className = "card mt-8 mx-8";
    this.$containerCard.style = "width:250px; height:370px";

    this.$image = document.createElement("img");
    this.$image.style = "height:12rem";
    this.$image.className = "card-img";
    this.$image.src = `images/img${imageIndex + 1}.png`;

    this.$cardBody = document.createElement("div");
    this.$cardBody.className = "card-body";

    this.$cardTitle = document.createElement("h5");
    this.$cardTitle.className = "card-title";
    this.$cardTitle.textContent = this.product.name;

    this.$cardStock = document.createElement("h5");
    this.$cardStock.className = "card-stock";
    this.$cardStock.textContent = this.product.stock ? `Stock: ${this.product.stock}`: "No hay stock";

    this.$cardPrice = document.createElement("h5");
    this.$cardPrice.className = "card-price";
    this.$cardPrice.textContent = `Precio: ${this.product.unit_price}`

    this.$cardInput = document.createElement("input");
    this.$cardInput.disabled = this.product.stock === 0;
    this.$cardInput.style = "width:55px";
    this.$cardInput.className = "card-input"
    this.$cardInput.setAttribute("type","number")
    this.$cardInput.min = 0
    this.$cardInput.max = `${this.product.stock}`
    this.$cardInput.value = this.selectedStock
    this.$cardInput.addEventListener("change", this.setStock)


    this.$cardButton = document.createElement("button");
    this.$cardButton.className = "btn";
    this.$cardButton.disabled = this.product.stock === 0;
    this.$cardButton.addEventListener("click", this.addToCart)
    this.$cardButton.innerHTML = "Add to cart";

    this.$cardBody.append(
      this.$cardTitle,
      this.$cardInput,
      this.$cardStock,
      this.$cardPrice,
      this.$cardButton
    );
    this.$containerCard.append(this.$image, this.$cardBody);
    this.$stockContainer.appendChild(this.$containerCard)
  }
}