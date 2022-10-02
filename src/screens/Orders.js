import { Spin, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuthAndCartContext } from "../context";
import { convertToUSD } from "../utilities";

const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Products",
    dataIndex: "products",
    render: (_, { orderId, products }) =>
      products.map(({ id, quantity }) => {
        return (
          <div>
            <Tag color={"geekblue"} key={`product-${orderId}-${id}`}>
              <Link to={`/products/${id}`} className="text-blue-600">
                Product Id: {id}
              </Link>
            </Tag>
            <Tag color={"green"} key={`quantity-${orderId}-${id}`}>
              Quantity: {quantity}
            </Tag>
          </div>
        );
      }),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
  },
];

const Orders = () => {
  const { user } = useAuthAndCartContext();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [_isLoading, _setIsLoading] = useState(false);
  const [_error, _setError] = useState("");

  let [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 2,
    },
  });

  const {
    pagination: { current, pageSize },
  } = tableParams;

  const getAllOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `/api/orders?populate=user&filters[user]=${user?.user?.id}&pagination[page]=${current}&pagination[pageSize]=${pageSize}`
      );
      setOrders(data?.data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data?.meta?.pagination?.total,
        },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    await getAllOrders();
  }, [user?.user?.id, current, orders?.length]);

  const deleteMany = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete these orders?\nAfter deleting these orders you can't undo this action!"
      )
    ) {
      setSelectedRowKeys([]);
      return;
    }
    try {
      _setIsLoading(true);
      selectedRowKeys.forEach(async (selectedRow) => {
        await axios.delete(`/api/orders/${selectedRow}`);
        orders = orders.filter((order) => order.id !== selectedRow);
        setOrders(orders);
      });
      setSelectedRowKeys([]);
    } catch (error) {
      _setError(error.message);
    } finally {
      _setIsLoading(false);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <div className="w-full h-full">
      {!isLoading && error && <h1>{error}</h1>}
      {!_isLoading && _error && <h1>{_error}</h1>}

      {isLoading || _isLoading ? (
        <Spinner />
      ) : orders?.length > 0 ? (
        <section>
          <div className="mb-4">
            <button
              className="bg-red-600 text-white font-semibold px-2 py-1 rounded-sm"
              onClick={deleteMany}
              disabled={!selectedRowKeys.length}
              loading={_isLoading}
            >
              {_isLoading && <Spin size="small" className="mr-2" />}
              Delete
            </button>
            {selectedRowKeys.length > 0 && (
              <span className="ml-4">
                Selected {selectedRowKeys.length} items
              </span>
            )}
          </div>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRow) => {
                setSelectedRowKeys(selectedRow);
              },
            }}
            columns={columns}
            dataSource={orders.map(
              ({
                id,
                attributes: {
                  total,
                  status,
                  quantityWithProductIds,
                  createdAt,
                },
              }) => ({
                key: id,
                orderId: id,
                total: convertToUSD(total),
                status,
                products: quantityWithProductIds,
                createdAt: moment(createdAt).fromNow(),
              })
            )}
            pagination={tableParams.pagination}
            loading={isLoading}
            onChange={handleTableChange}
          />
        </section>
      ) : (
        <h1>No orders placed yet!</h1>
      )}
    </div>
  );
};

export default Orders;
