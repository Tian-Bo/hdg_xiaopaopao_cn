<template>
    <!-- $route.query.userId.name -->
    <div class="add-activities">
        <!-- 添加活动的标题 -->
        <div class="add-activities-title">
            <div>
                <div>{{ pageTransmitValue.name }}</div>
                <div>创建时间:{{ pageTransmitValue.created_at }}</div>
            </div>
            <div style="margin-top: 5px;">
                <el-button type="text" @click="renameNameStatu = true"
                    >编辑</el-button
                >
                <!-- <el-button type="text">链接</el-button> -->
                <el-button
                    type="text"
                    @click="deleteGrouping(pageTransmitValue)"
                >
                    删除
                </el-button>
            </div>
        </div>
        <!-- 添加活动的导航 -->
        <div class="add-activities-nav">
            <div class="activities-nav-left">
                <el-button size="small" @click="returnPage()">
                    <i class="el-icon-arrow-left"></i>返回分类活动
                </el-button>
                <el-button
                    size="small"
                    type="primary"
                    @click="addActiveStatus = true"
                >
                    添加活动
                </el-button>
            </div>
            <div class="activities-nav-right">
                <el-input
                    class="nav-right-input"
                    v-model="pageValueinput"
                    placeholder="请输入内容"
                    size="small"
                ></el-input>
                <el-button size="small" type="primary">搜索</el-button>
            </div>
        </div>
        <!-- 活动的列表 -->
        <div class="add-activities-list">
            <el-table
                :header-cell-style="{
                    background: 'rgba(242, 242, 242, 1)',
                    color: '#333',
                    fontWeight: '400'
                }"
                :data="putActiveModel"
                style="width: 100%"
            >
                <el-table-column label="活动名称/时间">
                    <template slot-scope="scope">
                        <div class="active-list-img">
                            <el-image
                                style="width: 70px; height: 100px"
                                :src="scope.row.cover_img"
                                fit="fit"
                            ></el-image>
                            <div class="list-img-text">
                                <div>{{ scope.row.active_title }}</div>
                                <div>{{ scope.row.start_time }}</div>
                                <div>{{ scope.row.end_time }}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型">
                    <template slot-scope="scope">
                        <div>
                            <el-button type="danger" size="mini">
                                {{ scope.row.type }}
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <div>
                            <el-button
                                type="primary"
                                size="small"
                                @click="
                                    deleteActive(
                                        scope.row,
                                        pageTransmitValue.index,
                                        scope.$index
                                    )
                                "
                            >
                                移除分类
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加活动---弹窗 -->
        <el-dialog title="添加活动" :visible.sync="addActiveStatus" width="40%">
            <div class="add-dialog">
                <div class="add-dialog-searn">
                    <el-input
                        v-model="dialogInput"
                        placeholder="请输入搜索内容"
                        size="small"
                    ></el-input>
                    <el-button type="primary" size="small">
                        搜索
                    </el-button>
                </div>

                <!-- 店铺列表的导航 -->
                <div class="add-dialog-nav">
                    <div
                        class="dialog-nav-lable"
                        v-for="item in activeModel"
                        :key="item.id"
                        :class="{
                            'dialog-nav-active': unactivetype === item.id
                        }"
                        @click="getModelList(item.id)"
                    >
                        {{ item.model_title }}
                    </div>
                </div>
                <!-- 店铺列表 -->
                <template>
                    <el-table :data="putModelList" style="width: 100%" center>
                        <el-table-column label="活动">
                            <template slot-scope="scope">
                                <div
                                    class="active-list-img"
                                    style="display: flex;"
                                >
                                    <el-image
                                        style="width: 70px; height: 100px"
                                        :src="scope.row.cover_img"
                                        fit="fit"
                                    ></el-image>
                                    <div
                                        style="line-height: 100px;margin-left: 14px;width: calc(100% - 82px);white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                                    >
                                        {{ scope.row.active_title }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="start_time"
                            label="开始时间"
                            width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="end_time"
                            label="结束时间"
                            width="180"
                        >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="
                                        associated(
                                            scope.row,
                                            pageTransmitValue.index
                                        )
                                    "
                                >
                                    添加该活动
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addActiveStatus = false">
                    确 定
                </el-button>
            </span>
        </el-dialog>
        <!-- 分类弹窗---重命名(编辑)-->
        <el-dialog
            title="设置分类名称"
            :visible.sync="renameNameStatu"
            width="30%"
        >
            <el-input
                v-model="renameClassifyName"
                placeholder="请输入内容"
                clearable
            ></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="renameNameStatu = false">
                    取 消
                </el-button>
                <el-button type="primary" @click="renameGrouping()">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>



<script>
// 获取api
import {
    getActiveModel,
    getUnfinishedActive,
    editGroup,
    deleteGrouping
} from "@/api/api";
export default {
    props: {
        pageTransmitValue: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            // 绑定页面搜索的input
            pageValueinput: "",
            // 添加活动的状态
            addActiveStatus: false,
            activeModel: [],
            // 导航状态
            unactivetype: "",
            addModelList: [],
            // 弹窗的input
            dialogInput: "",
            // 重命名弹窗
            renameNameStatu: false,
            // 重命名Input
            renameClassifyName: "",
            // 防止重复提交的状态
            disabledStutas: true,
            deleteActivestatus:true
        };
    },
    created() {
        this.getModelNav();
    },
    computed: {
        // 计算的添加活动列表(搜索)
        putActiveModel: function() {
            let _that = this;
            let groupingInfo = _that.pageTransmitValue.info;
            let arrClassifyName = [];
            for (let index = 0; index < groupingInfo.length; index++) {
                if (
                    groupingInfo[index].active_title.search(
                        _that.pageValueinput
                    ) !== -1
                ) {
                    arrClassifyName.push(groupingInfo[index]);
                }
            }
            return arrClassifyName;
        },
        // 计算的未添加活动列表(搜索)
        putModelList: function() {
            let _that = this;
            let groupingInfo = _that.addModelList;
            let arrClassifyName = [];
            for (let index = 0; index < groupingInfo.length; index++) {
                if (
                    groupingInfo[index].active_title.search(
                        _that.dialogInput
                    ) !== -1
                ) {
                    arrClassifyName.push(groupingInfo[index]);
                }
            }
            return arrClassifyName;
        }
    },
    methods: {
        // 删除分类
        deleteGrouping(row) {
            let _that = this;
            if (row.ids.length !== 0) {
                this.$message({
                    message: "请先移除分类活动!!",
                    type: "success"
                });
                _that.pageTransmitValue = row;
                _that.pageStatus = false;
                return;
            }
            let dataParams = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                index: row.index
            };
            _that.$http
                .post(deleteGrouping, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status === 0) {
                        location.reload();
                        this.$message({
                            message: "成功删除该分类",
                            type: "success"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 返回页面
        returnPage() {
            location.reload();
        },
        // 弹窗的函数
        // 获取未完成活动的导航及列表
        getModelNav() {
            let _that = this;
            _that.$http
                .get(getActiveModel, {
                    params: {
                        shop_id: localStorage.getItem("shop_id"),
                        token: localStorage.getItem("token")
                    }
                })
                .then(res => {
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        _that.activeModel = res.data.data;
                        if (_that.activeModel.length !== 0) {
                            _that.unactivetype = _that.activeModel[0].id;
                        }
                        // 这里的请求用了两个api 所以才在回调中写回调 特例
                        _that.$http
                            .get(getUnfinishedActive, {
                                params: {
                                    shop_id: localStorage.getItem("shop_id"),
                                    token: localStorage.getItem("token"),
                                    type: _that.unactivetype
                                }
                            })
                            .then(res => {
                                if (res.data.status !== 0) {
                                    _that.$message.error(res.data.message);
                                } else {
                                    _that.addModelList = res.data.data;
                                }
                            })
                            .catch(err => {
                                this.$message.error(err);
                            });
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 点击获取未完成活动的列表
        getModelList(index) {
            let _that = this;
            _that.unactivetype = index;
            _that.$http
                .get(getUnfinishedActive, {
                    params: {
                        shop_id: localStorage.getItem("shop_id"),
                        token: localStorage.getItem("token"),
                        type: _that.unactivetype
                    }
                })
                .then(res => {
                    _that.addModelList = res.data.data;
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 关联活动
        // 当前的id 和上一张页面的 index
        associated(row, pageIndex) {
            let _that = this;
            for (
                let index = 0;
                index < _that.pageTransmitValue.ids.length;
                index++
            ) {
                if (_that.pageTransmitValue.ids[index] === row.id) {
                    return this.$message({
                        message: "已添加该活动",
                        type: "warning"
                    });
                }
            }
            let dataParams = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                type: 2,
                index: pageIndex,
                ids: `[${row.id}]`
            };


            if (_that.disabledStutas) {
                _that.disabledStutas = false
                _that.$http
                    .post(editGroup, _that.$qs.stringify(dataParams))
                    .then(res => {
                        if (res.data.status === 0) {
                            _that.disabledStutas = true;
                            _that.pageTransmitValue.ids.push(row.id);
                            let content = {
                                id: row.id,
                                active_title: row.active_title,
                                cover_img: row.cover_img,
                                start_time: row.start_time,
                                end_time: row.end_time,
                                type: row.type
                            };
                            _that.pageTransmitValue.info.push(content);
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                        }
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            }
        },
        //移除关联活动
        // 当前的id 和上一张页面的 index 当前列表的index
        deleteActive(row, pageIndex, listIndex) {
            let _that = this;
            let newArrayIds = [];
            // 组装ids
            for (
                let index = 0;
                index < _that.pageTransmitValue.ids.length;
                index++
            ) {
                if (_that.pageTransmitValue.ids[index] !== row.id) {
                    newArrayIds.push(_that.pageTransmitValue.ids[index]);
                }
            }
            let dataParams = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                type: 3,
                index: pageIndex,
                ids: `[${newArrayIds}]`
            };
            // 请求
            if(_that.deleteActivestatus){
                _that.deleteActivestatus = false
                _that.$http
                .post(editGroup, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status === 0) {
                         _that.deleteActivestatus = true
                        _that.pageTransmitValue.ids = newArrayIds;
                        _that.putActiveModel.splice(listIndex, 1);
                        _that.pageTransmitValue.info.splice(listIndex, 1);
                        this.$message({
                            message: "移除分类",
                            type: "success"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
            }
        },
        // 重命分类名
        renameGrouping() {
            let _that = this;
            // 赋值给change_name
            let change_name = _that.renameClassifyName;
            let index = _that.pageTransmitValue.index;
            // change_name
            if (change_name == "") {
                return this.$message({
                    message: "名字不能为空",
                    type: "warning"
                });
            }
            // 组装数据
            let dataParams = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                type: 1, //为1是修改名字
                index: index,
                change_name: change_name
            };
            _that.$http
                .post(editGroup, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        this.$message({
                            message: "成功修改分类名",
                            type: "success"
                        });
                        _that.pageTransmitValue.name = _that.renameClassifyName;
                        _that.renameNameStatu = false;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.add-activities {
    margin: 1% 5%;
    .add-activities-title {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        background: #ccc;
        border: 1px #ffeeb9 solid;
        background: #fdf6ec;
        height: 50px;
        line-height: 25px;
    }
    .add-activities-nav {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        .activities-nav-right {
            display: flex;
            .nav-right-select {
                width: 150px;
            }
            .nav-right-input {
                margin: 0 10px 0 5px;
                width: 150px;
            }
        }
    }
    .add-activities-list {
        margin-top: 40px;
        .active-list-img {
            display: flex;
            .list-img-text {
                margin-left: 20px;
                margin-top: 16px;
            }
        }
    }
    .add-dialog {
        .add-dialog-searn {
            display: flex;
            float: right;
            margin-bottom: 20px;
        }
        .add-dialog-nav {
            display: flex;
            padding-top: 60px;
            .dialog-nav-lable {
                padding: 0 13px 20px;
                width: 200px;
                cursor: pointer;
                text-align: center;
            }
            .dialog-nav-active {
                padding-bottom: 12px;
                border-bottom: 3px #409eff solid;
            }
        }
    }
}
</style>
