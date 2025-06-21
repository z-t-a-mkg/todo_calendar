import type { EditTaskFormProps } from '../Type/Types';

export const EditTaskForm = ({
  inputRef,
  isOpen,
  editTask,
  setEditTask,
  onClose,
  onSubmit,
}: EditTaskFormProps) => {
  if (!isOpen || !editTask) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditTask(prev => (prev ? { ...prev, title: value } : prev));
  };

  return (
    <div className="modal-overlay">
      <div className="modal_content">
        <h3>{editTask.date} のタスク編集</h3>
        <input
          ref={inputRef}
          value={editTask.title}
          onChange={handleChange}
        />
          <button onClick={onSubmit}>更新</button>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};
