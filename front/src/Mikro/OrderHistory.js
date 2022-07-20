import { Order } from "../Nano/Order";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadUserOrders, deleteOrder } from "../features/orders/orderSlice";

export const OrderHistory = () => {
	// const [or, setOr] = useState(null);
	const { userOrders, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.order
	);
	const dispatch = useDispatch();
	function onLoad() {
		dispatch(loadUserOrders());
	}
	function onDeleteOrder(id) {
		console.log(id);
		dispatch(deleteOrder(id));
	}
	useEffect(() => {
		onLoad();
	}, []);

	return (
		<div>
			OrderHistory
			{userOrders ? (
				<div>
					<table class="table">
						<thead>
							<tr>
								<th>
									<abbr title="name">Name</abbr>
								</th>
								<th>
									<abbr title="creator">Creator</abbr>
								</th>
								<th>
									<abbr title="worker">Worker</abbr>
								</th>
								<th>
									<abbr title="description">Desc</abbr>
								</th>
								<th>
									<abbr title="status">Stat</abbr>
								</th>
								<th>
									<abbr title="creation Date">Created</abbr>
								</th>
								<th>
									<abbr title="order process started">OPD</abbr>
								</th>
								<th>
									<abbr title="finalization Date">Final</abbr>
								</th>
								<th>
									<abbr title="commment">Comm</abbr>
								</th>
							</tr>
						</thead>
						{userOrders.map((order) => {
							return order ? (
								<Order
									order={order}
									key={order.id}
									deleteOrder={(id) => onDeleteOrder(id)}
								/>
							) : null;
						})}
					</table>
				</div>
			) : (
				<p>no order history for now</p>
			)}
		</div>
	);
};
