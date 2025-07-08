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
            quantity
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

        let totalQuantity = 0
        cart.forEach(item => totalQuantity += item.quantity)
        document.querySelector('.js-cart-quantity').innerHTML = totalQuantity
}

export const deleteFromCart = (productId) => {
    const cartItemIndex = cart.findIndex(item => item.productId == productId)
    cart.splice(cartItemIndex, 1)
    saveToStorage()
}

const saveToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
}