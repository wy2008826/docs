<template>
    <ul class="ul">
        <li class="previewLi" v-for="img in imgLists">
            <img :src="img" alt="">
            <i class="close icon iconfont icon-close"
               @click="closeImg(img)"
            ></i>
        </li>
        <li class="addImgLi">
            <Uploader :max-size='maxSize && 1024*1024*maxSize || 1024*1024*defaultMaxSize'
                      :cameraOnly="!!cameraOnly"
                      class="uploader"
                      @oversize="oversize"
                      :afterRead="(file)=>getPhoto(file)"
                      :multiple="multiple"
            >
                <span class="add">+</span>
            </Uploader>
        </li>
    </ul>
</template>

<script>
    import API from 'utils/API';
    import {mapActions} from 'vuex';

    import Uploader from '@/components/Uploader/';

    export default {
        name: 'CardUploader',
        data() {
            return {
                defaultMaxSize:5,//默认上传文件最大为 5M
            }
        },
        props:['imgLists','onSuccess','onDelete','maxSize','cameraOnly','uploadUrl','multiple','fileName'],//imgLists 图片列表
        methods: {
            ...mapActions([
                'showMsg'
            ]),
            closeImg(imgOssUrl){
                this.onDelete && this.onDelete(imgOssUrl);
            },
            oversize(){
                this.showMsg(`上传文件大小最大为${this.maxSize || this.defaultMaxSize}M！`);
            },
            async getPhoto(fileObj){

                if(!fileObj.length){
                    fileObj=[fileObj]
                }

                //批量或者单个添加图片

                for(let i =0 ;i<fileObj.length;i++){
                    const fileParam=new FormData();
                    const file=fileObj[i].file;
                    fileParam.append(this.fileName || 'multipartFile', file, file.name);

                    let config = {
                        headers: {'Content-Type': 'multipart/form-data'}
                    };

                    //这里上传图片的接口地址和扣分项里面的一致么
                    let uploadResult=await API.uploadFile(this.uploadUrl,fileParam,false,config);
                    let imgOssUrl=uploadResult.result;
                    this.onSuccess && this.onSuccess(imgOssUrl);
                }

            }
        },
        watch: {
            show(n,old){
                this.showStatus = n
            }
        },
        components: {
            Uploader,
        }
    }
</script>

<style lang="scss" scoped>
    .ul{
        $size:1.5rem;
        @include box((m:0.2rem));
        li{
            @include box((d:block,w:$size,h:$size,lh:$size,ta:center,fl:left,m:0 0.2rem 0 0));
            @include thin(all,#d8d8d8);
        }
        &:after{
            content:'';
            width:100%;
            height:1px;
            display: table;
        }

        .previewLi{
            overflow: hidden;
            position: relative;
            img{
                min-width: 50%;
                min-height: 50%;
                max-width:$size ;
                max-height:$size ;
            }
            .close{
                @include box((d:block,w:0.4rem,h:0.4rem,fs:0.4rem,lh:0.2rem,c:red));
                @include position((p:absolute,t:0.2rem,r:0.1rem));
            }
        }

        .addImgLi{
            @include box((fs:0.6rem,c:#d8d8d8));
            border:1px dashed #d8d8d8;
            .van-uploader{
                width:100%;
            }
        }
    }
</style>
