interface FormErrorMessParams {
    error: string | undefined;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
}
const ultis = {
    getFormErrorMessage: ({
        error,
        min,
        max,
        minLength,
        maxLength,
    }: FormErrorMessParams): string => {
        if (typeof error === "undefined") return "";
        switch (error) {
            case "required":
                return "Không được bỏ trống trường này";
            case "min":
                return `Cần ít nhất ${min}`;
            case "max":
                return `Tối đã là ${max}`;
            case "minLength":
                return `Cần tối thiểu ${minLength} ký tự`;
            case "maxLength":
                return `Tối đã ${maxLength} ký tự`;
            default: {
                return "";
            }
        }
    },
    createIntArray(from: number, to: number) {
        const arr = [];
        while (from <= to) {
            arr.push(from);
            from++;
        }
        return arr;
    },
    /**
     * Returns x raised to the n-th power.
     *
     * @param {any} value The value need to compare
     * @param {boolean} strict  IF false use == to compare, if true use === to compare
     * @param {any} compareValues Rest parameter values to compare
     * @return {boolean} is true if equal any compare value.
     */
    compareWithMultipleValues(
        value: any,
        strict: boolean,
        compareValues: any[]
    ): boolean {
        let isTrue = false;
        for (const compareValue of compareValues) {
            if (strict) {
                if (value === compareValue) return true;
            } else {
                if (value == compareValue) return true;
            }
        }
        return isTrue;
    },
    removeId: (obj: object, key: string) => {
        delete obj[key as keyof object];
        for (const value of Object.values(obj)) {
            if (typeof value === "object") {
                ultis.removeId(value, key);
            }
        }
        return obj;
    },
    calcScreenDPI: () => {
        const el = document.createElement("div");
        el.style.width = "1in";
        document.body.appendChild(el);
        const dpi = el.offsetWidth;
        document.body.removeChild(el);
        return dpi;
    },
    convertPixelToMilimeter: (number: number) => {
        const onePixel = 25.4 / ultis.calcScreenDPI();
        return number * onePixel;
    },

    parseJwt: (token: string) => {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    },

    checkEmptyArray: (array: any) => {
        if (Array.isArray(array) && array.length === 0) {
            return true;
        }
        return false;
    },
};
export default ultis;
