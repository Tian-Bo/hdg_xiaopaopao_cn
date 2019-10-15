<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:03:00
 * @LastEditTime: 2019-10-14 18:02:38
 -->
<template>
    <div class="app-content">
        <div class="main">
            <div class="main-header">
                <anaOverview />
                <div class="ana-memorandum">
                    <anaMemorandum :anaCalendar="anaCalendar" />
                </div>
                <div class="ana-calendar">
                    <anaCalendar :anaCalendar="anaCalendar" @submitForm="submitForm" />
                </div>
                <el-button class="main-header-btn" type="primary" plain size="mini">
                    <router-link tag="span" to="/activity">去创建活动</router-link>
                </el-button>
            </div>
            <div class="main-body">
                <div class="main-body-left">
                    <div class="main-body-left-t">
                        <anaChart />
                    </div>
                    <div class="main-body-left-b">
                        <div class="main-ana-activity">
                            <anaActivity />
                        </div>
                        <div class="main-ana-remind">
                            <anaRemind />
                        </div>
                    </div>
                </div>
                <div class="main-body-right">
                    <div class="main-ana-ranking">
                        <anaRanking />
                    </div>
                    <div class="main-ana-help">
                        <anaHelp />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import anaOverview from "./components/ana-overview.vue";
import anaMemorandum from "./components/ana-memorandum.vue";
import anaCalendar from "./components/ana-calendar.vue";
import anaChart from "./components/ana-chart.vue";
import anaRanking from "./components/ana-ranking.vue";
import anaActivity from "./components/ana-activity.vue";
import anaRemind from "./components/ana-remind.vue";
import anaHelp from "./components/ana-help.vue";

import { getShopHolidayDetail, setUploadholidaydetail } from "@/api/api";

export default {
    components: {
        anaOverview,
        anaMemorandum,
        anaCalendar,
        anaChart,
        anaRanking,
        anaActivity,
        anaRemind,
        anaHelp
    },
    data() {
        return {
            anaCalendar: []
        };
    },
    created() {
        this.getAnaCalendar();
    },
    methods: {
        // 获取节日列表
        getAnaCalendar() {
            let params = {
                token: localStorage.getItem("token"),
                shop_id: localStorage.getItem("shop_id")
            };
            this.$http.get(getShopHolidayDetail, { params }).then(res => {
                if (res.data.status === 0) {
                    this.anaCalendar = res.data.data;
                }
            });
        },
        // 对小于 10 的数字，前面补 0
        pad(str) {
            return str < 10 ? `0${str}` : str;
        },
        // 自定义节日
        submitForm(data) {
            let d = new Date(data.date);
            let year = d.getFullYear();
            let month = d.getMonth();
            let day = d.getDate();

            let date = [year, this.pad(month + 1), this.pad(day)].join("-");
            date = date.substr(5);

            let params = {
                token: localStorage.getItem("token"),
                shop_id: localStorage.getItem("shop_id"),
                name: data.name,
                date: date,
                headers: { "Content-Type": "multipart/form-data" }
            };
            this.$http
                .post(setUploadholidaydetail, this.$qs.stringify(params))
                .then(res => {
                    if (res.data.status === 0) {
                        console.log(res);
                        this.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        this.getAnaCalendar();
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.main {
    min-height: 1000px;
    padding-bottom: 20px;
    background-color: #e5e5e5;
}
.main-header {
    margin-bottom: 20px;
    background-color: #fff;
    position: relative;
    .ana-memorandum {
        height: 60px;
    }
    .ana-calendar {
        position: absolute;
        top: 215px;
        left: 20px;
    }
    .main-header-btn{
        position: absolute;
        top: 215px;
        right: 20px;
    }
}
.main-body {
    display: flex;
    .main-body-left {
        flex: 1;
        .main-body-left-t {
            height: 500px;
            background-color: #fff;
        }
        .main-body-left-b {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            .main-ana-activity {
                flex: 1;
                height: 500px;
                overflow: hidden;
                background-color: #fff;
            }
            .main-ana-remind {
                background-color: #fff;
                height: 500px;
                width: 550px;
                overflow: hidden;
                margin-left: 20px;
            }
        }
    }
    .main-body-right {
        width: 300px;
        margin-left: 20px;
        .main-ana-ranking {
            height: 500px;
            background-color: #fff;
        }
        .main-ana-help {
            margin-top: 20px;
            height: 500px;
            background-color: #fff;
        }
    }
}
@media screen and (max-width: 1680px) {
    .main-body {
        display: flex;
        .main-body-left {
            flex: 1;
            .main-body-left-t {
                height: 500px;
                background-color: #fff;
            }
            .main-body-left-b {
                display: block;
                // justify-content: space-between;
                // flex-wrap: wrap;
                margin-top: 20px;
                .main-ana-activity {
                    // flex: 1;
                    height: 500px;
                    overflow: hidden;
                    background-color: #fff;
                }
                .main-ana-remind {
                    background-color: #fff;
                    height: 500px;
                    width: 100%;
                    overflow: hidden;
                    margin-left: 0px;
                    margin-top: 20px;
                }
            }
        }
        .main-body-right {
            width: 300px;
            height: 100%;
            margin-left: 20px;
            .main-ana-ranking {
                background-color: #fff;
            }
            .main-ana-help {
                margin-top: 20px;
                height: 500px;
                background-color: #fff;
            }
        }
    }
}
</style>
