module.exports = {
    title: '古茗科技前端开发文档',
    description: '代码规范、自有组件调用',
    base: "/",
    host:'192.168.1.85',
    port:1111,//启动端口
    dest:'.vuepress/dist',//指定 vuepress build 的输出目录。
    serviceWorker:true,//如果设置为 true，VuePress 将自动生成并注册一个 service worker ，这个 worker 将内容缓存以供离线使用（仅在生产环境中启用）。
    head: [//被注入页面 HTML <head> 额外的标签
        ['link', { rel: 'icon', href: '/img/a.jpg' }],
        // ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    themeConfig:{
        nav: [//头部导航栏配置
            { text: '主页', link: '/index/' },
            { text: '博文',
                items: [
                    { text: 'Android', link: '/android/' },
                    { text: 'ios', link: '/ios/' },
                    { text: 'Web', link: '/web/' }
                ]
            },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://www.github.com/codeteenager' },
        ],
        sidebar: [
            ['/index/','首页'],// [link,text]
            {
                title: 'CSS',
                collapsable: false,
                children: [
                    ['/css/nameRule','命名规范'],
                    ['/css/components','组件'],
                    ['/css/problem','常见问题'],
                ]
            },
            // ['/css/','CSS规范'],
        ],
        sidebarDepth: 2,
        // lastUpdated: 'Last Updated',
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@components': '/components'
            }
        }
    }
}
