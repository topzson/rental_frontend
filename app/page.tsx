'use client';
import React from 'react';
import { DataGrid_Vehicles } from '@/app/components/table';
import { ResultData } from '@/app/components/data';

export default function Home() {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [contractId, setContractId] = React.useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleGetData = () => {
    setContractId(inputValue ? parseInt(inputValue) : null);
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
  
      <header className="row-start-1 flex items-center justify-center text-center">
        <h1 className="text-2xl sm:text-4xl font-bold">Vehicle Rental Contracts</h1>
      </header>


      <main className="row-start-2 w-full max-w-7xl px-4 sm:px-8">
        <div className="mb-4 flex items-end gap-2">
          <div className="flex-grow max-w-xs">
            <label htmlFor="contractId" className="block text-sm font-medium text-gray-700 mb-1">
              Get Data by Contract ID
            </label>
            <input 
              id="contractId"
              type="number" 
              placeholder="Enter contract ID"
              value={inputValue}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={handleGetData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Data
          </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-8 mb-6">
          <ResultData params={contractId} />
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-8">
          <DataGrid_Vehicles />
        </div>
      </main>

 
      <footer className="row-start-3 flex gap-4 flex-wrap items-center justify-center text-sm sm:text-base">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/topzson"
          target="_blank"
          rel="noopener noreferrer"
        >
          dev by <span className="font-semibold">Topzson</span>
        </a>
      </footer>
    </div>
  );
}
