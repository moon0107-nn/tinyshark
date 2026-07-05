/**
 * GEARVERSE ADMIN SKELETON CONTROLLER
 * Xử lý cơ chế đóng mở Tab UI (Single Page Application) độc lập.
 */

// 1. Hàm cốt lõi đổi Tab quản lý - Bao gồm kiểm tra rà soát phần tử tránh crash code
function switchTab(tabId) {
  // Tìm tất cả các vùng nội dung quản lý và ẩn đi
  const contentTabs = document.querySelectorAll(".tab-content");
  contentTabs.forEach((tab) => {
    tab.classList.add("hidden");
  });

  // Hiển thị chuẩn xác Tab được chỉ định
  const targetTab = document.getElementById("tab-" + tabId);
  if (targetTab) {
    targetTab.classList.remove("hidden");
  } else {
    console.error(`Không tìm thấy thẻ section có ID: tab-${tabId}`);
  }

  // Đổi trạng thái hiển thị sáng tối trên thanh Sidebar trái
  const sidebarButtons = document.querySelectorAll(".sidebar-btn");
  sidebarButtons.forEach((btn) => {
    btn.classList.remove("sidebar-active");
  });

  const targetButton = document.getElementById("btn-" + tabId);
  if (targetButton) {
    targetButton.classList.add("sidebar-active");
  }

  // Tự động đồng bộ tiêu đề Header theo trang tương ứng
  const pageTitle = document.getElementById("page-title");
  if (pageTitle) {
    const titleMapping = {
      dashboard: "Tổng quan hệ thống",
      products: "Quản lý sản phẩm",
      categories: "Quản lý danh mục",
      orders: "Quản lý đơn hàng",
      customers: "Quản lý khách hàng",
      reports: "Quản lý báo cáo doanh thu",
    };
    pageTitle.innerText = titleMapping[tabId] || "Hệ thống quản trị";
  }
}

// 2. Logic đóng mở hộp thoại Modal Sản phẩm
function openProductModal() {
  const modal = document.getElementById("product-modal");
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeProductModal() {
  const modal = document.getElementById("product-modal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

// Khởi tạo chạy mặc định tab Dashboard khi load trang xong
document.addEventListener("DOMContentLoaded", () => {
  switchTab("dashboard");
});
