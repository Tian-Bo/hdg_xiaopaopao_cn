<template>
    <div>
        <div class="right-set-name">
            <div class="input-active-name">
                <div class="active-name">输入标题:</div>
                <div>
                    <el-input
                        v-model="decorSideslip.title"
                        placeholder="请输入选项名字"
                        size="mini"
                    ></el-input>
                </div>
            </div>
        </div>
        <!-- 选择活动 -->
        <div style="display:flex;">
            <div style="width:74px;text-align: left;">选择活动:</div>
            <div>
                <el-radio-group
                    v-model="decorSideslip.active_type"
                    class="box-radio-grounp"
                >
                    <el-radio
                        class="set-nav-radio"
                        v-for="(item, index) in chooseArray"
                        :key="index"
                        :label="item.id"
                        @change="getActiveModelBy()"
                    >
                        <span>
                            {{ item.label }}
                        </span>
                    </el-radio>
                </el-radio-group>
            </div>
        </div>
        <!-- 选择活动 -->
        <!-- type为3时出现的选择 -->
        <div class="right-set-choose" v-show="decorSideslip.active_type === 3">
            <div style="margin-right:20px;line-height: 30px;">
                选择分类:
            </div>
            <div style=" width: 71%;">
                <el-select
                    v-model="oldIds"
                    multiple
                    placeholder="请选择"
                    size="mini"
                    style="width: 98%;"
                    @change="setRemoval"
                >
                    <el-option
                        v-for="(item, index) in getByType"
                        :key="index"
                        :label="item.name"
                        :value="item.ids"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <!-- type为4时出现的选择 -->
        <div class="right-set-choose" v-show="decorSideslip.active_type === 4">
            <div style="margin-right:20px;line-height: 30px;">
                选择类型:
            </div>
            <div style=" width: 71%;">
                <el-select
                    v-model="oldIds"
                    multiple
                    placeholder="请选择"
                    size="mini"
                    style="width: 98%;"
                    @change="setRemoval"
                >
                    <el-option
                        v-for="(item, index) in getByType"
                        :key="index"
                        :label="item.type"
                        :value="item.items"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <!-- 展示数量  -->
        <div
            class="block exhibits-num"
            v-show="decorSideslip.active_type !== 5"
        >
            <div style="margin-right:20px;line-height: 36px;">
                展示数量:
            </div>
            <div style="width:70%;">
                <el-slider
                    v-model="decorSideslip.limit"
                    :max="sliderMax"
                ></el-slider>
            </div>
        </div>
        <!-- 手动选择 -->
        <div
            class="right-set-selection"
            v-show="decorSideslip.active_type === 5"
        >
            <div
                class="set-selection-box"
                v-for="(item, index) in manualArray"
                :key="index"
            >
                <div class="selection-img">
                    <img :src="item.cover_img" />
                </div>
                <div class="selection-text">
                    <div>{{ item.active_title }}</div>
                    <div style="display:flex;justify-content: space-between;">
                        <div>{{ item.end_time }}</div>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="closeActive(index, item.id)"
                        >
                            移除
                        </el-button>
                    </div>
                </div>
            </div>

            <div
                class="set-selection-btn"
                @click="openActiveList()"
            >
               +添加活动
            </div>
        </div>
        <!-- 手动选择的弹窗 -->
        <el-dialog title="全部活动" :visible.sync="manualTableVisible">
            <el-table :data="getByType" class="visible-dialog">
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <img
                            :src="scope.row.cover_img || defaultImg"
                            style="width:60px;height:80px;"
                        />
                    </template>
                </el-table-column>
                <el-table-column property="active_title" label="活动">
                </el-table-column>
                <el-table-column
                    property="end_time"
                    label="到期时间"
                    width="200"
                ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="addActive(scope.$index)"
                            type="primary"
                        >
                            添加该活动
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
import { getActiveModelBy } from "@/api/api";
let chooseArray = [
    {
        id: 1,
        label: "最新活动"
    },
    {
        id: 2,
        label: "报名最多"
    },
    {
        id: 3,
        label: "选择分类"
    },
    {
        id: 4,
        label: "活动类型"
    },
    {
        id: 5,
        label: "手动选择"
    }
];
export default {
    props: {
        decorSideslip: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            // 定义选择列表
            chooseArray,
            // 定义获取分类的数组
            getByType: [],
            oldIds: [],
            defaultImg: "../../../../../static/image/bgUser.jpg",
            manualArray: [],
            // 手动选择的弹窗
            manualTableVisible: false,
            list_button_img: require("@/assets/list_button.png")
        };
    },
    created() {
        this.getActiveModelBy();
    },
    // 计算选择展示最大数量
    computed: {
        sliderMax() {
            // this.decorSideslip.limit = this.decorSideslip.ids.length;
            return this.decorSideslip.ids.length;
        }
    },
    methods: {
        // 请求选择活动的接口
        getActiveModelBy() {
            let _that = this;
            // 点击选择活动,清空下面的几个值,防止数据污染
            // _that.decorSideslip.limit = 0;
            // _that.decorSideslip.ids = [];
            _that.manualArray = [];
            _that.oldIds = [];
            _that.$http
                .get(getActiveModelBy, {
                    params: {
                        type: _that.decorSideslip.active_type,
                        shop_id: localStorage.getItem("shop_id"),
                        token: localStorage.getItem("token")
                    }
                })
                .then(res => {
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        // 当_that.decorSideslip.active_type为1或者2时 需要数组中的每个对象中的id组成数组传入 _that.decorSideslip.ids
                        if (
                            _that.decorSideslip.active_type === 1 ||
                            _that.decorSideslip.active_type === 2
                        ) {
                            _that.getByType = res.data.data;
                            let oldArray = [];
                            for (
                                let index = 0;
                                index < _that.getByType.length;
                                index++
                            ) {
                                oldArray.push(_that.getByType[index].id);
                            }
                            _that.decorSideslip.ids = oldArray;
                        } else {
                            _that.getByType = res.data.data;
                        }
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // type 不为5的时候 筛选ids,
        setRemoval(value) {
            let oldArray = value.map(v => v.split(","));
            let newArray = oldArray.flat().map(Number);
            this.decorSideslip.ids = Array.from(new Set(newArray));
        },
        // 打开手动选择的弹窗
        openActiveList() {
            let _that = this;
            _that.manualTableVisible = true;
        },
        //手动添加活动
        addActive(clickIndex) {
            let _that = this;
            _that.manualArray.push(_that.getByType[clickIndex]);
            _that.decorSideslip.limit = _that.manualArray.length;
            let oldArray = [];
            for (let arr of _that.manualArray) {
                oldArray.push(arr.id);
            }
            if (new Set(oldArray).size !== oldArray.length) {
                _that.manualArray.pop();
                return this.$message({
                    message: "已添加该活动",
                    type: "warning"
                });
            } else {
                _that.decorSideslip.ids = oldArray;
                this.$message({
                    message: "成功添加活动",
                    type: "success"
                });
            }
        },
        // 手动移除活动
        closeActive(index, id) {
            let _that = this;
            _that.manualArray.splice(index, 1);
            let indexOfId = _that.decorSideslip.ids.indexOf(id);
            _that.decorSideslip.ids.splice(indexOfId, 1);
        }
    }
};
</script>

<style lang="scss" scoped>
.input-active-name {
    display: flex;
    .active-name {
        width: 79px;
        text-align: left;
    }
}
.box-radio-grounp {
    display: flex;
    width: 304px;
    text-align: left;
    flex-wrap: wrap;
}
.right-set-name {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
}
.set-nav-radio {
    margin: 5px;
}
.exhibits-num {
    display: flex;
}
.right-set-choose {
    display: flex;
    margin: 10px 0;
}
.right-set-selection {
    overflow-y: scroll;
    max-height: 300px;
    margin-top: 20px;
    .set-selection-box {
        display: flex;
        border: 1px #ccc solid;
        padding: 10px;
        text-align: left;
        margin-bottom: 10px;
        .selection-img {
            width: 63px;
            height: 80px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .selection-text {
            margin-left: 13px;
            line-height: 28px;
            width: calc(100% - 53px);
            font-size: 14px;
            padding-top: 13px;
        }
    }
}
.set-selection-btn {
    text-align: center;
    cursor: pointer;
    border: 1px #ccc solid;
    line-height: 28px;
    font-size: 14px;
}
.visible-dialog {
    overflow-y: scroll;
    max-height: 400px;
}
</style>
