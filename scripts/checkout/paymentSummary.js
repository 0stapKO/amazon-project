import { cart, itemsInCartCount } from "../../data/cart.js"
import { getDelivery } from "../../data/deliveryOptions.js"
import { getProduct } from "../../data/products.js"
export const renderPaymentSummary = () => {
    let productsSum = 0
    let shippingSum = 0
    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId)
        const price = product.priceCents
        productsSum += price * cartItem.quantity
        console.log(getDelivery(cartItem.deliveryOption))
        shippingSum += getDelivery(cartItem.deliveryOption).priceCents
    });
    document.querySelector('.js-items-count').innerHTML = `Items (${itemsInCartCount()})`
    document.querySelector('.js-cost-items').innerHTML = `$${(productsSum/100).toFixed(2)}`
    document.querySelector('.js-cost-shipping').innerHTML = `$${(shippingSum/100).toFixed(2)}`
    document.querySelector('.js-cost-before-tax').innerHTML = `$${((productsSum+shippingSum)/100).toFixed(2)}`
    document.querySelector('.js-cost-tax').innerHTML = `$${(((productsSum+shippingSum)*0.1)/100).toFixed(2)}`
    document.querySelector('.js-cost-total').innerHTML = `$${((productsSum+shippingSum + (productsSum+shippingSum)*0.1)/100).toFixed(2)}`
}