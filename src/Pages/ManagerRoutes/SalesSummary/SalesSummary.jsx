import React, { useEffect, useState } from 'react';
import useSale from '../../../Hooks/useSale';
import useShopProducts from '../../../Hooks/useShopProducts';
import { FaProductHunt, FaRegCreditCard } from 'react-icons/fa';

const SalesSummary = () => {

    const [sales] = useSale()
    // console.log(sales);
    // const [...salesProducts] = sales.map(saleProduct=>saleProduct.productName)


    // console.log(salesProducts);
    // const salesProduct = salesProducts.map(sale=>sale.productName)
    // console.log(salesProduct);
    const [products] = useShopProducts()
    // const [totalSale, setTotalSale] = useState()
    const [totalInvest, setTotalInvest] = useState()
    const [totalProfit, setTotalProfit] = useState()
    // console.log( totalInvest, totalProfit);
    useEffect(() => {
        // const sumSale = products?.reduce((sum, item) => sum + item.saleCount, 0)
        // setTotalSale(sumSale)
        const sumInvest = products?.reduce((sum, item) => sum + item.productionCost, 0)
        setTotalInvest(sumInvest)
        const sumProfits = products?.reduce((sum, item) => sum + (item.saleCount * item.singleProfit), 0)
        const sumProfit = sumProfits.toFixed(3)
        setTotalProfit(sumProfit)

    }, [products])
    return (
        <div>
            <div className='text-center font-semibold text-2xl'>
                Sales Summary
            </div>
            <div className="stats shadow mt-8 ">

                <div className="stat bg-[#BB34F5] text-white">
                    <div className="stat-figure">
                    </div>
                    <div className="stat-title text-white">Total Sale:</div>
                    <div className="stat-value">{sales?.length}</div>
                </div>

                <div className="stat bg-[#D3A256] text-white">
                    <div className="stat-figure text-secondary">

                    </div>
                    <div className="stat-title text-white">Total Invest:</div>
                    <div className="stat-value"> ${totalInvest}</div>
                </div>

                <div className="stat bg-[#FE4880]">
                    <div className="stat-figure text-secondary">

                    </div>
                    <div className="stat-title text-white">Total Profit:</div>
                    <div className="stat-value text-white">${totalProfit}</div>
                </div>
            </div>
            {/*  */}
            <div className='my-7'>
                <table className="w-full ">
                    <thead className="bg-[#D1A054] text-white">
                        <tr>
                            <th className="border-2 p-2">Name</th>
                            <th className="border-2 p-2">Selling Date</th>
                            <th className="border-2 p-2">Profit(per unit)</th>

                        </tr>
                    </thead>
                    <tbody>
                        {sales?.map((sale, saleIndex) => (
                            sale.productName.map((product, productIndex) => (
                                <tr key={`${saleIndex}-${productIndex}`} className={`border-b text-center ${productIndex === sale.productName.length - 1 ? '' : 'border-gray-300'}`}>
                                    <td className="p-2">
                                        {product}
                                    </td>
                                    <td className="p-2">{sale.date}</td>
                                    <td className="p-2">{}</td>
                                    
                                </tr>
                            ))
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default SalesSummary;