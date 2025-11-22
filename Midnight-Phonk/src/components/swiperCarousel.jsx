import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/carousel.css";

const SwiperCarousel = () => {
  return (
    <div style={{ marginTop: "2rem", width: "90%", maxWidth: "800px" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4000 }}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        style={{
          borderRadius: "15px",
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Fallback / Generic Slides */}
        <SwiperSlide>
          <div
            style={{
              padding: "3rem 2rem",
              textAlign: "center",
              color: "white",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <h3
              style={{
                color: "#ff00ff",
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              Beats Exclusivos
            </h3>
            <p>Los ritmos más oscuros y envolventes para tus noches</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{
              padding: "3rem 2rem",
              textAlign: "center",
              color: "white",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <h3
              style={{
                color: "#ff00ff",
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              Eventos Nocturnos
            </h3>
            <p>Únete a las sesiones más intensas de Phonk underground</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{
              padding: "3rem 2rem",
              textAlign: "center",
              color: "white",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <h3
              style={{
                color: "#00ff00",
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              Producción Premium
            </h3>
            <p>Samples y kits de la más alta calidad para tus tracks</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
