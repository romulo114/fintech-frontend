import React, { createContext, useState, useCallback, PropsWithChildren } from 'react';
import { NotificationContextType } from './types';

const initialState: NotificationContextType = {
    open: false,
    message: '',
    type: 'info',
    duration: 3000,
};

export const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [data, setData] = useState<NotificationContextType>(initialState);

    const sendNotification = useCallback((
        message: string, type: NotificationContextType['type'], duration = 3000
    ) => {
        setData(
            (data: NotificationContextType) => ({ ...data, open: true, message, type, duration })
        );
    }, []);

    const onClose = useCallback(() => {
        setData((data: NotificationContextType) => ({ ...data, open: false }));
    }, []);


    return (
        <NotificationContext.Provider value={{ ...data, sendNotification, onClose }}>
            {children}
        </NotificationContext.Provider>
    );
}
