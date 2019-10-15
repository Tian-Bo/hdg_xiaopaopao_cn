<template>
    <div>
        <div class="decor-classify" v-show="pageStatus">
            <!-- 分类导航 -->

            <div class="classify-nav">
                <!-- 导航 -->
                <div>
                    <el-button @click="addCassify = true" type="primary">
                        新建分类
                    </el-button>
                </div>
                <div>
                    <el-input
                        v-model="inputClassifyName"
                        style="width:200px;margin-left: 7px;"
                    >
                    </el-input>
                    <el-button type="primary" @click="inputClassifyName = ''"
                        >重置
                    </el-button>
                </div>
            </div>
            <!-- 分类列表 -->
            <div class="classify-table">
                <!-- :cell-style="cellStyle" :header-cell-style="rowClass" editGroupName(scope.row.name,scope.row.index) -->
                <el-table :data="searnCassifyName">
                    <el-table-column label="分类名名字" property="name">
                    </el-table-column>
                    <el-table-column
                        property="count"
                        label="活动数"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="created_at"
                        label="创建日期"
                        align="center"
                    ></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                @click="openReNameAlert(scope.row)"
                            >
                                编辑
                            </el-button>

                            <el-button
                                type="text"
                                @click="jumpActiveties(scope.row)"
                            >
                                <!-- @click="$router.push({name:'activities',path:'/decoration/add-activities', query: {activeInfo: scope.row}})" -->
                                添加活动
                            </el-button>
                            <el-button
                                type="text"
                                @click="alertLink(scope.row)"
                            >
                                链接
                            </el-button>
                            <el-button
                                type="text"
                                @click="deleteGrouping(scope.row, scope.$index)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分类弹窗---新建分类-->
            <el-dialog
                title="设置分类名称"
                :visible.sync="addCassify"
                width="30%"
            >
                <el-input
                    v-model="classifyName"
                    placeholder="请输入内容"
                    clearable
                ></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addCassify = false">
                        取 消
                    </el-button>
                    <el-button type="primary" @click="addCassifyName()">
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
            <!-- 分类弹窗---二维码 -->
            <el-dialog
                :visible.sync="qrcodeVisible"
                width="360px"
                :center="true"
            >
                <div style="margin-bottom: 15px; text-align: center;">
                    微信扫码查看分类页面
                </div>
                <vue-qr
                    :text="
                        httpString +
                            'hdg' +
                            randomNum +
                            shop_id +
                            UrlBase +
                            '?ids=' +
                            qrCodeIds
                    "
                    :margin="0"
                    :size="150"
                    :auto-color="true"
                    :dot-scale="1"
                    style="display: block; margin: 0 auto;"
                ></vue-qr>
                <span slot="footer" class="dialog-footer">
                    <el-button
                        type="primary"
                        v-clipboard:success="copy"
                        v-clipboard:copy="
                            httpString +
                                'hdg' +
                                randomNum +
                                shop_id +
                                UrlBase +
                                '?ids=' +
                                qrCodeIds
                        "
                    >
                        点击复制
                    </el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 组件 -->
        <addActivities
            v-if="pageStatus === false"
            :pageTransmitValue="pageTransmitValue"
        />
    </div>
</template>
<script>
// api
import {
    addGrouping,
    editGroup,
    getUnfinishedActive,
    deleteGrouping,
    globalUrlBase,
    httpString
} from "@/api/api";
// 二维码
import vueQr from "vue-qr";
// 添加活动的组件
import addActivities from "./add-activities";

// 引入公共函数时间戳转换为时间
import { timeFilter } from "@/assets/js/unlis";
export default {
    props: {
        groupingInfo: {
            type: Array,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            // 页面状态
            pageStatus: true,
            // 页面传递的值
            pageTransmitValue: {},
            // grouping信息
            groupActiveInfo: [],
            // 新增加的分类名
            classifyName: "",
            // 新增加的分类名弹框状态
            addCassify: false,

            // 搜索的input的分类名
            inputClassifyName: "",

            // 分类重命名
            renameClassifyName: "",
            // 分类重命名索引
            renameIndex: "",
            // 分类重命名弹框状态
            renameNameStatu: false,

            // 分类名名字的状态
            showGroupName: -1,
            // 分类列表二维码
            qrcodeVisible: false,
            shop_id: localStorage.getItem("shop_id"),
            UrlBase: ".s." + globalUrlBase + "/#/pages/merchant/classlist",
            randomNum: Math.floor(Math.random() * 899) + 100,
            qrCodeIds: "",
            httpString
        };
    },
    created() {},
    components: {
        vueQr,
        addActivities
    },
    watch: {
        // 监听inputClassifyName
        inputClassifyName() {
            this.searnCassifyName;
        }
    },
    // 计算属性
    computed: {
        //计算searnCassifyName
        searnCassifyName: function() {
            let _that = this;
            let groupingInfo = _that.groupingInfo;
            let arrClassifyName = [];
            for (let index = 0; index < groupingInfo.length; index++) {
                if (
                    groupingInfo[index].name.search(_that.inputClassifyName) !==
                    -1
                ) {
                    arrClassifyName.push(groupingInfo[index]);
                }
            }
            return arrClassifyName;
        }
    },
    methods: {
        // 添加分类
        addCassifyName() {
            let _that = this;
            // 判断是否name为空
            if (_that.classifyName == "") {
                return this.$message({
                    message: "名字不能为空,请填写信息",
                    type: "warning"
                });
            }
            let dataParams = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                name: _that.classifyName
            };

            _that.$http
                .post(addGrouping, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status === 0) {
                        location.reload();
                        _that.classifyName = "";
                        _that.addCassify = false;
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 删除分类
        deleteGrouping(row, index) {
            let _that = this;
            if (row.count !== 0) {
                this.$message({
                    message: "分类中还有活动,请优先删除活动!!",
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
                        _that.groupingInfo.splice(index, 1);
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
        // 打开重命名弹框
        openReNameAlert(row) {
            let _that = this;
            _that.renameIndex = row.index;
            _that.renameNameStatu = true;
        },
        // 重命名分类
        renameGrouping() {
            let _that = this;
            // 赋值给change_name
            let change_name = _that.renameClassifyName;
            let index = _that.renameIndex;
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
                        location.reload();
                        _that.renameNameStatu = false;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 弹出链接二维码
        alertLink(row) {
            let ids = row.ids;
            if (ids.length === 0) {
                return this.$message({
                    message: "暂无数据",
                    type: "warning"
                });
            }
            this.qrcodeVisible = true;
            this.qrCodeIds = ids.join(",");
        },
        // 复制
        copy() {
            let _that = this;
            _that.$message({
                message: "复制成功",
                type: "success"
            });
        },
        // 跳转页面
        jumpActiveties(body) {
            let _that = this;
            _that.pageTransmitValue = body;
            _that.pageStatus = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.decor-classify {
    margin: 5% 2% 2%;
    .classify-nav {
        display: flex;
        justify-content: space-between;
    }
    .classify-table {
        margin-top: 2%;
        table {
            width: 100%;
            text-align: center;
            border: none;
            .table-header {
                background: #ccc;
            }
        }
    }
    .ctivity-nav {
        display: flex;
        justify-content: space-between;
        margin: 0 10px;
    }
    .add-active-btn {
        height: 40px;
        margin-left: 10px;
        color: #fff;
        border: none;
        background: #409eff;
        width: 120px;
        border-radius: 4px;
        cursor: pointer;
    }
    .add-g-name-btn {
        margin-left: 10px;
        width: 60px;
        border: 0;
        line-height: 27px;
        height: 27px;
        margin-top: 7px;
        color: #fff;
        background: #409eff;
        font-size: 10px;
        cursor: pointer;
    }
}
</style>
