import React from "react";

export default function Carousel() {
  return (
    <div className="carousel">
      <div className="carousel__wrapper">
        <div id="future_links">
          <div className="radial" id="radial_ring_code"></div>
          <div className="radial" id="radial_frame"></div>
          <div className="radial" id="radial_ring_1"></div>
          <div className="radial" id="radial_ring_2"></div>
          <div className="radial" id="radial_ring_3"></div>
          <div className="radial" id="link_parent">
            <a href="/"></a>
          </div>
        </div>
        <div className="row w-100 carousel_content_wrapper">
          <div className="col-lg-7 col-sm-4"></div>
          <div className="col-lg-5 col-sm-8 col-12 carousel_content">
            <h1 className="carousel_content_header_1">KHỞI ĐẦU</h1>
            <h1 className="carousel_content_header_2">SỰ NGHIỆP</h1>
            <h1 className="carousel_content_header_3">CỦA BẠN</h1>
            <h3 className="carousel_content_text">
              Trở thành lập trình viên chuyên nghiệp tại CyberSoft
            </h3>
            <div className="d-flex mt-3 justify-content-center">
              <button className="carousel_content_button_1">
                Xem Khóa Học
              </button>
              <button className="carousel_content_button_2">Tư vấn học</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
