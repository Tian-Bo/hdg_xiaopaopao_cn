<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-21 11:24:18
 * @LastEditTime: 2019-09-19 13:28:41
 -->
<template>
    <div class="cover-image">
        <div class="count-down">
            <div class="count-down-ka">
                <div class="count-down-box">
                    <div class="count-down-title">
                        距离活动结束还有
                    </div>
                    <div
                        class="count-down-time"
                        v-html="
                            $options.filters.computOneTime(countDownInfo.diff)
                        "
                    ></div>
                </div>
            </div>
        </div>
        <!-- 操作界面 -->
        <div class="set-interface" v-show="settingIndex === countDownInfo.type">
            <el-date-picker
                v-model="countDownInfo.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :change="computTwoTime()"
                format="yyyy-MM-dd  HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            <div class="tip-text">
                可从此调整活动时间，修改后活动时间将同步生效
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        countDownInfo: {
            type: Object,
            default() {
                return {};
            }
        },
        // 操作的状态
        settingIndex: {
            type: Number,
            default() {
                return {};
            }
        }
    },
    data() {
        return {};
    },
    created() {},
    methods: {
        // 将两个时间戳之间计算剩余时间戳
        computTwoTime() {
            let _that = this;
            // 由于在父组件会多次循环导致这个组件多次执行,所以做一个判断
            let beginTime = Date.parse(_that.countDownInfo.time[0]);
            let endTime = Date.parse(_that.countDownInfo.time[1]);

            let newTime = Date.parse(new Date());
            if (newTime > endTime) {
                return (_that.countDownInfo.diff = 0);
            }
            let stime = new Date(beginTime).getTime();
            let etime = new Date(endTime).getTime();
            _that.countDownInfo.diff = (etime - stime) / 1000;
        }
    },
    filters: {
        // 将事件戳转换以天为最大单位的日期
        computOneTime(countDownInfoDiff) {
            if (countDownInfoDiff === 0) {
                return `已过期`;
            }
            let usedTime = countDownInfoDiff * 1000;
            let days = Math.floor(usedTime / (24 * 3600 * 1000));
            //计算出小时数
            let leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
            let hours = Math.floor(leave1 / (3600 * 1000));
            //计算相差分钟数
            let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
            let minutes = Math.floor(leave2 / (60 * 1000));
            return (countDownInfoDiff = ` <span style="color:#f20">${days}</span>天 <span style="color:#f20"> ${hours}</span>时 <span style="color:#f20"> ${minutes}</span>分`);
        }
    }
};
</script>

<style lang="scss" scoped>
.cover-image {
    position: relative;
    .count-down {
        height: 107px;
        width: 100%;
        line-height: 20px;
        display: block;
        text-align: center;
        padding: 25px 10px;
        .count-down-ka {
            box-shadow: rgba(66, 133, 232, 0.54) 0px -15px 1px;
            border-radius: 10px;
        }
        .count-down-box {
            background: #fff;
            padding: 10px 0;
            border-radius: 10px;
            box-shadow: 0px -8px 1px #c8dcf8;
            .count-down-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .count-down-time {
                font-size: 24px;
                span {
                    color: #f20;
                }
            }
        }
    }
    .bgimg-interface {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        cursor: pointer;
        .bgimg-down {
            height: 87px;
            width: 100%;
            display: block;
        }
        .edit-text {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            color: #ccc;
            text-align: center;
            z-index: 2;
        }
    }
    .set-interface {
        position: absolute;
        top: 20%;
        right: -500px;
        z-index: 2;
        border: 1px #ccc solid;
        width: 434px;
        padding: 20px;
        .tip-text {
            font-size: 12px;
            color: #ccc;
            padding-top: 8px;
        }
    }
    // 侧边三角形
    .set-interface::after {
        content: "";
        top: 10px;
        left: -17px;
        width: 0;
        height: 0;
        border-width: 18px 18px 18px 0;
        border-style: solid;
        border-color: transparent #fff transparent transparent;
        position: absolute;
        z-index: 3;
    }
    .set-interface::before {
        content: "";
        top: 10px;
        left: -18px;
        width: 0;
        height: 0;
        border-width: 18px 18px 18px 0;
        border-style: solid;
        border-color: transparent #ccc transparent transparent;
        position: absolute;
        z-index: 3;
    }
}
</style>