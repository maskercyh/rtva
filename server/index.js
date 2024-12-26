// server.ts
import express from 'express';

const app = express();
const port = 5000;
var token = ""
// 示例的 API 路由
app.get('/api/posts', (req, res) => {

    res.json([
        { id: 1, title: 'Post 1', content: 'This is the first post.' },
        { id: 2, title: 'Post 2', content: 'This is the second post.' }
    ]);
});
app.post('/api/login/account', (req, res) => {
    res.status(200);
    token = 'mock_token_123456'
    res.json({
        data: {
            token: token,
        }, msg: '', code: 200
    },);
});
app.post('/api/user/logout', (req, res) => {
    res.status(200);
    res.json({
        data: {
        }, msg: '', code: 200
    },);
});
app.post('/api/user/info', (req, res) => {
    res.status(200);
    // const token = req.headers['authorization']
    // if (token != '12312') {
    //     res.status(401);
    // }
    res.json({
        data: {
            menuList: [
                {
                    "path": "/",
                    "label": "首页",
                    "labelEn": 'index',
                    "key": "index",
                    "icon": "SlackSquareOutlined",
                    "element": "index/index",
                },
                {
                    "label": "仪表盘",
                    "labelEn": 'dashboard',
                    "key": "dashboard",
                    "icon": "SlackSquareOutlined",
                    "path": "dashboard",
                    "element": "dashboard/index",
                },
                {
                    "label": "组件",
                    "key": "components",
                    "labelEn": 'components',
                    "icon": "SlackSquareOutlined",
                    "path": "components",
                    "children": [{
                        "label": "按钮",
                        "key": "button",
                        "labelEn": 'button',
                        "icon": "SlackSquareOutlined",
                        "path": "button",
                        "element": "components/basic/button",
                    },
                    {
                        "label": "chart",
                        "key": "chart",
                        "labelEn": 'chart',
                        "icon": "SlackSquareOutlined",
                        "path": "chart",
                        "element": "components/basic/chart",
                    }
                    ]
                },
                {
                    "label": "多级菜单",
                    "key": "menu",
                    "labelEn": 'menu',
                    "icon": "SlackSquareOutlined",
                    "path": "menu",
                    "children": [
                        {
                            "label": "二级菜单",
                            "key": "basic",
                            "labelEn": 'basic1',
                            "icon": "SlackSquareOutlined",
                            "path": 'basic',
                            "children": [
                                {
                                    "label": "三级菜单",
                                    "key": "menu1",
                                    "labelEn": 'menu1',
                                    "icon": "SlackSquareOutlined",
                                    "path": "menu1",
                                    "element": "components/basic/button",
                                },
                                {
                                    "label": "菜单",
                                    "key": "menu2",
                                    "labelEn": 'menu2',
                                    "icon": "SlackSquareOutlined",
                                    "path": "menu2",
                                    "element": "components/basic/chart",
                                }
                            ]
                        },
                    ],
                },

            ],
            user: {
                userName: '123'
            },
            permissions: [
                "/dashboard",
                "/demo",
                "/demo/copy",
                "/demo/editor",
                "/demo/wangEditor",
                "/demo/virtualScroll",
                "/demo/watermark",
                "/authority/user",
                "/authority/user/index",
                "/authority/user/create",
                "/authority/user/update",
                "/authority/user/view",
                "/authority/user/delete",
                "/authority/user/authority",
                "/authority/role",
                "/authority/role/index",
                "/authority/role/create",
                "/authority/role/update",
                "/authority/role/view",
                "/authority/role/delete",
                "/authority/menu",
                "/authority/menu/index",
                "/authority/menu/create",
                "/authority/menu/update",
                "/authority/menu/view",
                "/authority/menu/delete",
                "/content/article",
                "/content/article/index",
                "/content/article/create",
                "/content/article/update",
                "/content/article/view",
                "/content/article/delete"
            ],
        }, msg: '', code: 200
    },);
});

app.listen(port, () => {
    console.log(`API server is running at http://localhost:${port}`);
});
