import { PDFDocumentProxy } from "pdfjs-dist";
export default class PdfEntity {
    url: string;
    password: string | undefined;
    pdfDoc: PDFDocumentProxy | null;
    pageNum?: number;
    pageRendering?: boolean;
    pageNumPending: boolean | null;
    canvas: HTMLCanvasElement | null;
    context?: CanvasRenderingContext2D;

    constructor(url: string, password?: string) {
        this.url = url;
        this.password = password;
        this.pdfDoc = null;
        this.pageNum = 1;
        this.pageRendering = false;
        this.pageNumPending = null;
        this.canvas = null;
    }
}
