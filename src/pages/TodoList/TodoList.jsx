import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentTodo, setCurrentTodo] = useState({
    title: '',
    description: '',
    priority: 'do now',
    completed: false
  });
  const [hoveredId, setHoveredId] = useState(null);

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const openModal = (todo = null) => {
    if (todo) {
      setEditingId(todo.id);
      setCurrentTodo(todo);
    } else {
      setEditingId(null);
      setCurrentTodo({ title: '', description: '', priority: 'do now', completed: false });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setCurrentTodo({ title: '', description: '', priority: 'do now', completed: false });
  };

  const saveTodo = () => {
    if (!currentTodo.title.trim()) return;

    if (editingId) {
      setTodos(todos.map(t => t.id === editingId ? { ...currentTodo, id: editingId } : t));
    } else {
      setTodos([...todos, { ...currentTodo, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const getPrioritySize = (priority) => {
    switch(priority) {
      case 'do now': return { fontSize: '1.2rem', padding: '1rem' };
      case 'do later': return { fontSize: '1rem', padding: '0.8rem' };
      case 'do whenever': return { fontSize: '0.9rem', padding: '0.6rem' };
      default: return { fontSize: '1rem', padding: '0.8rem' };
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    const priorityOrder = { 'do now': 0, 'do later': 1, 'do whenever': 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="container">
      <style>{`
        .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem 2rem 2rem;
        min-height: auto;
        }

        .date-display {
        font-family: "Lora", serif;
        font-size: 1rem;
        color: #1E1E1E;
        margin-bottom: 0.3rem;
        }

        .title {
        font-size: 2.5rem;
        margin: 0 0 1.5rem 0;
        font-family: "Bodoni Moda", serif;
        font-weight: 600;
        color: #1E1E1E;
        }

        .todos-list {
          width: 100%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .todo-item {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, rgba(255,251,251,0.63), rgba(255,255,255,0.3));
          backdrop-filter: blur(8px);
          border-radius: 12px;
          border: 2px solid #e0e0e0;
          transition: all 0.2s ease;
          position: relative;
        }

        .todo-item:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .todo-checkbox {
          width: 24px;
          height: 24px;
          margin-left: 1rem;
          cursor: pointer;
        }

        .todo-content {
          flex: 1;
          font-family: "Raleway", sans-serif;
          color: #1E1E1E;
          margin-left: 1rem;
        }

        .todo-content.completed {
          text-decoration: line-through;
          opacity: 0.6;
        }

        .todo-title {
          margin: 0;
          font-weight: 600;
        }

        .todo-description {
          margin: 0.3rem 0 0 0;
          font-family: "Lora", serif;
          color: #555;
          font-size: 0.9em;
        }

        .todo-actions {
          display: flex;
          gap: 0.5rem;
          margin-right: 1rem;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .todo-item:hover .todo-actions {
          opacity: 1;
        }

        .action-btn {
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          border: 2px solid black;
          background-color: #FFFBB6;
          font-family: "Raleway", sans-serif;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background-color: #fff9a0;
        }

        .add-button {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #FFFBB6;
          border: 2px solid black;
          font-family: "Raleway", sans-serif;
          font-size: 2rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .add-button:hover {
          background-color: #fff9a0;
          transform: translateY(-2px);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: linear-gradient(135deg, rgba(255,251,251,0.5), rgba(255,255,255,0.2));
          backdrop-filter: blur(8px);
          border-radius: 20px;
          border: 2px solid #e0e0e0;
          padding: 2rem;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        .modal-title {
          font-family: "Bodoni Moda", serif;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #1E1E1E;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-field {
          width: 100%;
          padding: 0.8rem;
          border: none;
          border-radius: 10px;
          font-family: "Raleway", sans-serif;
          font-size: 1rem;
          background: transparent;
          resize: none;
        }

        .input-field:focus {
          outline: none;
          border-color: #1E1E1E;
        }

        .separator {
          height: 1px;
          background: #ccc;
          margin: 1.5rem 0;
        }

        .description-priority-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .description-field {
          flex: 1;
        }

        .priority-select {
          padding: 0.8rem;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-family: "Raleway", sans-serif;
          font-size: 0.9rem;
          background: rgba(255,255,255,0.8);
          cursor: pointer;
        }

        .priority-select:focus {
          outline: none;
          border-color: #1E1E1E;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .modal-btn {
          padding: 0.7rem 1.5rem;
          border-radius: 18px;
          border: 2px solid black;
          background-color: #FFFBB6;
          font-family: "Raleway", sans-serif;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-btn:hover {
          background-color: #fff9a0;
        }

        .modal-btn.cancel {
          background-color: #f0f0f0;
        }

        .modal-btn.cancel:hover {
          background-color: #e0e0e0;
        }

        .priority-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .priority-options label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .priority-options label input[value="do now"] {
          width: 24px;
          height: 24px;
        }

        .priority-options label input[value="do later"] {
          width: 18px;
          height: 18px;
        }

        .priority-options label input[value="do whenever"] {
          width: 12px;
          height: 12px;
        }

        .priority-options label input[value="do now"] ~ span {
          font-size: 1.2rem;
        }

        .priority-options label input[value="do later"] ~ span {
          font-size: 1rem;
        }

        .priority-options label input[value="do whenever"] ~ span {
          font-size: 0.9rem;
        }
          
      `}</style>
      
      <div className="date-display">{getCurrentDate()}</div>
      <h1 className="title">My To-Dos</h1>
      
      <div className="todos-list">
        {sortedTodos.map(todo => (
          <div 
            key={todo.id} 
            className="todo-item"
            style={getPrioritySize(todo.priority)}
            onMouseEnter={() => setHoveredId(todo.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <input 
              type="checkbox" 
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <div className={`todo-content ${todo.completed ? 'completed' : ''}`}>
              <p className="todo-title">{todo.title}</p>
              {todo.description && <p className="todo-description">{todo.description}</p>}
            </div>
            <div className="todo-actions">
              <button className="action-btn" onClick={() => openModal(todo)}>Edit</button>
              <button className="action-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-button" onClick={() => openModal()}>+</button>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            
            <div className="input-group">
              <input 
                type="text"
                className="input-field"
                placeholder="What do you need to do?"
                value={currentTodo.title}
                onChange={(e) => setCurrentTodo({...currentTodo, title: e.target.value})}
              />
            </div>

            <div className="separator"></div>

            <div className="description-priority-row">
              <div className="description-field">
                <textarea
                  className="input-field"
                  placeholder="Description (optional)"
                  value={currentTodo.description}
                  onChange={(e) => setCurrentTodo({...currentTodo, description: e.target.value})}
                />
              </div>
              <div className="priority-options">
                {['do now', 'do later', 'do whenever'].map(priority => (
                  <label key={priority}>
                    <input 
                      type="radio" 
                      name="priority"
                      value={priority}
                      checked={currentTodo.priority === priority}
                      onChange={(e) => setCurrentTodo({...currentTodo, priority: e.target.value})}
                    />
                    <span>{priority === 'do now' ? 'DO NOW' : priority === 'do later' ? 'DO NEXT' : 'DO WHENEVER'}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={closeModal}>Cancel</button>
              <button className="modal-btn" onClick={saveTodo}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}