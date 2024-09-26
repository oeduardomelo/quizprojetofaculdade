// Função para calcular a pontuação e armazenar os resultados
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

            // Coletar respostas
            let pontuacao = 0;
            for (let i = 1; i <= 10; i++) {
                const resposta = document.querySelector(`input[name="q${i}"]:checked`);
                if (resposta && resposta.value === "1") {
                    pontuacao++;
                }
            }

            // Criar objeto do jogador
            const jogador = {
                nome: nome,
                pontuacao: pontuacao
            };

            // Armazenar no localStorage
            let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
            ranking.push(jogador);

            // Ordenar ranking (maior pontuação primeiro)
            ranking.sort((a, b) => b.pontuacao - a.pontuacao);

            // Limitar ranking aos 10 melhores
            if (ranking.length > 10) {
                ranking = ranking.slice(0, 10);
            }

            // Salvar novamente no localStorage
            localStorage.setItem('ranking', JSON.stringify(ranking));

            // Armazenar o jogador atual para exibir na página de resultados
            localStorage.setItem('jogadorAtual', JSON.stringify(jogador));

            // Redirecionar para a página de resultados
            window.location.href = 'resultado.html';
        });
    }

    // Se estiver na página de resultados
    if (resultadoDiv) {
        const jogadorAtual = JSON.parse(localStorage.getItem('jogadorAtual'));
        const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

        if (jogadorAtual) {
            resultadoDiv.innerHTML = `<p>Parabéns, <strong>${jogadorAtual.nome}</strong>! Você acertou <strong>${jogadorAtual.pontuacao}</strong> de 10 perguntas.</p>`;
        }

        // Preencher a tabela de ranking
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

// Função para voltar ao Quiz
function voltar() {
    window.location.href = 'index.html';
}