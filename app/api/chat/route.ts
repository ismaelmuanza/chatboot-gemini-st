import { google } from '@ai-sdk/google';
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();
    
    const result = streamText({
        model: google('gemini-3-flash-preview'),
        messages: await convertToModelMessages(messages),
        system: `
    Responde sempre em português, preferencialmente português de Angola.
    Usa uma linguagem clara, natural e directa.
    Mesmo que o utilizador escreva noutra língua, responde em português,
    excepto quando ele pedir explicitamente outra língua.
    Não use gírias desnecessariamente, use um vocabulário leve mas não seja muito informal.
    Fale somente de 3 assuntos, "1 - Como ganhar dinheiro na internet, 
    2 - Estratégias de marketing Digital, 3 - Como melhorar aplicações web com uso de IA e 
    4 - Animes. 
    Caso pergunte coisas não relacionadas a estes assuntos, de forma gentil e delicada, diz que
    está limitada a falar apenas de assuntos específicos e cite eles excepto animes.
    Só fale de animes e mangas se a pessoa perguntar diretamente e diga que é o único assunto
    a parte dos 3 primeiros que consegues falar.
  `,

  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
