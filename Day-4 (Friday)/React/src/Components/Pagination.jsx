import React from 'react';
import './Pagination.css';

const Pagination = ({ totalPosts, postPerPage, setCurrentPage }) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination-container">
            {
                pages.map((page, index) => (
                    <button key={index} onClick={() => setCurrentPage(page)} className="pagination-button">
                        {page}
                    </button>
                ))
            }
        </div>
    );
};

export default Pagination;
