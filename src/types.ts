export interface IProduct {
    id: number
    name: string
    imagePath: string
    price: number
    unitWeigth: number
}

export interface ICartItem extends IProduct{
    quantity: number
}
