
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  // Guarda o texto que o utilizador está a escrever.
  const [input, setInput] = useState('');

  // Obtém as mensagens, a função de envio e o estado da conversa.
  const { messages, sendMessage, status, error } = useChat();

  // Identifica se a IA está a enviar ou a gerar uma resposta.
  const isLoading = status === 'submitted' || status === 'streaming';

  // Envia a mensagem e limpa o campo de escrita.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Impede o envio de mensagens vazias ou apenas com espaços.
    if (!input.trim() || isLoading) return;

    sendMessage({ text: input.trim() });
    setInput('');
  }

  return (
    <main className="min-h-dvh bg-zinc-100 p-3 sm:p-6">
      {/* Limita a largura do chat e ocupa a altura disponível. */}
      <section className="mx-auto flex h-[calc(100dvh-1.5rem)] max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg sm:h-[calc(100dvh-3rem)]">

        {/* Cabeçalho do chat. */}
        <header className="flex items-center gap-3 border-b border-zinc-200 bg-white px-5 py-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
            IA
          </div>

          <div>
            <h1 className="font-semibold text-zinc-900">
              Meu Chat com Gemini
            </h1>
            <p className="text-sm text-zinc-500">
              {isLoading ? 'A preparar uma resposta...' : 'Assistente de inteligência artificial'}
            </p>
          </div>
        </header>

        {/* Área de conversa: ocupa o espaço restante e permite scroll. */}
        <div className="flex-1 space-y-5 overflow-y-auto bg-zinc-50 px-4 py-6 sm:px-8">

          {/* Mensagem inicial apresentada quando a conversa está vazia. */}
          {messages.length === 0 && (
            <div className="flex min-h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                💬
              </div>

              <h2 className="text-lg font-semibold text-zinc-800">
                Olá! Vamos conversar?
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                Escreve uma pergunta no campo abaixo para receber uma
                resposta do Gemini.
              </p>
            </div>
          )}

          {/* Percorre todas as mensagens da conversa. */}
          {messages.map((message) => {
            // Distingue as mensagens do utilizador das respostas da IA.
            const isUser = message.role === 'user';

            return (
              <div
                key={message.id}
                className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* Cada mensagem tem a sua própria bolha visual. */}
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[80%] ${
                    isUser
                      ? 'rounded-br-sm bg-emerald-100 text-emerald-950'
                      : 'rounded-bl-sm border border-zinc-200 bg-white text-zinc-800'
                  }`}
                >
                  {/* Identifica quem enviou a mensagem. */}
                  <p
                    className={`mb-1 text-xs font-semibold ${
                      isUser ? 'text-emerald-800' : 'text-zinc-500'
                    }`}
                  >
                    {isUser ? 'Tu' : 'Gemini'}
                  </p>

                  {/* Renderiza as partes de texto da mensagem. */}
                  {message.parts.map((part, index) => {
                    if (part.type !== 'text') return null;

                    return (
                      <p
                        key={`${message.id}-${index}`}
                        className="whitespace-pre-wrap break-words text-sm leading-7 sm:text-base"
                      >
                        {part.text}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Indica visualmente que a IA está a gerar uma resposta. */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-500 shadow-sm">
                Gemini está a escrever...
              </div>
            </div>
          )}

          {/* Apresenta erros de comunicação, se existirem. */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              Não foi possível obter uma resposta. Verifica a ligação e tenta novamente.
            </div>
          )}
        </div>

        {/* Área de escrita separada da conversa. */}
        <footer className="border-t border-zinc-200 bg-white p-4 sm:p-5">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="Escreve a tua mensagem..."
              aria-label="Escreve a tua mensagem"
              className="min-w-0 flex-1 rounded-full border border-zinc-300 bg-zinc-50 px-5 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

            {/* O botão só fica disponível quando há texto para enviar. */}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
              aria-label="Enviar mensagem"
              title="Enviar mensagem"
            >
              {/* Seta de envio sem necessidade de uma biblioteca de ícones. */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
                aria-hidden="true"
              >
                <path
                  d="M22 2 11 13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m22 2-7 20-4-9-9-4 20-7Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          <p className="mt-3 text-center text-xs text-zinc-400">
            As respostas são geradas por IA e podem conter erros.
          </p>
        </footer>
      </section>
    </main>
  );
}
