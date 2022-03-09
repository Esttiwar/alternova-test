export default function ProductCard(productInfo, imageIndex) {
  this.product = {...productInfo}
  this.selectedStock = 0

  this.setStock = (e,stockDefault) => {
    return this.selectedStock = e.target.value
    stockDefault -= this.selectedStock
    console.log(this.selectedStock)
    console.log(stockDefault)
  }

  this.productToCart = () => {

    console.log(typeof this.product.name)
    
    const $containerProducts = document.querySelector(".products")

    const $orders = document.createElement("div")
    $orders.className = "orders display flex justify-between py-3 my-6"

    const $product = document.createElement("h3")
    $product.textContent = this.product.name.slice(0, 8);

    const $quantity = document.createElement("h3")
    $quantity.textContent = this.product.unit_price

    const $unitPrice = document.createElement("h3")
    $unitPrice.textContent = this.product.unit_price;

    const $totalPrice = document.createElement("h3")
    $totalPrice.textContent = this.product.unit_price;

    $orders.append($product, $quantity, $unitPrice, $totalPrice)

    $containerProducts.appendChild($orders)

  }

  this.render = () => {
    const $stockContainer = document.querySelector(".store__stock")
    const $containerCard = document.createElement("div");
    $containerCard.className = "card mt-8 mx-8";
    $containerCard.style = "width:250px; height:370px";

    const $image = document.createElement("img");
    $image.style = "height:12rem";
    $image.className = "card-img";
    $image.src = `../images/img${imageIndex + 1}.png`;

    const $cardBody = document.createElement("div");
    $cardBody.className = "card-body";

    const $cardTitle = document.createElement("h5");
    $cardTitle.className = "card-title";
    $cardTitle.textContent = this.product.name;

    const $cardStock = document.createElement("h5");
    $cardStock.className = "card-stock";
    $cardStock.textContent = this.product.stock ? `Stock: ${this.product.stock}`: "No hay stock";

    const $cardPrice = document.createElement("h5");
    $cardPrice.className = "card-price";
    $cardPrice.textContent = `Precio: ${this.product.unit_price}`

    const $cardInput = document.createElement("input");
    $cardInput.style = "width:55px";
    $cardInput.className = "card-input"
    $cardInput.setAttribute("type","number")
    $cardInput.min = 0
    $cardInput.max = `${this.product.stock}`
    $cardInput.addEventListener("change", this.setStock)

    const $cardButton = document.createElement("button");
    $cardButton.className = "btn";
    $cardButton.addEventListener("click", this.productToCart)
    // $cardButton.setAttribute("href","#");
    $cardButton.innerHTML = "Add to cart";

    $cardBody.append($cardTitle, $cardInput, $cardStock, $cardPrice, $cardButton);
    $containerCard.append($image, $cardBody);

    $stockContainer.appendChild($containerCard)
  }
}