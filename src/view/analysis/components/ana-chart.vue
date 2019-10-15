<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:03:00
 * @LastEditTime: 2019-10-12 17:45:24
 -->
<template>
    <div class="app-content">
        <div class="app-content-head">整体数据</div>
        <div class="app-content-body">
            <div class="app-content-left">
                <ve-line
                    :colors="veLineColor"
                    :data="chartData1"
                    :tooltip-visible="true"
                    :legend-visible="false"
                    :settings="chartSettings"
                ></ve-line>
            </div>
            <div class="app-content-right">
                <ve-funnel
                    :colors="veFunnelColor"
                    :data="chartData2"
                    :settings="chartSettings2"
                    :tooltip-visible="true"
                    :legend-visible="false"
                    :events="chartEvents"
                ></ve-funnel>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        this.chartSettings = {
            area: true,
            labelMap: {
                time: "value指标",
                number: "数量"            }
        };
        this.chartSettings2 = {};
        // 点击漏斗图回调函数
        var _that = this;
        this.chartEvents = {
            click: function(e) {
                // _that.chartData1.rows = _that.abb;
            }
        };
        return {
            veLineColor: ["#0045FF"],
            veFunnelColor: ["#5CACFE", "#94DC9F", "#FFB660", "#99A1F6"],
            // 折线统计图
            chartData1: {
                columns: ["time", "number"],
                rows: [
                    {
                        time: "11:00",
                        number: 5000
                    },
                    {
                        time: "12:00",
                        number: 6000
                    },
                    {
                        time: "13:00",
                        number: 3000
                    },
                    {
                        time: "14:00",
                        number: 8000
                    },
                    {
                        time: "15:00",
                        number: 9000
                    },
                    {
                        time: "16:00",
                        number: 10000
                    },
                    {
                        time: "17:00",
                        number: 4000
                    },
                    {
                        time: "18:00",
                        number: 7000
                    },
                    {
                        time: "19:00",
                        number: 3990
                    },
                    {
                        time: "20:00",
                        number: 4540
                    },
                    {
                        time: "21:00",
                        number: 8000
                    },
                    {
                        time: "22:00",
                        number: 4000
                    },
                    {
                        time: "23:00",
                        number: 5460
                    },
                    {
                        time: "24:00",
                        number: 9090
                    },
                    {
                        time: "00:00",
                        number: 5400
                    },
                    {
                        time: "01:00",
                        number: 5400
                    }
                ]
            },

            // 漏斗统计图
            chartData2: {
                columns: ["状态", "数值"],
                rows: [
                    { 状态: "展示", 数值: 900 },
                    { 状态: "访问", 数值: 600 },
                    { 状态: "点击", 数值: 300 },
                    { 状态: "订单", 数值: 100 }
                ]
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.app-content {
    width: 100%;
    padding: 30px;
    .app-content-head {
        margin-bottom: 30px;
    }
    .app-content-body {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .app-content-left {
            flex: 2;
        }
        .app-content-right {
            flex: 1;
        }
    }
}
</style>
