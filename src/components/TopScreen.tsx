import { useEffect, useRef, useState } from 'react';
import type { eventType } from '../Type/Types';

// FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import type { DateClickArg } from '@fullcalendar/interaction';
import { TaskModal } from './TaskInputForm';
import { EditTaskForm } from './EditTaskForm';
import type { EventClickArg } from '@fullcalendar/core';

export const TopScreen = () => {
    // ----------state管理----------------
    const [isModalOpen, setIsModalOpen] = useState(false); // modal開閉管理
    const [selectedDate, setSelectedDate] = useState<string>(''); // どの日付をクリックしたか
    const [events, setEvents] = useState<eventType[]>([]); //カレンダーイベント管理
    const [inputTask, setInputTask] = useState<string>(''); //インプットフォーム管理
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // バリデーションメッセージ
    const ref = useRef<HTMLInputElement>(null); //入力時フォーカス

    const [editTask, setEditTask] = useState<eventType | null>(null); //タスク編集
    const [isEditing, setIsEditing] = useState(false);

    // ----------副作用----------------

    // タスク入力フォームにフォーカス
    useEffect(() => {
        if (isModalOpen) {
            ref.current?.focus();
        }
    }, [isModalOpen]);

    // ----------カレンダー処理----------------

    // 日付クリック(登録)
    const handleCalender = (info: DateClickArg) => {
        setSelectedDate(info.dateStr);
        setIsEditing(false); //編集モード解除
        setIsModalOpen(true);
    };

    // タスクアイコンクリック(編集用)
    const handleEditTask = (info: EventClickArg) => {
        setEditTask({
            id: info.event.id,
            title: info.event.title,
            date: info.event.start?.toISOString().slice(0, 10) ?? '',
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    // ----------タスク入力----------------

    // タスク「追加ボタン」クリック処理
    const handleAddClick = (): void => {
        setEvents([
            ...events,
            {
                id: Math.random().toString(10).slice(2, 8),
                title: inputTask,
                date: selectedDate,
            },
        ]);
        setIsModalOpen(false);
        setInputTask('');
        setErrorMessage(null);
    };

    // フォームバリデーション
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputTask(value);

        if (value.length > 30) {
            setErrorMessage('30文字を超えました');
        } else {
            setErrorMessage(null);
        }
    };

    // タスク入力フォームmodal閉じる処理
    const handleClose = () => {
        setIsModalOpen(false);
        setInputTask('');
        setErrorMessage(null);
    };

    // ----------タスク編集----------------
    const handleEditSubmit = () => {
        setEvents(prev =>
            prev.map(event =>
                event.id === editTask?.id
                    ? { ...event, title: editTask.title, date: editTask.date }
                    : event,
            ),
        );
        setIsModalOpen(false);
    };

    const handleSubmitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEditTask(prev => (prev ? { ...prev, title: value } : prev));

        if (value.length > 30) {
            setErrorMessage('30文字を超えました');
        } else {
            setErrorMessage(null);
        }
    };

    const handleDeleteSubmit = () => {
        if (!editTask) return;

        setEvents(prev => prev.filter(event => event.id !== editTask.id));
        setIsModalOpen(false);
        setEditTask(null); // 念のため編集中のタスクもリセット
        setIsEditing(false); // 編集モード終了
        setErrorMessage(null);

    };

    return (
        <>
            {!isEditing && (
                <TaskModal
                    isOpen={isModalOpen}
                    isDate={selectedDate}
                    onClose={handleClose}
                    handleChange={handleChange}
                    handleAddClick={handleAddClick}
                    inputTask={inputTask}
                    errorMessage={errorMessage}
                    inputRef={ref}
                />
            )}
            {isEditing && editTask && (
                <EditTaskForm
                    isOpen={isModalOpen}
                    editTask={editTask}
                    setEditTask={setEditTask}
                    onClose={handleClose}
                    onSubmit={handleEditSubmit}
                    onDelete={handleDeleteSubmit}
                    errorMessage={errorMessage}
                    inputRef={ref}
                    handleSubmitChange={handleSubmitChange}
                />
            )}

            <div className="cal-container">
                <FullCalendar
                    height="100%"
                    //プラグイン設定
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locales={[jaLocale]}
                    //日本語
                    locale="ja"
                    // ボタン類の位置
                    headerToolbar={{
                        start: 'prevYear,prev,next,nextYear,today',
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek',
                    }}
                    //日付クリック
                    dateClick={handleCalender}
                    eventClick={handleEditTask}
                    //ドラッグアンドドロップ可能
                    editable={true}
                    //追加後
                    events={events}
                />
            </div>
        </>
    );
};
