import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface ContextValueType {
    ContextVariable: boolean;
    setContextVariable: Dispatch<SetStateAction<boolean>>;
}

const ContextElement = createContext<ContextValueType>({ ContextVariable: true, setContextVariable: () => {} });

export function ContextProvider({ children }: React.PropsWithChildren<{}>) {
    const [ContextVariable, setContextVariable] = useState(true);

    return (
        <ContextElement.Provider value={{ ContextVariable, setContextVariable }}>
            {children}
        </ContextElement.Provider>
    );
}

export function useContextElement() {
    return useContext(ContextElement);
}

// Example
// import {useContextElement} from "../ContextProvider";
//     const { ContextVariable, setContextVariable } = useContextElement();