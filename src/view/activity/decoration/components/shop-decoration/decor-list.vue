<template>
    <!-- 这是一个店铺列表公共组件 -->
    <div class="sideslip-body block">
        <div class="sideslip-body-box">
            <!-- 左边的图片 -->
            <div class="body-box-left">
                <img :src="item.cover_img" />
                <div class="left-end-time ">
                    {{ item.end_time | capitalize }}
                </div>
            </div>
            <!-- 右边的文字内容 -->
            <div class="body-box-right">
                <!-- 活动标题 -->
                <div class="box-right-title">
                    <h3>
                        {{ item.active_title }}
                    </h3>
                </div>
                <!-- 参与人头像 -->
                <div style="margin:5px 10px;">
                    <img
                        v-for="(item, index) in item.head_image"
                        :key="index"
                        :src="item"
                        class="box-right-portrait"
                    />
                    <img :src="img" class="box-right-portrait" />
                </div>
                <!-- 进度条 -->
                <div class="box-right-progress">
                    <el-progress
                        :percentage="item.diff"
                        :show-text="false"
                        v-show="item.finish !== 0"
                    ></el-progress>
                    <el-progress
                        :percentage="0"
                        :show-text="false"
                        v-show="item.finish === 0"
                    ></el-progress>
                </div>
                <!-- 参与人数 -->
                <div class="box-right-join">
                    <div>已参与:{{ item.finish }}人</div>
                    <div>剩余名额:{{ item.total - item.finish }}人</div>
                </div>
                <!-- 价格及报名-->
                <div class="box-right-btn">
                    <!-- 价格和时间 -->
                    <div class="right-btn-left">
                        <div>
                            <span class="btn-left-price">
                                ¥{{ item.price }}
                            </span>
                            <span v-show="item.red_pack !== null">
                                赚{{ item.red_pack }}
                            </span>
                        </div>
                        <div>
                            <el-button size="mini" type="primary" class="b-btn">
                                报名
                            </el-button>
                        </div>
                    </div>
                    <!-- 报名按钮 -->
                    <!-- <div class="right-btn-right">
                        <div style="color:#ccc">
                            <i class="el-icon-time"></i>
                           结束报名
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            img: "../../../../../static/image/bgUser.jpg"
        };
    },
    filters: {
        capitalize: function(value) {
            // 正则将字符串转换为时间戳
            value = value.substring(0, 19);
            value = value.replace(/-/g, "/");
            // 对比当前时间戳和到期时间戳
            let newTime = new Date(value).getTime();
            let timestamp = Date.parse(new Date());
            let ftime = newTime - timestamp;
            if (ftime < 0) {
                return "活动已结束";
            }

            let days = parseInt(ftime / (1000 * 60 * 60 * 24));
            let hours = parseInt(
                (ftime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let minutes = parseInt((ftime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = (ftime % (1000 * 60)) / 1000;

            return "剩余" + days + "天" + hours + ":" + minutes + ":" + seconds;
        }
    }
};
</script>
<style lang="scss" scoped>
.sideslip-body {
    width: 100%;
    margin-top: 10px;
    .sideslip-body-box {
        text-align: left;
        display: flex;
        margin-bottom: 20px;
        .body-box-left {
            width: 105px;
            height: 125px;
            position: relative;
            .left-end-time {
                position: absolute;
                text-align: center;
                bottom: 0;
                left: 0;
                right: 0;
                background: #ff2e50;
                color: #fff;
                font-size: 10px;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
            }
            img {
                width: 100%;
                height: 100%;
                border-radius: 8px;
            }
        }
        .body-box-right {
            margin: 0 10px;
            .box-right-title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 210px;
            }
            .box-right-portrait {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                border: 2px #fff solid;
                margin-left: -11px;
            }
            .box-right-join {
                display: flex;
                justify-content: space-between;
                margin-top: 5px;
                font-size: 12px;
            }
            .box-right-btn {
                .right-btn-left {
                    color: #ff2e50;
                    padding-top: 12px;
                    display: flex;
                    justify-content: space-between;
                    margin: 0;
                    line-height: 26px;
                    .b-btn {
                        height: 19px;
                        line-height: 6px;
                        border-radius: 25px;
                        background: #ff2e50;
                        border: none;
                    }
                    .btn-left-price {
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>
