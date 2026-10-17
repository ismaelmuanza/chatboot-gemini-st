import { Suspense } from 'react';
import ChatClient from './chat-cliente';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ChatClient />
    </Suspense>
  );
}