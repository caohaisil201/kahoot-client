import axios from 'axios';
import React, { useState, createContext } from 'react';

export const Context = createContext();

export default function Provider({ children }) {
	// All data below is example
	const [user, setUser] = useState({
		id: '001',
	});
	const [isLogin, setIsLogin] = useState(false);
	const [accessToken, setAccessToken] = useState('');
	/**
	 * This isLogin is use for test
	 * We will use token and store token to
	 * storage instead of isLogin variable
	 */
	// const isLogin = user.id ? true : false;
	const store = {
		userState: {
			user,
			setUser,
		},
		loginState: {
			isLogin,
			setIsLogin,
		},
		accessTokenState: {
			accessToken,
			setAccessToken
		}
	};
	return <Context.Provider value={store}>{children}</Context.Provider>;
}
