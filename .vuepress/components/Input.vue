
<!--
modelKey : 当select集合里面包含了对象的时候，必须传递  否则不用传递


-->

<template>
    <div class="input" :style="wraper_style">
        <div v-if="label"
             class="label"
             :style="label_style"
        >
            <span class="requireLabel" v-if="required">*</span>
            <label v-text="label"></label>
        </div>

        <!--单行输入框-->
        <input v-if="inputType=='input'||inputType=='number'"
               ref="inp"
               :value="value"
               :maxlength="maxlength"
               :type="type||'text'"
               :placeholder="ph"
               @input="input($event.target.value,$event)"
               @focus="onFocus"
               :readonly="readonly"
               :style="inp_style"
        />
        <!--多行输入框-->
        <textarea v-if="inputType == 'textarea'"
               ref="inp"
               :value="value"
               :placeholder="ph"
                @input="input($event.target.value,$event)"
                @focus="onFocus"
               :readonly="readonly"
               :style="inp_style"
               :maxlength="maxlength"
        ></textarea>

        <!--切换按钮-->
        <div class="switch" v-if="inputType == 'switch'">
            <MySwitch   @input="onSwitchInput" :value="value" class="switchItem"/>
        </div>

        <!--单选框-->
        <div class="radios" v-if="inputType == 'radio'">
            <RadioGroup  :value="value" @input="input">
                <Radio  class="radioItem" v-for="(item,i) in selects" :key="modelKey?item[modelKey]:item" :name="modelKey?item[modelKey]:item" >
                    <span class="radioTxt" v-text="item[itemKey]"></span>
                </Radio>

            </RadioGroup>
        </div>

        <!--复选框-->
        <div class="radios" v-if="inputType == 'checkbox'">
            <CheckBoxGroup  :value="value" @input="input">
                <CheckBox class="radioItem" v-for="(item,i) in selects" :key="modelKey?item[modelKey]:item" :name="modelKey?item[modelKey]:item" >
                    <span class="radioTxt" v-text="item[itemKey]"></span>
                </CheckBox>
            </CheckBoxGroup>
        </div>

        <!--日期选择框
        * dateFormat: 时间选择下拉框的时间格式  default:date    year-month:只包含年、月  date:包含年、月、日     time：只包含小时、分钟
        * 1 如果 是dateFormat 不是 time ：传进来的需要是时间对象  否则直接传递： hh:mm 这种类型
        * 2
        -->
        <div class="date flex1"
             v-if="inputType == 'date'"
             @click="showToast=!showToast"
        >
            <span class="dateVal" v-text="createDateVal(value)"></span>
            <span  class="arrow icon iconfont icon-arrow-right"></span>
        </div>

        <!--单选下拉框-->
        <div class="date flex1"
             v-if="inputType == 'select' && !userRender"
             @click="showToast=!showToast"
        >
            <span class="dateVal" v-text="getSelectRightValue()"></span>
            <span  class="arrow icon iconfont icon-arrow-right"></span>
        </div>
        <template v-if="inputType == 'select' && userRender" >
            <span class="userDefinedInp" @click="toggleToast"
                  v-html="userRender(value,spaceIndex)">
            </span>
        </template>



        <!--多选下拉框-->
        <div class="date flex1"
             v-if="inputType == 'select_multiple'"
             @click="showToast=!showToast"
        >
            <span class="dateVal" v-text="getMultipleSelectRightValue()"></span>
            <span  class="arrow icon iconfont icon-arrow-right"></span>
        </div>


        <!--城市选择框-->
        <!--<div class="CityCasCader"  v-if="inputType == 'city'">-->
            <!--<CityCasCader @confirm="confirmCitySelect"-->
                          <!--:value="value"-->
            <!--/>-->
        <!--</div>-->

        <slot />
        <span v-if="arrow" class="arrow icon iconfont icon-arrow-right"></span>


        <!--图片上传-->
        <div class="date flex1"  v-if="inputType=='upload'">
            <CardUploader :imgLists="value"
                          :onSuccess="onCardUpLoadSuccess"
                          :onDelete="onCardDelete"
                          :maxFileSize="maxFileSize||10"
                          :multiple="!!multiple"
                          :uploadUrl="uploadUrl"
                          :fileName="fileName"
            />
        </div>


        <!--底部toast-->
        <Toast :show="showToast"
               v-on:msg="(status)=>{showToast=status}"
               :onlyslot="true"
               class="toast"
        >
            <!--时间下拉框-->
            <DatetimePicker v-if="inputType=='date'"
                            :type="dateFormat||'date'"
                            :confirm-button-text="'确认'"
                            :cancel-button-text="'取消'"
                            :value="value"
                            :minDate="minDate || new Date()"
                            @input="changeDate"
                            @confirm="confirmDate"
                            @cancel="()=>{showToast=false}"
            />

            <!--单选下拉-->
            <Picker v-if="inputType=='select'"
                    ref="selectPicker"
                    :columns="selects"
                    :showToolbar="true"
                    :initialIndex="getInitialIndex()"
                    :valueKey="itemKey"
                    confirmButtonText="确定"
                    cancelButtonText="取消"
                    @confirm="confimPicker"
                    @cancel="()=>{showToast=false}"
            />

            <!--多选下拉  当cell的key 和 checkbox的name对应住的时候会选中-->
            <div v-if="inputType=='select_multiple'" class="multipleSelectToast">
                <CheckBoxGroup :value="value" @input="noop">
                    <CellGroup>
                        <Cell v-for="(item ,i) in selects"
                              clickable
                              :key="itemKey?item[modelKey]:item"
                              :title="itemKey?item[itemKey]:item"
                              @click="toggleMultipleItem(i)"
                        >
                            <CheckBox :name="itemKey?item[modelKey]:item" :ref="'checkboxes'" />
                        </Cell>
                    </CellGroup>
                </CheckBoxGroup>
            </div>
        </Toast>

    </div>
</template>
<script>
    import Toast from './Toast';

    import MySwitch from './Switch_';
    // import CityCasCader from './CityCasCader';

    import CheckBoxGroup from './CheckBoxGroup';
    import CheckBox from './CheckBox';

    import RadioGroup from './RadioGroup';
    import Radio from './Radio';
    import DatetimePicker from './DatetimePicker';
    import Picker from './Picker';

    import Cell from './Cell';
    import CellGroup from './CellGroup';
    import CardUploader from './CardUploader'

    /**
     *selects数组中支持传递 Object 或者 字符串集合
     *
     * **/

    export default {
        name: 'inp',
        data:()=>{
            return {
                showToast:false,//时间选择框
            }
        },
        props:{
            required:{//placeholder
                type:Boolean,
                default:false
            },
            ph:{//placeholder
                type:String,
                default:''
            },
            _name:String,
            type:{//  input 原生属性type ：number text tel
                type:String,
                default:'text'
            },
            value:[String,Number,Boolean,Date,Function,Object,Array,Symbol],//v-model 绑定的value值
            readonly:{//是否只读
                type:Boolean,
                default:false
            },
            click:{
                type:Function,
                default:()=>{}
            },
            inp_style:{
                type:Object,
                default:()=>{}
            },
            wraper_style:{
                type:Object,
                default:()=>{}
            },
            label:{
                type:String,
                default:''
            },
            label_style:{
                type:Object,
                default:()=>{}
            },
            arrow:{
                type:Boolean,
                default:false
            },
            inputType:{// input textarea switch date radio checkbox select   select_multiple city
                type:String,
                default:'input'
            },
            selects:{//下拉框数据列表 Array[Object,Object]
                type:Array,
                default:()=>[]
            },
            itemKey:{//下拉框渲染哪一个字段
                type:String,
                default:''
            },
            modelKey:{//下拉框的model 取的哪一个字段 不传递则代表传递整个对象   当selects=[{text:'',id:''}...]  但v-model绑定的是{text:'',id:''}中的某一个字段的时候 必须传入该字段
                type:String,
                default:''
            },
            dateFormat:{// year-month:只包含年、月  date:包含年、月、日     time：只包含小时、分钟
                type:String,
                default:'date'
            },
            maxlength:{// 输入框最大输入长度
                type:[Number,String],
                default:''
            },

            minDate:Date,//日期选择框 最小可选日期

            //自定义控制触发元素
            userRender:Function,//自定义触发器
            spaceIndex:Number,//填空题 第几个空格
            disableSelectAnswer:Boolean,//禁止用户选择

            //图片上传相关
            uploadUrl:String,
            maxFileSize:[Number],
            multiple:[Boolean],
            fileName:String
        },
        // [
        //     'ph',//placeholder
        //     '_name',
        //     'type',//  input 原生属性type ：number text tel
        //     'value',//v-model 绑定的value值
        //     'readonly',//是否只读
        //     'click',
        //
        //     //样式相关
        //     'inp_style',
        //     'wraper_style',
        //
        //     'label',//表单前面的label
        //     'label_style',//label样式
        //     'arrow',//是否包含尾部箭头
        //     'inputType',//自定义input属性 ：textarea radio checkbox select
        //
        //     //下拉框相关
        //     'selects',//下拉框数据列表 Array[Object,Object]
        //     'valueKey':{},//下拉框渲染哪一个字段
        //
        //     'dateFormat',
        //
        // ],
        created() {
        },
        methods: {
            noop(){},//空操作
            input(val,e) {//触发输入框变动
                if(this.click) this.click(false);
                if(this.$refs.inp){
                    this.$emit('msg',this._name,this.$refs.inp.value);
                }
                this.$emit('input',val);

            },
            onSwitchInput(val){
                this.$emit('input',val);
            },
            onFocus() {
                if(this.click) this.click(true)
            },
            confirmCitySelect(values,seleckedCode){
                this.$emit('input',values||'');
            },
            changeDate(date){//
                this.input(date);
            },
            confirmDate(date){//
                this.input(date);
                this.showToast=false;
            },
            createDateVal(value){//传递过来的value是时间对象还是字符串
                if(typeof value=='string'){
                    return value
                }else{
                    try{
                        const {
                            year,
                            month,
                            date,
                            hours,
                            minutes,
                            seconds
                        } = this.__parseTime(value) ;

                        const type = {
                            'date':`${year}/${month}/${date}`,
                            'year-month':`${year}/${month}`,
                            'time':`${hours}:${minutes}`,
                        }
                        return type[this.dateFormat||'date'] ;
                    }catch(e){
                        return ''
                    }
                }
            },

            /**单选下拉框相关**/
            confimPicker(value, i){//
                //避免返回的不是同一个对象 确保返回的是selects中的原对象
                const itemKey = this.itemKey;
                let modelKey = this.modelKey;

                let item = (this.selects||[]).filter((item,i)=>{
                    if(typeof item=='object'){
                        return item[itemKey]==value[itemKey]
                    }else{
                        return item==value
                    }
                });

                if(!modelKey){
                    this.$emit('input',item[0]||undefined,i,this.selects);
                }else{
                    this.$emit('input',item[0]?item[0][modelKey]:undefined,i,this.selects);
                }

                this.showToast=false;
            },
            getSelectRightValue(){//生成下拉框右侧的选中项文字展示
                let item0=this.selects[0];

                if(!item0){
                    return ''
                }
                if(typeof this.selects[0]!='object'){
                    return this.value;
                }

                // select集合里面是对象
                if(typeof this.value!='object'){//value不是对象
                    let item = (this.selects||[]).filter((item,i)=>this.value==item[this.modelKey]);
                    return item[0]?item[0][this.itemKey]:this.ph;
                }else{//value是对象
                    return this.value?this.value[this.itemKey]:this.ph
                }
            },
            getInitialIndex(){//获取最初的选中索引
                let modelKey = this.modelKey;

                if(!modelKey){
                    return this.selects.indexOf(this.value)||0
                }else{
                    let ind=0;
                    (this.selects||[]).map((item,i)=>{
                        if(this.value==item[this.modelKey]){
                            ind = i
                        }
                    });
                    return ind
                }
            },
            /**多选下拉框相关**/
            getMultipleSelectRightValue(){//生成下拉框右侧的选中项文字展示
                let item0=this.selects[0];
                const {
                    value,
                    selects,
                    itemKey,
                    modelKey
                } = this;

                if(!item0 || !value || !value.length){
                    return ''
                }

                if(!itemKey){
                    return value.join('，');
                }else{
                    return (selects||[]).reduce((ret,item,i)=>{
                        if(value.indexOf(item[modelKey])>-1){
                            ret.push(item[itemKey]);
                        }
                        return ret;
                    },[]).join('，')
                }
            },
            toggleMultipleItem(index){//多选下拉框切换
                let {
                    value,
                    modelKey,
                    selects
                } = this;
                const curItem = selects[index];

                if(!value){
                    value=[]
                };

                let valueItem = !modelKey?curItem:curItem[modelKey];

                if(value.indexOf(valueItem) < 0){
                    value.push(valueItem);//插入顺序需要控制
                }else{
                    value.splice(value.indexOf(valueItem),1)
                }

                this.input(value)
                // this.$refs[`checkboxes`][index].toggle()
            },
            //图片上传相关
            onCardUpLoadSuccess(val){//图片上传成功
                try {
                    this.value.push(val);
                    this.$emit(this.value);
                }catch(e){
                    console.warn('请确保传入的v-model初始值是数组类型！',e)
                }

            },
            onCardDelete(imgUrl){//图片删除成功
                this.value.splice(this.value.indexOf(imgUrl), 1);
                this.value.push();
            },
            toggleToast(){//切换toast的展示状态
                if(!this.disableSelectAnswer){
                    this.showToast=!this.showToast
                }
            }
        },
        watch: {
            showToast:function () {
                if(this.inputType=='select'){
                    let picker = this.$refs.selectPicker;
                    setTimeout(()=>{
                        picker.setIndexes([this.getInitialIndex()])
                    },400)
                }
            },
            showToastStatus:function (val) {
                this.showToast=!!val;
                console.log(val);
            }
        },
        computed:{

        },
        components: {
            Toast,
            MySwitch,
            // CityCasCader,
            CheckBoxGroup,
            CheckBox,
            RadioGroup,
            Radio,
            DatetimePicker,
            Picker,
            CellGroup,
            Cell,
            CardUploader
        }
    }
</script>


<style lang="scss" scoped>


    @import '../public/scss/iconfont/iconfont.css';
    @import '../public/scss/mixin.scss';
    @import '../public/scss/index.scss';
    .flex1{
        flex:1;
    }

    .input /deep/ .van-cell__title{
        @include box((fs:14px));
    }

    .input{
        $h:50px;
        $labelW:120px;
        @include box((lh:$h,d:flex,bg:$white,fs:14px));
        @include thin('bottom',$borderColor);

        flex-wrap: wrap;

        .requireLabel{
            @include box((c:$red,m:0 0 0 -0.15rem));
        }
        .label{
            @include box((w:$labelW,h:$h,p:0 0 0 10px));
            @include ellipsis();
        }
        input{
            @include box((d:block,h:$h,lh:normal,fs:14px,bg:transparent));
            text-indent: 20px;
            flex:1;
        }
        textarea{
            @include box((d:block,lh:20px,fs:14px,bg:transparent,p:15px));
            min-height: 120px;
            flex:1;
        }
        .switch{
            @include box((d:block,ta:right,p:0 0.2rem 0 0));
            .switchItem{
                vertical-align: middle;
            }
            flex:1;
        }
        /*单选框*/
        .radioItem{
            display: block;
            float: left;
            .radioTxt{
                @include box((m:0 20px 0 0));
            }
        }

        .radios{
            padding-left:15px;
            flex:1;
        }

        /*时间输入框*/
        .date{
            flex:1;
            @include box((ta:right));
            .arrow{
                display: inline;
            }
        }

        /*用户自定义的下拉框触发器*/
        .userDefinedInp{
            @include box((d:inline-block));
        }

        .multipleSelectToast{
            max-height: 300px;
            overflow-y: auto;
        }
        .CityCasCader{
            @include box((d:block,p:0 0.2rem 0 0));
            flex:1;
        }
        .arrow{
            @include box((d:block,w:10px,p:0 0.2rem 0 0,ta:right,fs:20px,lh:$h));
        }
        /deep/ .toast{
            z-index: 10;
        }
    }
</style>
