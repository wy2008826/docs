

<Btn label="确定" type="primary"/> <br/>
<Btn label="确定" type="red"/> <br/>
<Btn label="确定" type="wait"/> <br/>
<Btn label="确定" type="disabled"/> <br/>
<Btn label="确定" type="blue"/> <br/>
<Btn label="确定" type="red-b"/> <br/>
<Btn label="确定" type="blue-b"/> <br/> 


``` vue{}
    <Btn label="确定" type="primary"/>
    <Btn label="确定" type="red"/>
    <Btn label="确定" type="wait"/>
    <Btn label="确定" type="disabled"/>
    <Btn label="确定" type="blue"/>
    <Btn label="确定" type="red-b"/>
    <Btn label="确定" type="blue-b"/>
```




| param     | required      |  type      | 可选项       | 含义  |
| --------- |:-------------:|:----------:|:-----------:| -----:|
| label     |   true        | String     |             | 按钮上的文字 |
| click     |   false       | Fun        |             | 点击按钮执行的回调函数 |
| href      | false         | String     |             | 当点击按钮需要跳转跳转页面时传入 |
| type      | false         | String     |   primary <br/> red <br/> wait <br/> disabled <br/> blue <br/> red-b <br/> blue-b   | 当点击按钮需要跳转跳转页面时传入 |


