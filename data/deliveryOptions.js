export const deliveryOptions = [
    {
        id: '1',
        days: 7,
        priceCents: 0
    },
    {
        id: '2',
        days: 3,
        priceCents: 499
    },
    {
        id: '3',
        days: 1,
        priceCents: 999
    },
]


export const getDelivery = (deliveryOptionId) => {
    let delivery
    deliveryOptions.forEach(deliveryOption => {
        if(deliveryOption.id === deliveryOptionId){
            console.log(deliveryOption)
            delivery = deliveryOption
            return
        }
    })
    return delivery
}