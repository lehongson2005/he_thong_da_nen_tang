# frontend-event/Dockerfile

# Sử dụng Node.js bản nhẹ (alpine)
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package để cài thư viện trước (tận dụng cache của Docker)
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ code còn lại
COPY . .

# Mở port 5173 (Port mặc định của Vite)
EXPOSE 5173

# Chạy server dev với host 0.0.0.0 để máy ngoài truy cập được
CMD ["npm", "run", "dev", "--", "--host"]