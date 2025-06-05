import React from 'react';

type Props = {
    completeList: string[];
    handleDeleteCompleted: (index: number) => void;
};

export const CompleteTodoList: React.FC<Props> = ({ completeList, handleDeleteCompleted }) => {
    return (
        <>
            <h2>完了したタスク</h2>
            <div className="completeList">

                {completeList.map((todo, index) => (
                    <div className="TodoListBox" key={index}>
                        <div className="todoListBox">
                            <div className="todoList">{todo}</div>
                            <button
                                className="deleteBtn"
                                onClick={() => handleDeleteCompleted(index)}
                            >
                                削除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
