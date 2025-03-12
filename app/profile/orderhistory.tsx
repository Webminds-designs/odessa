import React from 'react';

type OrderStatus = 'Pending' | 'Complete';

interface Order {
  id: number;
  product: string;
  productImage: string; 
  orderNo: string;
  orderDate: string;
  total: string;
  status: OrderStatus;
}

export default function OrderHistory() {
  const orders: Order[] = [
    {
      id: 1,
      product: '',
      productImage: '/images/diamond1.png',
      orderNo: '000731',
      orderDate: '5/9/2022',
      total: '1,750.00 $',
      status: 'Pending',
    },
    {
      id: 2,
      product: '',
      productImage: '/images/diamond1.png',
      orderNo: '000732',
      orderDate: '5/9/2022',
      total: '2,100.00 $',
      status: 'Pending',
    },
    {
      id: 3,
      product: '',
      productImage: '/images/diamond1.png',
      orderNo: '000733',
      orderDate: '5/9/2022',
      total: '1,999.00 $',
      status: 'Complete',
    },
    {
      id: 4,
      product: '',
      productImage: '/images/diamond1.png',
      orderNo: '000734',
      orderDate: '5/9/2022',
      total: '1,500.00 $',
      status: 'Complete',
    },
    {
      id: 5,
      product: '',
      productImage: '/images/diamond1.png',
      orderNo: '000735',
      orderDate: '5/9/2022',
      total: '1,750.00 $',
      status: 'Pending',
    },
  ];

  return (
    <div className="min-h-screen font-aeonikregular text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl mb-8">Order history</h1>

        {/* Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="pl-6 text-left font-light bg-[#202020]">Product</th>
                <th className="p-4 text-left font-light bg-[#202020]">Order no</th>
                <th className="p-4 text-left font-light bg-[#202020]">Order date</th>
                <th className="p-4 text-left font-light bg-[#202020]">Total</th>
                <th className="p-4 text-left font-light bg-[#202020]">Order Status</th>
                <th className="p-4 bg-[#202020]"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/30">
                  <td className="px-4 py-12 flex items-center space-x-3">
                    <div className="w-28 h-20 flex items-center justify-center border border-white/20 rounded-md">
                      <img
                        src={order.productImage}
                        alt={order.product}
                        className=" w-20 p-2"
                      />
                    </div>
                    <span>{order.product}</span>
                  </td>
                  <td className="p-4">{order.orderNo}</td>
                  <td className="p-4">{order.orderDate}</td>
                  <td className="p-4">{order.total}</td>
                  <td className="p-4">
                    {order.status === 'Pending' ? (
                      <span className="text-red-500 font-medium">
                        {order.status}
                      </span>
                    ) : (
                      <span className="text-green-500 font-medium">
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button className="px-4 py-2 border border-[#0D0D0D] text-white bg-[#202020] rounded-md hover:bg-black transition cursor-pointer">
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
