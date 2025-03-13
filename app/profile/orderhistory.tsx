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

        {/* Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="pl-4 sm:pl-6 text-left font-light bg-[#202020]">Product</th>
                <th className="p-2 sm:p-4 text-left font-light bg-[#202020]">Order no</th>
                <th className="p-2 sm:p-4 text-left font-light bg-[#202020]">Order date</th>
                <th className="p-2 sm:p-4 text-left font-light bg-[#202020]">Total</th>
                <th className="p-2 sm:p-4 text-left font-light bg-[#202020]">Order Status</th>
                <th className="p-2 sm:p-4 ml-6"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/30">
                  <td className="px-2 sm:px-4 py-4 sm:py-12 flex items-center space-x-3">
                    <div className="w-16 h-16 sm:w-28 sm:h-20 flex items-center justify-center border border-white/20 rounded-md">
                      <img
                        src={order.productImage}
                        alt={order.product}
                        className="w-12 sm:w-20 p-2"
                      />
                    </div>
                    <span className="text-sm sm:text-base">{order.product}</span>
                  </td>
                  <td className="p-2 sm:p-4 text-sm sm:text-base">{order.orderNo}</td>
                  <td className="p-2 sm:p-4 text-sm sm:text-base">{order.orderDate}</td>
                  <td className="p-2 sm:p-4 text-sm sm:text-base">{order.total}</td>
                  <td className="p-2 sm:p-4">
                    {order.status === 'Pending' ? (
                      <span className="text-red-500 font-medium text-sm sm:text-base">
                        {order.status}
                      </span>
                    ) : (
                      <span className="text-green-500 font-medium text-sm sm:text-base">
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="p-2 sm:p-4">
                    <button className="px-2 sm:px-4 py-2 border border-[#0D0D0D] text-white bg-[#202020] rounded-md hover:bg-black transition cursor-pointer text-xs sm:text-sm">
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
