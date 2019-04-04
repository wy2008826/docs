<!--
该组件是属于高度集成组件   内部自己会处理新增 减少 输入等内容

    submitId 这个是为了区分更改数量的时候取的id字段  如果不传 则默认取id
    collapse 是为了区分折叠或者展开状态
-->

<template>
    <section class="goodCard" >
        <slot name="checkStatus"></slot>
        <!--展开状态-->
        <router-link  :to="'/goodsDetail/'+good.productId" tag="div" class="content">
            <template v-if="!collapse">
                <div class="good_img_area" :class="{empty_img:!getGoodMainImg(good)}">
                    <img v-if="getGoodMainImg(good)" :src="getGoodMainImg(good) || '/order/img/empty_img.png'" alt="">
                </div>
                <div class="good_msg_area">
                    <h5>
                        <!--预售 preTimeSale需要从商品详情中取-->
                        <GoodLabels type="preTimeSale" v-if="good.sellMode==1 || preSale || preTimeSale"/>

                        <label v-text="good.name||good.productName">---</label>
                        <!--<slot name="priceAmount"></slot>-->
                    </h5>
                    <p class="normal">
                        规格：<span v-text="good.spec">---</span>
                    </p>
                    <p class="normal">
                        单价:<slot name="price"></slot>
                    </p>

                    <div v-if="footerType == null" class="footer">
                        <span>
                            已购：<span class="amount" v-text="Math.ceil((good.productNum|| 0)/(good.stock||1))+good.unit">---</span>
                        </span>
                    </div>

                    <div v-if="footerType == '2'" class="footer">
                        <span>
                            预设量：<span class="amount" v-text="Math.ceil((good.productNum|| 0)/(good.stock||1))+good.unit+'  '+Math.ceil((good.productNum|| 0))+good.stockUnit">---</span>
                        </span>
                    </div>

                </div>
            </template>

            <!--折叠状态-->
            <template v-else>
                <div class="simpleCard">
                    <p v-text="good.name" class="name">----</p>
                    <p class="amount_area">
                            已购：<span class="amount" v-text="Math.ceil((good.productNum|| 0)/(good.stock||1))+good.unit +' '+good.productNum+good.stockUnit">---</span>
                    </p>
                </div>
            </template>
        </router-link>

        <!--修改购物车数量-->
        <div class="numOperation" v-if="!collapse && !hideOperation">
            <div class="operWrap">
                <span @click.prevent="decreaseAmount?decreaseAmount(good,$event):showPropsMsg('decreaseAmount')"
                      class="icon iconfont icon-subtract"
                      :class="{active:canZero?good.productNum>0:good.productNum>good.step}"
                ></span>
                <input type="tel"
                       v-model="good.productNum"
                       :class="{active:good.productNum>0}"
                       :style="{width:inputWidth(good.productNum)}"
                       @blur="amountBlur?amountBlur(good,$event):showPropsMsg('amountBlur')"
                       @focus="amountFocus(good,$event)"
                />
                <!--<label v-text="good.amount"-->
                <!--:class="{active:good.amount>0}"-->
                <!--&gt;</label>-->
                <span @click.prevent="addAmount?addAmount(good,$event):showPropsMsg('amountBlur')"
                      class="icon iconfont icon-add"
                      :class="{active:true || good.productNum<good.propertyPurchasing}"
                ></span>
            </div>
            <span class="unit" v-text="good.stockUnit">---</span>
        </div>
    </section>
</template>

<script>
    import API from 'utils/API';
    import {mapGetters,mapActions} from 'vuex'
    import GoodLabels from 'components/utils/GoodLabels';

    export default {
        name: "GoodCard",
        data: () => {
            return {
                updatingProductAmount:false,//是否正在更新商品数量  避免重复提交
                timmer:null,
                shopCardActive:{
                    add:false,
                    decrease:false
                },
                focusValue:'',//
            }
        },
        props: ['good','submitId','canZero','collapse','hideOperation','preSale','preTimeSale','footerType'],//collapse 折叠 默认是false
        mounted: function () {
        },
        methods: {
            ...mapActions([
                'showMsg','setShopCart','setShopCartType'
            ]),
            getGoodMainImg(good){
                const mainImg = (good.pictureList||[]).filter(item => item.main);

                return mainImg.length?mainImg[0].pictureAddress : false
            },
            showPropsMsg(propsName){
                console.warn(`${propsName} has not passed in!`)
            },
            amountFocus(good,e){
                this.focusValue=good.productNum;
            },
            async addAmount(good,e){//新增数量  同时同步购物车信息
                const {
                    productNum=0,
                    propertyPurchasing=0
                }=good;

                // if((productNum*1)>=(propertyPurchasing*1)){
                //     this.showMsg({
                //         type:'error',
                //         content:'超出限量范围！'
                //     });
                //     return ;
                // }
                const targetValue=(good.productNum||0)+(good.step||1)
                await this.updateCartProductAmount(targetValue,good,good.productNum,'add');
                // this.$emit('add',good,e);



            },
            async decreaseAmount(good,e){//减少数量  同时同步购物车信息
                const {
                    productNum=0,
                    propertyPurchasing=0,
                    step=1
                }=good;

                if( (productNum<=step && !this.canZero) || productNum==0){
                    return ;
                }

                let targetValue=(good.productNum||0)-(good.step||1);
                targetValue=targetValue<0?0:targetValue

                await this.updateCartProductAmount(targetValue,good,good.productNum,'decrease');
                // this.$emit('decrease',good,e);
            },
            async amountBlur(good,e){//失去焦点

                const targetValue=e.target.value;
                const {
                    productNum=0,
                    step=1,
                    propertyPurchasing
                }=good;

                if( targetValue*1>=0){

                    const initValue=Math.floor((targetValue*1) / step);
                    const leftValue=(targetValue*1) % step;

                    let newValue=initValue*step +(leftValue==0?0:step);//新值等于取整后的值加上步长

                    if(targetValue*1<step && !this.canZero ){
                        newValue=step;
                    }

                    // if(targetValue*1>propertyPurchasing){//不能超过最大值
                    //     this.showMsg({
                    //         type:'error',
                    //         content:'超出限量范围！'
                    //     });
                    //     newValue=propertyPurchasing;
                    // }

                    console.log('newValue:',newValue,'targetValue:',targetValue,'initValue:',initValue,'leftValue:',leftValue,'productNum:',productNum);
                    await this.updateCartProductAmount(newValue,good,productNum);

                }
            },
            async updateCartProductAmount(productNum,good,changeType){

                if(this.updatingProductAmount){//加锁进行控制
                    return ;
                }


                this.updatingProductAmount=true;
                let updateResult=await API.post(API.updateCartProductAmount,{
                    productNum,
                    // cartId:this.template.cartId,//购物车id
                    productId:good[this.submitId||'productId'],
                    // recommendId:this.template.id,
                    shopId:this.shop.id
                },true);
                this.updatingProductAmount=false;



                const {
                    message,
                    code,
                    result,
                }=updateResult;


                if(code==1){//返回成功
                    good.productNum=productNum;
                    // this.$emit('amountChange',result || 0);
                    this.focusValue = productNum;

                    if(changeType=='add'){
                        this.add();
                        this.showTimeoutMsg({
                            type:'success',
                            content:'成功加入购物车！'
                        });
                    }else if(changeType=='decrease'){
                        this.decrease();
                    }
                    //获取购物车数量
                    this.getCartAmount();
                }else{
                    this.showMsg(message);
                    good.productNum=this.focusValue || good.productNum;
                }
            },
            async getCartAmount(){
                const shopCartAmount=await API.post(API.getCartAmount,{//获取购物车内商品数量
                    // id:this.cartId
                    shopId:this.shop.id,
                    // recommendId:this.template.id
                });

                this.setShopCart({
                    goodsAmount:shopCartAmount.result
                });
            },
            showTimeoutMsg(config={}){//显示成功的信息 只显示最后一次的信息
                this.timmer=window.setTimeout(()=>{
                    if(this.timmer){
                        window.clearTimeout(this.timmer);
                        this.timmer=null;
                    };

                    this.showMsg(config);
                },500);
            },
            inputWidth(val){
                return (val+'').length>5?'1.6rem':'1rem'
            },
            toggleShopCardStatus(type){
                this.setShopCartType({
                    ...this.shopCartType,
                    [type]:true
                });

                // this.shopCardActive[type]=true
                setTimeout(()=>{
                    // this.shopCardActive[type]=false

                    this.setShopCartType({
                        ...this.shopCartType,
                        [type]:false
                    });
                },400)
            },
            add(good,e){
                this.toggleShopCardStatus('add');
            },
            decrease(good,e){
                this.toggleShopCardStatus('decrease')
            },
        },
        computed: {
            ...mapGetters([
                'shop','template','shopCartType'
            ]),
        },
        components: {
            GoodLabels
        }
    }
</script>

<style lang="scss" scoped>
    .goodCard{//商品卡片
        @include box((p:0 0.2rem,d:flex));
        @include thin('bottom',$borderColor);
        position: relative;
        background-color: $white;
        .content{
            @include box((d:flex,w:6.5rem));
            /*flex:1;*/
            .good_img_area{
                $size:2rem;
                @include box((w:$size,h:$size,m:auto 0.2rem auto 0,ta:center,d:flex));
                @include thin(all,$border-color);
                overflow: hidden;
                align-items: center;
                img{
                    display: block;
                    margin:auto;
                    max-width: $size;
                    max-height:$size;
                }

                &.empty_img{
                    @include bg_img('../assets/img/empty_img.png')
                }
            }
            .good_msg_area{
                @include box((w:4.1rem));
                flex:1;
                h5{
                    @include box((lh:0.7rem,fs:0.3rem,c:#333,w:5rem));
                    font-weight: normal;
                    @include ellipsis();
                }
                .textIcon {
                    @include box((lh:0.3rem,d:inline-block,bdr:0.06rem,fs:0.2rem,c:$white,p:0 0.08rem));
                    vertical-align: middle;
                }
                .preSale{
                    @include box((bg:$blue2));
                }

                .normal{
                    @include box((lh:0.4rem,c:$black6,fs:0.26rem));
                    .price{
                        @include box((c:$primary));
                    }
                }
                .footer{
                    @include box((lh:0.8rem));
                    .amount{
                        @include box((c:$primary));
                    }
                }
            }
        }

        /*折叠状态的样式*/
        .simpleCard {
            @include box((d:flex,lh:1rem,w:100%));
            .name{
                @include box((w:4rem));
                @include ellipsis();
            }
            .amount_area{
                @include box((ta:right));
                flex:1;
                .amount{
                    @include box((c:$primary));
                }
            }
        }


        .numOperation{
            @include box((d:flex));
            @include position((p:absolute,r:0.1rem,b:0.1rem));
            .operWrap{
                $h:0.8rem;
                $opeH:0.6rem;
                @include box((d:flex,h:$h,lh:$h));
                vertical-align: middle;
                span{
                    @include box((w:$opeH,h:$opeH,lh:$opeH,ta:center,fs:0.4rem,d:block,c:$borderColor,bdr:50%,m:auto));
                    @include thin(all,$borderColor);
                    cursor:pointer;
                    &.active{
                        color: $primary;
                    }
                }
                label{
                    @include box((d:block,ta:center,p:0 0.15rem,c:$borderColor));
                    min-width: 0.8rem;
                    &.active{
                        color: $primary;
                    }
                }
                input{
                    @include box((w:1rem,ta:center,bdr:0,fs:0.28rem,c:$borderColor));
                    text-indent: 0.1rem;
                    &.active{
                        color: $primary;
                    }
                }
                .input{
                    @include box((w:1rem,ta:center,bdr:0,fs:0.28rem));
                    text-indent: 0.1rem;
                }
            }
            .unit{
                @include box((lh:0.8rem,m:0 0.1rem));
            }
        }
    }
</style>
