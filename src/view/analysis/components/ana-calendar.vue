<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-10-12 15:18:36
 * @LastEditTime: 2019-10-14 17:59:55
 -->

<template>
    <div class="app-content">
        <el-popover placement="bottom-start" trigger="click">
            <div class="calendar-box">
                <div class="calendar-title">
                    <span class="calendar-title-text">编辑日历</span>
                    <span class="calendar-title-btn" @click="switching">{{ show ? '添加' : '返回' }}</span>
                </div>
                <div class="calendar-wrapper" v-show="show">
                    <div class="calendar-toolbar">
                        <div class="prev" @click="prevMonth">
                            <i class="el-icon-d-arrow-left"></i>
                        </div>
                        <div class="current">{{ currentDateStr }}</div>
                        <div class="next" @click="nextMonth">
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </div>
                    <div class="calendar-week">
                        <div class="week-item" v-for="item of weekList" :key="item">{{ item }}</div>
                    </div>
                    <div class="calendar-inner">
                        <div
                            class="calendar-item"
                            v-for="(item, index) of calendarList"
                            :key="index"
                            :class="[item.disable ? 'disabled' : '']"
                        >
                            <div
                                class="calendar-item-date"
                                :class="[item.value == currentTime ? 'active' : '', getFestival(item.value) != '' ? 'border1' : '']"
                            >{{ item.date }}</div>
                            <div class="calendar-item-hover" v-if="getFestival(item.value) != ''">
                                {{ getFestival(item.value) }}
                                <div class="calendar-item-arrow"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="calendar-add" v-show="!show">
                    <el-form
                        label-width="50px"
                        label-position="left"
                        :rules="ruleForm"
                        ref="ruleForm"
                        :model="formData"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="名称" prop="name">
                            <el-input
                                type="text"
                                name="name"
                                placeholder="请输入名称"
                                v-model="formData.name"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="日期" prop="date">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="formData.date"
                                style="width: 100%"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                class="form-buttom"
                                type="primary"
                                @click="submitForm('ruleForm')"
                            >确定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="reference" class="calendar-icon">
                <i class="iconfont iconrili1"></i>
            </div>
        </el-popover>
    </div>
</template>

<script>
export default {
    props: ["anaCalendar"],
    data() {
        return {
            show: true,
            formData: {
                name: "",
                date: ""
            },
            ruleForm: {
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                date: [
                    { required: true, message: "请输入日期", trigger: "blur" }
                ]
            },
            currentTime: "", // 当前时间
            current: {}, // 当前时间
            weekList: ["一", "二", "三", "四", "五", "六", "日"],
            calendarList: [], // 用于遍历显示
            shareDate: new Date() // 享元模式，用来做优化的
        };
    },
    computed: {
        // 显示当前时间
        currentDateStr() {
            let { year, month } = this.current;
            return `${year}年 ${this.pad(month + 1)}月`;
        }
    },
    mounted() {
        this.init();
    },
    created() {
        this.getCurrentTime();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let d = new Date(this.formData.date);
                    let year = d.getFullYear();
                    let month = d.getMonth();
                    let day = d.getDate();
                    let date = this.stringify(year, month, day)

                    let official = this.getFestival(date, 'off');
                    console.log(official)

                    if (official) {
                        return this.$message({
                            message: "该日期不能进行修改",
                            type: "warning"
                        });
                    }
                    this.$emit("submitForm", this.formData);
                }
            });
        },
        switching() {
            this.show = !this.show;
        },
        // 获取节日假
        getFestival(value, off) {
            let festival = "";
            let official = false
            this.anaCalendar.forEach((item, index) => {
                if (item.date.substr(5) == value.substr(5)) {
                    festival = item.name;
                    official = item.official
                }
            });
            if (off == 'off') {
                return official;
            }
            return festival;
        },
        getCurrentTime() {
            let d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth();
            let date = d.getDate();
            this.currentTime = this.stringify(year, month, date);
        },
        init() {
            // 初始化当前时间
            this.setCurrent();
            this.calendarCreator();
        },
        // 判断当前月有多少天
        getDaysByMonth(year, month) {
            return new Date(year, month + 1, 0).getDate();
        },
        getFirstDayByMonths(year, month) {
            return new Date(year, month, 1).getDay();
        },
        getLastDayByMonth(year, month) {
            return new Date(year, month + 1, 0).getDay();
        },
        // 对小于 10 的数字，前面补 0
        pad(str) {
            return str < 10 ? `0${str}` : str;
        },
        // 点击上一月
        prevMonth() {
            this.current.month--;
            // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
            this.correctCurrent();
            // 生成新日期
            this.calendarCreator();
        },
        // 点击下一月
        nextMonth() {
            this.current.month++;
            // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
            this.correctCurrent();
            // 生成新日期
            this.calendarCreator();
        },
        // 格式化时间，与主逻辑无关
        stringify(year, month, date) {
            let str = [year, this.pad(month + 1), this.pad(date)].join("-");
            return str;
        },
        // 设置或初始化 current
        setCurrent(d = new Date()) {
            let year = d.getFullYear();
            let month = d.getMonth();
            let date = d.getDate();
            this.current = {
                year,
                month,
                date
            };
        },
        // 修正 current
        correctCurrent() {
            let { year, month, date } = this.current;

            let maxDate = this.getDaysByMonth(year, month);
            // 预防其他月跳转到2月，2月最多只有29天，没有30-31
            date = Math.min(maxDate, date);

            let instance = new Date(year, month, date);
            this.setCurrent(instance);
        },
        // 生成日期
        calendarCreator() {
            // 一天有多少毫秒
            const oneDayMS = 24 * 60 * 60 * 1000;

            let list = [];
            let { year, month } = this.current;

            // 当前月份第一天是星期几, 0-6
            let firstDay = this.getFirstDayByMonths(year, month);
            // 填充多少天
            let prefixDaysLen = firstDay === 0 ? 6 : firstDay - 1;
            // 毫秒数
            let begin =
                new Date(year, month, 1).getTime() - oneDayMS * prefixDaysLen;

            // 当前月份最后一天是星期几, 0-6
            let lastDay = this.getLastDayByMonth(year, month);
            // 填充多少天， 和星期的排放顺序有关
            let suffixDaysLen = lastDay === 0 ? 0 : 7 - lastDay;
            // 毫秒数
            let end =
                new Date(year, month + 1, 0).getTime() +
                oneDayMS * suffixDaysLen;

            while (begin <= end) {
                // 享元模式，避免重复 new Date
                this.shareDate.setTime(begin);
                let year = this.shareDate.getFullYear();
                let curMonth = this.shareDate.getMonth();
                let date = this.shareDate.getDate();
                list.push({
                    year: year,
                    month: curMonth,
                    date: date,
                    disable: curMonth !== month,
                    value: this.stringify(year, curMonth, date)
                });
                begin += oneDayMS;
            }

            this.calendarList = list;
        }
    }
};
</script>

<style lang="scss" scoped>
.app-content {
}
.calendar-icon {
    color: #ccc;
    cursor: pointer;
    .iconfont {
        font-size: 18px !important;
    }
}
.calendar-box {
    // width: 384px;
    // height: 486px;
    // padding: 15px;
    // background-color: #fff;
    // z-index: 9;
    // box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    // position: absolute;
    // top: 30px;
    // left: 30px;
    // border: 2px solid #ccc;
    // border-radius: 2px;
    .calendar-title {
        margin-bottom: 15px;
        text-align: center;
        position: relative;
        .calendar-title-text {
            color: #333;
        }
        .calendar-title-btn {
            position: absolute;
            right: 15px;
            color: #409eff;
            cursor: pointer;
        }
    }
}
.calendar-wrapper {
    width: 350px;
}

.calendar-toolbar {
    display: flex;
    width: 322px;
    margin: 0 auto;
    text-align: center;
    .prev,
    .next {
        cursor: pointer;
    }
}

.calendar-toolbar .current {
    flex: 1;
}

.calendar-week {
    display: flex;
    text-align: center;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}
.calendar-week .week-item {
    flex: 1;
    width: 40px;
}

.calendar-item {
    float: left;
    width: 50px;
    height: 50px;
    position: relative;
    cursor: pointer;
}
.calendar-item-hover {
    display: none;
    position: absolute;
    background-color: #999;
    color: #fff;
    padding: 5px;
    font-size: 12px;
    border-radius: 3px;
    width: 100px;
    line-height: 20px;
    top: 42px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
}
.calendar-item-arrow {
    position: absolute;
    top: -20px;
    left: 50%;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: #999 transparent transparent transparent;
    transform: translateX(-50%) rotate(180deg); /*顺时针旋转90°*/
}
.calendar-item:hover .calendar-item-hover {
    display: block;
}
.calendar-item.disabled {
    color: #ccc;
}
.calendar-item.checked {
    color: #409eff;
}
.calendar-item-date {
    margin: 10px auto;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
}
.active {
    color: #409eff;
    background-color: #409eff;
    color: #fff;
}

.calendar-add {
    padding: 0 30px;
    .calendar-add-item {
        display: flex;
    }
    .demo-ruleForm {
        margin-top: 100px;
        .form-buttom {
            margin-top: 30px;
            margin-left: 55px;
        }
    }
}
.border1 {
    border: 1px solid #409eff;
}
</style>