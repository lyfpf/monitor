#安装node
FROM node:carbon

# 创建 app 目录
WORKDIR /server

# 复制当前server文件 到 app文件
COPY /server /server

# 安装淘宝镜像
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

#安装依赖
RUN cnpm install

#需要开启的端口
EXPOSE 8585

#启动项目
CMD [ "npm", "run", "start" ]