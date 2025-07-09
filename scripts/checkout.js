import { cart, deleteFromCart, itemsInCartCount, saveToStorage, updateDeliveryOption} from '../data/cart.js'
import { products } from '../data/products.js'
import { formatCurrency } from './utils/money.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions } from '../data/deliveryOptions.js'


const deliveryOptionsHTML = (cartItem) =>{
  const today = dayjs()
  let html = ''
  deliveryOptions.forEach(deliveryOption => {
    const deliveryDate = today.add(deliveryOption.days, 'days')
    const priceString = deliveryOption.priceCents ? `$${formatCurrency(deliveryOption.priceCents)} -` : 'FREE'
    const isChecked = deliveryOption.id == cartItem.deliveryOption
    html += 
    `
    <div class="delivery-option js-delivery-option" data-product-id="${cartItem.productId}" data-delivery-option="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${cartItem.productId}">
        <div>
            <div class="delivery-option-date">
              ${deliveryDate.format('dddd, MMMM D')}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
        </div>
      </div>
      `
  })
  
  return html
}

const loadCartItems = () => {
    let productsHTML = ''
    const today = dayjs()
    cart.forEach(cartItem => {
      const product = products.filter(productItem => productItem.id == cartItem.productId)[0]

      const deliveryOption = cartItem.deliveryOption

      let deliveryDate = dayjs()
      switch(cartItem.deliveryOption){
        case '1': deliveryDate = deliveryDate.add(7, 'days'); break
        case '2': deliveryDate = deliveryDate.add(3, 'days'); break
        case '3': deliveryDate = deliveryDate.add(1, 'days'); break
        default: deliveryDate = deliveryDate.add(7);
      }
      deliveryDate = deliveryDate.format('dddd, MMMM D')
      const html = `
      <div class="cart-item-container-${product.id}">
        <div class="delivery-date js-delivery-date-${product.id}">
          ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-price">
              $${formatCurrency(product.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${product.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${product.id}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${product.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary" data-product-id="${product.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(cartItem)}
          </div>
        </div>
      `

      productsHTML += html
    })

    document.querySelector('.order-summary').innerHTML = productsHTML

    document.querySelector('.return-to-home-link').innerHTML = `${itemsInCartCount()} items`

    document.querySelectorAll('.js-delivery-option')
    .forEach(element => {
      element.addEventListener('click', () => {
        const {productId, deliveryOption} = element.dataset 
        updateDeliveryOption(productId, deliveryOption)
      })
    })


    document.querySelectorAll(`.delete-quantity-link`)
    .forEach(link => {
        link.addEventListener('click', () => {
        const productId = link.dataset.productId
        deleteFromCart(productId)
        loadCartItems()
        })
    })

    document.querySelectorAll('.js-update-link')
    .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId
      console.log(productId)

      const container = document.querySelector(
        `.cart-item-container-${productId}`
      )
      container.classList.add('is-editing-quantity')
    })
  })


  document.querySelectorAll('.js-save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId

      const container = document.querySelector(
        `.cart-item-container-${productId}`
      )
      container.classList.remove('is-editing-quantity')

      const newProductNum = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
      cart.forEach(cartItem => {
        if(cartItem.productId == productId){
            cartItem.quantity = newProductNum
            saveToStorage()
            return
        }
      })
      loadCartItems()
    })
  })
}

loadCartItems()

