import {createContext, ReactNode, useContext, useState} from "react";
import { JwtPayload } from "../interfaces/userSchema";



type UserContextType = {
	user: JwtPayload | null;
	setUser: (user: JwtPayload | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
	const [user, setUser] = useState<JwtPayload | null>(null);

	return (
		<UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error("useUser must be used within a UserProvider");
	return context;
};
