/**
 *
 * Copyright (C) 2019 Future Internet Consulting and Development Solutions S.L. All Rights Reserved.
 *
 */

/* exported ECharts */
/* globals echarts */


var ECharts = (function () {

    "use strict";

    // =========================================================================
    // CLASS DEFINITION
    // =========================================================================

    var echart;


    var eCharts = function eCharts() {

        var container = document.getElementById('echartContainer');
        echart = echarts.init(container);
        // New ECharts options handler
        MashupPlatform.wiring.registerCallback("echarts_options", loadChart);

        // Resize handler
        window.addEventListener("resize",() => {
            if (echart != null) {
                echart.resize();
            }
        });

        /* test-code */
        window.loadChart = loadChart;
        /* end-test-code */
    };

    var loadChart = function loadChart(data) {
        if (data == null) {
            // Load Empty chart
            echart.clear();
            echart.showLoading();

            var msgOption = {
                title: {
                    show: true,
                    textStyle: {
                        color: 'grey',
                        fontSize: 20
                    },
                    text: "No Data",
                    left: 'center',
                    top: 'center'
                },
                axisPointer:{
                    Animation:false
                },
                xAxis: {
                    type: 'time',
                    splitLine:{
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine:{
                    show: false
                    }
                },
                series: [{
                    name: '',
                    type: 'pie',
                    showSymbol: false,
                    data: data
                }]
            };

            echart.setOption(msgOption);
            echart.hideLoading();
            return;
        }

        // Load new chart
        echart.clear();
        echart.showLoading();

        if (data && typeof data === "object") {
            try {
                for(var i=0; i<5; i++){
                    data.shift(); 
                    data.push(data);
                }
                echart.setOption({
                    series: [{
                    data: data
                    }], 
                    show: true 
                });
            } catch (e) {
                MashupPlatform.widget.log("Error loading the new options in ECharts: " + e, MashupPlatform.log.ERROR);
            }
        } else {
            MashupPlatform.widget.log("Invalid ECharts options. Should be a JSON object", MashupPlatform.log.ERROR);
        }
        echart.hideLoading();
    };

    return eCharts;
})();
