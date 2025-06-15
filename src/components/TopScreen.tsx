import { useEffect, useRef, useState } from 'react';
import { InputForm } from './TaskInputForm.tsx';
import { TodoList } from './TodoList.tsx';
import { CompleteTodoList } from './CompleteTodoList.tsx';

// FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import type { DateClickArg } from '@fullcalendar/interaction';

export const TopScreen = () => {
    // ----------state管理----------------
    type eventObject = {
        id?: string;
        title?: string;
        start?: Date | string;
    };

    // inputform状態管理
    const [input, setInput] = useState<string>('');
    const [todoList, setTodoList] = useState<string[]>([]);

    const [events, setEvents] = useState<eventObject[]>([
        {
            id: '1', // FullCalendarが期待するのは string 型
            title: '既存イベント',
            start: '2025-06-10',
        },
    ]);

    // エラーメッセージ状態管理
    const [errorMessage, setErrorMessage] = useState<string>('');

    // useRef管理(taskinputform)
    const inputRef = useRef<HTMLInputElement>(null);

    // useRef管理(editinputform)
    const editInputRef = useRef<HTMLInputElement>(null);

    // 編集状態管理
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>('');

    // 完了状態管
    const [completeList, setCompleteList] = useState<string[]>([]);

    // ----------副作用----------------
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [editText]);

    // ----------イベント処理----------------
    //タスク入力処理
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim().length > 30) {
            setErrorMessage('30文字を超えました。');
        } else {
            setErrorMessage('');
        }
        setInput(value);
    };

    //追加ボタン処理
    const handleClick = () => {
        if (input.trim() !== '') {
            setTodoList([...todoList, input]);
            setInput('');
            setErrorMessage('');
        }
    };

    //編集ボタン処理
    const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditText(todoList[index]);
        setInput('');
    };

    //更新ボタン処理
    const handleUpdate = () => {
        if (editIndex !== null && editText.trim() !== '' && editText.length <= 30) {
            const updated = [...todoList];
            updated[editIndex] = editText;
            setTodoList(updated);
            setEditIndex(null);
            setEditText('');
        }
    };

    //削除処理
    const handleDelete = (index: number) => {
        const newList = todoList.filter((_, i) => i !== index);
        setTodoList(newList);
    };

    //キャンセル処理
    const handleCancel = () => {
        setEditIndex(null);
        setEditText('');
        setErrorMessage('');
    };

    //完了ボタン処理
    const handleComplete = (index: number) => {
        const completedTask = todoList[index];
        setCompleteList([...completeList, completedTask]);
        setTodoList(todoList.filter((_, i) => i !== index));
    };

    //削除処理
    const handleDeleteCompleted = (index: number) => {
        const newList = completeList.filter((_, i) => i !== index);
        setCompleteList(newList);
    };

    //カレンダー日付クリック
    const handleCalender = (info: DateClickArg) => {
        const dateStr = info.dateStr;
        const newEvent: eventObject = {
            id: Date.now().toString(),
            title: '新しいイベント',
            start: dateStr,
        };
        setEvents([...events, newEvent]);
    };

    return (
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
                editRef={editInputRef}
                todoList={todoList}
                handleEdit={handleEdit}
                handleUpdate={handleUpdate}
                editText={editText}
                editIndex={editIndex}
                setEditText={setEditText}
                handleDelete={handleDelete}
                handleCancel={handleCancel}
                handleComplete={handleComplete}
            />
            <CompleteTodoList
                completeList={completeList}
                handleDeleteCompleted={handleDeleteCompleted}
            />

            <FullCalendar
               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
                initialView="dayGridMonth"
                locales={[jaLocale]}
                locale="ja"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek',
                }}
                events={events}
                dateClick={handleCalender}
                editable={true}
                eventDrop={info => {
                    if (!info.event.start) return;

                    const updated = events.map(ev =>
                        ev.id === info.event.id
                            ? { ...ev, start: info.event.start as Date } // ← 型を明示
                            : ev,
                    );

                    setEvents(updated);
                }}
            />
        </>
    );
};























