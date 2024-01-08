import { Table, Button, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
// Components
import Message from '../components/common/Message';
import Loader from '../components/common/Loader';
import OrderPaginate from '../components/orderscreen/OrderPaginate';
// Slices
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';

const MyOrdersScreen = () => {
    const { pageNumber } = useParams();
    // Api Slices
    const { data, isLoading, error } = useGetMyOrdersQuery({pageNumber});

  return (
    <Row>
            <h1>My Orders</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    { error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0,10)
                                        ) : (
                                            <FaTimes style={{color: 'red'}}/>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0,10)
                                        ) : (
                                            <FaTimes style={{color: 'red'}}/>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <OrderPaginate pages={data.pages} page={data.page}/>
                </>
            )}
    </Row>
  )
}

export default MyOrdersScreen;