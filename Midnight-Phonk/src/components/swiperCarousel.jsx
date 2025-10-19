import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import brazilVocalsImg from "../assets/images/brazil-vocals.png";
import phonkProducts from "../utils/Phonk-Catalog";

// Solo necesitas estos 3 estilos básicos
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/carousel.css";

const SwiperCarousel = () => {
  const event = new CustomEvent("navigateToPage", {
    detail: { page: "brazilianphonk" },
  });
  window.dispatchEvent(event);
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
            {/* Uso de la imagen brazil-vocals en el Carousel. */}
            <img
              src={brazilVocalsImg}
              alt="Brazil Vocals Volumen 1"
              style={{
                width: "100%",
                maxWith: "400px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            />
            <h3
              style={{
                color: "#ff00ff",
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              LO MÁS VENDIDO
            </h3>
            <p>
              Descubre lo que ofrece nuestro producto estrella en Midnight
              Phonk.
            </p>
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

        {/* NUEVO SLIDE: Producto ID 1 */}
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
              LO MÁS VENDIDO
            </h3>
            {/* Se llama a la imagen del Phonk-Catalog. */}
            <img
              src={phonkProducts[0].image}
              alt="Brazil Vocals Volumen 1"
              className="slides-images"
            />
            <p style={{ marginBottom: "1rem" }}>
              Descubre lo que ofrece nuestro producto estrella en Midnight Phonk
            </p>
            <p
              style={{
                color: "#00ff00",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            ></p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
