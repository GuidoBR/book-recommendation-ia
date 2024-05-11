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
    <main>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Recomendação de livros</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Encontre seu próximo livro favorito</p>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
              id="message" 
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digite seus livros favoritos separados por vírgula"
              {...register('favoriteBooks')}
              />
              <br />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Buscar Recomendações</button>
          </form>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {recommendedBooks.map((book, index) => (
                <section key={index}>
                  <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                  </div>
                  {book}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.</dd>
                  </div>
                </section>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}