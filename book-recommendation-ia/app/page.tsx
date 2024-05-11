"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const onSubmit = (data) => {
    // Lógica para buscar recomendações de livros com base nos livros favoritos do usuário.
    // Substitua este exemplo com sua lógica real.
    const recommendations = getRecommendations(data.favoriteBooks);
    setRecommendedBooks(recommendations);
  };

  // Função de exemplo para simular recomendações
  const getRecommendations = (favoriteBooks) => {
    const mockRecommendations = [
      'O Senhor dos Anéis',
      'Harry Potter',
      '1984',
      'O Pequeno Príncipe',
      'Dom Quixote',
    ];
    return mockRecommendations.slice(0, 5);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <img src="/books.jpg" alt="Livros" className="hero-image" />
        <h1>Encontre seu próximo livro favorito</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Digite seus livros favoritos separados por vírgula"
            {...register('favoriteBooks')}
          />
          <button type="submit">Buscar Recomendações</button>
        </form>

        <h2>Recomendações:</h2>
          {recommendedBooks.map((book, index) => (

          <div key={index} className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/books.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
            <p>{book}</p>
          </div>
          ))}
      </div>
    </main>
  );
}