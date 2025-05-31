import { useEffect, useRef, useState } from "react"
import { InputForm } from "./TaskInputForm";

export const Parent =() => {
    const [input , setInput] = useState<string>("");
    const [TodoList , setTodoList] = useState<string[]>([]);
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
    };



    //onClick処理
    const handleClick = () => {
        if (input.trim() !== "") {
            setTodoList([...TodoList, input]);
            setInput("");
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    },[]);

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

        </>


    )
}