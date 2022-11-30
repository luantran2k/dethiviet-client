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
        if (
            (Array.isArray(array) && array.length === 0) ||
            array == undefined
        ) {
            return true;
        }
        return false;
    },
    checkRefreshTokenExpire: () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (
            refreshToken &&
            new Date(ultis.parseJwt(refreshToken).exp * 1000) >= new Date()
        ) {
            return true;
        }
        return false;
    },
    formatDate: (date: Date | string | undefined) => {
        if (date === undefined) {
            return undefined;
        }
        if (typeof date === "string") {
            date = new Date(date);
        }
        return date.toLocaleDateString("vi-VN");
    },
    checkPathInArray: (locaitonPath: string, array: string[]) => {
        const index = array.findIndex((path) => locaitonPath.includes(path));
        if (index !== -1) {
            return true;
        }
        return false;
    },
    isEmptyObject: (obj: object) => {
        return Object.keys(obj).length === 0 ? true : false;
    },
    validate: (
        value: any,
        options: {
            required?: boolean;
            maxLength?: number;
            minLength?: number;
            max?: number;
            min?: number;
        }
    ) => {
        const { required, maxLength, minLength, max, min } = options;
        if (required && (value === undefined || value === "")) {
            return { message: "Cần nhập trường này", isError: true };
        }
        if (
            maxLength &&
            (value?.length === undefined || value.length > maxLength)
        ) {
            return {
                message: `Tối đa cho phép ${maxLength} ký tự.`,
                isError: true,
            };
        }
        if (
            minLength &&
            (value?.length === undefined || value.length < minLength)
        ) {
            return {
                message: `Cần tối thiểu ${minLength} ký tự.`,
                isError: true,
            };
        }

        if (max && value > max) {
            return {
                message: `Tối đa cho phép là: ${max}.`,
                isError: true,
            };
        }
        if (min && value < min) {
            return {
                message: `Cần tối thiểu ${min}.`,
                isError: true,
            };
        }
        return { message: "Success", isError: false };
    },
    deepCopy: (object: object): object => {
        return JSON.parse(JSON.stringify(object));
    },
};
export default ultis;
