// src/pages/index.jsx
import { useEffect, useState } from "react";

export default function Index() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra token để xác định user đã login chưa
    const token = localStorage.getItem("token");
    if (token) {
      // TODO: Fetch user info từ backend nếu muốn
      setUser({
        name: "Nguyen Van A",
        avatar: "https://i.pravatar.cc/40",
      });
    }
  }, []);

  return (
    <div>
  

      <main style={{ padding: "20px", textAlign: "center" }}>
        <h1 style={{ fontSize: 32, marginBottom: 20 }}>Chào mừng đến MyEvent</h1>

        {!user ? (
          <p>
            Bạn chưa đăng nhập. Vui lòng <a href="/login">Login</a> hoặc{" "}
            <a href="/register">Register</a>
          </p>
        ) : (
          <p>
            Xin chào, <strong>{user.name}</strong>! Chúc bạn một ngày vui vẻ 🎉
          </p>
        )}

        {/* Thêm các phần nội dung chính */}
        <div style={{ marginTop: 40 }}>
          <h2>Sự kiện nổi bật</h2>
          <p>Danh sách sự kiện sẽ được hiển thị ở đây...</p>
        </div>
      </main>
    </div>
  );
}
