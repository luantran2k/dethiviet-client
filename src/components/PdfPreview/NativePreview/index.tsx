import * as React from "react";

export interface IPdfNativePreviewProps {
    url: string;
    isPreview: boolean;
}

export default function PdfNativePreview(props: IPdfNativePreviewProps) {
    const { url, isPreview } = props;
    return (
        <object
            type="application/pdf"
            data={url}
            style={{
                height: "100%",
                width: isPreview ? "60%" : "0",
                transition: "all 0.3s linear",
            }}
        ></object>
    );
}
