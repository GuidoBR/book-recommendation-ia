"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldValues} from 'react-hook-form';
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

type FormValues = {
  favoriteBooks: string
}

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [recommendedBooks, setRecommendedBooks] = useState([] as { index: number, title: string, author: string, image: string, description: string }[]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => ( runGenAi(data.favoriteBooks) )
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const prompt = `Aja como um livreiro. Sugira livros do grupo Companhia das Letras que sejam similares aos livros que o leitor gosta.

    Leitor: Rápido e Devagar
    Livreiro: 
    - "Nudge" por Richard H. Thaler e Cass R. Sunstein
    - "Viver com Risco" por Alison Schrager
    - "Preparados para o Risco" por Gerd Gigerenzer
    
    Leitor: Os três mosqueteiros
    Livreiro:
    
    Retorne com um json no seguinte formato:
    
    {
     [
       {"index": 0, "title": "titulo do livro", "author": "nome dos autores separados por virgula", "image": "url para imagem da capa do livro", "description": "descricao do livro explicando porque foi recomendado"}
     ]
    }`

    const exampleResponse = `[
      {
        "index": 0,
        "title": "O Conde de Monte Cristo",
        "author": "Alexandre Dumas",
        "image": "https://www.companhiadasletras.com.br/static/images/livros/o_conde_de_monte_cristo_9788535917872_m.jpg",
        "description": "Assim como \\"Os Três Mosqueteiros\\", este clássico de Alexandre Dumas é uma aventura emocionante repleta de ação, intrigas, romance e vingança. Uma história envolvente com personagens cativantes, ideal para quem aprecia o estilo de Dumas."
      },
      {
        "index": 1,
        "title": "Vinte Anos Depois",
        "author": "Alexandre Dumas",
        "image": "https://www.companhiadasletras.com.br/static/images/livros/vinte_anos_depois_9788535932905_m.jpg",
        "description": "A continuação da história de \\"Os Três Mosqueteiros\\", este livro traz de volta D'Artagnan e seus companheiros em novas aventuras. Se você gostou da camaradagem, bravura e espírito aventureiro dos mosqueteiros, vai adorar reencontrá-los neste romance."
      },
      {
        "index": 2,
        "title": "O Homem da Máscara de Ferro",
        "author": "Alexandre Dumas",
        "image": "https://www.companhiadasletras.com.br/static/images/livros/o_homem_da_mascara_de_ferro_9788535931724_m.jpg",
        "description": "Outro clássico de Dumas que se passa no mesmo universo dos mosqueteiros. Uma história envolvente de mistério e intriga com personagens memoráveis, ideal para quem aprecia a escrita de Dumas e as aventuras dos mosqueteiros."
      },
      {
        "index": 3,
        "title": "Ivanhoé",
        "author": "Walter Scott",
        "image": "https://www.companhiadasletras.com.br/static/images/livros/ivanhoe_9788535903655_m.jpg",
        "description": "Um clássico da literatura medieval inglesa que, assim como \\"Os Três Mosqueteiros\\", apresenta duelos de espadas, romance e intrigas políticas. Se você gostou da atmosfera histórica e da ação em \\"Os Três Mosqueteiros\\", vai se encantar com \\"Ivanhoé\\"."
      },
      {
        "index": 4,
        "title": "Rob Roy",
        "author": "Walter Scott",
        "image": "https://www.companhiadasletras.com.br/static/images/livros/rob_roy_9788535926485_m.jpg",
        "description": "Outra aventura histórica de Walter Scott ambientada na Escócia, com personagens cativantes e muita ação. Se você aprecia o estilo de escrita de \\"Os Três Mosqueteiros\\" e a atmosfera histórica, vai gostar deste livro."
      }
    ]`

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
        {
          role: "model",
          parts: [{ text: exampleResponse }],
        },
      ]
    })


  async function runGenAi(input: string) {
    const result = await chat.sendMessage(input);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    setRecommendedBooks(JSON.parse(text));
  }

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
              {recommendedBooks.map((book) => (
                <section key={book.index}>
                  <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                  </div>
                  {book.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{book.description}</dd>
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