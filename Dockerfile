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

# 设置环境变量为 production，确保使用 .env.production 文件
ENV NODE_ENV=production

# 构建 Next.js 项目
RUN npm run build

# 设置环境变量，Next.js 默认运行在 3000 端口
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["npm", "run", "start"]
