---
meta:
  - name: description
    food: hello
  - name: keywords
    content: super duper SEO
---

{{ 1 +1 }}
{{ $page.frontmatter.meta.name }}

<div v-for="i in 5" v-text='i'></div>

<Btn label="确定" type="red"/>



<Toast :title="{text:'测试',back:'true'}" :show="true" cancelType='red'>
   <div>
        123123123123
   </div>
</Toast>

    
::: danger  错误
错误 
:::

``` js{1}
export default {//错误实例
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```


```
<h1>{{ page.food }}</h1>
```


| param     | required      | type  |
| --------- |:-------------:| -----:|
| name      | right-aligned | $1600 |
| age       | centered      |   $12 |
| zebra     | are neat      |    $1 |


[[toc]]
