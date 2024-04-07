import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
  <div className="mb-4">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={handleSearchChange}
    className="border px-3 py-2 rounded-md focus:outline-none focus:border-gray-800 shadow-md mr-2"
  />
  <select
    value={category}
    onChange={handleCategoryChange}
    className="border px-3 py-2 rounded-md focus:outline-none focus:border-gray-800 shadow-md"
    style={{ backgroundColor: "#6B7280", color: "white" }}
  >
    <option value="">All Categories</option>
    <option value="Paid">Paid</option>
    <option value="Unpaid">Unpaid</option>
  </select>
</div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Questions</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>reponse</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Filtered and searched rows */}
          {rows
            .filter(row => row.question.toLowerCase().includes(searchTerm.toLowerCase()) && (category === '' || row.source === category))
            .map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.question}</TableCell>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.response}</TableCell>
                <TableCell className="text-right">Action</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Sample data for testing
const rows = [
  { id: 1, question: 'Comment les composants de table', source: 'Paid', response: 'Credit Card' },
  { id: 2, question: 'Comment les composants de table', source: 'Unpaid', response: 'Debit Card' },
  { id: 3, question: 'Comment les composants de table', source: 'Paid', response: 'Cash' },
  { id: 4, question: 'Comment les composants de table', source: 'Unpaid', response: 'Bank Transfer' },
  { id: 5, question: 'Comment les composants de table', source: 'Paid', response: 'PayPal' },
];

export default DataTable;

