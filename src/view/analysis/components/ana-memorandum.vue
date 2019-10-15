<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:03:00
 * @LastEditTime: 2019-10-14 18:04:31
 -->
<template>
    <div class="app-content">
        <div class="festival" ref="Festival">
            <div
                class="festival-item"
                v-for="(item, index) in anaCalendar"
                :key="index"
                v-if="item.timestamp > timestamp && item.timestamp < endtime"
                :style="{ 'left': festivalLeft(item) }"
            >
                <div class="festival-name text-truncation">
                    {{ item.name }}还有
                    <span class="festival-day">{{ festivalDay(item) }}</span>
                    天
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['anaCalendar'],
    data() {
        return {
            flag: true,
            timestamp: parseInt(new Date().getTime() / 1000),
            endtime: parseInt(new Date().getTime() / 1000 + (86400 * 60)),
            startTime: '',
            holidayList: [],
        };
    },
    created() {
    },
    methods: {
        // 计算节假日距离左侧距离
        festivalLeft(item) {
            if (item.timestamp < this.timestamp && item.timestamp > this.endtime) {
                return
            }
            // 第一条节日 左边距为 0px
            if (this.flag) {
                this.flag = false
                this.startTime = item.timestamp
                return '0px';
            }

            let width = this.$refs.Festival.clientWidth / 60
            let second = item.timestamp - this.startTime
            let minute = second / 60
            let hour = minute / 60
            let day = hour / 24
            let left = day * width

            return left + 'px';
        },
        // 计算活动距今还有多少天
        festivalDay(item) {
            let second = item.timestamp - this.timestamp
            let minute = second / 60
            let hour = minute / 60
            let day = hour / 24 + 1

            return parseInt(day)
        }
    }
};
</script>

<style lang="scss" scoped>
.app-content {
    border-top: 1px solid #eee;
    padding: 0 100px;
    .festival{
        position: relative;
    }
    .festival-item {
        position: absolute;
        width: 6px;
        height: 6px;
        box-shadow: 0px 0px 1px 3px rgba(64, 158, 255, 0.3);
        border-radius: 50%;
        top: -3px;
        left: 0px;
        background-color: #409eff;
    }
    .festival-name {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 110px;
        text-align: center;
        font-size: 12px;
        color: #808080;
    }
    .festival-day {
        background-color: #eee;
        border-radius: 2px;
        padding: 2px 3px;
        display: inline-block;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
    }
    .festival-item:first-of-type {
        .festival-day {
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
