import {
    amber,
    blue,
    cyan,
    green,
    orange,
    pink,
    purple,
    red,
    teal,
} from "@mui/material/colors";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = (title: string) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    font: {
                        size: 18,
                    },
                },
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 24,
                },
            },
        },
    };
};

export interface DataSet {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
}

export interface ChartData {
    title: string;
    labels: string[];
    datasets: DataSet[];
}

interface LineChartProps {
    data: ChartData;
}
const colors = [
    red,
    green,
    blue,
    amber,
    teal,
    blue,
    cyan,
    pink,
    orange,
    purple,
];

export function LineChart(props: LineChartProps) {
    const { data } = props;

    data.datasets = data.datasets.map((dataset) => {
        //const color = colors[ultis.randomInt(0, colors.length - 1)];
        return {
            ...dataset,
            borderColor: teal[300],
            backgroundColor: teal[800],
        };
    });
    return <Line options={options(data.title)} data={data} />;
}
