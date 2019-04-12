

<Page_Input />

#### 组件调用方式
----


``` js{100}
       // 普通文本输入
     <Input v-model="name" label="姓名" ph="请输入姓名" :required="true"/>
     
     // 非明文输入
     <Input v-model="password" label="密码" ph="请输入密码" type="password"/>
     
     //多行文本输入
     <Input v-model="note" label="备注" ph="请输入备注" inputType="textarea"/>
     
     //单选按钮
     <Input v-model="sex"
            label="性别"
            ph="请选择性别"
            inputType="radio"
            :selects="[{name:'男',id:'1'},{name:'女',id:'2'}]"
             itemKey="name"
             modelKey="id"
     />
    
    // 多选按钮
     <Input v-model="interest"
            label="爱好"
            ph="请选择爱好"
            inputType="checkbox"
            :selects="[{name:'篮球',id:'1'},{name:'足球',id:'2'},{name:'电影',id:'3'}]"
            itemKey="name"
            modelKey="id"
     />
    
    // 状态切换
    <Input v-model="sex"
           label="婚姻状态"
           ph="请选择婚姻状态"
           inputType="switch"
           :selects="[{name:'已婚',id:'1'},{name:'未婚',id:'2'}]"
           itemKey="name"
           modelKey="id"
    />
            
            
    // 单选下拉框
    <Input v-model="city"
           label="所在城市"
           ph="请选择所在城市"
           inputType="select"
           :selects="[{name:'杭州',id:'1'},{name:'南京',id:'2'},{name:'上海',id:'3'}]"
           itemKey="name"
           modelKey="id"
    />
    
    //多选下拉框
    <Input v-model="citys"
           label="所在城市多选"
           ph="请选择所在城市"
           inputType="select_multiple"
           :selects="[{name:'杭州',id:'1'},{name:'南京',id:'2'},{name:'上海',id:'3'}]"
           itemKey="name"
           modelKey="id"
    />
    
```




| param     | required      |  type      | 可选项       | 含义  |
| --------- |:-------------:|:----------:|:-----------:| -----:|
| v-model   |   true        |  String、Array     |             | 可多选的输入框：Array |
| label     |   false       | String     |             | 左侧文字描述 |
| ph        | false         | String     |             | input上的原生placoholder属性 |
| type      | false         | String     |   text <br/> tel <br/> number | input上的原生type属性 |
| inputType | false         | String     |   input <br/> textarea <br/> switch <br/> date <br/> radio <br/> checkbox <br/> select  <br/> select_multiple  | 输入框类型 |
| selects   | false         | Array      |               | 指定radio、checkbox、select的数据列表 |
| itemKey   | false         | String     |              | 指定radio、checkbox、select的展示字段 |
| modelKey  | false         | String     |              | 指定radio、checkbox、select的v-model回传字段 |
| required  | false         | Boolean    |              | 是否必填 |



