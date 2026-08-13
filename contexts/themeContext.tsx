// import { createContext, useState } from "react";

// export type Theme = "light" | "dark";

// interface ThemeContextValue {
//   theme: Theme;
//   setTheme: React.Dispatch<React.SetStateAction<Theme>>;
// }

// export const ThemeContext = createContext<ThemeContextValue> | (null > null);

// type props = {
//   children: React.ReactNode;
// };

// export const ThemeProvider = ({ children }: props) => {
//   const [theme, setTheme] = useState<Theme>("light");

//   return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
// };
