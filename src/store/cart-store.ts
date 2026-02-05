import { create } from 'zustand'

interface CartStore {
    items: number[]
    addItem: (id: number) => void
    removeItem: (id: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    addItem: (id) => set((state) => {
        if(state.items.includes(id)) return state
        return { items: [...state.items, id] }
    }),
    removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item !== id)
    }))
}))