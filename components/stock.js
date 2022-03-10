import DATA from "../data/store.js"
import productCard from "./product-card.js"

export default function Stock() {
  this.getImageIndex = (index) => {
    if (index <= 3) {
      return index
    }
    return Math.floor(Math.random() * (3 - 0 + 1) + 0)
  }

  this.load = () => {
      DATA.products.forEach((product, index) => {
      const imageIndex = this.getImageIndex(index)
      const p = new productCard(product, imageIndex)
      p.render()
    })
  }

 
}
