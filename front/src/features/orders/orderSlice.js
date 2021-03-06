import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
	orders: [],
	userOrders: [],
	isLoading: false,
	isError: false,
	message: null,
};

export const submitOrder = createAsyncThunk(
	"orders/set",
	async (orderData, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			return await orderService.create(orderData, token);
		} catch (error) {
			console.log("order slice error");
			console.log(error);
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);
// load orders with query.
// query to specify range of orders
// pass token to check whether user is worker
export const loadUserOrders = createAsyncThunk(
	"orders/get",
	async (query, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			return await orderService.getUserOrders(query, token);
		} catch (error) {
			console.log("order slice error");
			console.log(error);
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);
export const loadAllOrders = createAsyncThunk(
	"orders/getall",
	async (query, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			return await orderService.getAllOrders(query, token);
		} catch (error) {
			console.log("order slice error");
			console.log(error);
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);
export const deleteOrder = createAsyncThunk(
	"orders/put",
	async (query, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			return await orderService.deleteOrder(query, token);
		} catch (error) {}
	}
);
export const updateOrder = createAsyncThunk(
	"orders/put",
	async (url, orderData, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			return await orderService.updateOrder(url, orderData, token);
		} catch (error) {
			console.log("order slice error");
			console.log(error);
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);
export const activateOrder = createAsyncThunk(
	"orders/activate",
	async (url, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			return await orderService.activateOrder(url, token);
		} catch (error) {
			console.log("order slice error");
			console.log(error);
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);
const orderSlice = createSlice({
	name: "ordersSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(submitOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(submitOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSucces = true;
				state.userOrders.push(action.payload);
			})
			.addCase(submitOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(loadUserOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loadUserOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSucces = true;
				state.userOrders = action.payload;
			})
			.addCase(loadUserOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSucces = true;
				state.userOrders = state.userOrders.filter((ord) =>
					ord._id === action.payload.id ? (ord.status = "removed") : ord
				);
			})
			.addCase(deleteOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(loadAllOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loadAllOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSucces = true;
				state.orders = action.payload;
			})
			.addCase(loadAllOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(activateOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(activateOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSucces = true;
				state.orders = state.orders.filter((ord) =>
					ord._id === action.payload.order._id
						? (ord.status = "in-progress")
						: ord
				);
				state.userOrders.push(action.payload.order);
			})
			.addCase(activateOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});
export default orderSlice.reducer;
