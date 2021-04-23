import React from "react";

export default function Footer() {
  return (
    <div className="footer__wrapper container-fluid mt-5">
      <div className="row">
        <div className="col-lg-4 my-3 px-5">
          <div className="footer__logo">
            <img
              src={require("./../../Assets/img/MIN-OP1.png").default}
              alt="Cybersoft logo"
            />
            <p>
              Cybersoft Academy - Hệ thống đào tạo lập trình chuyên sâu theo dự
              án thực tế
            </p>
          </div>
          <div className="footer__advertising my-5">
            <h2>NHẬN TIN SỰ KIỆN VÀ KHUYẾN MÃI</h2>
            <p>
              CyberSoft sẽ gửi các bạn khóa học trực tuyến và các chương trình
              CyberLive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp
              dẫn đến các bạn
            </p>
            <form className="form-inline">
              <div className="form-group w-75">
                <input
                  type="text"
                  name
                  id
                  className="form-control w-100 mr-3"
                  placeholder="your.address@email.com"
                  aria-describedby="helpId"
                />
              </div>
              <button type="button" className="button_advertising">
                ĐĂNG KÝ
              </button>
            </form>
          </div>
          <div className="footer__address">
            <p>
              <i class="fas fa-map-marker-alt mr-2"></i>
              <span> Cơ sở 1: 376 Võ Văn Tần - Quận 3</span>
            </p>
            <p>
              <i class="fas fa-map-marker-alt mr-2"></i>
              <span> Cơ sở 2: 459 Sư Vạn Hạnh - Quận 10</span>
            </p>
            <p>
              <i class="fas fa-map-marker-alt mr-2"></i>
              <span>Cơ sở 3: 82 Ung Văn Khiêm - Bình Thạnh</span>
            </p>
            <p>
              <i class="fas fa-map-marker-alt mr-2"></i>
              <span> Cơ sở 4: Quận Hải Châu - Đà Nẵng</span>
            </p>
            <p>
              <i class="fas fa-phone mr-2"></i>
              <span> 098.105.1014 - 098.407.5035</span>
            </p>
          </div>
        </div>
        <div className="col-lg-4 my-3 px-5">
          <div className="form-group">
            <label htmlFor>ĐĂNG KÝ TƯ VẤN</label>
            <input
              type="text"
              className="form-control mt-3"
              name
              id
              aria-describedby="helpId"
              placeholder="Họ và tên *"
            />
            <input
              type="text"
              className="form-control mt-3"
              name
              id
              aria-describedby="helpId"
              placeholder="Email liên hệ *"
            />
            <input
              type="text"
              className="form-control mt-3"
              name
              id
              aria-describedby="helpId"
              placeholder="Điện thoại liên hệ *"
            />
            <button className="form-control button_consult_register mt-3 w-50">
              ĐĂNG KÝ TƯ VẤN
            </button>
          </div>
          <div className="footer_seo_word">
            <span>Lập trình Front End </span>
            <span>Lập trình React JS</span>
            <span>Lập trình Angular</span>
            <span>Lập trình tư duy</span>
            <span>Lập trình NodeJS</span>
            <span>Lập trình Back End</span>
            <span>Lập trình Java Web</span>
            <span>Lập trình Java Spring - Java Boot</span>
            <span>Tôi đi code dạo</span>
            <span>Học SEO Hà Nội ở Vietmoz</span>
            <span>Học lập trình trực tuyến</span>
          </div>
        </div>
        <div className="col-lg-4 my-3 px-5">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flophocviet&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width={500}
            height={350}
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder={0}
            allowFullScreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
          <div className="footer_seo_word">
            <span>Anh ngữ giao tiếp</span>
            <span>Khởi động Anh ngữ giao tiếp</span>
            <span>Lấy đà Anh ngữ giao tiếp</span>
            <span>Bật nhảy Anh ngữ giao tiếp</span>
            <span>Tiếp đất</span>
          </div>
        </div>
      </div>
    </div>
  );
}
