import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ totalItems, currentPage, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    return (
        <div>
            {[...Array(totalPages).keys()].map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page + 1)}
                    disabled={currentPage === page + 1}
                >
                    {page + 1}
                </button>
            ))}
        </div>
    );
};

Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
