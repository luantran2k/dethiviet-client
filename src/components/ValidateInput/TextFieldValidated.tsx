import { SxProps, TextField, Theme } from "@mui/material";
import React, { useState } from "react";
import ultis from "../../Utils/ultis";

export interface ITextFieldValidatedProps {
    label: string;
    options?: {
        required?: boolean;
        maxLength?: number;
        minLength?: number;
        max?: number;
        min?: number;
    };
    type?: "string" | "number";
    defaultValue?: string | number;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    sx?: SxProps<Theme>;
}

export default function TextFieldValidated(props: ITextFieldValidatedProps) {
    const { label, options = {}, onChange, defaultValue, type, sx } = props;
    const [error, setError] = useState<{ message: string; isError: boolean }>({
        message: "",
        isError: false,
    });
    const [value, setValue] = useState<string | number>(defaultValue || "");
    return (
        <TextField
            type={type || "text"}
            label={label}
            value={value}
            fullWidth
            sx={sx}
            error={error.isError}
            helperText={error.isError && error.message}
            onChange={(e) => {
                const res = ultis.validate(e.target.value, options);
                if (res.isError) {
                    setError(res);
                } else {
                    if (error.isError === true) {
                        setError({
                            message: "",
                            isError: false,
                        });
                    }
                }
                setValue(e.target.value);
                if (onChange) {
                    onChange(e);
                }
            }}
        />
    );
}
