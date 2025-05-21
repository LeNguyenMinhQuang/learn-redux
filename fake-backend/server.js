const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Đảm bảo bạn có file db.json
const middlewares = jsonServer.defaults();

const SERVER_PORT = 3000; // Cổng server sẽ chạy
const DELAY_TIMEOUT = 3000; // Đơn vị: milliseconds. Điều này có thể dùng để mô phỏng độ trễ mạng

// Sử dụng các middleware mặc định của json-server (logger, static, cors và no-cache)
server.use(middlewares);

// Cấu hình CORS tùy chỉnh
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Cho phép tất cả các origin truy cập
    res.header("Access-Control-Allow-Headers", "*"); // Cho phép tất cả các header
    next();
});

// Thêm độ trễ vào mọi phản hồi (nếu DELAY_TIMEOUT > 0)
server.use(function (req, res, next) {
    setTimeout(next, DELAY_TIMEOUT);
});

// Sử dụng router của json-server để phục vụ dữ liệu từ db.json
server.use(router);

// Khởi động server
server.listen(SERVER_PORT, () => {
    console.log(`JSON Server is running on http://localhost:${SERVER_PORT}`);
});
