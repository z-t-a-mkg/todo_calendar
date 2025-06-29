import type { TaskModalProps } from '../Type/Types';

export const TaskModal = ({
    inputRef,
    isOpen,
    isDate,
    inputTask,
    onClose,
    handleChange,
    handleAddClick,
    errorMessage,
}: TaskModalProps) => {
    // isModalOpenがfalseの場合はmodal非表示
    if (!isOpen) return null;

    //Disabled制御
    const isDisabled = errorMessage !== null || inputTask === '';

    return (
        <div className="modal-overlay">
            <div className="modal_content">
                <div className="close-btn" onClick={onClose}>
                </div>

                <h3>{isDate}にタスクを追加</h3>
                <div className="task-box">
                    <p className='item'>予定</p>
                    <input id="task"
                        ref={inputRef}
                        type="text"
                        placeholder="30文字以内にタスクを追加してください。"
                        onChange={handleChange}
                    />
                    <div className="error_massage" style={{'color':'red'}}>{errorMessage}</div>
                </div>
                <div className="nonflex-btn">
                    <button disabled={isDisabled} onClick={handleAddClick}>
                        追加
                    </button>
                </div>
            </div>
        </div>
    );
};
