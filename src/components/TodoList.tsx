import React, { useState } from 'react';

interface TodoListProps {
  todos: string[];
  removeTodo: (index: number) => void;
  editTodo: (index: number, updatedTodo: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, removeTodo, editTodo }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEdit = (index: number, todo: string) => {
    setEditIndex(index);
    setEditValue(todo);
  };

  const handleSave = (index: number) => {
    if (editValue.trim() !== '') {
      editTodo(index, editValue);
      setEditIndex(null);
      setEditValue('');
    }
  };

  return (
    <div className="list-container">
      {todos.map((todo, index) => (
        <div key={index} className="list-item">
          <div>{todo}</div>
          <div className="list-item-buttons">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button className="edit-button" onClick={() => handleSave(index)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <button className="edit-button" onClick={() => handleEdit(index, todo)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => removeTodo(index)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}

    </div>
  );
};

export default TodoList;
