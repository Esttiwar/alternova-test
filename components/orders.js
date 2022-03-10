const $containerProducts = document.querySelector(".products")
const $totalPrice = document.querySelector(".total-price")
const $createOrderButton = document.querySelector(".crear-orden")

export default function Orders() {
  this.items = []

  this.load = () => {
    const bc = new BroadcastChannel('addProduct')
    bc.onmessage = ({ data }) => {
      this.addItem(data)
    }

    $createOrderButton.disabled = this.items.length === 0

    $createOrderButton.addEventListener('click', () => {
      this.printOrder()
    })
  }

  this.addItem = (productItem) => {
    const newItem = {
      ...productItem,
      total: productItem.price * productItem.quantity
    }

    const foundIndex = this.items.findIndex(({ name }) => name === newItem.name)

    if (foundIndex >= 0) {
      this.items[foundIndex].total += newItem.total;
      this.items[foundIndex].quantity += newItem.quantity;
    } else {
      this.items.push(newItem)
    }

    $containerProducts.innerHTML = ''
    this.items.forEach(this.render)

    this.totalPrice = this.items.reduce((prev, curr) => prev + curr.total, 0)
    $totalPrice.innerHTML = this.totalPrice

    $createOrderButton.disabled = this.items.length === 0
  }

  this.render = (productItem) => {
    const $orders = document.createElement("div")
    $orders.className = "orders display flex justify-between py-3 my-6"

    const $product = document.createElement("h3")
    $product.textContent = productItem.name.slice(0, 8);

    const $quantity = document.createElement("h3")
    $quantity.textContent = productItem.quantity

    const $unitPrice = document.createElement("h3")
    $unitPrice.textContent = productItem.price;

    const $totalPrice = document.createElement("h3")
    $totalPrice.textContent = productItem.total;

    $orders.append($product, $quantity, $unitPrice, $totalPrice)

    $containerProducts.appendChild($orders)
  }

  this.printOrder = () => {
    if (this.items.length) {
      console.log(`
      Orden exitosa
      ====================
      Precio total: ${this.totalPrice}

      Detalles
      ====================
      ${JSON.stringify(this.items, undefined, 4)}
      `)
    }
  }
}
