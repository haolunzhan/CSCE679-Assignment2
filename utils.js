export
function addLegend(svg, width, height, margin, colorScale, adjust) {
    const legendMargin = 20;
    const legendWidth = 30;
    const legendHeight = height - margin.top - margin.bottom - adjust;
    const legendX = width + legendMargin;
    const legendY = margin.top;

    // Create a linear scale for the legend
    const legendScale = d3.scaleLinear()
        .domain([0, 40])
        .range([legendY, legendY + legendHeight]);

    // Create a group for the legend
    const legend = svg.append("g")
        .attr("class", "legend");

    // Generate data for the gradient
    const numSteps = 100;
    const stepSize = legendHeight / numSteps;
    const legendData = d3.range(0, 40, 40 / numSteps);

    // Draw legend gradient using small rectangles
    legend.selectAll("rect")
        .data(legendData)
        .enter()
        .append("rect")
        .attr("x", legendX)
        .attr("y", (d, i) => legendY + i * stepSize)
        .attr("width", legendWidth)
        .attr("height", stepSize + 1)
        .attr("fill", d => colorScale(d));

    // Add label for 0°C at the top of the legend
    legend.append("text")
        .attr("x", legendX + legendWidth + 5)
        .attr("y", legendY + 5)
        .attr("text-anchor", "start")
        .attr("font-family", "Times New Roman")
        .attr("font-size", "15px")
        .style("font-weight", 500)
        .text("0 Celsius");

    // Add label for 40°C at the bottom of the legend
    legend.append("text")
        .attr("x", legendX + legendWidth + 5)
        .attr("y", legendY + legendHeight - 5)
        .attr("text-anchor", "start")
        .attr("font-family", "Times New Roman")
        .attr("font-size", "15px")
        .style("font-weight", 500)
        .text("40 Celsius");
}