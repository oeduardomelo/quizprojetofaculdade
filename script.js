document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const resultadoDiv = document.getElementById('resultado-jogador');
    const rankingTableBody = document.querySelector('#ranking tbody');

    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            if (nome === "") {
                alert("Por favor, insira seu nome.");
                return;
            }

            let pontuacao = 0;
            for (let i = 1; i <= 10; i++) {
                const resposta = document.querySelector(`input[name="q${i}"]:checked`);
                if (resposta && resposta.value === "1") {
                    pontuacao++;
                }
            }

            const jogador = {
                nome: nome,
                pontuacao: pontuacao
            };

            let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
            ranking.push(jogador);

            ranking.sort((a, b) => b.pontuacao - a.pontuacao);

            if (ranking.length > 10) {
                ranking = ranking.slice(0, 10);
            }

            localStorage.setItem('ranking', JSON.stringify(ranking));

            localStorage.setItem('jogadorAtual', JSON.stringify(jogador));

            window.location.href = 'resultado.html';
        });
    }

    if (resultadoDiv) {
        const jogadorAtual = JSON.parse(localStorage.getItem('jogadorAtual'));
        const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

        if (jogadorAtual) {
            resultadoDiv.innerHTML = `<p>Parabéns, <strong>${jogadorAtual.nome}</strong>! Você acertou <strong>${jogadorAtual.pontuacao}</strong> de 10 perguntas.</p>`;
        }

        ranking.forEach((jogador, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${jogador.nome}</td>
                <td>${jogador.pontuacao}</td>
            `;
            rankingTableBody.appendChild(tr);
        });
    }
});

function voltar() {
    window.location.href = 'index.html';
}
