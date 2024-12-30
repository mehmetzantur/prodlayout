# Node.js base image
FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Kaynak kodları kopyala
COPY . .

# Build
RUN npm run build

# Uygulamayı çalıştır
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"] 