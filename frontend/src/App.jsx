import React, { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos'

function App() {
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            setLoading(true)
            const response = await fetch(API_URL)
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            console.error('Error fetching todos:', error)
            alert('Failed to fetch todos')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim()) {
            alert('Please enter a title')
            return
        }

        try {
            if (editingId) {
                // Update existing todo
                const response = await fetch(`${API_URL}/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        description,
                    }),
                })
                if (response.ok) {
                    fetchTodos()
                    setTitle('')
                    setDescription('')
                    setEditingId(null)
                }
            } else {
                // Create new todo
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        description,
                    }),
                })
                if (response.ok) {
                    fetchTodos()
                    setTitle('')
                    setDescription('')
                }
            }
        } catch (error) {
            console.error('Error saving todo:', error)
            alert('Failed to save todo')
        }
    }

    const handleToggleComplete = async (id, completed) => {
        try {
            const todo = todos.find(t => t._id === id)
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: todo.title,
                    description: todo.description,
                    completed: !completed,
                }),
            })
            if (response.ok) {
                fetchTodos()
            }
        } catch (error) {
            console.error('Error updating todo:', error)
            alert('Failed to update todo')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this todo?')) {
            return
        }
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                fetchTodos()
            }
        } catch (error) {
            console.error('Error deleting todo:', error)
            alert('Failed to delete todo')
        }
    }

    const handleEdit = (todo) => {
        setTitle(todo.title)
        setDescription(todo.description)
        setEditingId(todo._id)
    }

    const handleCancel = () => {
        setTitle('')
        setDescription('')
        setEditingId(null)
    }

    return (
        <div className="app">
            <div className="container">
                <h1>Todo App</h1>

                <form onSubmit={handleSubmit} className="todo-form">
                    <input
                        type="text"
                        placeholder="Todo title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-title"
                    />
                    <textarea
                        placeholder="Description (optional)..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-description"
                        rows="3"
                    />
                    <div className="form-actions">
                        {editingId ? (
                            <>
                                <button type="submit" className="btn btn-primary">Update Todo</button>
                                <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                            </>
                        ) : (
                            <button type="submit" className="btn btn-primary">Add Todo</button>
                        )}
                    </div>
                </form>

                {loading ? (
                    <div className="loading">Loading todos...</div>
                ) : (
                    <div className="todos-list">
                        {todos.length === 0 ? (
                            <div className="empty-state">No todos yet. Add one above!</div>
                        ) : (
                            todos.map((todo) => (
                                <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                    <div className="todo-content">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => handleToggleComplete(todo._id, todo.completed)}
                                            className="todo-checkbox"
                                        />
                                        <div className="todo-text">
                                            <h3 className={todo.completed ? 'strikethrough' : ''}>{todo.title}</h3>
                                            {todo.description && (
                                                <p className={todo.completed ? 'strikethrough' : ''}>{todo.description}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="todo-actions">
                                        <button
                                            onClick={() => handleEdit(todo)}
                                            className="btn btn-edit"
                                            disabled={todo.completed}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(todo._id)}
                                            className="btn btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
