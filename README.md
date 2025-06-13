# Mini Trello Clone

## Giới thiệu
Đây là một ứng dụng web mô phỏng Trello, cho phép người dùng đăng nhập, xác thực email, tạo bảng công việc (board), danh sách (list), thẻ (card), kéo thả thẻ giữa các danh sách, xem chi tiết thẻ, và lưu trữ dữ liệu trên Firebase Realtime Database.

## Công nghệ sử dụng
- ReactJS
- React Router DOM
- Firebase (Authentication, Realtime Database)
- Bootstrap 5
- @hello-pangea/dnd (kéo thả)

## Cài đặt và chạy thử
1. **Clone project:**
   ```bash
   git clone <repo-url>
   cd mini
   ```
2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```
3. **Chạy ứng dụng:**
   ```bash
   npm start
   ```
4. Truy cập [http://localhost:3000](http://localhost:3000)

## Cấu trúc thư mục
```
mini/
├── public/
├── src/
│   ├── App.js
│   ├── index.js
│   ├── assets/
│   │   └── firebase.js
│   └── Pages/
│       ├── LoginPage/
│       │   ├── LoginPage.jsx
│       │   └── LoginPage.css
│       ├── VerificationPage/
│       │   ├── VerificationPage.jsx
│       │   └── VerificationPage.css
│       ├── DashPage/
│       │   ├── DashPage.jsx
│       │   └── DashPage.css
│       └── CardDetailModal/
│           ├── CardDetailModal.jsx
│           └── CardDetailModal.css
├── package.json
└── README.md
```

## Mô tả các thành phần chính
### 1. Đăng nhập & Xác thực
- **LoginPage**: Nhập email, gửi link xác thực qua email bằng Firebase Authentication.
- **VerificationPage**: Nhập mã xác thực (giả lập), chuyển sang dashboard.

### 2. Dashboard (DashPage)
- Hiển thị các danh sách (list) và thẻ (card) dạng bảng Kanban.
- Thêm, xóa, chỉnh sửa danh sách và thẻ.
- Kéo thả thẻ giữa các danh sách.
- Dữ liệu realtime với Firebase Realtime Database.
- Nhấn vào thẻ để xem chi tiết (CardDetailModal).

### 3. Modal chi tiết thẻ (CardDetailModal)
- Hiển thị thông tin chi tiết thẻ: tên, mô tả, thành viên, hoạt động, power-ups (giả lập).
- Có thể đóng modal.

### 4. Kết nối Firebase
- File `src/ConnetFirebase/firebase.js` cấu hình và khởi tạo Firebase, export các đối tượng `db`, `realtimeDb`, `auth`.

## Scripts
- `npm start`: Chạy ứng dụng ở chế độ phát triển.
- `npm run build`: Build ứng dụng cho production.
- `npm test`: Chạy test.

## Ghi chú
- Ứng dụng chỉ là bản demo, chưa có phân quyền người dùng thực sự.
- Một số chức năng như mô tả thẻ, comment, power-ups chỉ là giao diện mẫu.

