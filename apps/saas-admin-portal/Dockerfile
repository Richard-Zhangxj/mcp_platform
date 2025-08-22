# 使用官方 Node.js 运行时作为基础镜像
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json (如果存在)
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production && npm cache clean --force

# 复制项目文件
COPY . .

# 构建生产版本
RUN npm run build

# 使用 nginx 作为生产服务器
FROM nginx:alpine

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 删除 nginx 默认的 HTML 文件
RUN rm -rf /usr/share/nginx/html/*

# 从 builder 阶段复制构建的文件到 nginx HTML 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 3002

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
