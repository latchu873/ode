// File: src/components/HUD.jsx
import { useTaskStore } from '../store/taskStore'
// import './HUD.css'

export default function HUD() {
  const { currentTask, taskList } = useTaskStore()

  return (
    <div className="hud">
      <div className="minimap">🗺️ Minimap (placeholder)</div>
      <div className="task-checklist">
        <h3>Tasks</h3>
        <ul>
          {taskList.map((task, i) => (
            <li key={i} className={i === currentTask ? 'active' : i < currentTask ? 'done' : ''}>
              {task.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
