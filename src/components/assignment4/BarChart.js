'use client';

import { useEffect, useRef } from "react";
import * as d3 from 'd3';
import { drawBarChart } from "./drawBarChart";

function BarChart(props) {
    const { svgWidth, svgHeight, marginLeft, marginTop, data, xScale, yScale } = props;
    const d3Selection = useRef();

    useEffect(() => {
        const svg = d3.select(d3Selection.current);

        // 修改1：每次都清除 SVG 中的所有内容，防止堆叠
        svg.selectAll("*").remove(); 

        // 修改2：计算绘图区域的 width 和 height
        let width = svgWidth - marginLeft;
        let height = svgHeight - marginTop - 120;

        // 修改3：主 group，所有坐标轴与柱状图内容都挂在 barChart 下
        const barChart = svg.append("g")
            .attr("transform", `translate(${marginLeft},${marginTop})`);

        // 修改4：添加 x 轴，并设置 class 名和旋转角度
        const xAxis_bar = d3.axisBottom(xScale);
        barChart.append('g')
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis_bar)
            .selectAll("text")
            .attr("class", "x-axis-label")
            .style("text-anchor", "end")
            .attr("dx", "-0.6em")
            .attr("dy", "0.3em")            
            .attr("transform", "rotate(-65)")
            .attr("font-size", "8px");  // 字体统一为 8px

        // 修改5：添加 y 轴并标注 class
        const yAxis_bar = d3.axisLeft(yScale).ticks(9);
        barChart.append("g")
            .attr("class", "y-axis")
            .call(yAxis_bar);

        barChart.selectAll(".y-axis text")
            .attr("font-size", "10px");  // 

        // 修改6：清除旧 y 轴标题，避免堆叠
        barChart.selectAll(".bar-title").remove(); 
        barChart.append("text")
            .attr("class", "bar-title") 
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2 + 20)
            .attr("y", 20)
            .style("text-anchor", "right")
            .attr("font-size", "14px")
            .text("Bikers start from");

        // 修改7：调用 drawBarChart 画柱子（干净分离逻辑）
        drawBarChart(barChart, data, xScale, yScale, width, height);

    }, [data]);

    return <svg width={svgWidth} height={svgHeight} ref={d3Selection}></svg>;
}

export default BarChart;
