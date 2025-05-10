"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";

const CoverLetterPreview = ({ content, initialContent }) => {
  const [coverLetterContent, setCoverLetterContent] = useState(content || initialContent);
  const [isGenerating, setIsGenerating] = useState(false);

  // PDF generation function
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("cover-letter-pdf");
      const opt = {
        margin: [15, 15],
        filename: "cover-letter.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Error generating PDF.");
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Update cover letter content when user edits it
  const handleContentChange = (value) => {
    setCoverLetterContent(value);
  };

  return (
    <div className="py-4">
      {/* PDF Download Button */}
      <div className="flex justify-end mb-4">
        <Button onClick={generatePDF} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      {/* MDEditor for cover letter content */}
      <div className="border rounded-lg p-4">
        <MDEditor
          value={coverLetterContent}
          onChange={handleContentChange}
          preview="preview"
          height={700}
        />
      </div>

      {/* Hidden div for PDF generation */}
      <div className="hidden">
        <div id="cover-letter-pdf">
          <MDEditor.Markdown
            source={coverLetterContent}
            style={{
              background: "white",
              color: "black",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
