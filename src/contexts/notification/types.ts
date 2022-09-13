import { MessageType } from 'components/base';
import React from 'react';

export type NotificationContextType = {
    open: boolean;
    type: MessageType;
    message: React.ReactNode;
    duration: number;
    sendNotification?: (msg: string, type: MessageType, duration: number) => void;
    onClose?: () => void;
}
