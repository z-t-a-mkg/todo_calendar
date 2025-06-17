export type eventType ={
        id:string;
        title:string;
        date:string;
        };


export type TaskModalProps = {
    isOpen: boolean;
    isDate: string;
    errorMessage: string | null;
    inputTask:string;
    handleAddClick:()=>void;
    onClose: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
};
