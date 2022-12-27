import styles from "./styles.module.scss";
export interface IOrderListProps {
    children: any;
    variant?: "decimal" | "lower-alpha" | "upper-alpha";
    prefix?: string;
}

export default function OrderList(props: IOrderListProps) {
    const { children, variant = "decimal" } = props;
    return (
        <ol
            className={`${styles.ol_list} 
            ${styles[variant]}`}
            style={{
                listStyle: variant,
            }}
        >
            {children}
        </ol>
    );
}
