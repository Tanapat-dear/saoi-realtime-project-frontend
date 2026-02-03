import type { WipreportStatusProps } from "../type/commontype";

export default function WipreportStatus({ data }: WipreportStatusProps) {
    if (!data || data.length === 0) return <div>No WIP Report Data Available</div>;

    const processes = [...new Set(data.map(d => d.process))];
    const products = [...new Set(data.map(d => d.product_name))];

    const splitProductName = (name: string) =>
        name.split('-').map((part, i, arr) =>
            i < arr.length - 1 ? `${part}-` : part
        );
    const getQty = (process: string, product: string) =>
        data.find(d => d.process === process && d.product_name === product)?.qty ?? '-';

    return (
        <div className="bg-white rounded-md p-2 mt-2 border border-gray-300 shadow-sm w-[400px] hover:scale-110 transition-transform transform-gpu duration-200">
            <div className="flex justify-between items-end mb-1.5 px-0.5">
                <div className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                    WIP Process
                </div>
                <div className="text-[8px] text-gray-400 font-mono">
                    Updated: {data[0].update_at}
                </div>
            </div>

            {/* 🔒 ป้องกันล้น */}
            <div className="overflow-x-auto">
                <table className="border-collapse min-w-max">
                    <thead>
                        <tr>
                            <th className="px-1.5 py-0.5 border border-gray-200 text-left text-[9px] font-medium text-gray-400 bg-gray-50 uppercase sticky left-0 z-10">
                                Process
                            </th>

                           {products.map(product => (
                                    <th
                                        key={product}
                                        title={product}
                                        className="
                                        px-2 py-0.5
                                        border border-gray-200
                                        text-[9px] font-bold text-gray-500 bg-gray-50
                                        w-10 max-w-[50px]
                                        text-center leading-tight
                                        "
                                    >
                                        {splitProductName(product).map((line, idx) => (
                                        <div key={idx}>{line}</div>
                                        ))}
                                    </th>
                            ))}

                     
                 </tr>
                    </thead>

                    <tbody>
                        {processes.map((process, idx) => (
                            <tr key={process} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                                <td className="px-1.5 py-1 border border-gray-200 text-[9px] font-bold text-gray-600 whitespace-nowrap sticky left-0 bg-white z-10">
                                    {process}
                                </td>

                                {products.map(product => {
                                    const qty = getQty(process, product);
                                    const isNumber = qty !== '-';

                                    return (
                                        <td
                                            key={product}
                                            className={`
                                                px-1 py-0.5 border border-gray-200
                                                text-center align-middle
                                                w-10 max-w-[50px]
                                                ${
                                                    isNumber
                                                        ? 'text-[14px] font-black text-blue-700 leading-none'
                                                        : 'text-[8px] text-gray-200 font-light'
                                                }
                                            `}
                                        >
                                            {qty}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
