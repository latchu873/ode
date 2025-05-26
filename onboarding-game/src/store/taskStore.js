// File: src/store/taskStore.js
import { create } from 'zustand'

export const useTaskStore = create((set) => ({
  currentTask: 0,
  taskList: [
    { name: 'Collect assets' },
    { name: 'View onboarding presentation' },
    { name: 'Submit onboarding forms' },
    { name: 'Install mobile apps' },
    { name: 'Complete assessment' },
  ],
  completeTask: (index) =>
    set((state) => {
      if (state.currentTask === index && index < state.taskList.length) {
        return { currentTask: state.currentTask + 1 }
      }
      return state
    }),
}))
