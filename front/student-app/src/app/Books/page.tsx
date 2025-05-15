'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
type Book = {
  id: number;
  title: string;
  price: string;
  image_url: string;
  availability: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedStudent = localStorage.getItem('student');
    const student = storedStudent ? JSON.parse(storedStudent) : null;
    if (!student?.id) {
      setError('Student not logged in');
      router.push("/Login");
    }
  }, [router]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/rec_book')
      .then(res => res.json())
      .then(data => {
        setBooks(data.books);
        setFilteredBooks(data.books);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!books) return;
    
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  const getSummary = (title: string) => {
    setSummaryLoading(true);
    fetch('http://127.0.0.1:8000/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then(res => res.json())
      .then(data => {
        setSelectedSummary(data.summary);
        setShowModal(true);
      })
      .catch(() => alert('Failed to fetch summary'))
      .finally(() => setSummaryLoading(false));
  };

  if (loading) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-7xl mx-auto"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-center mb-12 text-gray-800"
      >
        Discover Books
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="bg-gray-200 h-64 w-full"></div>
            <div className="p-5 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded mt-4"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  if (error) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
        <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Books</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </motion.div>
  );

  return (
     <>
      <Navbar />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-7xl mx-auto"
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center mb-12"
      >        <h1 className="text-4xl font-bold text-gray-800 mb-3">Discover Our Collection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our curated selection of books across various genres and subjects
        </p>
      </motion.div>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <input
            type="text"            placeholder="Search books by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 pl-12 pr-24 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const filtered = books.filter(book => 
                  book.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredBooks(filtered);
              }
            }}/>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 mr-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
                aria-label="Clear search"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={() => {
                if (!books) return;
                const filtered = books.filter(book => 
                  book.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredBooks(filtered);
              }}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Search"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks && filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 group"
            >
            <div className="relative overflow-hidden h-64">
            <img
  src={book.image_url}
  alt={book.title}
  width={300}
  height={450}
  loading="lazy"
  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
/>
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                book.availability === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {book.availability}
              </div>
            </div>
            
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">{book.title}</h2>
              <p className="text-lg font-semibold text-blue-600 mb-3">{book.price}</p>
              
              <button
                onClick={() => getSummary(book.title)}
                disabled={summaryLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  summaryLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {summaryLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading Summary
                  </span>
                ) : (
                  'Get Summary'
                )}
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="col-span-4 text-center py-16">
          <div className="bg-blue-50 inline-flex items-center justify-center p-6 rounded-full mb-4">
            <svg className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No books found</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {searchTerm ? `No books matching "${searchTerm}" were found.` : 'No books are currently available.'}
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
      </div>

      {showModal && selectedSummary && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Book Summary</h2>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                onClick={() => {
                  setShowModal(false);
                  setSelectedSummary(null);
                }}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedSummary}</p>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedSummary(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
    </>
  );
}