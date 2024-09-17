import { ICartItem } from '../../types';

export interface ITruck {
    id: number
    truckNumber: number
    capacity: number
    minLoad: number
}

export interface ITruckState extends ITruck {
    items: ICartItem[]
}

export interface ITrucksState {
    selectedTruckId: number | null
    trucks: ITruckState[]
    nextTruckNumber: number
}
