'use client';

import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export function ReportActions() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGenerating(true);

    const dashboardElement = document.querySelector('.font-sans') as HTMLElement;
    if (!dashboardElement) {
      setIsGenerating(false);
      return;
    }

    try {
      const html2canvasLib = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      // Scroll to top
      window.scrollTo(0, 0);

      // Temporary class to disable animations for clean capture
      const style = document.createElement('style');
      style.innerHTML = `* { transition: none !important; animation: none !important; }`;
      document.head.appendChild(style);

      const canvas = await html2canvasLib(dashboardElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0d1117',
        logging: false,
        height: dashboardElement.scrollHeight,
        windowHeight: dashboardElement.scrollHeight,
      });
      
      document.head.removeChild(style);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Initial page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Subsequent pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save('SRE-Weekly-Report.pdf');
      
      setIsGenerating(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex gap-3 items-center" style={{ marginLeft: '12px' }}>
      <button 
        onClick={handleDownloadPdf}
        disabled={isGenerating}
        className="fbtn active"
        style={{ padding: '6px 14px', fontSize: '11px' }}
      >
        {isGenerating ? 'Generating...' : 'Generate Report (PDF)'}
      </button>

      {showNotification && (
        <div className="tag tag-g fade-in" style={{ padding: '4px 8px' }}>
          Report generated successfully!
        </div>
      )}
    </div>
  );
}
