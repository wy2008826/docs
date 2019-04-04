<template>
    <div class="progress-container">
        <div class="title">
            <p>{{progress}}%</p>
            <p v-text="title"></p>
        </div>
        <svg :width=remWidth :height=remHight class='svg'>
                <circle :cx=originX :cy=originY :r=radius stroke="#dcdcdc" :stroke-width=remStrokeWidth fill="none" />
                <circle :cx=originX :cy=originY :r=radius stroke="#53d74c" :stroke-width=remStrokeWidth fill="none" :stroke-dasharray='dashArrayWidth.end'>
                    <animate attributeName="stroke-dasharray" :from="dashArrayWidth.start" :to="dashArrayWidth.end" dur="1s"/>
                    <animate attributeName="stroke" from="#ff0000" to="#53d74c" dur="1s" />
                </circle>
            </svg>
    </div>
</template>

<script>
    import API from 'utils/API';
    import {mapGetters,mapActions} from 'vuex'

    export default {
        name: "ProgressBar",
        props:['title','progress','width','height'],
        computed: {
            dashArrayWidth: function () {
                var line = 2 * Math.PI * this.radius
                return {
                    start: '0,' + line,
                    end: line * (this.progress / 100) + ',' + line * ((100 - this.progress) / 100)
                }
            },
            remWidth() {
                return this.width * window.devicePixelRatio / 2
            },
            remHight() {
                return this.height * window.devicePixelRatio / 2
            },
            remStrokeWidth() {
                return 6 * window.devicePixelRatio / 2
            },
            originX() {
                return this.remWidth / 2
            },
            originY() {
                return this.remHight / 2
            },
            radius() {
                return this.remWidth * 0.4
            }
        },
    }
</script>

<style lang="scss" scoped>
    .progress-container {
        display: inline-block;
        position: relative;
    }
    .svg { 
        transform: rotate(-90deg);
    }
    .title {
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
    }
</style>
