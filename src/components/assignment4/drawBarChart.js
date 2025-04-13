import * as d3 from "d3";

export let drawBarChart = (barChartLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {
  // 1) 清除旧 bar-group
  barChartLayer.selectAll(".bar-group").remove();

  // 2) 新建容器 <g>
  const g = barChartLayer.append("g")
    .attr("class", "bar-group");

  // 3) 绘制柱子
  const bars = g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", d => {
        const cleanName = d.station ? d.station.replace(/[^\w]/g, "") : "unknown";
        // 给柱子命名 bar bar-cls-xxx
        return `bar bar-cls-${cleanName}`;
      })
    // 柱状位置与大小
    .attr("x", d => xScale(d.station) + 1)
    .attr("y", d => yScale(d.tripdurationS))
    .attr("width", xScale.bandwidth())
    .attr("height", d => barChartHeight - yScale(d.tripdurationS))
    .attr("fill", "steelblue")
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  // 4) tooltip (原生 title)
  bars.append("title")
    .text(d => `${d.station}: ${d.tripdurationS} trips`);

  // 5) hover事件（bar → scatter）
  bars.on("mouseover", (event, d) => {
    // 柱子变红
    d3.select(event.target)
      .attr("fill", "red");

    // 方案 A：filter 对比 station 值
    d3.selectAll(".scatter-point")
      .filter(p => p.station === d.station)
      .attr("fill", "red")
      .attr("r", 10)
      .raise();

    // 方案 B：className 同步
    const cleanName = d.station ? d.station.replace(/[^\w]/g, "") : "unknown";
    d3.selectAll(`.point.cls-${cleanName}`)
      .attr("r", 10)
      .style("fill", "red")
      .raise();

    d3.select("#scatter-plot")                // 选中 scatterPlot
        .append("rect")
        .attr("class", "bar-overlay")           // 用于 remove
        .attr("width", barChartWidth-20)           // 需跟散点图大小一致
        .attr("height", barChartHeight+100)
        .style("fill", "yellow")
        .style("opacity", 0.5)
        .lower();
  })
  .on("mouseout", (event, d) => {
    // 柱子恢复
    d3.select(event.target)
      .attr("fill", "steelblue");

    // 方案 A：filter 对比 station 值
    d3.selectAll(".scatter-point")
      .filter(p => p.station === d.station)
      .attr("fill", "blue")
      .attr("r", 5);

    // 方案 B：className 同步
    const cleanName = d.station ? d.station.replace(/[^\w]/g, "") : "unknown";
    d3.selectAll(`.point.cls-${cleanName}`)
      .attr("r", 5)
      .style("fill", "steelblue");

    d3.select("#scatter-plot")         // 选中 scatterPlot
      .selectAll(".bar-overlay")       // 移除
      .remove();
  });
};
