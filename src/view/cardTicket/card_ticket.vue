<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-23 10:33:38
 * @LastEditTime: 2019-09-16 15:06:04
 -->
<template>
    <div class="add_card_ticket">
        <div class="return-btn" @click="jumpTopPage()">
            <i class="iconfont iconfanhui1"></i> 返回
        </div>
        <div class="choose-service">
            <div class="choose-service-title">选择服务、产品项目类型</div>
            <div class="choose-service-list">
                <div
                    class="service-list-item"
                    v-for="(item, index) in 1"
                    :key="index"
                >
                    <div>
                        <div class="item-title">
                            核销券
                            <i class="iconfont iconmendian-"></i>
                        </div>
                        <div class="item-old-title">二维码凭证</div>
                    </div>
                    <div class="list-item-icon">
                        <i class="iconfont iconyouhuiquanldpi"></i>
                    </div>
                    <div class="ab-icon">
                        <i class="iconfont icongougou1"></i>
                    </div>
                </div>
            </div>
        </div>
        <AddCardTicket />
    </div>
</template>
<script>
import AddCardTicket from "./components/add_card_ticket";
export default {
    data() {
        return {};
    },
    components: {
        AddCardTicket
    },
    methods: {
        jumpTopPage() {
            let _that = this;
            _that.$router.push({
                path: "/" + _that.$route.query.url,
                query: { title: "create_rule" }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.add_card_ticket {
    background: #f1f1f1;
    padding: 40px;
    .return-btn {
        color: #868686;
        cursor: pointer;
    }
    .return-btn:hover {
        color: #409eff;
    }
    .choose-service,
    .basic-info,
    .inventory-info {
        background: #fff;
        border: 1px #e2e2e2 solid;
        border-radius: 5px;
        margin: 20px 0;
    }
    .choose-service-title,
    .basic-info-title,
    .inventory-info-title {
        padding: 20px 40px 0px;
        color: #000;
        font-weight: bold;
        font-size: 14px;
    }
    .choose-service-list {
        padding: 10px 20px 20px;
    }
    .choose-service-list {
        display: flex;
        flex-wrap: wrap;
        .service-list-item {
            margin: 20px;
            width: calc(20% - 60px);
            height: 70px;
            line-height: 25px;
            border: 1px #ccc solid;
            border-radius: 8px;
            padding: 11px 25px;
            display: flex;
            justify-content: space-between;
            position: relative;
            .item-title {
                font-weight: bold;
                .iconfont {
                    color: #ccc;
                }
            }
            .item-old-title {
                color: #ccc;
            }
            .list-item-icon {
                line-height: 50px;
                .iconfont {
                    font-size: 40px !important;
                }
            }
            .ab-icon {
                position: absolute;
                bottom: -6px;
                right: -6px;
                background: #409eff;
                width: 18px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                border-radius: 50%;
                color: #fff;
            }
        }
    }
}
</style>