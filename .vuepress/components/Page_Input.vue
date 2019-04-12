<template>
    <div>
        <Input v-model="name" label="姓名" ph="请输入姓名" :required="true"/>
        <br />
        <Input v-model="password" label="密码" ph="请输入密码" type="password"/>
        <br />
        <Input v-model="note" label="备注" ph="请输入备注" inputType="textarea"/>
        <br />
        <Input v-model="sex"
               label="性别"
               ph="请选择性别"
               inputType="radio"
               :selects="[{name:'男',id:'1'},{name:'女',id:'2'}]"
                itemKey="name"
                modelKey="id"
        />

        <br />
        <Input v-model="interest"
               label="爱好"
               ph="请选择爱好"
               inputType="checkbox"
               :selects="[{name:'篮球',id:'1'},{name:'足球',id:'2'},{name:'电影',id:'3'}]"
               itemKey="name"
               modelKey="id"
        />
        <br />
        <Input v-model="status"
               label="婚姻状态"
               ph="请选择婚姻状态"
               inputType="switch"
               :selects="[{name:'已婚',id:'1'},{name:'未婚',id:'2'}]"
               itemKey="name"
               modelKey="id"
        />
        <br />
        <Input v-model="city"
               label="所在城市单选"
               ph="请选择所在城市"
               inputType="select"
               :selects="[{name:'杭州',id:'1'},{name:'南京',id:'2'},{name:'上海',id:'3'}]"
               itemKey="name"
               modelKey="id"
        />

        <br />
        <Input v-model="citys"
               label="所在城市多选"
               ph="请选择所在城市"
               inputType="select_multiple"
               :selects="[{name:'杭州',id:'1'},{name:'南京',id:'2'},{name:'上海',id:'3'}]"
               itemKey="name"
               modelKey="id"
        />

    </div>
</template>

<script>
    import Input from './Input';

    export default {
        name: 'PageInput',
        data:function(){
            return {
                result:[],
                name:'',
                password:'',
                note:'',
                sex:'',
                interest:[],
                status:false,
                city:'',
                citys:['2']
            }
        },
        props: {

        },
        mounted(){
            setTimeout(()=>{
                this.show=true
            },1000)
        },
        methods: {
            onClick(status) {
                this.show=status
            }
        },
        components:{
            Input
        }
    };
</script>

<style lang="scss" scoped>
    @import '../public/scss/iconfont/iconfont.css';
    @import '../public/scss/mixin.scss';
    @import '../public/scss/index.scss';

    .chick{
        cursor: pointer;
        color:$blue
    }
    .toast-slot-content{
        @include box((p:20px,h:200px,c:$red));
    }


</style>
