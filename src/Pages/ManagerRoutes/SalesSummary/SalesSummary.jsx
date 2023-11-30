import React, { useEffect, useState } from 'react';
import useSale from '../../../Hooks/useSale';
import useShopProducts from '../../../Hooks/useShopProducts';

const SalesSummary = () => {

    const [sales] = useSale()

    const [products] = useShopProducts()

    const [totalInvest, setTotalInvest] = useState()
    const [totalProfit, setTotalProfit] = useState()
    useEffect(() => {
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
                    <thead className="bg-gray-300 text-black">
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
                                    <td className="p-2">{
                                        products?.map(item=>item._id ===  )
                                    }</td>                                  
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