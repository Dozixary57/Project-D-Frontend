import React, {createContext, useContext, useState, Dispatch, SetStateAction, useEffect} from 'react';
import itemService from "./backend/services/itemService";

interface ContextValueType {
    contentItems: [];
    setContentItems: Dispatch<SetStateAction<[]>>;
}

const ContextElement = createContext<ContextValueType>({ contentItems: [], setContentItems: () => {} });

export function ContextProvider({ children }: React.PropsWithChildren<{}>) {
    const [contentItems, setContentItems] = useState<any>(null);

    return (
        <ContextElement.Provider value={{ contentItems: contentItems, setContentItems: setContentItems }}>
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