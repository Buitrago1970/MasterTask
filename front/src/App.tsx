import './App.css'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { TaskProvider } from './context/TaskContext';
import { useState } from 'react'
import useIsDesktop840 from './hooks/useIsDesktop840';

function App() {
  const [showForm, setShowForm] = useState(false)
  const isDesktop = useIsDesktop840();
  return (
    <TaskProvider>
      <div className="min-h-screen bg-[#a0a3bb] flex flex-col">
        <div className="w-full bg-[#556ee6] py-6 px-8">
          <h1 className="text-4xl font-bold text-white text-justify">TaskMaster</h1>
        </div>
        {isDesktop ? (
          <div className="flex flex-row relative transition-all duration-300 w-full border border-[#e3e8ee] rounded-xl shadow bg-white" style={{ minHeight: 400 }}>
            {/* Task List */}
            <div className={`${showForm ? 'w-[70%]' : 'w-full'} h-full bg-white p-8 transition-all duration-300`}>
              <TaskList />
            </div>
            {/* Task Form Side Drawer */}
            <div
              className={`transition-all duration-300 overflow-hidden ${showForm ? 'w-[30%] opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-8'} h-full bg-[#f6f9fc] border-l border-[#e3e8ee] shadow-lg`}
              style={{ minWidth: showForm ? 320 : 0 }}
            >
              {showForm && (
                <div className="p-8 h-full flex flex-col">
                  <TaskForm onClose={() => setShowForm(false)} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col relative transition-all duration-300 w-full border border-[#e3e8ee] rounded-xl shadow bg-white" style={{ minHeight: 400 }}>
            {/* Task Form above */}
            <div className={`transition-all duration-300 overflow-hidden ${showForm ? 'w-full opacity-100 translate-y-0' : 'w-0 opacity-0 translate-y-8'} h-full bg-[#f6f9fc] border-b border-[#e3e8ee] shadow-lg`}>
              {showForm && (
                <div className="p-8 h-full flex flex-col">
                  <TaskForm onClose={() => setShowForm(false)} />
                </div>
              )}
            </div>
            {/* Task List below */}
            <div className="w-full h-full bg-white p-8 transition-all duration-300">
              <TaskList />
            </div>
          </div>
        )}
        {/* Floating button*/}
        <button
          className="fixed bottom-8 z-40 bg-[#556ee6] hover:bg-[#4156b6] text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-lg transition-all"
          style={{ right: showForm && isDesktop ? 340 : 32, transition: 'right 0.3s' }}
          onClick={() => setShowForm(f => !f)}
          aria-label={showForm ? 'Close form' : 'Add task'}
        >
          <span className="pointer-events-none select-none">{showForm ? '×' : '+'}</span>
        </button>
      </div>
    </TaskProvider>
  )
}

export default App