import productCard from './components/product-card.js'

/*
  0 => 0
  1 => 1
  2 => 2
  3 => 3
  4 => 0
  5 => 1
  6 => 2
  7 => 3
  8 => 0
  9 => 1
*/

(() => {
  function getImageIndex(index) {
    if (index <= 3) {
      return index
    }
    return Math.floor(Math.random() * (3 - 0 + 1) + 0)
  }

  function loadStock({ products }) {
    products.forEach((product, index) => {
      const imageIndex = getImageIndex(index)
      const p = new productCard(product, imageIndex)
      p.render()
    })
  }

  function getStock() {
    fetch('./data/store.json')
      .then(d => d.json())
      .then((stock) => {
        loadStock(stock)
      })
  }

  getStock()
})()
