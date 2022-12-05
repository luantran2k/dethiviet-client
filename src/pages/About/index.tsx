import katex from "katex";
import { useEffect, useRef, useState } from "react";

export interface IAboutPageProps {}

export default function AboutPage(props: IAboutPageProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [text, setText] = useState<string>("");
    //      "% \\f is defined as #1f(#2) using the macro\n\\f\\relax{x} = \\int_{-\\infty}^\\infty\n    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}\n    \\,d\\xi"
    useEffect(() => {
        katex.render(text, divRef.current!, {
            displayMode: true,
            leqno: false,
            fleqn: false,
            throwOnError: true,
            errorColor: "#cc0000",
            strict: "warn",
            output: "html",
            trust: false,
            macros: { "\\f": "#1f(#2)" },
        });
    });
    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                }}
            />
            <div ref={divRef}></div>
        </div>
    );
}
