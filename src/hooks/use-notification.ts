import { NotificationContext } from 'contexts/notification';
import { useContext } from 'react';

export const useNotification = () => {
    const ctx = useContext(NotificationContext);

    if (!ctx) throw('Hook should be called inside the provider');

    return ctx;
}