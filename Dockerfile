# ==============================================================================
# DOCKERFILE CHO DỰ ÁN NEXT.JS "cinemafe"
# ==============================================================================
# --- DÀNH CHO NGƯỜI MỚI: ĐỌC PHẦN NÀY TRƯỚC ---
#
# 1. Image là gì?
#    - Image là "khuôn bánh": một gói đóng sẵn gồm code + Node.js + thư viện,
#      để tạo ra container. Image không chạy, nó chỉ nằm im.
#    - Bạn build image 1 lần bằng:  docker build -t cinemafe .
#
# 2. Container là gì?
#    - Container là "cái bánh" được đúc từ khuôn image, nó mới là thứ chạy thật.
#    - Bạn chạy container bằng:  docker run -p 3000:3000 cinemafe
#    - Lúc này app Next.js sẽ chạy ở http://localhost:3000
#
# 3. Multi-stage build là gì? (File này có 4 STAGE: base, deps, builder, runner)
#    - Mỗi dòng FROM là 1 "stage" (1 chặng).
#    - Ta dùng stage đầu để cài thư viện + build code,
#      stage cuối chỉ copy kết quả đã build xong -> image cuối rất NHẸ,
#      không chứa source code thừa, không chứa npm cache.
#    - Các stage trung gian sẽ bị bỏ đi, chỉ giữ stage cuối (runner).
#
# 4. Cách dùng file này:
#    - Build:  docker build -t cinemafe .
#    - Chạy:   docker run --rm -p 3000:3000 --env-file .env cinemafe
#    - Dừng:   bấm Ctrl+C trong terminal đang chạy container.
#
#    LƯU Ý về biến môi trường (theo docs self-hosting của Next.js):
#    - Biến có tiền tố NEXT_PUBLIC_* sẽ bị "đóng cứng" vào JS lúc BUILD.
#      => Muốn đổi giá trị NEXT_PUBLIC_* thì phải BUILD LẠI image.
#    - Biến không có NEXT_PUBLIC_* (chỉ dùng ở server) thì đọc lúc RUNTIME,
#      => Có thể đổi mỗi lần `docker run -e TEN_BIEN=giatri` mà không cần build lại.
#
# ==============================================================================


# ------------------------------------------------------------------------------
# STAGE 0: base — lớp nền dùng chung cho mọi stage sau
# ------------------------------------------------------------------------------
# FROM node:22-alpine
#   - Lấy image Node.js 22 bản alpine (bản Linux siêu nhẹ, ~100MB thay vì ~1GB).
#   - Dự án này đang dùng Node 22 (bạn kiểm tra bằng `node --version`),
#     Next.js 16 yêu cầu Node >= 20, nên dùng node:22-alpine là hợp lý.
# AS base
#   - Đặt tên cho stage này là "base" để các stage sau dùng lại bằng `FROM base`.
FROM node:22-alpine AS base


# ------------------------------------------------------------------------------
# STAGE 1: deps — chỉ để cài thư viện (node_modules)
# ------------------------------------------------------------------------------
# FROM base
#   - Bắt đầu từ image "base" ở trên, không tải lại Node từ mạng nữa.
FROM base AS deps

# RUN apk add --no-cache libc6-compat
#   - apk là trình cài phần mềm của Alpine Linux (giống apt trên Ubuntu).
#   - libc6-compat là thư viện hệ thống mà Next.js cần để tối ưu ảnh (sharp)
#     và một số package biên dịch sẵn. Thiếu dòng này hay bị lỗi trên Alpine.
#   - --no-cache nghĩa là không lưu cache tải về -> giữ image gọn nhẹ.
RUN apk add --no-cache libc6-compat

# WORKDIR /app
#   - Tạo thư mục /app bên trong image và "đứng" vào đó.
#   - Mọi lệnh COPY, RUN sau đó đều tính từ /app.
WORKDIR /app

# COPY package.json package-lock.json ./
#   - Chỉ copy 2 file khai báo thư viện vào trước (chưa copy source code).
#   - MẸO TỐI ƯU (Docker layer caching): Docker sẽ lưu kết quả từng dòng.
#     Nếu bạn chỉ sửa code mà không sửa package.json, lần build sau Docker
#     sẽ dùng lại lớp node_modules đã cài -> build nhanh hơn rất nhiều.
COPY package.json package-lock.json ./

# RUN npm ci
#   - Cài đúng 100% phiên bản ghi trong package-lock.json (sạch + ổn định).
#   - Khác `npm install`: `npm ci` xóa node_modules cũ rồi cài mới hoàn toàn,
#     phù hợp cho môi trường build tự động / Docker.
RUN npm ci


# ------------------------------------------------------------------------------
# STAGE 2: builder — copy code vào và build ra bản production
# ------------------------------------------------------------------------------
FROM base AS builder

# WORKDIR /app — đứng vào thư mục làm việc /app (giống stage deps).
WORKDIR /app

# COPY --from=deps /app/node_modules ./node_modules
#   - Lấy thư mục node_modules đã cài ở stage "deps" mang sang đây.
#   - --from=deps nghĩa là "copy từ stage deps, không phải từ máy của bạn".
#   - Nhờ vậy stage này không cần chạy `npm ci` lại.
COPY --from=deps /app/node_modules ./node_modules

# COPY . .
#   - Copy TOÀN BỘ source code từ máy bạn vào image (trừ những gì ghi
#     trong file .dockerignore như node_modules, .next, .git, .env...).
#   - Dấu chấm đầu là "máy bạn" (thư mục hiện tại), dấu chấm sau là "/app".
COPY . .

# ENV NEXT_TELEMETRY_DISABLED=1
#   - Tắt tính năng gửi dữ liệu thống kê ẩn danh về cho Vercel khi build.
#   - Không ảnh hưởng app, chỉ giúp build nhanh + đỡ spam mạng.
ENV NEXT_TELEMETRY_DISABLED=1

#Đoạn này là thêm cái cloudinary cho dự án, có thể là do dokerfile này được cấu hình để
#chặn .env
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

# RUN npm run build
#   - Chạy lệnh "build": "next build" trong package.json.
#   - Next.js sẽ biên dịch TypeScript + Tailwind + React thành file tối ưu
#     trong thư mục .next/, và vì ta đã bật `output: "standalone"` trong
#     next.config.ts nên nó còn tạo thêm thư mục `.next/standalone/`
#     chứa server gọn nhẹ (server.js) để chạy production.
RUN npm run build


# ------------------------------------------------------------------------------
# STAGE 3: runner — image CUỐI CÙNG, siêu nhẹ, dùng để chạy thật
# ------------------------------------------------------------------------------
# Đây là stage duy nhất được giữ lại khi bạn `docker build` xong.
# Mọi thứ ở stage deps/builder (source code, npm cache) đều bị bỏ.
FROM base AS runner

# WORKDIR /app — tạo thư mục làm việc cho lúc chạy.
WORKDIR /app

# ENV NODE_ENV=production
#   - Báo cho Next.js biết đang chạy production (chạy nhanh, không hiện
#     thông báo debug, dùng code đã tối ưu).
ENV NODE_ENV=production

# ENV NEXT_TELEMETRY_DISABLED=1
#   - Tắt telemetry luôn ở lúc chạy (giống lúc build ở trên).
ENV NEXT_TELEMETRY_DISABLED=1

# ENV PORT=3000
#   - App Next.js trong container sẽ lắng nghe ở cổng 3000.
#   - Khi chạy `docker run -p 3000:3000`, cổng 3000 của container
#     sẽ được nối ra cổng 3000 của máy bạn.
ENV PORT=3000

# ENV HOSTNAME="0.0.0.0"
#   - Bắt buộc phải là 0.0.0.0 trong Docker để app chấp nhận kết nối từ
#     bên ngoài container. Nếu để localhost/127.0.0.1 thì bạn sẽ không
#     mở được http://localhost:3000 từ máy thật.
ENV HOSTNAME="0.0.0.0"

# RUN addgroup ... && adduser ...
#   - Tạo user tên "nextjs" thuộc group "nodejs" với quyền thấp (không phải root).
#   - Vì sao? Chạy container bằng root rất nguy hiểm: nếu hacker hack được app,
#     họ sẽ có quyền root trong container. Chạy bằng user thường sẽ an toàn hơn.
#   - -S nghĩa là tạo system user/group (không cần mật khẩu, không có thư mục home).
#   - -u 1001 là ID của user, để khi mount volume không bị lỗi phân quyền.
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public
#   - Copy thư mục ảnh tĩnh / favicon (public/) từ stage builder sang.
#   - File tĩnh này server.js sẽ tự phục vụ.
COPY --from=builder /app/public ./public

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
#   - Copy TOÀN BỘ kết quả standalone (gồm server.js + node_modules gọn nhẹ)
#     vào thư mục hiện tại (/app).
#   - --chown=nextjs:nodejs: gán quyền sở hữu file cho user nextjs ta vừa tạo,
#     để lát nữa chạy bằng user nextjs không bị lỗi "permission denied".
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#   - File standalone ở trên CHƯA gồm file CSS/JS đã build (.next/static),
#     nên phải copy thêm dòng này thì giao diện mới hiện đúng (không bị trắng trang).
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs
#   - Từ đây trở đi mọi lệnh đều chạy bằng user "nextjs" (không phải root nữa).
USER nextjs

# EXPOSE 3000
#   - Thông báo "container này dùng cổng 3000". Lệnh này chỉ để ghi chú,
#     không tự mở cổng. Muốn mở thật vẫn phải `docker run -p 3000:3000`.
EXPOSE 3000

# CMD ["node", "server.js"]
#   - Lệnh khởi động container: chạy server production gọn nhẹ của Next.js.
#   - CMD khác RUN: RUN chạy lúc BUILD image, CMD chạy lúc RUN container.
#   - Dạng mảng ["node", "server.js"] là dạng chuẩn (exec form) để Docker
#     nhận được tín hiệu dừng (Ctrl+C / docker stop) và tắt server đúng cách.
CMD ["node", "server.js"]
