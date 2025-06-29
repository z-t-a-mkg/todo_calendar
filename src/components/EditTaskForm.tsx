import type { EditTaskFormProps } from '../Type/Types';

export const EditTaskForm = ({
    inputRef,
    isOpen,
    editTask,
    errorMessage,
    handleSubmitChange,
    onClose,
    onSubmit,
    onDelete,
}: EditTaskFormProps) => {
    if (!isOpen || !editTask) return null;




    //Disabled制御
    const isDisabled = errorMessage !== null || editTask.title === '';

    return (
        <div className="modal-overlay">
            <div className="modal_content">
                <div className="close-btn" onClick={onClose}></div>
                <h3>{editTask.date} のタスク編集</h3>
                <div className="task-box">
                    <p className="item">予定</p>

                    <input
                        id="task"
                        ref={inputRef}
                        value={editTask.title}
                        onChange={handleSubmitChange}
                    />
                    <div className="error_massage" style={{ color: 'red' }}>
                        {errorMessage}
                    </div>
                </div>
                <div className="flex-btn">
                    <button disabled={isDisabled} onClick={onSubmit}>更新</button>
                    <button onClick={onDelete}>削除 </button>
                </div>
            </div>
        </div>
    );
};
