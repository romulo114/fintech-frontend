import { DialogContext } from 'contexts/dialog';
import { useContext } from 'react';

export const useDialog = () => {
    const ctx = useContext(DialogContext);

    if (!ctx) throw('Hook should be called inside the provider');

    return ctx;
}