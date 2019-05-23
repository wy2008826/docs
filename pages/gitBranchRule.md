

### 特征分支命名规范

::: tip
#### 格式：  [branch]-[开发者名字缩写]-[新分支功能描述]
:::

#### 例：小李和小明从dev分支拉取一个新分支作为特征分支进行新需求开发
* dev ：从dev分支拉取新分支
* xl-xm : 开发者小李和小明的名字缩写
* college ： 特征分支功能性描述
    
    
<br />

```js
    git checkout dev
    git checkout -b dev-xl-xm-college
```

<br />

### 分支合并注意事项

::: danger
* 1 在申请merge-request之前，需先将当前特征分支的源头分支合并到目前自有的特征分支，避免覆盖掉其他开发人员已经合并到dev上的其他功能代码
<br /><br />
* 2 如从 dev 分支拉取新特征分支 dev-xl-xm-college，在merge-request之前，先 dev => dev-xl-xm-college 进行分支合并，再发起 dev-xl-xm-college => dev 的merge-request
:::
