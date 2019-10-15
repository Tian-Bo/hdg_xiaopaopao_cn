<template>
  <div class="geographical">
      <div class="horizontal">
          <div class="horizontalLi">
            <el-form  :model="dataForm" label-width="120px">
              <el-form-item label="门店名称 :">
                <el-input class="name" v-model.trim="dataForm.name" type="text" placeholder="门店名称最长支持20个字"></el-input>
              </el-form-item>
              <el-form-item>
                  <div class="login">LOGO : </div>
                  <el-upload
                  type="file"
                  class="avatar-uploader"
                  action="/file/upload"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="dataForm.imageUrl" :src="dataForm.imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div class="prompt">修改 <div class="edit">建议尺寸不要大于80 x 80 </div></div>
                </el-upload>
              </el-form-item>
              <el-form-item label="联系电话 :" >
<!--                <el-input class="area" v-model.trim="dataForm.areaCode" type="text" placeholder="区号"></el-input> - -->
                <el-input class="number" v-model.trim="dataForm.number" maxlength="16" type="text" placeholder="请输入电话号码"></el-input>
              </el-form-item>
              <el-form-item label="所属区域 :" >
                <div class="adders">
                  <select v-model="prov">
                    <option v-for="option in arr" :value="option.name">
                      {{ option.name }}
                    </option>
                  </select>
                  <select v-model="city">
                    <option v-for="option in cityArr" :value="option.name">
                      {{ option.name }}
                    </option>
                  </select>
                  <select v-model="district" v-if="district">
                    <option v-for="option in districtArr" :value="option.name">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
              </el-form-item>
              <el-form-item label="详细地址 :">
                <el-input class="localized" id="searchInput" v-model.trim="dataForm.address" type="text" onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          placeholder="请填写详细地址，以便买家联系:(勿重复填写省市区信息)">
                </el-input>
                <el-button @click="HandlerQuery">搜索地图</el-button>
              </el-form-item>
              <el-form-item label="地图定位 :">
                <div class="map_search_result">
                  <div id="panel" class="scrollbar1">
                    <div id="searchResults"></div>
                  </div>
                  <div id="map" ></div>
                </div>

              </el-form-item>
              <el-form-item label="运营时间 :">
                <el-input class="time" v-model.trim="dataForm.time" type="text" placeholder="请输入运营时间"></el-input>
<!--                <el-button>起始时间</el-button>-->
<!--                <el-time-picker-->
<!--                  v-model="value1"-->
<!--                  :picker-options="{-->
<!--                    selectableRange: '18:30:00 - 20:30:00'-->
<!--                  }"-->
<!--                  placeholder="起始时间">-->
<!--                </el-time-picker>-->
<!--                ~-->
<!--                <el-button>结束时间</el-button>-->
<!--                <el-time-picker-->
<!--                  arrow-control-->
<!--                  v-model="value2"-->
<!--                  :picker-options="{-->
<!--                    selectableRange: '18:30:00 - 20:30:00'-->
<!--                  }"-->
<!--                  placeholder="结束时间">-->
<!--                </el-time-picker>-->
<!--                <el-button>确定</el-button>-->
<!--                <el-button>取消</el-button>-->
<!--                <el-checkbox-group class="cities" v-model="checkboxGroup1">-->
<!--                  <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>-->
<!--                </el-checkbox-group>-->
              </el-form-item>
            </el-form>
          </div>
      </div>
      <div class="submit">
        <div class="setting" @click="HandlerShow">
          更多设置
          <span class="iconfont icon-xiaojiantou-top" v-if="!isShow"></span>
          <span class="iconfont icon-xiaojiantou-bottom" v-else></span>
        </div>
        <div class="editList" v-show="isShow">
          <div class="banner">
            <div class="bannerName">轮播图 :</div>
            <div class="bannerRight">
              <div class="forImg" v-for="(item,index) in listImg" :key="index">
                <img class="listImg" :src="item">
                <div class="delete" ><i class="el-icon-delete" @click="DeleteImg(item,index)"></i></div>
              </div>
            </div>


            <el-upload
              type="file"
              class="avatar-uploader"
              action="/file/upload"
              :show-file-list="false"
              :before-upload="handlePictureCardPreview">
              <i class="el-icon-plus bannerAdd"></i>
            </el-upload>
          </div>
          <div class="ueditor">
            <div class="ueditorName">门店&场地详情</div>
            <div class="ueditorLi">
              <textarea type="text/plain" name="store_info" id="store_content" v-html="contentHtml"></textarea>
            </div>
          </div>
        </div>
        <div class="confirm">
          <div class="confirmLi">
            <div class="confirmLeft">返回列表</div>
            <div class="confirmRight" @click="submit">保存门店</div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  var map,geolocation,geocoder,marker,lnglat;
  import  LoginUsers  from '../expense/management/adder'
  import { PostShop,GitShop,PostImg } from "@/api/api";
  import  { isMobile,} from '../../../assets/js/validate'
  export default {
      data() {
         return {
           token: '',
           shop_id: '',
           searchName: '',
           dataForm:{
             name: '',
             imageUrl: '',
             area: '',
             areaCode: '',
             number: '',
             address: '',
             time: '',
             id: '',
             merchant_id: ''
           },
           arr: [],
           prov: '贵州',
           city: '贵阳',
           district: '南明区',
           lat: '', // 经度
           lng: '', // 纬度
           dialogImageUrl: '', // 商家轮播图
           store_info: '',
           textarea: '',
           dialogVisible: false,
           value1: new Date(2019, 9, 10, 18, 40),
           value2: new Date(2019, 9, 10, 18, 40),
           checkboxGroup1: ['周一'],
           cities: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
           isShow: false,
           listImg: [],
           contentHtml:'',
         }
      },
      created() {
          let _that = this;
          _that.arr = LoginUsers;
          _that.token = localStorage.getItem('token');
          _that.shop_id = localStorage.getItem('shop_id');
          _that.HandlerGetShow();
      },
      beforeMount() {
          this.updateCity();
          this.updateDistrict();
      },
      watch: {
          prov() {
              this.updateCity();
              this.updateDistrict();
          },
          city() {
              this.updateDistrict();
          }
      },
      methods:{
        //获取数据
        HandlerGetShow(){
            let _that = this;
            _that.$http.get(GitShop, {
              params: {
                store_id: '63',
                token: _that.token,
              }
            })
            .then((res) => {
                let Data = res.data.data;
                _that.dataForm.id = Data.id; // id
                _that.dataForm.merchant_id = Data.merchant_id;// 商家ID
                _that.dataForm.name = Data.name; // 商家名称
                _that.dataForm.number = Data.mobile; // 商家电话
                _that.dataForm.address = Data.addr; // 商家地址
                _that.lat = Data.coordinate_x ; // 经度
                _that.lng = Data.coordinate_y; // 纬度
                document.getElementById('searchInput').value = Data.addr;
                _that.prov = Data.province;
                _that.city = Data.city;
                _that.district = Data.area;
                _that.dataForm.time = Data.work_time; // 商家营业时间
                _that.dataForm.imageUrl = Data.shop_store_img;
                _that.store_info = Data.store_info;
                if (Data.banner == '') {
                } else {
                  _that.listImg  = Data.banner.split(',');
                }
                _that.contentHtml = Data.store_info;
            })

        },
        // 地区选择
        updateCity() {
            for (var i in this.arr) {
                var obj = this.arr[i];
                if (obj.name == this.prov) {
                    this.cityArr = obj.sub;
                    break;
                }
            }
            this.city = this.cityArr[1].name;
        },
        updateDistrict() {
            for (var i in this.cityArr) {
                let obj = this.cityArr[i];
                if (obj.name == this.city) {
                    this.districtArr = obj.sub;
                    break;
                }
            }
            if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
                this.district = this.districtArr[1].name;
            } else {
                this.district = '';
            }
        },

        // 商家LOGO跟新
        beforeAvatarUpload(file) {
            let _that = this;
            const isLt2M = file.size / 1024 / 1024 < 2;
            let param = new FormData();
            param.append('file',file);
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };
            _that.$http.post(PostImg, param,config).then( res => {
                _that.dataForm.imageUrl = res.data.data.url
            })
            .catch(err => {
                _that.$message.error(err);
            });
            if (!isLt2M) {
                _that.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },

        // 相片上传
        handleRemove(file, fileList) {
            console.log(fileList)
        },
        handlePictureCardPreview(file) {
            let _that = this;
            let param = new FormData();
            param.append('file',file);
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };
            _that.$http.post(PostImg, param,config).then( res => {
                _that.dialogImageUrl = res.data.data.url;
                if (_that.listImg.length < 4) {
                  _that.listImg.push(res.data.data.url);
                } else {
                  _that.$message.error('亲轮播图不能超过4张哦');
                  return
                }
                _that.dialogVisible = true;
            })
            .catch(err => {
                _that.$message.error(err);
            });

        },

        // 删除图片
        DeleteImg(item,index) {
            let _that = this;
            _that.listImg.splice(index,1)
        },
        HandlerShow() {
            let _that = this;
            _that.isShow = !_that.isShow
        },
        //初始化地图
        init() {
            let _that = this;
            map = new AMap.Map('map', {
                resizeEnable: true,
                zoom: 10,
                center: [106.66984, 26.58253]
            });
            // 定位
            map.plugin('AMap.Geolocation', function() {
                geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    buttonPosition:'RB'
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            });

          //搜索 输入提示、
            AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
            let poiPicker = new PoiPicker({
              input: 'searchInput',
              placeSearchOptions: {
                map: map,
                pageSize: 10,
                panel: "panel", // 结果列表将在此容器中进行展示。
                autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
              },
              searchResultsContainer: 'searchResults'
            });

            poiPicker.on('poiPicked', function(poiResult) {
              let Data = poiResult.item;
              _that.lat = Data.location.lat
              _that.lng = Data.location.lng
              _that.dataForm.address = Data.name
              poiPicker.hideSearchResults();
              let source = poiResult.source,
                  poi = poiResult.item;
              if (source !== 'search') {
                //suggest来源的，同样调用搜索
                  poiPicker.searchByKeyword(poi.name);

              } else {
                //console.log(poi);
              }
            });
                poiPicker.onCityReady(function() {
                  let adders = document.getElementById('searchInput').value
                  poiPicker.searchByKeyword('');
                  document.getElementById('searchInput').value = adders
                });
          });

          function regeoCode() {
              if (!geocoder) {
                  geocoder = new AMap.Geocoder({
                      city: "全国", //城市设为北京，默认：“全国”
                      radius: 1000 //范围，默认：500
                  });
              }
              if (!marker) {
                  marker = new AMap.Marker();
                  map.add(marker);
              }
              marker.setPosition(lnglat);
              geocoder.getAddress(lnglat, function(status, result) {
                  if (status === 'complete'&&result.regeocode) {
                      let address = result.regeocode.formattedAddress;
                      document.getElementById('searchInput').value = address;
                      _that.lat = lnglat.lat;
                      _that.lng = lnglat.lng;
                  }else{
                      log.error('根据经纬度查询地址失败')
                  }
              });
          }

          map.on('click',function(e){
              lnglat = e.lnglat;
              regeoCode();
          });

        },
        //查询
        HandlerQuery() {

          let _that = this;
          AMap.service(["AMap.PlaceSearch"], function() {
            //构造地点查询类
            let placeSearch = new AMap.PlaceSearch({
                pageSize: 5, // 单页显示结果条数
                city: "全国", // 兴趣点城市
                citylimit: false,  //是否强制限制在设置的城市内搜索
                map: map, // 展现结果的地图实例
                panel: "panel", // 结果列表将在此容器中进行展示。
                autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });
            let adders = document.getElementById('searchInput').value;
            placeSearch.search(adders, function(status, result) {
                _that.lat = result.poiList.pois[0].location.lat
                _that.lng = result.poiList.pois[0].location.lng
              // 监听地图 left点击
              AMap.event.addListener(placeSearch, 'markerClick', (e) => {
                  let Data = e.data;
                  _that.lat = Data.location.lat
                  _that.lng = Data.location.lng
                  _that.dataForm.address = Data.name
              });
              // 监听地图 图标点击
              AMap.event.addListener(placeSearch, 'listElementClick', (e) => {
                  let Data = e.data;
                  _that.lat = Data.location.lat
                  _that.lng = Data.location.lng
                  _that.dataForm.address = Data.name
              });
            })
          });

        },

        //  营业开始时间
        HandlerBegin() {
        },
        // 保存门店
        submit() {
            let _that = this;
            if (_that.dataForm.name == '') {
                _that.$message.error('门店名称不能为空!');
                return
            }

            if (_that.dataForm.imageUrl == '') {
                _that.$message.error('门店LOGO不能为空!');
                return
            }

            if (_that.dataForm.number == '') {
                _that.$message.error('联系电话不能为空!');
                return
            }

            if (_that.dataForm.number.length < 11) {
                _that.$message.error('联系电话输入不正确!');
                return
            }

            if (!isMobile(_that.dataForm.number)) {
                _that.$message.error('联系电话输入不正确');
                return
            }

            if (_that.prov == '选中省份') {
                _that.$message.error('请选择省市区');
                return
            }

            if (_that.city == '' || _that.city == '请选择') {
                _that.$message.error('请选择省市区');
                return
            }

            if (_that.district == '' || _that.district == '请选择') {
                _that.$message.error('请选择省市区');
                return
            }

            if (_that.dataForm.address == '') {
                _that.$message.error('请填写详细地址!');
                return
            }

          if (_that.dataForm.time == '') {
              _that.$message.error('请输入运营时间!');
              return
          }
            let LatLng = `${_that.lat},${_that.lng}`;
            let AreaNumber = _that.dataForm.areaCode + _that.dataForm.number;

            let SpliceImg = _that.dataForm.imageUrl;
            let index = SpliceImg.lastIndexOf("/uploads/");
            SpliceImg = '/' + SpliceImg.substring(index+1,SpliceImg.length);

          let listImgArr = [];
            for (let i = 0; i <_that.listImg.length ; i++) {
                  // let index = _that.listImg[i].lastIndexOf("/uploads/");
                  // _that.listImg[i] = '/' + _that.listImg[i].substring(index+1,_that.listImg[i].length)
                  listImgArr.push(_that.listImg[i])

            }
          var ue = UE.getEditor('store_content');
          let store_infoHtml;
          ue.ready(function() {
            //设置编辑器的内容
              store_infoHtml = ue.getContent();
          });
          if (store_infoHtml == '' || !store_infoHtml) {
              _that.$message.error('请编辑符文本!');
              return
          }
            let dataForm = {
                token: _that.token,
                shop_id: _that.shop_id,
                name: _that.dataForm.name, // 商家名称
                mobile:  AreaNumber, // 商家联系电话
                province: _that.prov, // 省
                city: _that.city, // 市
                area: _that.district, // 区
                addr: _that.dataForm.address, // 详细地址
                coordinate: LatLng, // 金纬度
                work_time: _that.dataForm.time, // 营业时间
                merchant_id: _that.dataForm.merchant_id,// 商户ID
                id: _that.dataForm.id, // 本条记录id
                shop_store_img: SpliceImg,// 店铺封面
                banner:  listImgArr.join(','),
                store_info: store_infoHtml, // 富文本
            };

            console.log(dataForm)

            _that.$http.post(PostShop,
                _that.$qs.stringify(
                  dataForm
                )).then((res) => {
                  let code = res.data.status
                  if (code == 0 ) {
                    if ( status == 0) {
                      _that.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                      });
                    }
                      // let host = '/merchant/manage_shop/shop';
                      // window.location.href = host;
                  }
              })
              .catch(err => {
                  _that.$message.error(err);
              });

          }

      },
      mounted() {
          this.init();
          var ue = UE.getEditor('store_content');

      }
  }
</script>

<style lang="scss" scoped>
  .geographical{
    width: 100%;
    height: 100%;
    .horizontal{
      width: 100%;
      height: 100%;
      padding: 0 40px;
      .horizontalLi{
        margin: 10px 0;
        float: left;
        width: 100%;
        .name{
          width: 260px;
        }
        .area{
          width: 80px;
          text-align: center;
        }
        .number{
          width: 260px;
        }
        .localized{
          width: 500px;
        }
        .adders{
          float: left;
          select{
            height: 40px;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
          }
        }
        #map{
          width: 600px;
          height: 500px;
          margin-bottom: 30px;
        }
        .cities{
          width: 500px;
          margin-top: 30px;
        }
        .info{
          width: 300px;
        }
        .time{
          width: 300px;
        }

      }
    }
    .submit{
      width: 100%;
      padding: 40px;
      float: left;
      .setting{
        height: 40px;
        width: 100%;
        text-align: left;
        line-height: 40px;
        border-bottom: 1px solid #f5f5f5;
        cursor: pointer;
        box-sizing: border-box;
        padding-left: 40px;
        .iconfont{
          font-size: 20px!important;
        }
      }
      .editList{
        width: 100%;
        height: 500px;
        margin-top: 50px;
        .banner{
          padding: 0 50px;
          width: 100%;
          float: left;
          .bannerName{
            float: left;
            line-height: 140px;
            padding-right: 80px;
          }
          .bannerRight{
            float: left;
          }
          .forImg{
            float: left;
            width: 189px;
            height: 146px;
            position: relative;
            margin-right: 10px;
            .delete{
              float: left;
              width: 189px;
              height: 146px;
              background: rgba(000,000,000,.4);
              position: absolute;
              text-align: center;
              color: #fff;
              line-height: 146px;
              font-size: 20px;
              z-index: 999;
              display: none;
              i{
                cursor: pointer;
              }
            }
            .listImg{
              width: 189px;
              height: 146px;
              border-radius: 5px;
              float: left;
            }
          }
          .forImg:hover .delete{
            display: block;
          }

        }
        .ueditor{
          display: flex;
          width: 100%;
          padding: 20px 50px;
          float: left;
          .ueditorName{
            float: left;
            width: 132px;
          }
          .ueditorLi{
            width: 1100px;
          }
        }
      }
      .confirm{
        width: 100%;
        height: 40px;
        .confirmLi{
          width: 224px;
          height: 40px;
          margin: 50px auto 0;
          .confirmLeft{
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
          .confirmRight{
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
  .search{
    width: 100%;
    height: 80px;
    padding: 20px;
    #searchInput{
      width: 360px;
      height: 40px;
      border: 1px solid #e5e5e5;
    }
  }
  .map_search_result{
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
    border-color: #409EFF;
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
  .login{
    float: left;
    line-height: 80px;
    margin-left: -68px;
  }
  .prompt{
    color: #0086b3;
    line-height: 80px;
    margin-left: 10px;
    float: right;
    .edit{
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
  .prompt:hover .edit{
    display: block;
  }
  .bannerAdd{
    width: 146px;
    height: 146px;
    font-size: 26px;
    line-height: 140px;
    color: #2a82e4;
    border: 1px solid #2a82e4;
  }
</style>
