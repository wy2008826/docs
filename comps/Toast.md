
<Page_Toast/>

----

``` js{100}
    import Toast from 'components/Toast'
    
    
     <Toast :show="show"
            :title="{back:true,text:'返回'}"
            cancelText="取消" >
        <div class="toast-slot-content">
            自定义内容
        </div>
    <Toast>
    
    
    <style lang="scss" scoped>
        //自定义内容样式控制
        .toast-slot-content{
            @include box((p:0.2rem,h:3rem,c:$red));
        }
    </style>

    
```



| param     | required      |  type      | 可选项       | 含义  |
| --------- |:-------------:|:----------:|:-----------:| -----:|
| title     |   false       | Object {back:boolean,text:String}   |         | back:是否显示头部的返回箭头 text:头部左侧文字 <br/> title不传则不展示头部区域|
| cancelText|   false       | String        |             | 底部取消按钮的文字 |
| onlyslot  | false         | Boolean     |             | 为true时: 内容是否完全由默认slot控制 不展示头部和底部区域 |


