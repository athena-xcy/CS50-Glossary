## 简介

术语表 API端

## 配置开发环境

1. 创建venv虚拟环境
2. 安装依赖包
3. 创建.env文件
4. 安装数据库
5. 启动flask

```
#... 创建venv虚拟环境: 略
pip install -r requirements.txt
sqlite3 dev.db # 然后输入.quit退出
DATABASE_URL=sqlite:///$(pwd)/dev.db
echo DATABASE_URL=$DATABASE_URL >.env
python manage.py db init
python manage.py db migrate
python manage.py db upgrade
python manage.py runserver
```
