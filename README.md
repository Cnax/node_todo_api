根据慕课网课程实现一个简单的使用node加mysql实现curd的demo

数据库创建

使用mysql数据库，sequelize， sequelize-cli 工具

1. 创建数据库
2. 使用 sequelize cli 初始化项目的配置信息
     npx sequelize init
3. 生成模型文件
    1. migrte 文件
    2. model 文件
      npx sequelize model:generate --name Todo --attributes name:string,deadline:date,content:string
4. 持久化模型对应的数据库表
     npx sequelize db:migrate
5. 向数据表中添加字段
     model 和 migrations 中都要添加字段，删除数据库中对应的数据表并清除sequelizemeta表中的js文件对应的name值，最后重新执行 npx sequelize db:migrate 命令



发布运维：

pm2

1. 安装pm2
     npm i pm2 -g
2. 修改 ecosystem.config.js 文件的参数
3. 运行 pm2 start ecosystem.config.js ， 启动服务
4. pm2 log 命令查看日志
5. pm2 restart [id] 重启服务