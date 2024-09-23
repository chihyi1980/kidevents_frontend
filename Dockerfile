# 使用官方的 Node.js 镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json (如果有的话)
COPY package.json package-lock.json* ./

# 安装依赖
RUN npm install

# 复制项目的所有文件
COPY . .

# 设置环境变量为生产模式
ENV NODE_ENV=production

# 构建生产版本
RUN npm run build

# 確保顯示 production
RUN echo $NODE_ENV   

# 暴露端口
EXPOSE 3000

# 使用 serve 提供静态文件（而不是 react-scripts 开发服务器）
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
