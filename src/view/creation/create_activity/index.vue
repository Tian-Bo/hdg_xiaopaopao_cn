<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-19 14:03:49
 * @LastEditTime: 2019-09-30 18:09:50
 -->
<template>
    <div class="create-activity">
        <!-- 顶部导航 -->
        <activttyTopNav :cluster_array="cluster_array" />
        <activttyList />
        <activttyHome :cluster_array="cluster_array" v-loading="loading" />
        <!-- 创建活动的弹窗 -->
        <el-dialog
            title="创建活动"
            :visible.sync="centerDialogVisible"
            :before-close="returnPage"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.active_title"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="15">
                        <!-- value-format="yyyy-MM-dd  HH:mm:ss" -->
                        <el-date-picker
                            v-model="form.time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="展示形式">
                    <el-radio v-model="form.resource" label="H5"></el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="returnPage()">
                    取 消
                </el-button>
                <el-button type="primary" @click="createClusterFunc()">
                    确 定
                </el-button>
            </span>
        </el-dialog>
        <!-- 上一次编辑的弹窗 -->

        <el-dialog
            title="温馨提示"
            :visible.sync="isDialog"
            :before-close="returnPage"
            width="30%"
            center
        >
            <div class="is-dalog">
                由于上一次没有发布该活动,请填写完资料并发布该活动后,才能创建新的活动!!!
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="isDialog = false">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { settingCluster, createCluster, getCluster } from "@/api/api";
// 创建活动的组件列表
import activttyList from "./activtty_list";
// 创建活动的页面
import activttyHome from "./activtty_home";
import activttyTopNav from "./activtty_top_nav";
export default {
    data() {
        return {
            shop_id: localStorage.getItem("shop_id"),
            token: localStorage.getItem("token"),
            loading: false,
            // 创建活动的弹窗状态
            centerDialogVisible: false,
            // 创建活动的表单
            form: {
                active_title: "",
                time: "",
                begin: "",
                end: "",
                resource: "H5"
            },
            // 获取活动的所有信息
            cluster_array: [],
            // 判断温馨提示弹窗的状态
            isDialog: false
        };
    },
    components: {
        activttyHome,
        activttyList,
        activttyTopNav
    },
    created() {
        this.isCluster();
    },
    methods: {
        //判断跳过来的参数有没有携带拼团ID
        // 如果有拼团id则直接获取拼团设置
        // 没有则创建拼团
        isCluster() {
            let _that = this;
            //   路由携带拼团ID
            //   当路由携带更新本地的token和shop_id
            if (_that.$route.query.token !== undefined) {
                let token = _that.$route.query.token;
                let shop_id = _that.$route.query.shop_id;
                localStorage.setItem("token", token);
                localStorage.setItem("shop_id", shop_id);
            }
            let cluster_id = localStorage.getItem("clusterId");
            //  判断路由有没有cluster_id
            if (_that.$route.query.cluster_id !== undefined) {
                // 当url带有cluster_id 更新本地缓存的cluster_id
                cluster_id = _that.$route.query.cluster_id;
                localStorage.setItem("clusterId", cluster_id);
                // 当url带有cluster_id
                // 就说明是从编辑页跳转过来的 所以缓存带过来的参数activityShow 退出编辑使用
                let activityShow = _that.$route.query.activityShow;
                localStorage.setItem("activityShow", activityShow);
                _that.getClusterFunc(cluster_id);
                return;
            }
            if (cluster_id !== null) {
                //  本地缓存有没有cluster_id
                return _that.getClusterFunc(cluster_id);
            } else {
                // 通过本地token和shop_id获取cluster_id
                _that.settingClusterFunc();
            }
        },
        //获取店铺是否有未完成的拼团设置 返回id为null 表示没有这个活动
        settingClusterFunc() {
            let _that = this;
            _that.loading = true;
            let params = {
                shop_id: _that.shop_id,
                token: _that.token
            };

            _that.$http
                .get(settingCluster, {
                    params
                })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status === 0) {
                        let clusterId = res.data.data.id;
                        //判断返回值有没有拼团id
                        if (clusterId === null) {
                            _that.centerDialogVisible = true;
                        } else {
                            localStorage.setItem("clusterId", clusterId);
                            _that.isDialog = true;
                            _that.getClusterFunc(clusterId);
                        }
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        //创建拼团
        createClusterFunc() {
            let _that = this;
            // 判断是否输入时间
            if (_that.form.time === null) {
                return this.$message({
                    message: "请输入时间",
                    type: "warning"
                });
            }
            //将时间转化为秒的时间戳
            if (_that.form.time !== "") {
                _that.form.begin = Date.parse(_that.form.time[0]) / 1000;
                _that.form.end = Date.parse(_that.form.time[1]) / 1000;
            }

            let dataParams = {
                active_title: _that.form.active_title,
                begin: _that.form.begin,
                end: _that.form.end,
                token: _that.token,
                shop_id: _that.shop_id
            };

            // 判断传的参数有没有为空
            for (const key in dataParams) {
                const element = dataParams[key];
                if (element === "") {
                    return this.$message({
                        message: "请填写完所有的参数",
                        type: "warning"
                    });
                }
            }

            _that.$http
                .get(createCluster, { params: dataParams })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status === 0) {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        // 关闭创建活动的弹窗
                        _that.centerDialogVisible = false;
                        // 储存拼团ID
                        localStorage.setItem("clusterId", res.data.data.id);
                        // 通过获取的拼团ID请求数据
                        _that.getClusterFunc(res.data.data.id);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        //获取拼团设置
        getClusterFunc(clusterId) {
            let _that = this;
            _that.loading = true;
            let params = {
                token: _that.token,
                cluster_id: clusterId
            };

            _that.$http
                .get(getCluster, {
                    params
                })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status === 0) {
                        _that.cluster_array = res.data.data;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 取消返回页面创建活动的页面
        returnPage() {
            let _that = this;
            window.close();
        }
    }
};
</script>

<style lang="scss" scoped>
.create-activity {
    display: flex;
    padding-top: 66px;
    position: relative;
    padding-left: 92px;
    width: 100%;
    background: #fafafa;
}
.is-dalog {
    font-size: 16px;
    color: #808080;
    text-align: center;
}
</style>