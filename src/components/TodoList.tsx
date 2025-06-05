import React from 'react';

type Props = {
    todoList: string[];
    handleEdit: (index: number) => void;
    handleDelete: (index: number) => void;
    handleUpdate: () => void;
    editIndex: number | null;
    editText: string;
    setEditText: (text: string) => void;
    handleCancel: () => void;
    handleComplete: (index: number) => void;
    editRef: React.RefObject<HTMLInputElement>;
};

export const TodoList: React.FC<Props> = ({
    todoList,
    handleEdit,
    handleDelete,
    handleUpdate,
    editIndex,
    editText,
    setEditText,
    handleCancel,
    handleComplete,
    editRef,
}) => {
    const isInvalid = editText.trim() === '' || editText.length > 30;

    return (
        <>
            <h2>登録されたタスク</h2>
            <div className="todoListContainer">
                {todoList.map((todo, index) => (
                    <div className="TodoListBox" key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    className="editForm"
                                    value={editText}
                                    onChange={e => setEditText(e.target.value)}
                                    ref={editRef}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && !isInvalid) handleUpdate();
                                    }}
                                />
                                <button
                                    className="updateBtn"
                                    onClick={handleUpdate}
                                    disabled={isInvalid}
                                >
                                    更新
                                </button>
                                <button className="cancelBtn" onClick={handleCancel}>
                                    戻る
                                </button>

                                {editText.length > 30 && (
                                    <p style={{ color: 'red' }}>30文字を超えました</p>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="todoListBox">
                                    <div className="todoList">{todo}</div>
                                    <button className="editBtn" onClick={() => handleEdit(index)}>
                                        編集
                                    </button>
                                    <button
                                        className="editBtn"
                                        onClick={() => handleComplete(index)}
                                    >
                                        完了
                                    </button>
                                    <button
                                        className="deleteBtn"
                                        onClick={() => handleDelete(index)}
                                    >
                                        削除
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};
