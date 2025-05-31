import { useEffect, useRef, useState } from "react"
import { InputForm } from "./TaskInputForm";
import { TodoList } from "./TodoList.tsx";


export const Parent =() => {

    useEffect(() => {
        inputRef.current?.focus();
    },[]);


    // inputform状態管理
    const [input , setInput] = useState<string>("");
    const [todoList , setTodoList] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    //onChange処理
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim().length > 30) {
            setErrorMessage("30文字を超えました。");
        } else {
            setErrorMessage("");
        }
            setInput(value);
    };

    //onClick処理
    const handleClick = () => {
        if (input.trim() !== "") {
            setTodoList([...todoList, input]);
            setInput("");
            setErrorMessage("");
        }
    };

    // 編集状態管理
    const [editIndex , setEditIndex] = useState<number | null>(null);
    const [editText , setEditText] = useState<string>("");


    const handleEdit = (index:number) => {
        setEditIndex(index);
        setEditText(todoList[index]);
    };

    const handleUpdate = () => {
        if (editIndex !== null && editText.trim() !== "" && editText.length <= 30) {
            const updated = [...todoList];
            updated[editIndex] = editText;
            setTodoList(updated);
            setEditIndex(null);
            setEditText("");
        }
    };

    // 削除状態管理
    const [deleteIndex , setDeleteIndex] = useState<number | null>(null);


    const handleDelete = (index: number) => {
        const newList = todoList.filter((_, i) => i !== index);
        setTodoList(newList);
    };




    return(
        <>
            <InputForm
                myRef={inputRef}
                value={input}
                onChange={handleChange}
                onClick={handleClick}
                placeholder="30文字以内でTODOを入力"
                errMes={errorMessage}
            />
            <TodoList
                todoList={todoList}
                handleEdit={handleEdit}
                handleUpdate={handleUpdate}
                editText = {editText}
                editIndex = {editIndex}
                setEditText = {setEditText}
                handleDelete = {handleDelete}
            />
        </>



    )
}
