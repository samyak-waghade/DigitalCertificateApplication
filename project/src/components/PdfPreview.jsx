// src/components/PdfPreview.jsx
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfPreview = ({ file, width = 500 }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-preview">
      <div className="pdf-controls mb-2">
        <button 
          onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
          className="mr-2 px-2 py-1 bg-gray-200 rounded"
        >
          Zoom Out
        </button>
        <button 
          onClick={() => setScale(prev => prev + 0.1)}
          className="mr-2 px-2 py-1 bg-gray-200 rounded"
        >
          Zoom In
        </button>
        <span className="mr-2">
          Page {pageNumber} of {numPages}
        </span>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(prev => prev - 1)}
          className="mr-2 px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(prev => prev + 1)}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div>Loading PDF...</div>}
      >
        <Page 
          pageNumber={pageNumber} 
          width={width * scale}
          renderTextLayer={false}
          loading={<div>Loading page...</div>}
        />
      </Document>
    </div>
  );
};

export default PdfPreview;