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
                <h3>{isDate}にタスクを追加</h3>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="30文字以内にタスクを追加してください。"
                    onChange={handleChange}
                />
                <div className="error_massage">{errorMessage}</div>
                <button disabled={isDisabled} onClick={handleAddClick}>
                    追加
                </button>
                <button onClick={onClose}>閉じる</button>
            </div>
        </div>
    );
};
