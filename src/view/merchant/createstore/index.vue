<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-07-10 18:32:23
 * @LastEditTime: 2019-09-27 17:05:50
 -->
<template>
    <div class="geographical">
        <div class="horizontal">
            <div class="horizontalLi">
                <el-form :model="dataForm" label-width="120px">
                    <el-form-item label="门店名称 :">
                        <el-input
                            class="name"
                            v-model.trim="dataForm.name"
                            type="text"
                            placeholder="门店名称最长支持20个字"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="login">LOGO :</div>
                        <el-upload
                            type="file"
                            class="avatar-uploader"
                            action="/file/upload"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="dataForm.imageUrl"
                                :src="dataForm.imageUrl"
                                class="avatar"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                            <div class="prompt">
                                修改
                                <div class="edit">建议尺寸不要大于80 x 80</div>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="联系电话 :">
                        <el-input
                            class="number"
                            v-model.trim="dataForm.number"
                            maxlength="16"
                            type="text"
                            placeholder="请输入电话号码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="所属区域 :">
                        <div class="adders">
                            <v-distpicker
                                @selected="onSelected"
                                :province="prov"
                                :city="city"
                                :area="district"
                            ></v-distpicker>
                        </div>
                    </el-form-item>
                    <el-form-item label="详细地址 :">
                        <el-input
                            class="localized"
                            id="searchInput"
                            v-model.trim="dataForm.address"
                            type="text"
                            onkeyup="this.value=this.value.replace(/\s+/g,'')"
                            placeholder="请填写详细地址，以便买家联系:(勿重复填写省市区信息)"
                        >
                        </el-input>
                        <el-button id="search">搜索地图</el-button>
                    </el-form-item>
                    <el-form-item label="地图定位 :">
                        <div class="map_search_result">
                            <div id="panel" class="scrollbar1">
                                <div id="searchResults"></div>
                            </div>
                            <div id="container"></div>
                        </div>
                    </el-form-item>
                    <el-form-item label="运营时间 :">
                        <el-input
                            class="time"
                            v-model.trim="dataForm.time"
                            type="text"
                            placeholder="请输入运营时间"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
       
        <div class="submit">
            <div class="setting" @click="HandlerShow">
                更多设置
                <span
                    class="iconfont icon-xiaojiantou-top"
                    v-if="!isShow"
                ></span>
                <span class="iconfont icon-xiaojiantou-bottom" v-else></span>
            </div>
            <div class="editList" v-show="isShow">
                <div class="banner">
                    <div class="bannerName">轮播图 :</div>
                    <div class="bannerRight">
                        <div
                            class="forImg"
                            v-for="(item, index) in listImg"
                            :key="index"
                        >
                            <img class="listImg" :src="item" />
                            <div class="delete">
                                <i
                                    class="el-icon-delete"
                                    @click="DeleteImg(item, index)"
                                ></i>
                            </div>
                        </div>
                    </div>
                    <el-upload
                        type="file"
                        class="avatar-uploader"
                        action="/file/upload"
                        :show-file-list="false"
                        :before-upload="handlePictureCardPreview"
                    >
                        <i class="el-icon-plus bannerAdd"></i>
                    </el-upload>
                </div>
                <div class="ueditor">
                    <div class="ueditorName">门店&场地详情</div>
                    <div class="ueditorLi">
                        <!-- <textarea
                            type="text/plain"
                            name="store_info"
                            id="store_content"
                            v-html="contentHtml"
                        ></textarea> -->
                        <vue-ueditor-wrap
                            v-model="contentHtml"
                            :config="myConfig"
                        ></vue-ueditor-wrap>
                    </div>
                </div>
            </div>
            <div class="confirm">
                <div class="confirmLi">
                    <div class="confirmLeft" @click="HandlerBack">返回列表</div>
                    <div class="confirmRight" @click="submit">保存门店</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var map, geolocation, geocoder, marker, lnglat, options, placeSearch;
import { PostShop, GitShop, PostImg, CreateStore } from "@/api/api";
import { UrlSearch } from "../../../assets/js/Urlsearch";
import VDistpicker from "v-distpicker";
// 百度富文本编辑器
import VueUeditorWrap from "vue-ueditor-wrap";
// 生成二维码
import vueQr from "vue-qr";
let UEDITOR_HOME_URL;
if (location.host === "localhost:8000") {
    UEDITOR_HOME_URL = "/static/ueditor/";
} else {
    UEDITOR_HOME_URL = "/ueditor/";
}
export default {
    data() {
        return {
            token: "", // 用户TOKEN
            shop_id: "", //  店铺ID
            store_id: "", //  门店ID
            searchName: "", //  门店姓名
            dataForm: {
                name: "",
                imageUrl: "",
                area: "",
                areaCode: "",
                number: "",
                address: "",
                time: "",
                id: "",
                merchant_id: ""
            },
            arr: [],
            prov: "", // 省
            city: "", // 市
            district: "", // 区
            lat: "", // 经度
            lng: "", // 纬度
            dialogImageUrl: "", // 商家轮播图
            store_info: "",
            textarea: "",
            dialogVisible: false,
            value1: new Date(2019, 9, 10, 18, 40),
            value2: new Date(2019, 9, 10, 18, 40),
            checkboxGroup1: ["周一"],
            cities: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            isShow: true,
            listImg: [],
            contentHtml: "",
            // 富文本编辑器的配置
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: true,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: "100%",
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                serverUrl: "/ueditor/php/controller.php",
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL
            },
        };
    },
    components: {
        VDistpicker,
        VueUeditorWrap,
        vueQr
    },
    created() {
        let _that = this;
        _that.token = localStorage.getItem("token");
        _that.shop_id = localStorage.getItem("shop_id");
        let Request = new UrlSearch();
        if (!Request.store_id) {
            _that.store_id = "";
        } else {
            _that.store_id = Request.store_id;
            _that.shop_id = Request.shop_id;
            _that.HandlerGetShow();
        }
    },
    methods: {
        // 选中地区
        onSelected(data) {
            let _that = this;
            _that.prov = data.province.value;
            _that.city = data.city.value;
            _that.district = data.area.value;
        },
        //获取数据
        HandlerGetShow() {
            let _that = this;
            _that.$http
                .get(GitShop, {
                    params: {
                        store_id: _that.store_id,
                        token: _that.token,
                        shop_id: _that.shop_id
                    }
                })
                .then(res => {
                    let status = res.data.status;
                    if (status == 0) {
                        let Data = res.data.data;
                        _that.dataForm.id = Data.id; // id
                        _that.dataForm.merchant_id = Data.merchant_id; // 商家ID
                        _that.dataForm.name = Data.name; // 商家名称
                        _that.dataForm.number = Data.mobile; // 商家电话
                        _that.dataForm.address = Data.addr; // 商家地址
                        _that.lat = Data.coordinate_x; // 经度
                        _that.lng = Data.coordinate_y; // 纬度
                        document.getElementById("searchInput").value =
                            Data.addr;
                        _that.prov = Data.province; // 省
                        _that.city = Data.city; // 市
                        _that.district = Data.area; // 区
                        _that.dataForm.time = Data.work_time; // 商家营业时间
                        _that.dataForm.imageUrl = Data.shop_store_img;
                        _that.store_info = Data.store_info;
                        let banners = Data.banner;
                        banners =
                            banners == null
                                ? (_that.listImg = [])
                                : (_that.listImg = banners);
                        _that.contentHtml = Data.store_info; // 文本编辑内容
                        window.UE.getEditor("store_content").setContent(
                            _that.contentHtml
                        );
                        document.getElementById("store_content").value =
                            Data.store_info;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 商家LOGO跟新
        beforeAvatarUpload(file) {
            let _that = this;
            const isLt2M = file.size / 1024 / 1024 < 2;
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            _that.$http
                .post(PostImg, param, config)
                .then(res => {
                    _that.dataForm.imageUrl = res.data.data.url;
                })
                .catch(err => {
                    _that.$message.error(err);
                });
            if (!isLt2M) {
                _that.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        },

        // 相片上传
        handleRemove(file, fileList) {},
        handlePictureCardPreview(file) {
            let _that = this;
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            _that.$http
                .post(PostImg, param, config)
                .then(res => {
                    _that.dialogImageUrl = res.data.data.url;
                    if (_that.listImg.length < 4) {
                        _that.listImg.push(res.data.data.url);
                    } else {
                        _that.$message.error("亲轮播图不能超过4张哦");
                        return;
                    }
                    _that.dialogVisible = true;
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        },

        // 删除图片
        DeleteImg(item, index) {
            let _that = this;
            _that.listImg.splice(index, 1);
        },
        HandlerShow() {
            let _that = this;
            _that.isShow = !_that.isShow;
        },
        //初始化地图
        init() {
            let that = this;
            map = new AMap.Map("container", {
                resizeEnable: true,
                zoom: 15,
                center: [106.66984, 26.58253]
            });
            options = {
                showButton: true, //是否显示定位按钮
                buttonPosition: "LB", //定位按钮的位置
                buttonOffset: new AMap.Pixel(10, 20), //定位按钮距离对应角落的距离
                showMarker: true, //是否显示定位点
                markerOptions: {
                    //自定义定位点样式，同Marker的Options
                    offset: new AMap.Pixel(-18, -36),
                    content:
                        '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
                },
                showCircle: true //是否显示定位精度圈
            };
            AMap.plugin(["AMap.Geolocation"], function() {
                var geolocation = new AMap.Geolocation(options);
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
            });
            // 地图点击事件
            map.on("click", function(e) {
                lnglat = e.lnglat;
                if (!marker) {
                    marker = new AMap.Marker();
                    map.add(marker);
                }
                map.add(marker);
                marker.setPosition(lnglat);
                if (!geocoder) {
                    geocoder = new AMap.Geocoder({
                        city: that.city, //城市设为北京，默认：“全国”
                        radius: 1000 //范围，默认：500
                    });
                }
                geocoder.getAddress(lnglat, function(status, result) {
                    let loaner =
                        result.regeocode.addressComponent.province +
                        result.regeocode.addressComponent.city +
                        result.regeocode.addressComponent.district;
                    let address = result.regeocode.formattedAddress;
                    let reg = new RegExp(loaner, "g");
                    let adder = address.replace(reg, "");
                    document.getElementById("searchInput").value = adder;
                    let markerContent =
                        "" +
                        "<div>" +
                        '   <img style="width: 26px; height: 38px;" src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png">' +
                        "</div>";
                    marker.setContent(markerContent);
                    if (status === "complete" && result.regeocode) {
                        that.dataForm.address = adder;
                        that.lat = lnglat.lat;
                        that.lng = lnglat.lng;
                    } else {
                        log.error("根据经纬度查询地址失败");
                    }
                });
            });
            function addertset() {
                let adders = document.getElementById("searchInput").value;
                if (adders == "" && that.city) {
                    that.$message.error("请填写详细地址!");
                    return;
                }
                AMap.service(["AMap.PlaceSearch"], function() {
                    //构造地点查询类
                    placeSearch = new AMap.PlaceSearch({
                        zoom: 15,
                        pageSize: 5, // 单页显示结果条数
                        city: that.city, // 兴趣点城市
                        citylimit: true, //是否强制限制在设置的城市内搜索
                        map: map, // 展现结果的地图实例
                        panel: "panel", // 结果列表将在此容器中进行展示。
                        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                    });
                    placeSearch.search(adders, function(status, result) {
                        that.lat = result.poiList.pois[0].location.lat;
                        that.lng = result.poiList.pois[0].location.lng;
                        // 监听地图 left点击
                        AMap.event.addListener(
                            placeSearch,
                            "markerClick",
                            e => {
                                let Data = e.data;
                                that.lat = Data.location.lat;
                                that.lng = Data.location.lng;
                                that.dataForm.address = Data.name;
                            }
                        );
                        // 监听地图 图标点击
                        AMap.event.addListener(
                            placeSearch,
                            "listElementClick",
                            e => {
                                let Data = e.data;
                                that.lat = Data.location.lat;
                                that.lng = Data.location.lng;
                                that.dataForm.address = Data.name;
                            }
                        );
                    });
                });
            }
            document.getElementById("search").onclick = addertset;
        },

        //  营业开始时间
        HandlerBegin() {},
        //
        HandlerBack() {
            window.history.back(-1);
        },
        // 保存门店
        submit() {
            let _that = this;
            if (_that.dataForm.name == "") {
                _that.$message.error("门店名称不能为空!");
                return;
            }

            if (_that.dataForm.imageUrl == "") {
                _that.$message.error("门店LOGO不能为空!");
                return;
            }

            if (_that.dataForm.number == "") {
                _that.$message.error("联系电话不能为空!");
                return;
            }

            if (_that.prov == "省") {
                _that.$message.error("请选择省市区");
                return;
            }

            if (_that.city == "" || _that.city == "市") {
                _that.$message.error("请选择省市区");
                return;
            }

            if (_that.district == "" || _that.district == "区") {
                _that.$message.error("请选择省市区");
                return;
            }

            if (_that.dataForm.address == "") {
                _that.$message.error("请填写详细地址!");
                return;
            }

            if (_that.dataForm.time == "") {
                _that.$message.error("请输入运营时间!");
                return;
            }

            let LatLng = `${_that.lat},${_that.lng}`;
            let AreaNumber = _that.dataForm.areaCode + _that.dataForm.number;

            let SpliceImg = _that.dataForm.imageUrl;
            let index = SpliceImg.lastIndexOf("/uploads/");
            SpliceImg = "/" + SpliceImg.substring(index + 1, SpliceImg.length);

            let listImgArr = [];
            for (let i = 0; i < _that.listImg.length; i++) {
                listImgArr.push(_that.listImg[i]);
            }
            // 自定义数据
            let dataForm;
            // 定义请求
            let swapper;
            if (_that.store_id == "") {
                swapper = CreateStore; // 创建门店
                dataForm = {
                    merchant_id: _that.token, // 商家id
                    token: _that.token,
                    shop_id: _that.shop_id,
                    name: _that.dataForm.name, // 商家名称
                    mobile: AreaNumber, // 商家联系电话
                    province: _that.prov, // 省
                    city: _that.city, // 市
                    area: _that.district, // 区
                    addr: _that.dataForm.address, // 详细地址
                    coordinate: LatLng, // 经纬度
                    work_time: _that.dataForm.time, // 营业时间
                    shop_store_img: SpliceImg, // 店铺封面
                    banner: listImgArr.join(","),
                    store_info: _that.contentHtml // 富文本
                };
            } else {
                swapper = PostShop; // 编辑门店
                dataForm = {
                    token: _that.token,
                    shop_id: _that.shop_id,
                    name: _that.dataForm.name, // 商家名称
                    mobile: AreaNumber, // 商家联系电话
                    province: _that.prov, // 省
                    city: _that.city, // 市
                    area: _that.district, // 区
                    addr: _that.dataForm.address, // 详细地址
                    coordinate: LatLng, // 金纬度
                    work_time: _that.dataForm.time, // 营业时间
                    merchant_id: _that.dataForm.merchant_id, // 商户ID
                    id: _that.dataForm.id, // 本条记录id
                    shop_store_img: SpliceImg, // 店铺封面
                    banner: listImgArr.join(","),
                    store_info: _that.contentHtml // 富文本
                };
            }

            _that.$http
                .post(swapper, _that.$qs.stringify(dataForm))
                .then(res => {
                    let code = res.data.status;
                    if (code == 0) {
                        if (status == 0) {
                            _that.$message({
                                message: "操作成功",
                                type: "success",
                                duration: 1500
                            });
                        }
                        let host = "/merchant/manage_shop/shop";
                        window.location.href = host;
                    }
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        },
        // 获取核销员列表
        getWriterInfo() {
            let _that = this;
            _that.writerInfoLoading = !_that.writerInfoLoading;
        },
        // 删除核销员
        deteleWriterInfo(index, id) {},
        
    },
    mounted() {
        // 更新地图
        this.init();
    }
};
</script>

<style lang="scss" scoped>
.geographical {
    width: 100%;
    height: 100%;
    .horizontal {
        width: 100%;
        height: 100%;
        padding: 30px 40px 0 40px;
        .horizontalLi {
            margin: 10px 0;
            float: left;
            width: 100%;
            
            .name {
                width: 260px;
            }
            .area {
                width: 80px;
                text-align: center;
            }
            .number {
                width: 260px;
            }
            .localized {
                width: 500px;
            }
            .adders {
                float: left;
                select {
                    height: 40px;
                    border-radius: 4px;
                    border: 1px solid #dcdfe6;
                }
            }
            #container {
                width: 600px;
                height: 500px;
                margin-bottom: 30px;
            }
            .cities {
                width: 500px;
                margin-top: 30px;
            }
            .info {
                width: 300px;
            }
            .time {
                width: 300px;
            }
        }
    }
    .submit {
        width: 100%;
        padding: 40px;
        float: left;
        .setting {
            height: 40px;
            width: 100%;
            text-align: right;
            line-height: 40px;
            border-bottom: 1px solid #f5f5f5;
            cursor: pointer;
            box-sizing: border-box;
            padding-left: 40px;
            .iconfont {
                font-size: 20px !important;
            }
        }
        .editList {
            width: 100%;
            height: 500px;
            margin-top: 50px;
            .banner {
                padding: 0 50px;
                width: 100%;
                float: left;
                .bannerName {
                    float: left;
                    line-height: 140px;
                    padding-right: 80px;
                }
                .bannerRight {
                    float: left;
                }
                .forImg {
                    float: left;
                    width: 189px;
                    height: 146px;
                    position: relative;
                    margin-right: 10px;
                    .delete {
                        float: left;
                        width: 189px;
                        height: 146px;
                        background: rgba(000, 000, 000, 0.4);
                        position: absolute;
                        text-align: center;
                        color: #fff;
                        line-height: 146px;
                        font-size: 20px;
                        z-index: 999;
                        display: none;
                        i {
                            cursor: pointer;
                        }
                    }
                    .listImg {
                        width: 189px;
                        height: 146px;
                        border-radius: 5px;
                        float: left;
                    }
                }
                .forImg:hover .delete {
                    display: block;
                }
            }
            .ueditor {
                display: flex;
                width: 100%;
                padding: 20px 50px;
                float: left;
                .ueditorName {
                    float: left;
                    width: 132px;
                }
                .ueditorLi {
                    width: 1100px;
                }
            }
        }
        .confirm {
            width: 100%;
            height: 40px;
            .confirmLi {
                width: 224px;
                height: 40px;
                margin: 50px auto 0;
                .confirmLeft {
                    float: left;
                    width: 100px;
                    height: 35px;
                    text-align: center;
                    line-height: 35px;
                    color: #2a82e4;
                    border: 1px solid #2a82e4;
                    border-radius: 2px;
                    cursor: pointer;
                }
                .confirmRight {
                    float: right;
                    width: 100px;
                    height: 35px;
                    text-align: center;
                    line-height: 35px;
                    background: #2a82e4;
                    border-radius: 2px;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
    }
}
.search {
    width: 100%;
    height: 80px;
    padding: 20px;
    #searchInput {
        width: 360px;
        height: 40px;
        border: 1px solid #e5e5e5;
    }
}
.map_search_result {
    width: 100%;
    height: 500px;
    position: relative;
}
#panel {
    background-color: white;
    max-height: 100%;
    overflow-y: auto;
    width: 280px;
    z-index: 999;
    float: left;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #2a82e4;
    line-height: 80px;
}
.avatar {
    float: left;
    width: 80px;
    height: 80px;
    display: block;
    border-radius: 50%;
}
.login {
    float: left;
    line-height: 80px;
    margin-left: -68px;
}
.prompt {
    color: #0086b3;
    line-height: 80px;
    margin-left: 10px;
    float: right;
    .edit {
        display: none;
        float: right;
        width: 170px;
        height: 30px;
        margin-top: 60px;
        line-height: 30px;
        color: #666;
        background: #fff;
        border: 1px solid #d5d5d5;
        box-shadow: 5px 5px 5px #888888;
    }
}
.prompt:hover .edit {
    display: block;
}
.bannerAdd {
    width: 146px;
    height: 146px;
    font-size: 26px;
    line-height: 140px;
    color: #2a82e4;
    border: 1px solid #2a82e4;
}
</style>
