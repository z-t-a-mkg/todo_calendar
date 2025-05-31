import React from "react";

type Props = {
    todoList: string[];
    handleEdit: (index: number) => void;
    handleDelete: (index: number) => void;
    handleUpdate: () => void;
    editIndex: number | null;
    editText: string;
    setEditText: (text: string) => void;



};

export const TodoList: React.FC<Props> = ({
  todoList,
  handleEdit,
  handleDelete,
  handleUpdate,
  editIndex,
  editText,
  setEditText,
}) => {
  const isInvalid = editText.trim() === "" || editText.length > 30;

  return (
    <div className="todoListContainer">
      {todoList.map((todo, index) => (
        <div  key={index}>
          {editIndex === index ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={handleUpdate} disabled={isInvalid}>
                更新
              </button>
              {editText.length > 30 && (
                <p style={{ color: "red" }}>30文字を超えました</p>
              )}
            </>
          ) : (
            <>
            <div className="todoList">
                <div>{todo}</div>
                <button onClick={() => handleEdit(index)}>編集</button>
                <button onClick={() => handleDelete(index)}>削除</button>
            </div>

            </>
          )}
        </div>
      ))}
    </div>
  );
};
