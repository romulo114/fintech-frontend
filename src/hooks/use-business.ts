import { BusinessContext } from 'contexts/business';
import { useContext } from 'react';

export const useBusiness = () => {
    const context = useContext(BusinessContext);
    if (!context) throw new Error('context must be use inside provider');

    return context;
};
