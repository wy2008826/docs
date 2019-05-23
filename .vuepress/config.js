module.exports = {
    title: '古茗科技前端开发文档',
    description: '代码规范、自有组件调用',
    base: "/front-file/upload/docs-dist/",//为了适应ftp上传地址的变动
    host:'192.168.1.85',
    port:1111,//启动端口
    dest:'.vuepress/dist',//指定 vuepress build 的输出目录。无权限时候  修改 dist名称
    serviceWorker:true,//如果设置为 true，VuePress 将自动生成并注册一个 service worker ，这个 worker 将内容缓存以供离线使用（仅在生产环境中启用）。
    head: [//被注入页面 HTML <head> 额外的标签
        ['link', { rel: 'icon', href: '/img/a.jpg' }],
        // ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    themeConfig:{
        nav: [//头部导航栏配置
            { text: '主页', link: '/pages/index/' },
            { text: '博文',
                items: [
                    { text: 'Android', link: '/android/' },
                    { text: 'ios', link: '/ios/' },
                    { text: 'Web', link: '/web/' }
                ]
            },
            { text: '关于', link: '/about/' },
            // { text: 'Github', link: 'https://www.github.com/codeteenager' },
        ],
        sidebar: [
            // ['/index/','首页'],// [link,text]
            ['/pages/frontNewPerson/join','前端新人入职准备'],

            {
                title: 'C端组件库',
                collapsable: false,
                children: [
                    ['/pages/compsPageMD/Input','Input'],
                    ['/pages/compsPageMD/Toast','Toast'],
                    ['/pages/compsPageMD/Button','Button'],
                    ['/pages/compsPageMD/Others','.....'],
                ]
            },
            ['/pages/uiRule','ui规范约定'],
            ['/pages/gitBranchRule','特征分支命名规范'],
            ['/pages/css/nameRule','代码命名规范'],
            // {
            //     title: '命名规范',
            //     collapsable: false,
            //     children: [
            //         ['/css/nameRule','命名规范'],
            //         // ['/css/problem','常见问题'],
            //     ]
            // },
        ],
        sidebarDepth: 2,
        // lastUpdated: 'Last Updated',
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': '/',
                'components':'/components',
                'utils':'/utils',
            }
        }
    }
}
