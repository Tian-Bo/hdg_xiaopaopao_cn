<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="姓名" prop="roleName">
        <el-input v-model.trim="dataForm.delivery_name" type="text" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="delivery_tel">
        <el-input v-model.trim="dataForm.delivery_tel" placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="roleAdder">
        <el-input v-model.trim="dataForm.delivery_address" type="text" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="地址"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import  { isMobile } from '../../../../assets/js/validate'
  import { postCorporate } from "@/api/api";
    export default {
        data() {
          var validateMobile = (rule, value, callback) => {
            if (!isMobile(value)) {
                callback(new Error('手机号格式错误'))
            } else {
                callback()
            }
          }
          return {
            visible: false,
            menuList: [],
            menuListTreeProps: {
              label: 'name',
              children: 'children'
            },
            dataForm: {
              delivery_address:'',
              delivery_tel: ''
            },
            dataRule: {
              delivery_tel: [
                { required: true, message: '手机号不能为空', trigger: 'blur' },
                { validator: validateMobile, trigger: 'blur' }
              ],
            },
            tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
          }
        },
        methods: {
            init(DataForm) {
                let _that = this;
                _that.dataForm = DataForm;
                _that.visible = true;
            },
            dataFormSubmit () {
                let _that = this;
                if ( _that.dataForm.delivery_name == '') {
                    _that.$message.error('请输入填写姓名');
                    return
                }
                if ( _that.dataForm.delivery_tel == '') {
                    _that.$message.error('请输入填写电话号码');
                    return
                }
                if ( _that.dataForm.delivery_address == '') {
                    _that.$message.error('请输入填写地址');
                    return
                }
                _that.$http.post(postCorporate,
                    _that.$qs.stringify(
                        _that.dataForm
                    )).then((res) => {
                        let status = res.data.status;
                        if ( status == res.data.status) {
                          _that.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                              this.visible = false;
                              _that.$emit('refreshDataList')
                            }
                          })
                        }
                    })
                    .catch(err => {
                        _that.$message.error(err);
                    });
              },

        }
    }
</script>

<style scoped>

</style>
