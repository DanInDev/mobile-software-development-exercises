import React, { createContext, useState, ReactNode } from 'react';

interface ThemeContextType {
    theme: string;
    changeTheme: () => void;
}

// Create the ThemeContext with a default value
export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    changeTheme: () => { },
});

// ThemeProvider component to manage theme state and provide it to children.
interface ThemeProviderProps {
    children: ReactNode;
}

// Making it a functional component, since children is passed as a prop automatically.
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

    // Default theme is 'light'
    const [theme, setTheme] = useState<string>('light');  

    // Function to switch between two themes, could also be extended to support more themes.
    const changeTheme = () => {
        setTheme((prevTheme) => {
            if (prevTheme === 'light') {
                return 'dark'
            }
            else { 
                return 'light'
            };
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};