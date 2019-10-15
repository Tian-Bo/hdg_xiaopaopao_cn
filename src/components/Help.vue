<template>
    <div class="center" :class="{ 'helpActive': isActive }">
        <div class="helpTop">
            <span class="leftTop">帮助中心</span>
            <router-link to class="into">进入</router-link>
        </div>
        <div class="fixation" :class="{ 'imgUrlActive': isActive }">
            <img class="imgUrl" @click="handlePackUp" src="../assets/bg.png">
        </div>
        <div class="help">
            <div class="management">
                <div v-for="(item, index) in data.recommend" :key="index">
                    <h3 class="management-title">{{ item.title }}</h3>
                    <div v-html="item.content" class="management-cont"></div>
                </div>
                <div class="development">
                    <el-collapse v-if="data.show">
                        <el-collapse-item
                            :title="item.title"
                            :name="index"
                            v-for="(item, index) in data.dis_recommend"
                            :key="item"
                        >
                            <div v-if="!item">{{ item.content }}</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['data'],
    data() {
        return {
            activeNames: ["1"],
            isActive: false
        }
    },
    methods: {
        handlePackUp() {
            let _that = this;
            _that.isActive = !_that.isActive;
            _that.$emit("handleClickHelpShow", _that.isActive);
        }
    }
};
</script>

<style lang="scss" scoped>
.center {
    width: 400px;
    position: fixed;
    height: calc(100% - 70px);
    top: 60px;
    right: 0px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    transform: translate(0, 0);
    transition-duration: inherit;
    transition-duration: 0.5s;
}
.helpTop {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    padding: 0 30px;
    .leftTop {
        float: left;
    }
    .into {
        float: right;
        color: #2a82e4;
    }
}
.fixation {
    width: 30px;
    height: 70px;
    position: absolute;
    cursor: pointer;
    z-index: 30;
    top: 50%;
    left: 0;
    .imgUrl {
        width: 100%;
        height: 100%;
    }
}
.imgUrlActive {
    transform: translate(-30px, 0) rotate(180deg);
}
.help {
    height: calc(100% - 50px);
    overflow-y: hidden;
    .management {
        height: 100%;
        overflow-y: auto;
        padding: 10px;
        .management-title {
            margin: 10px 0;
        }
        .management-cont {
            height: 300px;
            margin: 0 auto;
            overflow: hidden;
            background: #f5f5f5;
        }
        .development {
            margin-top: 120px;
        }
    }
}

.helpActive {
    transform: translate(400px, 0);
    transition-duration: inherit;
    transition-duration: 0.5s;
}
</style>
