// File: src/components/TaskManager.jsx
import { useEffect } from 'react'
import { useTaskStore } from '../store/taskStore'

export default function TaskManager() {
  const { currentTask, completeTask } = useTaskStore()

  useEffect(() => {
    const handleInteract = (e) => {
      if (e.key === 'e') {
        completeTask(currentTask)
      }
    }
    window.addEventListener('keydown', handleInteract)
    return () => window.removeEventListener('keydown', handleInteract)
  }, [currentTask, completeTask])

  return null
}
