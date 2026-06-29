let pontuacao = 0;
let tempoRestante = 60;
let intervaloTimer = null;
let jogoAtivo = false;
let multiplicadorAtual = 1;
let acertosSeguidos = 0; 
let containerGrade = null;
let displayPontuacao = null;
let displayTimer = null;
let displayStatus = null;
let displayMultiplicador = null;

const frutas = ['🍎', '🍌', '🍇', '🍓', '🥝', '🍍', '🍊', '🍉'];

const mensagensAcerto = [
  "Você é rápido! ",
  "Ótimo trabalho! ",
  "Continue assim! ",
  "Mandou bem! "
];

function iniciarJogo() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
  document.getElementById('end-screen').style.display = 'none';

  pontuacao = 0;
  tempoRestante = 60;
  multiplicadorAtual = 1;
  acertosSeguidos = 0;
  jogoAtivo = true;

  containerGrade = document.getElementById('grid');
  displayPontuacao = document.getElementById('score-value');
  displayTimer = document.getElementById('timer-value');
  displayStatus = document.getElementById('status');
  displayMultiplicador = document.getElementById('multiplier-value');

  displayPontuacao.textContent = pontuacao;
  displayTimer.textContent = tempoRestante;
  displayMultiplicador.textContent = multiplicadorAtual + 'x';
  displayStatus.textContent = 'Toque na fruta que está diferente';

  iniciarTimer();

  gerarGrade();
}

function iniciarTimer() {
  if (intervaloTimer) {
    clearInterval(intervaloTimer);
  }

  intervaloTimer = setInterval(function() {
    if (!jogoAtivo) return;

    tempoRestante--;
    displayTimer.textContent = tempoRestante;

    if (tempoRestante <= 10) {
      displayTimer.style.color = '#DC3545';
      displayTimer.style.fontWeight = '800';
    }

    if (tempoRestante <= 0) {
      finalizarJogo();
    }
  }, 1000);
}

function gerarGrade() {
  containerGrade.innerHTML = '';

  const indicePrincipal = Math.floor(Math.random() * frutas.length);
  let indiceDiferente = Math.floor(Math.random() * frutas.length);
  while (indiceDiferente === indicePrincipal) {
    indiceDiferente = Math.floor(Math.random() * frutas.length);
  }

  const frutaPrincipal = frutas[indicePrincipal];
  const frutaDiferente = frutas[indiceDiferente];
  const posicaoDiferente = Math.floor(Math.random() * 16);

  for (let i = 0; i < 16; i++) {
    const celula = document.createElement('div');
    celula.className = 'cell';
    
    if (i === posicaoDiferente) {
      celula.textContent = frutaDiferente;
      celula.dataset.diferente = 'true';
      celula.style.background = '#FFF3CD';
      celula.style.border = '4px solid #FFD700';
    } else {
      celula.textContent = frutaPrincipal;
      celula.dataset.diferente = 'false';
    }

    celula.addEventListener('click', function() {
      tratarCliqueCelula(celula);
    });

    celula.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });

    containerGrade.appendChild(celula);
  }
}

function tratarCliqueCelula(celula) {
  if (!jogoAtivo) return;

  const ehDiferente = celula.dataset.diferente === 'true';

  if (ehDiferente) {
    const pontosGanhos = Math.floor(10 * multiplicadorAtual);
    pontuacao += pontosGanhos;

    acertosSeguidos++;
    if (acertosSeguidos >= 3) {
      multiplicadorAtual = 2;
    } else if (acertosSeguidos >= 2) {
      multiplicadorAtual = 1.5;
    } else {
      multiplicadorAtual = 1;
    }

    celula.classList.add('correct');
    displayStatus.textContent = mensagensAcerto[Math.floor(Math.random() * mensagensAcerto.length)];
    displayStatus.style.color = '#28A745';

    displayPontuacao.textContent = pontuacao;
    displayMultiplicador.textContent = multiplicadorAtual + 'x';

    setTimeout(function() {
      if (jogoAtivo) {
        displayStatus.textContent = 'Toque na fruta que está diferente';
        displayStatus.style.color = '#4ECDC4';
        gerarGrade();
      }
    }, 650);

  } else {
    celula.classList.add('wrong');
    
    acertosSeguidos = 0;
    multiplicadorAtual = 1;
    displayMultiplicador.textContent = multiplicadorAtual + 'x';

    displayStatus.textContent = 'Tente de novo';
    displayStatus.style.color = '#DC3545';

    setTimeout(function() {
      if (celula && celula.parentNode) {
        celula.classList.remove('wrong');
      }
      if (jogoAtivo) {
        displayStatus.textContent = 'Toque na fruta que está diferente';
        displayStatus.style.color = '#4ECDC4';
      }
    }, 800);
  }
}

function finalizarJogo() {
  jogoAtivo = false;
  clearInterval(intervaloTimer);

  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('end-screen').style.display = 'block';

  const finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = pontuacao;

  const nomeInput = document.getElementById('player-name');
  nomeInput.value = '';
  nomeInput.focus();

  if (containerGrade) {
    containerGrade.innerHTML = '';
  }

  mostrarRanking();
}

function salvarNoRanking() {
  const nomeInput = document.getElementById('player-name');
  let nome = nomeInput.value.trim();

  if (!nome) {
    nome = 'Anônimo';
  }

  let ranking = JSON.parse(localStorage.getItem('rankingEncontreDiferente')) || [];

  ranking.push({
    nome: nome,
    pontuacao: pontuacao,
    data: new Date().toLocaleDateString('pt-BR')
  });

  ranking.sort(function(a, b) {
    return b.pontuacao - a.pontuacao;
  });

  if (ranking.length > 5) {
    ranking = ranking.slice(0, 5);
  }

  localStorage.setItem('rankingEncontreDiferente', JSON.stringify(ranking));

  mostrarRanking();

  const btnSalvar = document.getElementById('btn-salvar');
  const textoOriginal = btnSalvar.textContent;
  btnSalvar.textContent = 'Salvo!';
  btnSalvar.disabled = true;

  setTimeout(function() {
    btnSalvar.textContent = textoOriginal;
    btnSalvar.disabled = false;
  }, 1800);
}

function mostrarRanking() {
  const rankingBody = document.getElementById('ranking-body');
  rankingBody.innerHTML = '';

  const ranking = JSON.parse(localStorage.getItem('rankingEncontreDiferente')) || [];

  if (ranking.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.textContent = 'Nenhum recorde';
    td.style.textAlign = 'center';
    td.style.padding = '20px';
    tr.appendChild(td);
    rankingBody.appendChild(tr);
    return;
  }

  ranking.forEach(function(item, index) {
    const tr = document.createElement('tr');

    const tdPos = document.createElement('td');
    tdPos.textContent = (index + 1) + 'º';
    tdPos.className = 'pos';
    tr.appendChild(tdPos);

    const tdNome = document.createElement('td');
    tdNome.textContent = item.nome;
    tr.appendChild(tdNome);

    const tdPontuacao = document.createElement('td');
    tdPontuacao.textContent = item.pontuacao + ' pts';
    tdPontuacao.style.fontWeight = 'bold';
    tdPontuacao.style.color = '#FF6B6B';
    tr.appendChild(tdPontuacao);

    const tdData = document.createElement('td');
    tdData.textContent = item.data || '-';
    tr.appendChild(tdData);

    rankingBody.appendChild(tr);
  });
}

function iniciarNovoJogo() {
  document.getElementById('end-screen').style.display = 'none';
  document.getElementById('start-screen').style.display = 'block';
  document.getElementById('game-screen').style.display = 'none';

  if (displayTimer) {
    displayTimer.style.color = '';
    displayTimer.style.fontWeight = '';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const btnJogar = document.getElementById('btn-jogar');
  btnJogar.addEventListener('click', iniciarJogo);

  const btnNovoJogo = document.getElementById('btn-novo-jogo');
  btnNovoJogo.addEventListener('click', iniciarNovoJogo);

  const btnSalvar = document.getElementById('btn-salvar');
  btnSalvar.addEventListener('click', salvarNoRanking);

  const nomeInput = document.getElementById('player-name');
  nomeInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      salvarNoRanking();
    }
  });

});