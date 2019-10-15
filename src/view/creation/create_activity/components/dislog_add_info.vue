<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-09-11 20:14:52
 * @LastEditTime: 2019-09-16 15:53:23
 -->
<template>
    <div>
        <el-table :data="infoList" style="width: 100%" height="400">
            <el-table-column label="">
                <template slot-scope="scope">
                    <el-image
                        style="width: 50px; height: 50px"
                        :src="scope.row.shop_store_img"
                        fit="fill"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="店铺名"> </el-table-column>
            <el-table-column prop="work_time" label="工作时间">
            </el-table-column>
            <el-table-column prop="addr" label="地址"></el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="addInfo(scope.row, scope.$index)"
                    >
                        添加
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ["infoList", "informationInfo"],
    data() {
        return {};
    },
    methods: {
        // 添加门店信息
        addInfo(row, index) {
            let _that = this;
            for (let i = 0; i < _that.informationInfo.store_ids.length; i++) {
                const element = _that.informationInfo.store_ids[i];
                if (element === row.id) {
                    this.$message.warning("禁止添加重复数据");
                    return;
                }
            }
            let dataParm = {
                address: row.addr,
                mobile: row.mobile,
                shop_cover:row.shop_store_img,
                store_name: row.name,
                store_id: row.id
            };
            _that.informationInfo.store_info.push(dataParm);
            _that.informationInfo.store_ids.push(row.id);
        }
    }
};
</script>


<style lang="scss" scoped>
</style>