<template>
    <div :class="b()">
        <slot/>
        <input v-if="!cameraOnly"
                v-bind="$attrs"
                ref="input"
                type="file"
                :class="b('input')"
                :accept="accept"
                :disabled="disabled"
                @change="onChange"
        >
        <input  v-if="cameraOnly"
                v-bind="$attrs"
                ref="input"
                type="file"
                :class="b('input')"
                :accept="accept"
                :disabled="disabled"
                capture="camera"
                @change="onChange"
        >
    </div>
</template>

<script>
    import create from '../utils/create';

    export default create({
        name: 'uploader',

        inheritAttrs: false,

        props: {
            disabled: Boolean,
            cameraOnly:Boolean,
            beforeRead: Function,
            afterRead: Function,
            accept: {
                type: String,
                default: 'image/*'
            },
            resultType: {
                type: String,
                default: 'dataUrl'
            },
            maxSize: {
                type: Number,
                default: Number.MAX_VALUE
            }
        },

        methods: {
            onChange(event) {
                let {files} = event.target;
                if (this.disabled || !files.length) {
                    return;
                }

                files = files.length === 1 ? files[0] : [].slice.call(files, 0);
                if (!files || (this.beforeRead && !this.beforeRead(files))) {
                    return;
                }

                if (Array.isArray(files)) {
                    Promise.all(files.map(this.readFile)).then(contents => {
                        let oversize = false;
                        const payload = files.map((file, index) => {
                            if (file.size > this.maxSize) {
                                oversize = true;
                            }

                            return {
                                file: files[index],
                                content: contents[index]
                            };
                        });

                        this.onAfterRead(payload, oversize);
                    });
                } else {
                    this.readFile(files).then(content => {
                        this.onAfterRead(
                            {file: files, content},
                            files.size > this.maxSize
                        );
                    });
                }
            },

            readFile(file) {
                return new Promise(resolve => {
                    const reader = new FileReader();

                    reader.onload = event => {
                        resolve(event.target.result);
                    };

                    if (this.resultType === 'dataUrl') {
                        reader.readAsDataURL(file);
                    } else if (this.resultType === 'text') {
                        reader.readAsText(file);
                    }
                });
            },

            onAfterRead(files, oversize) {
                if (oversize) {
                    this.$emit('oversize', files);
                } else {
                    this.afterRead && this.afterRead(files);
                    this.$refs.input && (this.$refs.input.value = '');
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
    @import '../public/scss/iconfont/iconfont.css';
    @import '../public/scss/mixin.scss';
    @import '../public/scss/index.scss';

    .van-uploader {
        position: relative;
        display: inline-block;

        &__input {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        input[type="file"]::-webkit-file-upload-button {
            cursor: pointer;
        }
    }

</style>
