import './Pagination.css'
import { IStoreState } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/actionCreators';
import { ArrowPagination } from '../Icons/ArrowPagination';

 const Pagination = ({className}: {className?: string}) => {
    const { limit, total, currentPage } = useSelector((state:IStoreState) => state.books)
    const dispatch = useDispatch ()
    
    return (
        <div className='pagination__wrapper'>
            <button className='pagination_button'
                    disabled = {currentPage === 1}  
                    onClick={() => dispatch(setCurrentPage(currentPage - 1))}> 
                <ArrowPagination className='pagination_arrow-left'
                    isLeft={true} 
                />
            </button>

            <div className = 'currentpage__wrapper'>
                <span
                    className='first'
                    onClick={() => dispatch(setCurrentPage(currentPage-1))}>
                    {currentPage !== 1 && currentPage - 1}
                </span>
                <span className='second'>
                    {currentPage}
                </span>
                <span className='third'
                      onClick={() => dispatch(setCurrentPage(currentPage+1))}>
                    {currentPage !== total && currentPage + 1}
                </span>
            </div>

            <button className='pagination_button'
                    disabled = {currentPage === Math.ceil(total/limit)} 
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
                <ArrowPagination className='pagination_arrow-right'
                    isLeft={false}
                />
            </button>
        </div>
    )
 }
 
 
 export { Pagination }