import { useState } from "react";

function Home() {
    return (
        <div className="home-page">
            <h2>Home - Midnight Phonk</h2>
            <p>Está es la página principal</p>
            <div>
                <h3>Categorias de Música</h3>
                <ul>
                    <li><a href="#phonk-brazil">Phonk Brasileño</a></li>
                    <li><a href="#phonk-japan">Phonk Japones</a></li>
                    <li><a href="#phonk-russian">Phonk Ruso</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Home