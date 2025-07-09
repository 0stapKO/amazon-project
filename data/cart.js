export const cart = JSON.parse(localStorage.getItem('cart')) || []

const addedMessageTimeouts = {}
export const addToCart = (productId) => {
    let matchingItem
    const quantity = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value)
    cart.forEach(product => {
        if(product.productId == productId) {
            matchingItem = product
        }
    })
    if(matchingItem){
        matchingItem.quantity += quantity
    }
    else{
        cart.push({
            productId,
            quantity,
            deliveryOption: '1'
        })
    }

    saveToStorage()
}

export const updateCartQuantity = (productId) => {
        const itemAdded = document.querySelector(`.js-added-to-cart-${productId}`)
        itemAdded.classList.add('item-added')

        const previousTimeoutId = addedMessageTimeouts[productId]
        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId)
        }

        const timeoutId = setTimeout(() => {
            itemAdded.classList.remove('item-added');
        }, 2000)
        
        addedMessageTimeouts[productId] = timeoutId

        document.querySelector('.js-cart-quantity').innerHTML = itemsInCartCount()


}

export const deleteFromCart = (productId) => {
    const cartItemIndex = cart.findIndex(item => item.productId == productId)
    cart.splice(cartItemIndex, 1)
    saveToStorage()
}

export const saveToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const itemsInCartCount = () => {
    let num = 0
    cart.forEach(cartItem => {
        num += cartItem.quantity
    })
    return num
}

export const updateDeliveryOption = (productId, deliveryOption) => {
    let matchingItem

    cart.forEach(product => {
        if(product.productId == productId) {
            matchingItem = product
        }
    })

    matchingItem.deliveryOption = deliveryOption
    saveToStorage()
}