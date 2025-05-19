import { create } from 'zustand'

const useAppStore = create((set) => ({
  isAppOpened: false,
  setIsAppOpened: (value) => set({ isAppOpened: value }),
  
}))

export default useAppStore 