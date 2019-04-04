<template>
    <div class="question-item">
        <span class="serial" v-text="index+1+'、'"></span>

        <!-- 题目-->
        <p class="title" >
            <!--单选题 判断题-->
            <span v-if="question.classifyId!=3" v-text="question.questionName ||''"></span>
            <!--填空题-->
            <span v-if="question.classifyId==3">
                 <component :is="'spaceQuestion'+_uid"
                            :value="value"
                            :answersLists="answersLists"
                            :userAnswerStatus="userAnswerStatus"
                            :question="question"
                            :disableSelectAnswer=disableSelectAnswer
                            @input="selectSpaceAllAnswer"
                 />
            </span>
            <slot name="perPoints"></slot>
        </p>



        <!--单选题  判断题  答案列表-->
        <ul class="answer" >
            <li v-for="(it,i) in answersList"  @click="selectAnswer(it,i)">
                <div class="sign" :class="checkedClass(i)">
                    <span v-text="it.optionName"></span>
                </div>
                <div class="content">
                    <p v-text="it.optionContent" :class="userAnswerClass(it,i)"></p>
                </div>
            </li>
        </ul>

        <!--正确答案以及解析-->
        <div class="rightAnswer" v-if="showRightAnswerBottom">
            <p>
                正确答案：<span v-text="createCorrectAnswer"></span>
            </p>
            <p>
                解析：<span v-text="question.answerAnalysis"></span>
            </p>
        </div>
    </div>
</template>
<script>
    import Inp from '@/components/Input.vue';
    import Vue from 'vue';




    export default {
        name: 'ExamQuestion',
        data:()=>{
            return {
                showToastStatus:false,

                trueOrFalseQuestion:{//判断题的答案
                    answersList:[
                        {optionName:'A',optionContent:'对'},
                        {optionName:'B',optionContent:'错'},
                    ]
                },
                answersLists:{

                }
            }
        },
        /**
         * @props
         *  question : 题目
         *  index ：题目索引
         *  value ：v-model绑定的value值
         *  showRightAnswerBottom：底部是否显示正确答案以及解析
         *  disableSelectAnswer ：是否禁用掉用户的做题功能
         *  userAnswerStatus ： 是否显示用户的选中项的正确性
         *
         * **/
        props: ['question','index','value','showRightAnswerBottom','disableSelectAnswer','userAnswerStatus','userAnswerKey'],
        created() {

            let {
                questionName,
                answersList
            } = this.question;


            if(this.question.classifyId==3){
                let spaces = questionName.match(/__\([^\(\)]+\)__/g)||[];


                for(let i=0;i<spaces.length;i++){

                    let answers=JSON.parse(answersList[i].optionContent);

                    this.$set(this.answersLists,i,answers)

                    questionName = questionName.replace(spaces[i],`<Inp inputType="select"
                     :selects="answersLists[${i}]"
                     modelKey="label"
                     itemKey="label"

                     :disableSelectAnswer="disableSelectAnswer"
                     :value="value[${i}]"
                     @input="(val)=>{selectSpaceItem(val,${i})}"
                     :wraper_style="{display:'inline'}"
                     :userRender="userRender"
                     :spaceIndex="${i}"
                />`)
                }

                let compName=`spaceQuestion${this._uid}`
                //注册基于当前组件ID的唯一组件 避免组件覆盖
                Vue.component(compName, {
                    name:compName,
                    template:`<span>${questionName}</span>`,
                    data() {
                        return {

                        }
                    },
                    props:['question','value','answersLists','userAnswerStatus','disableSelectAnswer'],
                    methods: {
                        userRender(val,spaceIndex) {
                            let {
                                userAnswerStatus,
                                value,
                                question,
                                disableSelectAnswer
                            } = this;

                            let color ='#666';
                            if(userAnswerStatus){
                                let correctAnswer = question.correctAnswer.split('$&');
                                let isRight = correctAnswer[spaceIndex]==val;
                                color= isRight?'#4992EC':'#F64C3E';
                            }
                            return val? `<span style="text-decoration:underline;display:inline-block;padding:0 0.1rem;color:${color}"> ${val} </span>`:`____`;
                        },
                        selectSpaceItem(value,spaceIndex){//选中一个空格
                            this.$emit('input',this.value);
                            this.$parent.$parent.$set(this.value,spaceIndex,value)
                        }
                    },
                    components:{
                        Inp
                    }
                });
            }



        },
        mounted(){

        },
        methods: {
            createCategory(){
                const {
                    classifyId,// 1 单选 2 判断 3 填空题
                } = this.question;

                const self =this;

                return {
                    1:{//单选题
                        selectAndEmitSelectItem:(answer,i)=>{
                            if(self.disableSelectAnswer){
                                return ;
                            }

                            if(self.value!=undefined && self.value==i){
                                self.$emit('input',undefined);
                            }else{
                                self.$emit('input',i);
                            }
                        },
                        selectedClass:(i)=>{
                            return self.value==i*1?'checked':''
                        },
                        userAnswerClass:(answer,i)=>{
                            if(self.question[self.userAnswerKey] == i){
                                return answer.optionContent== self.question.answersList[self.question.correctAnswer].optionContent ?'right':'wrong'
                            }else{
                                return ''
                            }
                        },
                        getCorrectAnswer:()=>{
                            const chartInd = ['A','B','C','D','E','F','G']
                            return chartInd[self.question.correctAnswer];
                        }
                    },
                    2:{//判断题
                        selectAndEmitSelectItem:(answer,i)=>{
                            if(self.disableSelectAnswer){
                                return ;
                            }
                            self.$emit('input',i==0?'true':'false');
                        },
                        selectedClass:(i)=>{
                            return (self.value=='true' && i==0 ) || ( self.value=='false' && i==1 ) ? 'checked':''
                        },
                        userAnswerClass:(answer,i)=>{
                            if( (self.question[self.userAnswerKey] == 'true' && i== 0 ) || (self.question[self.userAnswerKey] == 'false' && i== 1)  ){
                                return self.question.isCorrect==1?'right':'wrong'
                            }else{
                                return ''
                            }
                        },
                        getCorrectAnswer:()=>{
                            return self.question.correctAnswer=='true' ? "A 对":'B 错'
                        }
                    },
                    3:{//填空题 用到了Input组件   这里只需要解析
                        getCorrectAnswer:()=>{
                            return self.question.correctAnswer.split('$&').join('、');
                        }
                    },
                    // 3:{//多选题
                    //     selectAndEmitSelectItem:(answer,i)=>{
                    //         if(self.disableSelectAnswer){
                    //             return ;
                    //         }
                    //
                    //         if(!self.value){
                    //             self.value = [];
                    //         }
                    //
                    //         if(self.value.indexOf(i)>-1){
                    //             self.value.splice(self.value.indexOf(i),1);
                    //         }else{
                    //             self.value.push(i);
                    //         }
                    //         self.$emit('input',self.value);
                    //     },
                    //     selectedClass:(i)=>{
                    //         return self.value && self.value.indexOf(i)>-1?'checked':''
                    //     },
                    //     userAnswerClass:(answer,i)=>{
                    //
                    //     },
                    //     getCorrectAnswer:()=>{
                    //         return self.question.correctAnswer;
                    //     }
                    // }
                }
            },
            selectAnswer(answer,i) {//选中其中一项
                const {
                    classifyId,// 1 单选 2 判断
                } = this.question;
                const category =this.createCategory();
                category[classifyId] && category[classifyId].selectAndEmitSelectItem(answer,i);
            },
            checkedClass(i){//判定当前选项是否选中
                const {
                    classifyId,// 1 单选 2 判断
                } = this.question;
                const category =this.createCategory();
                return category[classifyId] && category[classifyId].selectedClass(i);
            },
            userAnswerClass(answer,i){//展示用户的答案是否正确
                const {
                    classifyId,
                } = this.question;
                const category =this.createCategory();
                return this.userAnswerStatus?category[classifyId] && category[classifyId].userAnswerClass(answer,i):'';
            },
            selectSpaceAllAnswer(val){//填空选项变动
                // this.$parent.$set(`question.${this.userAnswerKey}`,val)
                // console.log('selectSpaceAllAnswer:',val);
            }
        },
        computed:{
            answersList(){// 答案列表
                let config ={
                    1:this.question.answersList,//单选
                    2:this.trueOrFalseQuestion.answersList,//判断
                    3:[],//填空
                }
                return config[this.question.classifyId];
            },
            createCorrectAnswer(){//生成当前答案
                const {
                    classifyId,// 1 单选 2 判断 3填空题
                } = this.question;
                const category =this.createCategory();
                return category[classifyId] && category[classifyId].getCorrectAnswer();
            }
        },
        components:{
            Inp
        }
    }
</script>
<style lang="scss" scoped>
    .question-item {
        @include thin(bottom, $borderColor);
        margin-bottom: .2rem;
        .title {
            @include box((d:inline,c:$black3));
            display: inline;
        }
        .answer {
            $h:.6rem;
            li {
                @include box((lh:$h,p:.2rem 0,d:flex));
                align-content: center;
                vertical-align: middle;
            }
            .sign {
                display: inline-block;
                width: $h;
                height: $h;
                border: 1px solid;
                border-radius: 50%;
                position: relative;
                vertical-align: middle;
                flex-shrink: 0;
                span {
                    display:block;
                    position: absolute;
                    line-height: $h;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%)
                }
                &.checked {
                    background: $blue;
                    border: 0;
                    color:#fff;
                }
            }
            .content {
                display: block;
                margin-left: .2rem;
                @include box((d:block,c:$black6,fs:0.26rem));
                p{
                    &.right{
                        @include box((c:$blue));
                    }
                    &.wrong{
                        @include box((c:$red));
                    }
                }
            }
        }
        .rightAnswer{
            p{
                @include box((m:0.2rem 0,fs:0.26rem));
                span{
                    @include box((c:$black9));
                }
            }
        }
    }
</style>
