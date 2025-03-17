import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import { ChartTypes } from "@/types/tableChartData";

export default function LineChart({ data }: ChartTypes) {
const chartRef = useRef<HTMLCanvasElement | null>(null);

useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // チャートのインスタンスを作成
    const chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
        onClick: (e) => {
        const canvasPosition = getRelativePosition(e, chart);
        const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
        const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        console.log(`Clicked on: ${dataX}, ${dataY}`);
        },
    },
    });

    return () => chart.destroy(); // コンポーネントがアンマウントされたらチャートを破棄
}, [data]); // `data` が変更されたらチャートを更新**

return <canvas ref={chartRef}></canvas>;
}
