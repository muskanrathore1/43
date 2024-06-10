import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('title');
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        const fetchBooks = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/books`, {
                params: { page, limit, sort, order },
            });
            setBooks(data.books);
            setTotalBooks(data.totalBooks);
        };

        fetchBooks();
    }, [page, limit, sort, order]);

    const handleSort = (field) => {
        setSort(field);
        setOrder(order === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>Title</th>
                        <th onClick={() => handleSort('author')}>Author</th>
                        <th onClick={() => handleSort('publishedDate')}>Published Date</th>
                        <th onClick={() => handleSort('genre')}>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
                            <td>{book.genre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                totalItems={totalBooks}
                currentPage={page}
                pageSize={limit}
                onPageChange={(page) => setPage(page)}
            />
        </div>
    );
};

export default BookList;
