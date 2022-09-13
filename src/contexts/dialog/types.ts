import React from 'react';

export type DialogContextType = {
    open: boolean;
    onClose: () => void;
    openDialog: (title: string, body: React.ReactNode) => void;
    title: React.ReactNode;
    body: React.ReactNode;
}
