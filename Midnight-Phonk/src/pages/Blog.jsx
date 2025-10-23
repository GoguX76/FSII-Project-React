import React from "react";
import PageWrapper from "../components/PageWrapper";

const Blog = () => (
  <PageWrapper title="Blog">
    <p className="text-lg">
      Aquí te traemos las mejores y más importantes noticias de nuestra
      comunidad y mundo Phonk
    </p>
    <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg">
      Donar Ahora
    </button>
  </PageWrapper>
);

export default Blog;
