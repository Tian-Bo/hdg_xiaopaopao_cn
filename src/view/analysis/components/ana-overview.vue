<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:03:00
 * @LastEditTime: 2019-10-12 15:29:21
 -->
<template>
    <div class="app-content">
        <header>
            <div class="header-left">
                <div class="header-left-logo">
                    <img src="../../../assets/bgUser.jpg" alt />
                </div>
                <div>
                    <div class="center">
                        <span class="header-left-title font20">贵阳丽都整形</span>
                        <span class="header-left-edition">标准版</span>
                    </div>
                    <router-link tag="a" to class="header-left-btn">访问活动店铺</router-link>
                </div>
            </div>
            <div class="header-right">
                <div v-for="(item, index) in 4" :key="index" class="header-right-item">
                    <p class="header-right-number">12645</p>
                    <p class="header-right-person">访客数/UV</p>
                    <div class="header-right-percent" v-if="index!=3 && text!='总'">
                        较前一日
                        <i class="iconfont iconicon_up" v-if="true"></i>
                        <i class="iconfont iconicon_up-copy" v-else></i>
                        12%
                    </div>
                    <router-link tag="a" to class="header-right-btn" v-if="index==3">提现</router-link>
                </div>
            </div>
            <div class="header-right-subscript" @click="switchData">{{ text }}</div>
        </header>
        <main></main>
        <footer></footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: "今"
        };
    },
    methods: {
        // 切换数据
        switchData() {
            if (this.text == "今") {
                this.text = "总";
            } else {
                this.text = "今";
            }
        }
        // 请求接口参数
    }
};
</script>

<style lang="scss" scoped>
.app-content {
    padding: 20px 20px 0px 20px;
    header {
        display: flex;
        height: 180px;
        .header-left {
            width: 360px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .header-left-logo {
                width: 80px;
                height: 80px;
                margin: 0 15px;
                overflow: hidden;
                border-radius: 50%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .header-left-title {
                font-weight: 700;
                font-size: 20px;
            }
            .header-left-edition {
                color: #fff;
                font-size: 12px;
                margin-left: 5px;
                background-color: #409eff;
                padding: 0px 10px 0px 5px;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }
            .header-left-btn {
                border: 1px solid #409eff;
                color: #409eff;
                width: 174px;
                display: inline-block;
                text-align: center;
                line-height: 26px;
                border-radius: 13px;
                margin-top: 10px;
            }
            .header-left-btn:hover {
                background-color: #409eff;
                color: #fff;
            }
        }
        .header-right {
            flex: 1;
            display: flex;
            .header-right-item {
                flex: 1;
                text-align: center;
                padding-top: 30px;
                .header-right-number {
                    font-size: 42px;
                    margin-bottom: 10px;
                }
                .header-right-person {
                    color: #999;
                    line-height: 150%;
                }
                .header-right-percent {
                    color: #409eff;
                    font-size: 12px;
                }
                .header-right-btn {
                    display: inline-block;
                    border-radius: 3px;
                    font-size: 12px;
                    background-color: rgba(236, 245, 255, 1);
                    padding: 2px 15px;
                    color: #409eff;
                    border: 1px solid #409eff;
                }
                .header-right-btn:hover {
                    background-color: #409eff;
                    color: #fff;
                }
            }
        }
        .header-right-subscript {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #fff;
            background-color: #409eff;
            padding: 5px;
            border-radius: 2px;
            cursor: pointer;
        }
    }
}

//  flex布局
.column-between {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}

.column-around {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-around;
    -webkit-justify-content: space-around;
}

.between {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}

.column-center-b {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
}

.column-center-c {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    align-items: center;
    -webkit-align-items: center;
}

.around-center {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
}

.left-center {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}

.between-center {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    -webkit-justify-content: space-between;
    -webkit-align-items: center;
}

.center {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}

.center-end {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
}

.flex_1 {
    flex: 1;
    -webkit-flex: 1;
    display: block;
    min-width: 0;
}

.only_line {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
