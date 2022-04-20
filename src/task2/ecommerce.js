////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.

    return Promise.all(ids.map(id => fetchOrderById(id)));
};

const bucketOrdersByUsers = async () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.

    const orders = await fetchAllOrders();
    orders.forEach(order => {
        if (!ordersByUsers.hasOwnProperty(order.userId)) {
            ordersByUsers[order.userId] = [];
        }
        ordersByUsers[order.userId].push(order);
    });

    return ordersByUsers;
};

const getLast2WeeksOrders = async () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.

    const current = Date.now();
    const pastTwoWeek = current - 14 * 24 * 60 * 60 * 1000;

    const orders = await fetchAllOrders();

    return orders.filter(order => order.timestamp >= pastTwoWeek && order.timestamp <= current);
};

const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.

    const orders = await fetchAllOrders();
    orders.forEach(order => {
        const day = new Date(order.timestamp).getDay();
        if (!ordersByDate.hasOwnProperty(day)) {
            ordersByDate[day] = [];
        }
        ordersByDate[day].push(order);
    });

    return ordersByDate;
};

fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
