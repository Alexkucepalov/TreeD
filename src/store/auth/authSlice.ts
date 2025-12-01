import { createSlice } from '@reduxjs/toolkit';
import {
	loginUser,
	logoutUserGet,
	fetchUser,
	updateUser,
} from '@features/auth/api/authActions';

interface AuthState {
	user: { id: number; nickname: string; email: string; role?: string } | null;
	accessToken: string | null;
	loading: boolean;
	error: string | null;
	isAuthChecked: boolean;
}

export const initialState: AuthState = {
	user: null,
	accessToken: null,
	loading: false,
	error: null,
	isAuthChecked: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
		},
		resetAuth: (state) => {
			state.user = null;
			state.accessToken = null;
			state.loading = false;
			state.error = null;
			state.isAuthChecked = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
				state.error = null;
				state.isAuthChecked = true;
				if (!action.payload.user || (action.payload.user as any).needsProfileFetch) {
					state.isAuthChecked = false;
				}
			})
			.addCase(logoutUserGet.fulfilled, (state) => {
				state.user = null;
				state.accessToken = null;
				state.isAuthChecked = true;
			})
			.addCase(logoutUserGet.rejected, (state) => {
				state.user = null;
				state.accessToken = null;
				state.isAuthChecked = true;
			})
			.addCase(fetchUser.pending, (state) => {
				console.log('authReducer: fetchUser.pending', { oldState: { ...state } });
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				console.log('authReducer: fetchUser.fulfilled', { oldState: { ...state }, payload: action.payload });
				state.loading = false;
				state.error = null;
				const userData = { ...action.payload };
				if ((userData as any).needsProfileFetch) {
					delete (userData as any).needsProfileFetch;
				}
				state.user = userData;
				const accessToken = localStorage.getItem('accessToken');
				if (accessToken) {
					state.accessToken = accessToken.startsWith('Bearer ') ? accessToken.split(' ')[1] : accessToken;
				}
				state.isAuthChecked = true;
				console.log('authReducer: fetchUser.fulfilled - new state:', { ...state });
			})
			.addCase(fetchUser.rejected, (state, action) => {
				console.log('authReducer: fetchUser.rejected', { oldState: { ...state }, error: action.error.message });
				state.loading = false;
				
				const accessToken = localStorage.getItem('accessToken');
				if (accessToken && !state.accessToken) {
					state.accessToken = accessToken.startsWith('Bearer ') ? accessToken.split(' ')[1] : accessToken;
				}
				
				if (!state.user) {
					state.user = null;
				}
				
				const errorMessage = action.error.message || 'Неизвестная ошибка';
				if (!state.user) {
					state.error = errorMessage;
				} else {
					console.warn('Profile fetch failed but user exists, clearing error:', errorMessage);
					state.error = null;
				}
				
				state.isAuthChecked = true;
				console.log('authReducer: fetchUser.rejected - new state:', { ...state });
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.user = action.payload;
			});
	},
});

export const { resetAuth, setAccessToken } = authSlice.actions;
export default authSlice.reducer;

