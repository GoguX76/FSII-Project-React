import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Solo necesitas estos 3 estilos básicos
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperCarousel = () => {
  return (
    <div style={{ marginTop: "2rem", width: "90%", maxWidth: "800px" }}>
      <Swiper
        // Configuración súper básica (5 líneas)
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4000 }}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        // Estilos inline para mantenerlo simple
        style={{
          borderRadius: "15px",
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Los slides - súper fácil */}
        <SwiperSlide>
          <div
            style={{
              padding: "3rem 2rem",
              textAlign: "center",
              color: "white",
            }}
          >
            <h3
              style={{
                color: "#ff00ff",
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              Artistas Destacados
            </h3>
            <p>Descubre los mejores productores de Phonk del momento</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{
              padding: "3rem 2rem",
              textAlign: "center",
              color: "white",
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
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
