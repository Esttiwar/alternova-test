import Stock from "./stock.js"
import Orders from "./orders.js"

export default function App() {
  this.stock = new Stock()
  this.orders = new Orders()

  this.load = () => {
    this.stock.load()
    this.orders.load()
  }
}
