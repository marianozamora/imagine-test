import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import React from 'react';

export interface IProps {
    label: string;
	error?: string;
	children: any;
}

export const FormField: React.FC<IProps> = ({ label, error, children }) => {
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel>{label}</FormLabel>
            {children}
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
};
