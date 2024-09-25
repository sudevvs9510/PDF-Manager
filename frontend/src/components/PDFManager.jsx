// @ts-nocheck
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/legacy/build/pdf.worker';
import React, { useEffect, useState } from "react";
import { jsPDF } from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';


pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFManager = ({ files }) => {
  const [selectedPages, setSelectedPages] = useState([]);
  const [pdfTitle, setPdfTitle] = useState('');

  async function handlePDF() {
    if (files.length > 0) {
      let PDFArray = [];
      await Promise.all(
        files.map(async (file) => {
          const fileReader = new FileReader();

          const fileLoaded = new Promise((resolve, reject) => {
            fileReader.onload = async function () {
              try {
                const typedArray = new Uint8Array(fileReader.result);
                const pdf = await pdfjsLib.getDocument(typedArray).promise;
                const numPages = pdf.numPages;
                const pageImages = [];

                for (let i = 1; i <= numPages; i++) {
                  const page = await pdf.getPage(i);
                  const viewport = page.getViewport({ scale: 1.5 });
                  const canvas = document.createElement('canvas');
                  const context = canvas.getContext('2d');

                  canvas.height = viewport.height;
                  canvas.width = viewport.width;

                  const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                  };

                  await page.render(renderContext).promise;
                  const imgUrl = canvas.toDataURL();
                  pageImages.push({ link: imgUrl, selected: true });
                }

                PDFArray.push(...pageImages);
                resolve();
              } catch (error) {
                reject(error);
              }
            };

            fileReader.readAsArrayBuffer(file);
          });

          return fileLoaded;
        })
      );

      setSelectedPages([...PDFArray]);
    }
  }

  useEffect(() => {
    if (files.length > 0) {
      handlePDF();
    }
  }, [files]);

  function togglePageSelection(index) {
    const newLoadedPdf = [...selectedPages];
    newLoadedPdf[index].selected = !newLoadedPdf[index].selected;
    setSelectedPages(newLoadedPdf);
  }

  async function savePDF() {

    const trimmedTitle = pdfTitle.trim();


    const isAnyPageSelected = selectedPages.some(page => page.selected);

    if (!trimmedTitle) {
      toast.error('Please provide a title for the PDF.');
      return;
    }

    if (!isAnyPageSelected) {
      toast.error('Please select at least one page before downloading.');
      return;
    }

    const pdfDoc = new jsPDF();
    let firstPage = true;

    for (const page of selectedPages) {
      if (page.selected) {
        const imgDataUrl = page.link;
        if (!firstPage) {
          pdfDoc.addPage();
        }
        pdfDoc.addImage(imgDataUrl, 'PNG', 0, 0, pdfDoc.internal.pageSize.getWidth(), pdfDoc.internal.pageSize.getHeight());
        firstPage = false;
      }
    }


    pdfDoc.save(`${trimmedTitle}.pdf`);

    toast.success('PDF downloaded successfully!');
    setSelectedPages([]); 
    setPdfTitle('');
  }

  return (
    <div>
      <div className='flex flex-col items-center'>
        <h2 className="text-2xl font-bold mb-4">PDF Preview</h2>

        <div className="mb-4">
          <input
            type="text"
            value={pdfTitle}
            onChange={(e) => setPdfTitle(e.target.value)}
            placeholder="Enter PDF Title"
            className="border rounded px-4 py-2"
          />
        </div>

        <div className="items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {selectedPages.map((page, index) => (
            <div
              key={index}
              className={`border rounded p-2 ${page.selected ? "bg-violet-300" : ""}`}
              onClick={() => togglePageSelection(index)}
            >
              <img src={page.link} alt={`Page ${index + 1}`} className="w-full" />
              <p className="text-center mt-2">Page {index + 1}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={savePDF}
            className="bg-violet-500 text-white px-4 py-2 rounded"
            disabled={selectedPages.length === 0}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFManager;    
