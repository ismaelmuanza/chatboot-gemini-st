import { Suspense } from 'react';
import Chat from './chat/page';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Chat />
    </Suspense>
  );
}