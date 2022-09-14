import { NotificationContext } from 'contexts/notification';
import { useContext } from 'react';

export const useNotification = () => {
    const context = useContext(NotificationContext);

    if (!context) throw new Error('Hook should be called inside the provider');

    return context;
}