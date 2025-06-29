//タスク（イベント）型
export type eventType = {
    id: string;
    title: string;
    date: string;
};

//追加モーダル用
export type TaskModalProps = {
    isOpen: boolean;
    isDate: string;
    errorMessage: string | null;
    inputTask: string;
    handleAddClick?: () => void;
    onClose: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
};

//編集モーダル用
export type EditTaskFormProps = {
    isOpen: boolean;
    editTask: eventType | null;
    errorMessage: string | null;
    setEditTask: React.Dispatch<React.SetStateAction<eventType | null>>;
    onClose: () => void;
    onSubmit: () => void;
    onDelete: () => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    handleSubmitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};



























