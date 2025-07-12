import React, { useState, useEffect } from 'react';
import { Play, BookOpen, ExternalLink, CheckCircle, AlertCircle, Globe, Database, Search, Download } from 'lucide-react';

interface BookData {
  title: string;
  price: string;
  link: string;
  id: string;
}

type ScrapingState = 'idle' | 'scraping' | 'complete' | 'error';

function App() {
  const [scrapingState, setScrapingState] = useState<ScrapingState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [bookData, setBookData] = useState<BookData[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [scrapedCount, setScrapedCount] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);

  const mockBookData: BookData[] = [
    {
      id: '1',
      title: 'The Great Gatsby',
      price: '$12.99',
      link: 'https://example.com/gatsby'
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      price: '$14.50',
      link: 'https://example.com/mockingbird'
    },
    {
      id: '3',
      title: '1984',
      price: '$13.25',
      link: 'https://example.com/1984'
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      price: '$11.99',
      link: 'https://example.com/pride'
    },
    {
      id: '5',
      title: 'The Catcher in the Rye',
      price: '$15.75',
      link: 'https://example.com/catcher'
    }
  ];

  const websites = [
    'bookstore.com',
    'amazon.com',
    'goodreads.com',
    'barnesnoble.com',
    'bookdepository.com'
  ];

  const startScraping = async () => {
    setScrapingState('scraping');
    setStatusMessage('Initializing scraper...');
    setProgress(0);
    setBookData([]);
    setScrapedCount(0);

    // Phase 1: Initialize
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatusMessage('Connecting to book sources...');
    setProgress(10);

    // Phase 2: Scrape each website
    for (let i = 0; i < websites.length; i++) {
      const website = websites[i];
      setCurrentWebsite(website);
      setStatusMessage(`Scraping ${website}...`);
      setIsExtracting(true);
      
      // Simulate website analysis
      await new Promise(resolve => setTimeout(resolve, 800));
      setStatusMessage(`Analyzing page structure on ${website}...`);
      setProgress(20 + (i * 12));
      
      // Simulate data extraction
      await new Promise(resolve => setTimeout(resolve, 1200));
      setStatusMessage(`Extracting book data from ${website}...`);
      setIsExtracting(false);
      
      // Add book to table with animation
      const newBook = mockBookData[i];
      setBookData(prev => [...prev, newBook]);
      setScrapedCount(i + 1);
      setProgress(20 + ((i + 1) * 12));
      
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    // Phase 3: Finalize
    setCurrentWebsite('');
    setStatusMessage('Processing and cleaning data...');
    setProgress(90);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate potential error (5% chance)
    if (Math.random() > 0.95) {
      setScrapingState('error');
      setStatusMessage('Error occurred during scraping ❌');
      return;
    }

    setProgress(100);
    setStatusMessage('Scraping complete ✅');
    setScrapingState('complete');
  };

  const resetScraping = () => {
    setScrapingState('idle');
    setStatusMessage('');
    setBookData([]);
    setProgress(0);
    setCurrentWebsite('');
    setScrapedCount(0);
    setIsExtracting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Data Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-float-data opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        ))}

        {/* Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {[...Array(8)].map((_, i) => (
            <line
              key={`line-${i}`}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="rgb(59, 130, 246)"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>

        {/* Floating Code Snippets */}
        {['<title>', '</div>', 'class=', '$19.99', 'href='].map((code, i) => (
          <div
            key={`code-${i}`}
            className="absolute text-xs text-blue-300/40 font-mono animate-drift-code"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + Math.sin(i) * 20}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${12 + Math.random() * 6}s`
            }}
          >
            {code}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Database className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Book Data Scraper
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Extract book information from multiple sources
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Start Button */}
          {scrapingState === 'idle' && (
            <div className="text-center mb-12 animate-fade-in">
              <button onClick={startScraping} className="continue-application">
                <div>
                  <div className="pencil"></div>
                  <div className="folder">
                    <div className="top">
                      <svg viewBox="0 0 24 27">
                        <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                      </svg>
                    </div>
                    <div className="paper"></div>
                  </div>
                </div>
                Start Scraping
              </button>
            </div>
          )}

          {/* Scraping Animation */}
          {scrapingState === 'scraping' && (
            <div className="mb-12 animate-fade-in">
              {/* Animated Book Loader */}
              <div className="flex justify-center mb-8">
                <div className="loader">
                  <div>
                    <ul>
                      <li>
                        <svg fill="currentColor" viewBox="0 0 90 120">
                          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                      </li>
                      <li>
                        <svg fill="currentColor" viewBox="0 0 90 120">
                          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                      </li>
                      <li>
                        <svg fill="currentColor" viewBox="0 0 90 120">
                          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                      </li>
                      <li>
                        <svg fill="currentColor" viewBox="0 0 90 120">
                          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                      </li>
                      <li>
                        <svg fill="currentColor" viewBox="0 0 90 120">
                          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                      </li>
                      <li>
                        <svg fill="currentColor" viewBox="0 0 90 120">
                          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                      </li>
                    </ul>
                  </div>
                  <span>Processing Books</span>
                </div>
              </div>

              {/* Website Scraping Visualization */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Scraping Progress</h3>
                  <div className="text-blue-400 font-mono">{Math.round(progress)}%</div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-700 rounded-full mb-6 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-scan"></div>
                  </div>
                </div>

                {/* Current Website Display */}
                {currentWebsite && (
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-white/10 rounded-lg p-4 flex items-center space-x-4">
                      <Globe className={`w-8 h-8 text-blue-400 ${isExtracting ? 'animate-spin' : 'animate-pulse'}`} />
                      <div>
                        <div className="text-white font-medium">Currently scraping:</div>
                        <div className="text-blue-300 font-mono text-lg">{currentWebsite}</div>
                      </div>
                      {isExtracting && (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Website Grid */}
                <div className="grid grid-cols-5 gap-4 mb-6">
                  {websites.map((website, index) => {
                    const isActive = currentWebsite === website;
                    const isCompleted = scrapedCount > index;
                    const isNext = scrapedCount === index && !isActive;
                    
                    return (
                      <div
                        key={website}
                        className={`relative p-4 rounded-lg border transition-all duration-500 ${
                          isActive 
                            ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/25' 
                            : isCompleted
                            ? 'bg-green-500/20 border-green-400'
                            : isNext
                            ? 'bg-yellow-500/20 border-yellow-400 animate-pulse'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                            isActive ? 'bg-blue-500' : isCompleted ? 'bg-green-500' : 'bg-gray-600'
                          }`}>
                            {isActive ? (
                              <Search className="w-4 h-4 text-white animate-spin" />
                            ) : isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <Globe className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className={`text-xs font-medium ${
                            isActive ? 'text-blue-300' : isCompleted ? 'text-green-300' : 'text-gray-400'
                          }`}>
                            {website}
                          </div>
                        </div>
                        
                        {/* Data extraction animation */}
                        {isActive && isExtracting && (
                          <div className="absolute inset-0 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-scan"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Data Flow Animation */}
                {scrapedCount > 0 && (
                  <div className="flex items-center justify-center space-x-4 text-blue-300">
                    <Globe className="w-6 h-6" />
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                    <Download className="w-6 h-6 animate-bounce" />
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                    <Database className="w-6 h-6 text-green-400" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Message */}
          {statusMessage && (
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                {scrapingState === 'complete' && <CheckCircle className="w-5 h-5 text-green-400 mr-2" />}
                {scrapingState === 'error' && <AlertCircle className="w-5 h-5 text-red-400 mr-2" />}
                {scrapingState === 'scraping' && <Search className="w-5 h-5 text-blue-400 mr-2 animate-spin" />}
                <span className="text-white font-medium">{statusMessage}</span>
              </div>
            </div>
          )}

          {/* Live Results Table */}
          {(scrapingState === 'scraping' || scrapingState === 'complete') && bookData.length > 0 && (
            <div className="animate-slide-up">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Database className="w-6 h-6 mr-2 text-blue-400" />
                    Scraped Books ({scrapedCount}/{mockBookData.length})
                  </h2>
                  {scrapingState === 'complete' && (
                    <button
                      onClick={resetScraping}
                      className="px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 border border-blue-400/30 hover:border-blue-300 rounded-lg transition-colors duration-200"
                    >
                      Scrape Again
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Title</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Price</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Source</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookData.map((book, index) => (
                        <tr
                          key={book.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 animate-table-row"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 text-blue-400 mr-2" />
                              <span className="text-white font-medium">{book.title}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-green-400 font-semibold bg-green-400/10 px-2 py-1 rounded">
                              {book.price}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-blue-300 text-sm font-mono">
                              {websites[index]}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <a
                              href={book.link}
                              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                      
                      {/* Loading rows for remaining books */}
                      {scrapingState === 'scraping' && bookData.length < mockBookData.length && (
                        [...Array(mockBookData.length - bookData.length)].map((_, index) => (
                          <tr
                            key={`loading-${index}`}
                            className="border-b border-white/5 opacity-50"
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="w-4 h-4 bg-gray-600 rounded mr-2 animate-pulse"></div>
                                <div className="w-32 h-4 bg-gray-600 rounded animate-pulse"></div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="w-16 h-6 bg-gray-600 rounded animate-pulse"></div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="w-24 h-4 bg-gray-600 rounded animate-pulse"></div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="w-12 h-4 bg-gray-600 rounded animate-pulse"></div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {scrapingState === 'error' && (
            <div className="text-center animate-fade-in">
              <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/20 p-8">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Scraping Failed</h3>
                <p className="text-gray-300 mb-6">
                  Unable to complete the scraping process. Please try again.
                </p>
                <button
                  onClick={resetScraping}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GitHub Button - Fixed at bottom */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://github.com/JARVIS1069" 
          target="_blank" 
          rel="noopener noreferrer"
          className="button-icon"
        >
          <div className="icon">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"
                fill="#222229"
              ></path>
            </svg>
          </div>
          <div className="cube">
            <span className="side front">View Source</span>
            <span className="side top">Check it on GitHub</span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default App;