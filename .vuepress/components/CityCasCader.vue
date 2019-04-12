<template>
    <div>
        <!--城市选择联动插件-->
        <div class="citySelect" @click="clickCitySelect">
            <div >
                <input v-if="!cityValue || !cityValue[0]" type="text" class="input" readonly placeholder="请选择省市区">
            </div>
            <span class="inpText" v-if="cityValue && cityValue[0]" v-text="`${cityValue[0]}${cityValue[1]}${cityValue[2]}`"></span>
        </div>

        <!--城市选择弹框-->
        <Toast :show="citySelectDialogVisible"
               @msg="closeCitySelectToast"
               :onlyslot="true"
        >
            <div>
                <!--value 显示最低一级有值的编码 自动匹配高一级的选中条目-->
                <Area :area-list="areaList"
                      :visible-item-count="5"
                      :value="code || ''"
                      @change="selectCityChange"
                      @confirm="selectCityConfirm"
                      @cancel="selectCityCancel"

                />
            </div>
        </Toast>
    </div>

</template>
<script>

    import Toast from './Toast';
    import Area from './Area';
    import {
        plainArrayData,
        allPlainData
    } from '../utils/city';


    window.plainArrayData = plainArrayData;
    export default {
        name: 'CityCasCader',
        data: () => {
            return {
                //城市选择
                citySelectDialogVisible: false,
                cityValue: ['', '', ''],//已经选中的省市区数据
                code:'',
                areaList: plainArrayData
            }
        },
        props: ['value'],//是一个省市区数组
        created() {
            this.cityValue=this.$props.value;
        },
        updated(){
            this.cityValue=this.$props.value;
        },
        methods: {
            //城市选择
            closeCitySelectToast(status) {
                this.citySelectDialogVisible = status;
            },
            clickCitySelect() {
                this.citySelectDialogVisible = true;
            },
            selectCityChange(val) { //发生变动
            },
            selectCityConfirm(value) { //点击确认

                const [province, city, district] = value || []
                this.citySelectDialogVisible = false;
                this.cityValue = [
                    province.code == -1 ? '' : province.name,
                    city.code == -1 ? '' : city.name,
                    district.code == -1 ? '' : district.name,
                ];

                this.$emit('confirm', this.cityValue, this.cityValue[2] ? district.code : (this.cityValue[1] ? city.code : province.code));//最后一个选中的code
            },
            selectCityCancel() { //点击取消
                this.citySelectDialogVisible = false;
            },
        },
        watch: {
            value(val) {//
                if(val instanceof Array){

                    let selectLastName='';

                    console.log('val:',val);
                    for(let i=val.length-1;i>-1;i--){
                        if(val[i]){
                            !selectLastName && (selectLastName=val[i])
                        }
                    }
                    if(selectLastName){
                        Object.keys(allPlainData).map((code)=>{
                            if(allPlainData[code]==selectLastName){
                                this.code=code
                            }
                        })
                    }
                }
            }
        },
        components: {
            Toast,
            Area
        }
    }
</script>
<style lang="scss" scoped>
    @import '../public/scss/iconfont/iconfont.css';
    @import '../public/scss/mixin.scss';
    @import '../public/scss/index.scss';

    /*城市选择下拉框*/
    $size:1rem;
    .citySelect {
        @include box((lh:$size,  bg:$white));
        @include thin(bottom, $border-color);
        span {
            @include box(());
        }
    }
    .inpText{
        @include box((p:0 0 0 0.2rem));
    }
    .input {
        @include box((h:$size, lh:normal, p:0 0 0 0.2rem));
        min-width:4rem;
    }

</style>
