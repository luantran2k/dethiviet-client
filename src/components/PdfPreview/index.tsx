import * as pdfjsLibModule from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";
type PDFJS = typeof pdfjsLibModule;
import styles from "./style.module.scss";

import "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.1.81/build/pdf.min.js";
// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib: PDFJS = window["pdfjs-dist/build/pdf" as keyof typeof window];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.1.81/build/pdf.worker.min.js";

export interface IPdfPreviewProps {
    path: string;
    securityCode?: string;
    scale?: number;
}

interface PdfConfig {
    pdfDoc: pdfjsLibModule.PDFDocumentProxy | null;
    pageRendering: boolean;
    pageNumPending: number | null;
}

export default function PdfPreview(props: IPdfPreviewProps) {
    const { path, securityCode, scale = 4 } = props;

    const pdfViewer = useRef<HTMLDivElement>(null);
    const countPage = useRef(0);

    useEffect(() => {
        let thePdf: pdfjsLibModule.PDFDocumentProxy | null = null;

        pdfjsLib
            .getDocument({ url: path, password: securityCode })
            .promise.then(function (pdf) {
                thePdf = pdf;
                const viewer = pdfViewer.current!;
                if (countPage.current >= pdf.numPages) {
                    console.log("Page count: " + countPage.current);
                    return;
                }
                for (let page = 1; page <= pdf.numPages; page++) {
                    const canvas = document.createElement("canvas");
                    canvas.className = styles.pdfPageCanvas;
                    viewer.appendChild(canvas);
                    renderPage(page, canvas);
                }
            });

        function renderPage(pageNumber: number, canvas: HTMLCanvasElement) {
            countPage.current++;
            thePdf?.getPage(pageNumber).then(function (page) {
                const viewport = page.getViewport({
                    scale: 1.2,
                });
                var resolution = 2;
                canvas.height = resolution * viewport.height; //actual size
                canvas.width = resolution * viewport.width;
                canvas.style.height = viewport.height + "px";
                canvas.style.width = viewport.width + "px";
                page.render({
                    canvasContext: canvas.getContext("2d")!,
                    viewport: viewport,
                    transform: [resolution, 0, 0, resolution, 0, 0],
                });
            });
        }
    }, []);

    return <div ref={pdfViewer} className={styles.pdfViewer}></div>;
}
