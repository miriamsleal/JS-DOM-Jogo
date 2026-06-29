# JS-DOM-Jogo

**Nome completo**: Míriam Souza Leal

**Mecânica escolhida e o tema do jogo**

Encontre o Diferente: encontre um alimento diferente representado pelos emojis.

**Briefing do cliente**

Criança de 6 anos
- Grade grande e fáceis de tocar
- Ritmo calmo 
- Cores fortes 
- Mensagens positivas 
- Sem penalidade por erro

**Regras do jogo**

- O jogador deve tocar na fruta que está diferente.
- A pontuação é atualizada a cada acerto.
- O jogo dura 60 segundos.

**Seu diferencial**

Sistema de Combo com Multiplicador
- 1 acerto seguido = 1x
- 2 acertos seguidos = 1.5x
- 3 ou + acertos seguidos = 2x

**Como jogar**

1. Abra a pagina principal no navegador.
2. Clique em Jogar agora.
3. Toque na fruta diferente.
4. Tente fazer o maior número de pontos antes do tempo acabar.
5. Pode salvar seu nome no rankingou jogar novamente.

**Como execultar**

clone o repositorio na sua maquina e abra o live serve na area de extensão abra "open", vai abrir uma nova janela, com isso pode iniciar o jogo.  

**Reflexão**

1. Qual foi o bug mais chato e como resolveu? 
O timer continuava contando depois de reiniciar o jogo, foi resolvido limpando o intervalo com `clearInterval` e usando a variável `jogoAtivo`.

2. Por que escolheu essa fórmula de pontuação?  
Simples de entender para crianças  o combo motiva o progresso, e tambem sem punir erros.

3. Como o briefing do cliente mudou suas decisões?  
Aumentei o tamanho das células, tirei penalidades, coloquei mensagens fofas e cores alegres.

4. Se tivesse mais uma semana, o que mudaria?  
Adicionaria niveis de dificuldade.

5. Aponte uma função que ficou boa e explique.  
A função `gerarGrade()` a mais importante para criação do layout, porque cria tudo com `createElement`. Com isso pode ter controle do jogo respeitando as restrições.

**Minhas Decisões**

1. Tamanho da grade: 4×4 (grandes para crianças).
2. Elementos: 15 frutas iguais + 1 diferente por rodada
3. Pontuação: 10 base + multiplicador de combo
4. Tempo: 60 segundos por partida
5. Dificuldade: Constante e fácil com o diferente visivel e brilho.
6. Término: Quando o tempo chega a zero.

**Créditos**

*Manipulação de DOM e criação de grades*
- https://www.youtube.com/watch?v=TBGEt_-rFSs
- https://webdesign.tutsplus.com/how-to-create-a-memory-game-with-vanilla-javascript--cms-108868t
- Jogo da Velha com JavaScript (https://www.youtube.com/watch?v=FrVrX87l1yQ)

*Sistema de ranking com localStorage*
- https://www.youtube.com/watch?v=PadfpqXwI2M
- https://gamedevjs.com/articles/using-local-storage-for-high-scores-and-game-progress/
- https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

*Desenvolvimento com Vanilla JS*
- https://developer.mozilla.org/pt-BR/docs/Web/JavaScript

**Licença do Projeto:** *MIT*
