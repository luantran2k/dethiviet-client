import { Typography } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "../../app/hooks";
import styles from "./style.module.scss";

export interface IAppLoadingProps {}

export default function AppLoading(props: IAppLoadingProps) {
    const isLoading = useAppSelector((state) => state.app.isLoading);
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingContent}>
                    <div className={styles.ldsRoller}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    }
    return <></>;
}
