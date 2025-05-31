import React from "react";

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
    value: string;
    placeholder: string;
    myRef: React.RefObject<HTMLInputElement>;
    errMes: string;
};


export const InputForm : React.FC<Props> = ({
    onChange,onClick,
    value,
    placeholder,
    myRef,
    errMes}) => {
    const isInvalid = value.trim() === "" || value.trim().length > 30;
    return(
        <>
            <div>
                <input
                    placeholder={placeholder}
                    type="text"
                    onChange={onChange}
                    ref={myRef}
                    value={value}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !isInvalid) onClick();
                    }}
                />
                <button onClick={onClick} disabled={isInvalid}>追加</button>
                    {errMes && <p style={{ color: "red" }}>{errMes}</p>}
            </div>
        </>

    );
}
