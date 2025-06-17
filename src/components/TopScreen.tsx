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

export const TopScreen = () => {
    // ----------state管理----------------

    // modal開閉管理
    const [isModalOpen, setIsModalOpen] = useState(false);

    // どの日付をクリックしたか
    const [selectedDate, setSelectedDate] = useState<string>('');

    //インプットフォーム管理
    const [inputTask, setInputTask] = useState<string>('');

    // バリデーションメッセージ
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    //タスク入力フォームフォーカス
    const ref = useRef<HTMLInputElement>(null);

    //
    const [events, setEvents] = useState<eventType[]>([]);

    // ----------副作用----------------
    // タスク入力フォームにフォーカス
    useEffect(() => {
        if (isModalOpen) {
            ref.current?.focus();
        }
    }, [isModalOpen]);

    // ----------イベント処理----------------

    ///////////カレンダー処理////////////
    // 日付クリック
    const handleCalender = (info: DateClickArg) => {
        setSelectedDate(info.dateStr);
        setIsModalOpen(true);
    };

    ///////////タスク入力フォーム////////////
    // タスク追加ボタンクリック処理
    const handleAddClick = (): void => {
        setEvents([
            ...events,
            {
                id: Math.random().toString(10).slice(2, 8),
                title: inputTask,
                date: selectedDate,
            },
        ]);
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
    };

    return (
        <>
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

            <FullCalendar
                //プラグイン設定
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locales={[jaLocale]}
                //日本語
                locale="ja"
                // ボタン類の位置
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek',
                }}
                dateClick={handleCalender}

                events={events}
            />
        </>
    );
};
