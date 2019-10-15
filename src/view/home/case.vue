<template>
    <div>
        <!-- 顶部通栏 begin-->
        <div class="pro_topbar">
            <div class="page">
                <div class="fl">
                    <h1>活动阁</h1>
                    <ul>
                        <li>
                            <a href="/">首页</a>
                        </li>
                        <li>
                            <a>解决方案</a>
                        </li>
                        <li>
                            <a>案例场景</a>
                        </li>
                        <li>
                            <a>渠道合作</a>
                        </li>
                        <li>
                            <a>关于我们</a>
                        </li>
                    </ul>
                </div>
                <div class="fr">
                    <a href="/merchant/register">免费注册</a>
                    <a href="/merchant/home">登录</a>
                </div>
                <!-- <div class="page-fr">
                <div class="page-hover">
                    <span><img src="" alt=""></span>
                    <a href="#">555555555555</a>
                    <i class="iconfont">&#xe97e;</i>
                </div>
                <ul class="page-list">
                    <a href="">进入后台</a>
                    <a href="">退出登录 <span class="iconfont">&#xe603;</span></a>
                </ul>
                </div>-->
            </div>
        </div>
        <!-- 顶部通栏 end-->

        <div class="app-content">
            <div class="screen" v-for="(item, index) in list" :key="index">
                <el-image
                    :src="item.cover_img"
                    class="screen-image"
                    lazy
                    @load="getCase(index)"
                ></el-image>
                <div class="screen-item">
                    <a class="screen-item-title">{{ item.active_title }}</a>
                    <vue-qr
                        class="screen-item-qrcode"
                        :text="item.url"
                        :margin="0"
                        :size="150"
                        :auto-color="true"
                        :dot-scale="1"
                    ></vue-qr>
                    <a class="screen-item-btn">扫码查看活动</a>
                </div>
            </div>
            <div class="scroll-top" @click="goTop">
                <i class="iconfont iconfanhuidingbu3"></i>
            </div>
        </div>
    </div>
</template>

<script>
// ajax
import { getActiveAll } from "@/api/api";
// 生成二维码
import vueQr from "vue-qr";

export default {
    components: {
        vueQr
    },
    data() {
        return {
            list: [], // 案例场景数据
            size: 12, // 每页多少条
            show: false,
            scrollTop: 0
        };
    },
    mounted() {
        
    },
    mounted () {
        window.addEventListener('scroll', this.scrollToTop)
    },
    methods: {
        scrollToTop() { 
        　　this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.show = false
            if (this.scrollTop > 1000) {
                this.show = true
            }
        },
        // 获取案例场景图片
        getCase(index) {
            console.log(index)
            if (index == this.list.length - 1 || typeof index == "undefined") {
                let page = this.list.length / this.size + 1;
                let params = {
                    page: page,
                    size: this.size
                };
                this.$http.get(getActiveAll, { params }).then(res => {
                    this.list = this.list.concat(res.data.data.items);
                });
            }
        },
        // 返回顶部
        goTop() {
            let company = this.scrollTop / 100
            let timer = setInterval(() => {
                if (this.scrollTop < 0) {
                    this.scrollTop = 0
                    window.scrollTo(0, 0)
                    clearInterval(timer)
                }
                window.scrollTo(0, this.scrollTop)
                this.scrollTop -= company
            }, 1)
        }
    },
    created() {
        this.getCase();
    }
};
</script>

<style lang="scss" scoped>
.pro_topbar {
    width: 100%;
    height: 70px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
}

.page {
    width: 1200px;
    margin: 0 auto;
}

.page h1 {
    width: 195px;
    height: 70px;
    background: url("../../assets/logo.png") no-repeat 100% 100%/100% 100%;
    float: left;
    text-indent: -999px;
    overflow: hidden;
}

.page ul {
    float: left;
    font-size: 16px;
}

.page li {
    float: left;
    margin-left: 56px;
    line-height: 70px;
}

.page li a {
    font-size: 16px;
    color: #505050;
}
.page .fr {
    float: right;
}
.page .fr a {
    float: left;
    height: 34px;
    margin-top: 18px;
    text-align: center;
    line-height: 34px;
    border-radius: 17px;
}

.page .fr a:first-of-type {
    width: 120px;
    background-color: #2a82e4;
    color: #fff;
}

.page .fr a:last-of-type {
    width: 70px;
    border: #a6a6a6 solid 1px;
    margin-left: 16px;
    color: #383838;
}

.pro_topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.9);
}
// end
// .page-fr{
//     float: right;
//     height: 70px;
//     position: relative;
//     .page-hover{
//         height: 70px;
//         display: flex;
//         align-items: center;
//         span{
//             width: 20px;
//             height: 20px;
//             border-radius: 50%;
//             overflow: hidden;
//             background-color: #ccc;
//             img{
//                 width: 100%;
//                 height: 100%;
//             }
//         }
//         a{
//             font-size: 12px;
//             margin: 0 15px;
//         }
//     }
//     .page-hover:hover{
//         ul{
//             display: block;
//         }
//     }
// }

// .page-list {
//   position: absolute;
//   box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.157143);
//   top: 40px;
//   left: 15px;
//   width: 122px;
//   background-color: #fff;
//   border-radius: 3px;
//   display: none;
//   z-index: 99;
// }

// .page-list a {
//   display: block;
//   text-indent: 10px;
//   color: #666;
//   height: 40px;
//   line-height: 40px;
//   border-radius: 2px;
//   padding: 0 10px;
//   font-size: 12px;
//   text-decoration: none;
//   cursor: pointer;
// }

// .page-list a:first-of-type {
//   position: relative;
//   color: #f68080;
// }

// .page-list a:first-of-type::after {
//   content: "";
//   width: 80px;
//   position: absolute;
//   bottom: 0;
//   left: 20px;
// }

// .page-list a:first-of-type:hover::after {
//   border-bottom: 2px solid #2a82e4;
// }

// .page-list a:last-of-type {
//   position: relative;
//   background-color: #eee;
// }

// .page-list a:last-of-type span {
//   position: absolute;
//   top: 0;
//   right: 20px;
// }

// .page-list a:hover {
//   background-color: #2a82e4;
//   color: #fff;
// }

// .page-fr:hover ul {
//   display: block;
// }

// 新项目

.app-content {
    padding-top: 120px;
    width: 1200px;
    margin: 0 auto;
    padding-left: 55px;
    .screen {
        cursor: pointer;
        position: relative;
        display: inline-block;
        box-shadow: 0 0 0 1px rgba(58, 58, 58, 0.05);
        width: 250px;
        height: 444px;
        margin-right: 30px;
        margin-bottom: 20px;
        .screen-image {
            width: 100%;
            height: 100%;
        }
        .screen-item {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            backface-visibility: hidden;
            background-color: hsla(0, 0%, 100%, 0.98);
            box-shadow: 0 20px 40px 0 rgba(58, 58, 58, 0.2);
            color: #3a3a3a;
            opacity: 0;
            transform: translateZ(0);
            transition: opacity 0.25s ease-out 0s;
        }
        .screen-item-title {
            position: absolute;
            top: 230px;
            left: 0;
            right: 0;
            padding: 30px;
            text-align: center;
            text-shadow: 3px 3px 3px #bbb;
        }
        .screen-item-qrcode {
            box-shadow: 0 20px 40px 0 rgba(58, 58, 58, 0.3);
            padding: 3px;
            border-radius: 2px;
            display: block;
            margin: 0 auto;
        }
        .screen-item-btn {
            background-color: #fff;
            border: 1px solid #10c55b;
            border-radius: 3px;
            color: #10c55b;
            display: inline-block;
            font-size: 14px;
            line-height: 24px;
            padding: 4px 10px;
            text-align: center;
            width: 180px;
            margin: 0 auto;
            margin-top: -30px;
        }
        .screen-item-btn:hover {
            background-color: #10c55b;
            color: #fff;
        }
    }
    .screen:hover {
        .screen-item {
            opacity: 1;
        }
    }
    .scroll-top {
        position: fixed;
        right: 30px;
        bottom: 30px;
        cursor: pointer;
        .iconfont {
            color: #AAAAAA;
            font-size: 36px !important;
        }
    }
}
</style>