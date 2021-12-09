import React from 'react'
import ReactFC from 'react-fusioncharts'
import FusionCharts from 'fusioncharts'
import Chart from 'fusioncharts/fusioncharts.charts'
import { useInventory } from '../../Context/InventoryContext'

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart)

const PersonalChart = () => {
  const { stockItems, missingItems } = useInventory()
  const { ownItems } = stockItems
  const { ownMissing } = missingItems

  if (!ownItems || !ownMissing) {
    return <pre>Loading...</pre>
  }

  const chartData = [
    {
      label: 'Existing items',
      value: ownItems.length,
    },
    {
      label: 'Missing items',
      value: ownMissing.length,
    },
  ]
  const chartConfigs = {
    type: 'doughnut2d', // The chart type
    width: '100%', // Width of the chart
    height: '350', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Personal items ratio', //Set the chart caption
        showPercentValues: 0,
        captionFontColor: '#FFFFFF',
        captionFontBold: 0,
        captionFontSize: 20,
        captionFont: 'Futura',
        baseFont: 'Futura',
        baseFontSize: 14,
        baseFontColor: '#FFFFFF',
        smartLineColor: '#617d98',
        showShadow: 0,
        showPlotBorder: 0,
        paletteColors: ' #1de9b6, #2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63,',
        use3DLighting: 0,
        toolTipColor: '#617d98',
        useDataPlotColorForLabels: 0,
        bgColor: '#010e33',
        showBorder: 0,
      },
      // Chart Data - from step 2
      data: chartData,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default PersonalChart
