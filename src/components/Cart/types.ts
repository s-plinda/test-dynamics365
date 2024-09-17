export interface ICartProps {
    cartItems: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        imagePath: string;
    }[];
    totalPrice: number;
}
