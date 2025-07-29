import { GrFormPrevious } from "react-icons/gr";
import { NUMBER_OF_RECORDS } from "../utils/constants";


const Pagination = ({ currentPage, setCurrentPage, totalUsers }) => {
    const totalPages = Math.ceil(totalUsers / NUMBER_OF_RECORDS);

    const onHandlePreviousBtn = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const onHandleNextBtn = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };
    return (
        <div className='flex flex-col items-end md:mr-[200px] my-12'>
            <div className='flex items-center gap-x-3'>
                <button
                    className={`cursor-pointer flex items-center gap-x-0.5 px-3 py-1.5 rounded  disabled:text-gray-300 disabled:cursor-not-allowed`}
                    onClick={onHandlePreviousBtn}
                    disabled={currentPage <= 1}
                >
                    <GrFormPrevious />
                    <p>Previous</p>
                </button>
                <div className='w-8 h-8 border-[2px] rounded-sm border-blue-500 flex items-center justify-center'>
                    {currentPage}
                </div>
                <button
                    className={`cursor-pointer flex items-center gap-x-0.5 px-3 py-1.5 rounded  disabled:text-gray-300 disabled:cursor-not-allowed`}
                    onClick={onHandleNextBtn}
                    disabled={currentPage >= totalPages}
                >
                    <p>Next</p>
                    <GrFormPrevious className='rotate-180' />
                </button>
            </div>
        </div>
    )
}
export default Pagination