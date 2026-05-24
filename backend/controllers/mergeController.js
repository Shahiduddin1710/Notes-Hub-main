import { PDFDocument } from "pdf-lib";
import supabase from "../config/supabase.js";

export const mergePdfs = async (req, res) => {
  try {
    const { university, semester, subject, subSubject } = req.params;

    if (!university || !semester || !subject) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const folderPath = subSubject
      ? `${university}/${semester}/${subject}/${subSubject}`
      : `${university}/${semester}/${subject}`;

    // List all files in the folder
    const { data, error } = await supabase.storage
      .from("notes")
      .list(folderPath, { limit: 100 });

    if (error || !data || data.length === 0) {
      return res.status(404).json({ success: false, message: "No files found" });
    }

    // Filter only PDFs, exclude placeholders
    const pdfFiles = data
      .filter(f => f.name.endsWith(".pdf") && !f.name.includes("emptyFolderPlaceholder"))
      .sort((a, b) => {
        // Sort numerically: 01.pdf, 02.pdf ... then Report.pdf last
        const aNum = parseInt(a.name);
        const bNum = parseInt(b.name);
        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
        if (!isNaN(aNum)) return -1;
        if (!isNaN(bNum)) return 1;
        return a.name.localeCompare(b.name);
      });

    if (pdfFiles.length === 0) {
      return res.status(404).json({ success: false, message: "No PDF files found" });
    }

    const baseUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/notes`;

    // Fetch all PDFs as ArrayBuffers
    const pdfBuffers = await Promise.all(
      pdfFiles.map(async (file) => {
        const url = `${baseUrl}/${folderPath}/${file.name}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${file.name}`);
        return response.arrayBuffer();
      })
    );

    // Merge all PDFs into one
    const mergedPdf = await PDFDocument.create();

    for (const buffer of pdfBuffers) {
      try {
        const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      } catch (e) {
        console.warn("Skipping a PDF that could not be loaded:", e.message);
      }
    }

    const mergedBytes = await mergedPdf.save();

    const folderLabel = subSubject || subject;
    const fileName = `${folderLabel}-complete-material.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Length", mergedBytes.length);
    res.send(Buffer.from(mergedBytes));

  } catch (error) {
    console.error("Merge error:", error);
    res.status(500).json({ success: false, message: error.message || "Merge failed" });
  }
};
