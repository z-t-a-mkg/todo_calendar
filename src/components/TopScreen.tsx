import { useEffect, useRef, useState } from 'react';
import type { eventType } from '../Type/Types';

import { supabase } from '../supabaseClient';

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

    //DB初期読み込み
    useEffect(() => {
        const fetchTasks = async () => {
            const { data, error } = await supabase.from('tb_todo_cal').select('*');
            if (error) {
                console.error('Fetch error:', error);
                return;
            }
            if (data) {
                setEvents(data);
            }
        };
        fetchTasks();
    }, []);

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
    const handleAddClick = async (): Promise<void> => {
        const { data, error } = await supabase
            .from('tb_todo_cal')
            .insert([{ title: inputTask, date: selectedDate }])
            .select();

        if (error) {
            console.error('登録エラー:', error.message);
            return;
        }

        if (data && data.length > 0) {
            setEvents([...events, data[0]]);
        }

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

    // 編集ボタンクリック
    const handleEditSubmit = async () => {
        if (!editTask) return;

        const { error } = await supabase
            .from('tb_todo_cal')
            .update({
                title: editTask.title,
                date: editTask.date,
            })
            .eq('id', editTask.id);

        if (error) {
            console.error('Update error:', error);
            return;
        }

        setEvents(prev =>
            prev.map(event =>
                event.id === editTask.id
                    ? { ...event, title: editTask.title, date: editTask.date }
                    : event,
            ),
        );
        setIsModalOpen(false);
    };

    const handleSubmitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEditTask(prev => (prev ? { ...prev, title: value } : prev));

        if (value.length > 20) {
            setErrorMessage('20文字を超えました');
        } else {
            setErrorMessage(null);
        }
    };

    // 削除ボタンクリック
    const handleDeleteSubmit = async () => {
        if (!editTask) return;

        const { error } = await supabase.from('tb_todo_cal').delete().eq('id', editTask.id);

        if (error) {
            console.error('削除エラー:', error.message);
            return;
        }

        // DBと一致するように再取得
        const { data, error: fetchError } = await supabase.from('tb_todo_cal').select('*');
        if (fetchError) {
            console.error('再取得エラー:', fetchError.message);
            return;
        }
        setEvents(data ?? []);

        setEditTask(null);
        setIsModalOpen(false);
        setIsEditing(false);
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


            <div className="cal-container h-screen">
            <div>Title</div>
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
