import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {JwtPayload} from "../interfaces/userSchema";
import {jwtDecode} from "jwt-decode";
import {useUser} from "./useUserData";

const DecodedTokenContext = createContext<JwtPayload | null>(null);

export const DecodedTokenProvider = ({children}: {children: ReactNode}) => {
	const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);
	const {setUser} = useUser();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decoded = jwtDecode<JwtPayload>(token);
				setDecodedToken(decoded);
				setUser(decoded);
			} catch (error) {
				console.error("Token decoding failed:", error);
				setDecodedToken(null);
				setUser(null);
				localStorage.removeItem("token");
			}
		}
	}, []);

	return (
		<DecodedTokenContext.Provider value={decodedToken}>
			{children}
		</DecodedTokenContext.Provider>
	);
};

export const useDecodedToken = () => {
	return useContext(DecodedTokenContext);
};
