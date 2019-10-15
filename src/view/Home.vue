<!--
 * @Author: zlz5v5
 * @LastEditors: tianbo
 * @Date: 2019-09-06 10:04:06
 * @LastEditTime: 2019-10-14 16:40:08
 -->
<template>
    <div class="container">
        <div class="top">
            <div class="leftLogin">活动阁</div>
            <div class="leftImg">
                <div class="title">{{ title }}</div>
                <div class="newShow">
                    <img
                        class="user"
                        v-if="user.image == '' || user == ''"
                        src="../assets/bgUser.jpg"
                    />
                    <img class="user" v-else :src="user.image" />
                    <div class="phone" v-if="user.mobile == '' || user == ''">
                        18286087875
                        <i
                            style="padding-left: 10px"
                            class="iconfont icon-xiaojiantou-bottom"
                        ></i>
                    </div>
                    <div class="phone" v-else>
                        {{ user.mobile }}
                        <i
                            style="padding-left: 10px"
                            class="iconfont icon-xiaojiantou-bottom"
                        ></i>
                    </div>
                    <div class="flexLi">
                        <div
                            class="flexName"
                            v-for="(item, index) in flexLi"
                            :key="index"
                            @click="Handleback(item)"
                        >
                            <div class="fastName">{{ item.name }}</div>
                        </div>
                        <div class="flexName logoOut" @click="HandleLogout()">
                            <span>退出</span>
                            <i class="iconfont icon-guanji flexOut"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 帮助中心begin -->
        <div
            v-if="isHelp"
            class="contentContent"
            :class="{ 'global-help': globalHelp ? showHelp : globalHelp }"
        >
            <div class="box" :style="{ 'min-height': documentClientHeight + 'px' }">
                <router-view />
            </div>
            <div v-if="isHelp" class="help">
                <help @handleClickHelpShow="handleClickHelpShow" :data="data" />
            </div>
        </div>
        <div v-else class="contentContent">
            <div class="leftList">
                <div
                    class="listLi"
                    v-for="(item, index) in list"
                    :key="index"
                    v-if="item.tabState"
                    :class="{ active: index == num }"
                    @click.stop="HandleTab(item, index)"
                >
                    <div class="listLi-title">
                        <img class="bgIoc" src="../assets/bgIoc.png" v-if="item.name == '功能插件'" />
                        <i class="icon" :class="item.iconCls" v-else></i>
                        <span>{{ item.name }}</span>
                        <i class="iconfont icon-xiaojiantou-right rightIoc"></i>
                    </div>

                    <div v-if="item.show">
                        <div class="son">
                            <div
                                class="home-nav-bar"
                                v-for="(items, i) in item.children"
                                @click.stop="confirms(items, i, index)"
                                :class="{ active: i == sonNum && index == num }"
                                :key="i"
                            >{{ items.name }}</div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="son" v-if="num == index && item.hidden">
                            <div
                                class="sonLi"
                                v-for="(items, i) in item.children"
                                @click.stop="confirms(items, i, index)"
                                :class="{ active: i == sonNum }"
                                :key="i"
                            >{{ items.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box">
                <keep-alive :include="includedComponents">
                    <router-view />
                </keep-alive>
            </div>
        </div>
        <!-- 帮助中心end -->
    </div>
</template>

<script>
// ajax
import { getUser, getMerchHelper } from "@/api/api";
// 工具js
import { helpUrl, windowWidth } from "@/assets/js/unlis.js";
// 帮助中心
import help from "@/components/Help";

export default {
    name: "Home",
    components: {
        help
    },
    data() {
        return {
            includedComponents: 'activity', // 需要缓存的页面, 都好分割
            title: "概况", // 顶部tab
            data: {}, // 帮助中心数据
            isHelp: false, // 帮助中心是否载入
            showHelp: true, // 帮助中心显示隐藏
            globalHelp: false, // 帮助中心是否占位置
            list: [], // 路由列表
            phone: "1351193115", // 用户名
            flexLi: [
                { name: "邀请奖励", url: "/merchant/home" },
                { name: "切换店铺", url: "/merchant/shop" },
                { name: "账户中心", url: "/merchant/merchant_center" }
            ],
            num: 0, //
            sonNum: 0, //
            user: [] //
        };
    },
    created() {
        // 帮助中心
        var _that = this;
        if (windowWidth() > 1900) {
            _that.globalHelp = true;
        }
        // _that.getHelp()
        _that.list = _that.$router.options.routes;
        if (!_that.$Request.token) {
        } else {
            localStorage.setItem("token", _that.$Request.token);
            localStorage.setItem("shop_id", _that.$Request.shop_id);
        }
        _that.getUsers();
        localStorage.setItem("token", "05d536cd1d6e5bd55f98908daa6a6527");
        localStorage.setItem("shop_id", 607);
    },
    methods: {
        // 顶部导航跳转
        Handleback(item) {
            if (item.name == "邀请奖励") {
            } else {
                window.location.href = item.url;
            }
        },
        // 退出登录
        HandleLogout() {
            var _that = this;
            _that
                .$confirm("确认退出吗?", "提示", {})
                .then(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("shop_id");
                    window.location.href = "/merchant/login/login_out";
                })
                .catch(() => {});
        },
        // 主导航跳转
        HandleTab(item, index) {
            var _that = this;
            _that.title = item.name;
            _that.num = index;
            _that.sonNum = 0;
            window.location.href = item.host;
        },
        // 子导航跳转
        confirms(items, i, index) {
            var _that = this;
            _that.sonNum = i;
            _that.num = index;
            const path = items.path;
            if (items.name == "活动收支") {
                window.location.href = path;
                return;
            }
            _that.$router.push({ path: path });
        },
        // 获取用户详情
        getUsers() {
            let token = localStorage.getItem("token");
            let _that = this;
            _that.$http
                .get(getUser, {
                    params: {
                        token: token
                    }
                })
                .then(res => {
                    _that.user = res.data.data;
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 帮助中心 begin
        handleClickHelpShow(num) {
            let _that = this;
            _that.showHelp = !num;
        },
        getHelp() {
            let _that = this;
            let tab = _that.$Request.tab;
            let params = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                route: helpUrl()
            };

            if (tab) {
                params = {
                    shop_id: localStorage.getItem("shop_id"),
                    token: localStorage.getItem("token"),
                    route: helpUrl(),
                    tab: tab
                };
            }

            getMerchHelper({ params }).then(res => {
                if (res.data.status == 0) {
                    let dis_recommendLength =
                        res.data.data.dis_recommend.length;
                    let recommendLength = res.data.data.recommend.length;
                    res.data.data["show"] = recommendLength > 0;
                    if (dis_recommendLength > 0 || recommendLength > 0) {
                        _that.isHelp = true;
                    }

                    _that.data = res.data.data;
                }
            });
        }
        // 帮助中心 end
    }
};
</script>

<style lang="scss" scoped>
// 帮助中心 begin
.global-help {
    .box {
        width: calc(100% - 30px - 400px);
    }
    .help {
        width: 400px;
    }
}
// 帮助中心 end
.top {
    height: 60px;
    line-height: 60px;
    background: #e5e5e5;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: flex;
    .leftLogin {
        width: 180px;
        height: 60px;
        text-align: center;
        color: #fff;
        font-size: 1.5em;
        letter-spacing: 1px;
        font-weight: bold;
        line-height: 60px;
        background-color: #2a82e4;
    }
    .leftImg {
        flex: 1;
        height: 40px;
        background: #fff;
        text-align: right;
        line-height: 40px;
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.157143);
        .title {
            float: left;
            color: #666;
            box-sizing: border-box;
            padding-left: 44px;
        }
        .newShow {
            float: right;
            height: 40px;
            width: 165px;
        }
        .user {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            margin: 10px;
            float: left;
            border: 1px solid #e5e5e5;
        }
        .flexLi {
            width: 122px;
            height: 160px;
            background: #fff;
            position: fixed;
            right: 30px;
            top: 31px;
            z-index: 999;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.157143);
            border-radius: 5px;
            display: none;
            .flexName {
                height: 40px;
                line-height: 40px;
                width: 100%;
                font-size: 14px;
                text-align: left;
                color: #666;
                cursor: pointer;
                span {
                    float: left;
                    font-size: 12px;
                    margin: 0 20px 0 20px;
                }
            }
            .flexName:nth-child(1) .fastName {
                color: #f68080;
                border-bottom: 2px solid #fafafa;
            }
            .flexName:nth-child(1) .fastName:hover {
                color: #fff !important;
                border-bottom: 2px solid #fafafa;
            }
            .flexName:hover {
                background: #2a82e4 !important;
                color: #fff !important;
            }
            .flexOut {
                margin-left: 8px;
                float: left;
            }
        }
        .newShow:hover .flexLi {
            display: block !important;
        }
        .logoOut {
            height: 50px;
            line-height: 50px;
            width: 100%;
            font-size: 14px;
            background: #eee;
            text-align: center;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
        }
        .fastName {
            text-align: left;
            width: 80px;
            font-size: 12px;
            margin-left: 15px;
        }
        .phone {
            float: left;
            font-size: 12px;
            color: #333;
        }
    }
    .phone:hover .flexLi {
        display: block !important;
    }
}

.container {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
}

.leftList {
    flex: 0 0 180px;
    width: 180px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.157143);
    text-align: center;
    overflow-y: scroll;
    .listLi {
        color: #333;
        cursor: pointer;
        font-size: 15px;
        .listLi-title {
            height: 58px;
            line-height: 58px;
        }
        .listLi-title:hover {
            background: #ccc;
        }
        .icon {
            float: left;
            margin-left: 20px;
        }
        span {
            float: left;
            margin-left: 14px;
            width: 67px;
            text-align: left;
        }
        .rightIoc {
            float: right;
            width: 60px;
            height: 58px;
            text-align: center;
            box-sizing: border-box;
        }
    }
}
.leftList::-webkit-scrollbar {
    display: none;
}
.contentContent {
    background-color: #e5e5e5;
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    width: 100%;
    .box {
        flex: 1;
        overflow-y: auto;
        background: #fff;
        margin: 0px 20px 0 20px;
        position: relative;
    }
}

.icon-xiaojiantou-right:before {
    content: "\E97B";
    font-size: 27px !important;
    color: #666;
}
.active {
    span {
        color: #3385ff !important;
    }
    .rightIoc {
        transform: rotate(90deg) !important;
        transition: transform 0.8s;
        -moz-transition: -moz-transform 0.8s;
        -moz-transition: -moz-transform 0.8s;
        -o-transition: -o-transform 0.8s;
        -ms-transition: -ms-transform 0.8s;
    }
}

.son {
    width: 100%;
    height: 50px;
    line-height: 50px;
    .active {
        color: #2a82e4;
    }
}
.bgIoc {
    width: 14px;
    height: 14px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
}
.home-nav-bar {
    font-size: 12px;
    width: 50%;
    display: inline-block;
}
.home-nav-bar:hover {
    background-color: #eee;
}
.sonLi {
    font-size: 12px;
}
.sonLi:hover {
    background-color: #eee;
}
</style>
