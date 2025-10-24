const filmes = [
    {
        id: "1",
        titulo: "Retrato de uma Jovem em Chamas",
        poster: "images/jovememchamas.jpg.avif",
        diretor: "Diretora: Céline Sciamma",
        anolancamento: "Ano de Lançamento: 2019",
        descricao: "Marianne é uma jovem pintora na França do século 18, com a tarefa de pintar um retrato de Héloïse para seu casamento, sem que ela saiba. Passando seus dias observando Héloïse e as noites pintando, Marianne se vê cada vez mais próxima de sua modelo.",
        avaliacao: 4
    },
    {
        id: "2",
        titulo: "O Iluminado",
        poster: "images/iluminado.png",
        diretor: "Diretor: Stanley Kubrick",
        anolancamento: "Ano de Lançamento: 1980",
        descricao: "Jack Torrance se torna caseiro de inverno do isolado Hotel Overlook, nas montanhas do Colorado, na esperança de curar seu bloqueio de escritor. Ele se instala com a esposa Wendy e o filho Danny, que é atormentando por premonições. Jack não consegue escrever e as visões de Danny se tornam mais perturbadoras. O escritor descobre os segredos sombrios do hotel e começa a se transformar em um maníaco homicida, aterrorizando sua família.",
        avaliacao: 5
    },
    {
        id: "3",
        titulo: "Cisne Negro",
        poster: "images/blackswan.jpg.jpg",
        diretor: "Diretor: Darren Aronofsky",
        anolancamento: "Ano de Lançamento: 2010",
        descricao: "O enredo gira em torno de uma produção de O Lago dos Cisnes de Tchaikovsky pela companhia do New York City Ballet . A produção requer uma bailarina para interpretar o inocente e frágil Cisne Branco, para o qual a dançarina comprometida Nina Sayers (Portman) é uma escolha perfeita, bem como o sombrio e sensual Cisne Negro, qualidades melhor incorporadas pela nova rival Lily (Kunis). Nina é dominada por um sentimento de imensa pressão quando se vê competindo pelo papel, fazendo com que ela perca seu tênue controle da realidade e mergulhe na loucura.",
        avaliacao: 4
    },
    {
        id: "4",
        titulo: "Que Horas Ela Volta?",
        poster: "images/Que_horas_ela_volta_ver3_xlg.jpg",
        diretor: "Diretora: Anna Muylaert",
        anolancamento: "Ano de Lançamento: 2015",
        descricao: "Val deixa a filha, Jéssica, no interior de Pernambuco e passa os 13 anos seguintes trabalhando como babá do menino Fabinho em São Paulo. Ela consegue estabilidade financeira, mas convive com a culpa por não ter criado sua filha. Às vésperas do vestibular de Fabinho, Jéssica decide ir para São Paulo e fazer a prova também. Val recebe o apoio de seus patrões para receber a garota, mas a convivência com é difícil. Dividida, ela precisa achar um novo modo de seguir sua vida.",
        avaliacao: 4
    },
    {
        id: "5",
        titulo: "Pretty Woman",
        poster: "images/prettywoman.jpg",
        diretor: "Diretor: Garry Marshall",
        anolancamento: "Ano de Lançamento: 1990",
        descricao: "A história de Pretty Woman se concentra na prostituta de Hollywood e de pouca sorte Vivian Ward que é contratada por um rico empresário, Edward Lewis, para ser sua acompanhante para várias funções empresariais e sociais, e sua relação em desenvolvimento ao longo da estadia de uma semana de Vivian com ele.",
        avaliacao: 4
    },
    {
        id: "6",
        titulo: "Brilho Eterno de uma Mente Sem Lembranças",
        poster: "images/brilhoeterno.jpg",
        diretor: "Diretor: Michel Gondry",
        anolancamento: "Ano de Lançamento: 2004",
        descricao: "Como qualquer outro dia de sua vida, Joel acorda e vai para o trabalho. Mas ele não quer que este seja um outro dia qualquer em sua vida, por isso decide fazer algo inusitado. Pega outro trem e vai para uma praia, onde acaba conhecendo a bela Clementine. É amor à primeira vista. Mas o mais estranho é que na segunda vez que eles se encontram, ela simplesmente não o reconhece, age como se nunca o tivesse visto. É então que Joel descobre que sua amada utilizou os serviços da Lacuna Inc., uma empresa especializada em apagar certas lembranças da memória de seus clientes. Clementine literalmente deletou Joel de sua vida. Mas ele não vai deixar assim. Agora é a sua vez de se vingar e vai apagar de vez a moça de seu cérebro. Será isso possível?",
        avaliacao: 4
    },
    {
        id: "7",
        titulo: "Conto da Princesa Kaguya",
        poster: "images/kaguya.jpg",
        diretor: "Diretor: Isao Takahata",
        anolancamento: "Ano de Lançamento: 2013",
        descricao: "O enredo do longa-metragem começa quando a personagem principal, Kaguya (Aki Asakura), é encontrada ainda bebê dentro de um tronco de bambu. E ao passar dos anos, ela se torna uma bela jovem e passa a ser cobiçada por cinco nobres, dentre eles o imperador do Japão, mas nenhum dos pretendentes agrada a jovem e a mesma pede presentes quase impossíveis para evitar um matrimônio com um estranho. Ao final, Kaguya enfrentará as consequências por suas escolhas.",
        avaliacao: 4
    },
    {
        id: "8",
        titulo: "A Substância",
        poster: "images/asubstanci.jpg.jpg",
        diretor: "Diretora: Coralie Fargeat",
        anolancamento: "Ano de Lançamento: 2024",
        descricao: "Elisabeth Sparkle, renomada por um programa de aeróbica, enfrenta um golpe devastador quando seu chefe a demite. Em meio ao seu desespero, um laboratório lhe oferece uma substância que promete transformá-la em uma versão aprimorada.",
        avaliacao: 4
    }
];

function getUsuario() {
    // Only trust server-provided currentUser for authentication.
    if (typeof window !== 'undefined' && window.currentUser) return window.currentUser;
    return 'Convidado';
}

function getChaveFilmesUsuario() {
    return `filmesAssistidos_${getUsuario()}`;
}

// Simple HTML escape to prevent injection when rendering stored comments
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Note: Server-side PHP sessions now control login state. The client-side
// localStorage-based login and navbar toggling were removed so form submission
// and PHP session handling operate without interference.

// lógica de perfil page
function atualizarPerfil() {
    const profileUsername = document.getElementById('profile-username');
    const profileInfo = document.getElementById('profile-info');
    if (!profileUsername || !profileInfo) return;
    const usuario = getUsuario();
    profileUsername.textContent = usuario;
    const filmesAssistidos = JSON.parse(localStorage.getItem(getChaveFilmesUsuario())) || [];
    let html = '<h4>Filmes Assistidos:</h4>';
    if (filmesAssistidos.length === 0) {
        html += '<p>Nenhum filme adicionado ainda.</p>';
    } else {
        html += '<div class="profile-movies">';
        filmesAssistidos.forEach((f, idx) => {
            // try to find poster by searching filmes array
            const found = filmes.find(x => x.titulo === f.titulo) || {};
            const poster = found.poster || 'images/jovememchamas.jpg.avif';
            const rating = f.ranking || 0;
            html += `
                <div class="movie-card" style="display:flex;gap:1rem;align-items:center;">
                    <img src="${poster}" alt="${f.titulo}" style="width:80px;height:120px;object-fit:cover;border-radius:6px;" />
                    <div style="flex:1;">
                        <strong>${f.titulo}</strong>
                        <div class="star-rating" data-idx="${idx}">
                            ${[1,2,3,4,5].map(i => `<span class="star ${i<=rating? 'filled':''}" data-star="${i}">&#9733;</span>`).join('')}
                        </div>
                        <div style="margin-top:0.5rem;display:flex;gap:0.5rem;align-items:center;">
                            <button class="remover-btn" data-idx="${idx}" style="background:#ff4444;color:#fff;border:none;padding:0.4rem 0.6rem;border-radius:6px;">Remover</button>
                            <button class="edit-comment-btn" data-idx="${idx}" style="background:#233a6a;color:#fff;border:none;padding:0.4rem 0.6rem;border-radius:6px;">Editar comentário</button>
                        </div>
                        <div class="movie-comment" style="margin-top:0.5rem;color:#dfeffc;">${f.comment ? `<em>${escapeHtml(f.comment)}</em>` : '<small>Nenhum comentário.</small>'}</div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    profileInfo.innerHTML = html;

    // attach handlers for remove and rating
    const remButtons = profileInfo.querySelectorAll('.remover-btn');
    remButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            filmesAssistidos.splice(idx,1);
            localStorage.setItem(getChaveFilmesUsuario(), JSON.stringify(filmesAssistidos));
            atualizarPerfil();
        });
    });

    const editButtons = profileInfo.querySelectorAll('.edit-comment-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            const current = filmesAssistidos[idx] && filmesAssistidos[idx].comment ? filmesAssistidos[idx].comment : '';
            const novo = prompt('Escreva seu comentário para este filme:', current);
            if (novo === null) return; // cancelado
            filmesAssistidos[idx].comment = novo.trim();
            localStorage.setItem(getChaveFilmesUsuario(), JSON.stringify(filmesAssistidos));
            atualizarPerfil();
        });
    });

    const starContainers = profileInfo.querySelectorAll('.star-rating');
    starContainers.forEach(container => {
        const idx = parseInt(container.getAttribute('data-idx'));
        container.querySelectorAll('.star').forEach(s => {
            s.style.cursor = 'pointer';
            s.addEventListener('click', () => {
                const newRating = parseInt(s.getAttribute('data-star'));
                filmesAssistidos[idx].ranking = newRating;
                localStorage.setItem(getChaveFilmesUsuario(), JSON.stringify(filmesAssistidos));
                atualizarPerfil();
            });
        });
    });
}
if (document.getElementById('profile-username') && document.getElementById('profile-info')) {
    atualizarPerfil();
}

// Detalhes do filme (filmes.html)
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
let filme = filmes.find(f => f.id === movieId);

// Fallback: if film not found by id (some links may omit id), try to find by page title
if (!filme) {
    const tituloEl = document.getElementById('titulo');
    const pageTitle = tituloEl ? tituloEl.textContent.trim() : '';
    if (pageTitle) {
        filme = filmes.find(f => f.titulo === pageTitle) || null;
    }
}

if (filme) {
    const tituloEl = document.getElementById('titulo');
    const posterEl = document.getElementById('poster');
    const descricaoEl = document.getElementById('descricao');
    const diretorEl = document.getElementById('diretor');
    const anoEl = document.getElementById('anolancamento');
    const avaliacaoEl = document.getElementById('avaliacao');

    if (tituloEl) tituloEl.textContent = filme.titulo;
    if (posterEl) posterEl.src = filme.poster;
    if (descricaoEl) descricaoEl.textContent = filme.descricao;
    if (diretorEl) diretorEl.textContent = filme.diretor;
    if (anoEl) anoEl.textContent = filme.anolancamento;
    if (avaliacaoEl) avaliacaoEl.textContent = "⭐".repeat(filme.avaliacao);
}

// Adicionar e rankear filmes
const btnAdicionar = document.getElementById('adicionar');
const btnRankear = document.getElementById('rankear');

if (btnAdicionar) {
    btnAdicionar.addEventListener('click', () => {
        if (!filme) return;
        const usuario = getUsuario();
        if (!usuario || usuario === 'Convidado') {
            alert('Você precisa estar logado para adicionar filmes ao perfil.');
            return;
        }

        let assistidos = JSON.parse(localStorage.getItem(getChaveFilmesUsuario())) || [];
        if (!assistidos.some(f => f.titulo === filme.titulo)) {
            // Ask user for an optional comment when adding
            let comentario = prompt('Adicionar um comentário sobre este filme (opcional):', '');
            comentario = comentario === null ? '' : comentario.trim();
            assistidos.push({ titulo: filme.titulo, ranking: 0, comment: comentario });
            localStorage.setItem(getChaveFilmesUsuario(), JSON.stringify(assistidos));
            alert("Filme adicionado ao perfil!");
        } else {
            alert("Filme já adicionado!");
        }
        atualizarPerfil();
    });
}

if (btnRankear) {
    btnRankear.addEventListener('click', () => {
        if (!filme) return;
        const usuario = getUsuario();
        if (!usuario || usuario === 'Convidado') {
            alert('Você precisa estar logado para rankear filmes.');
            return;
        }

        let ranking = parseInt(prompt("Dê uma nota de 1 a 5 estrelas:"));
        if (!ranking || ranking < 1 || ranking > 5) {
            alert("Número inválido. Use de 1 a 5.");
            return;
        }

        let assistidos = JSON.parse(localStorage.getItem(getChaveFilmesUsuario())) || [];
        const idx = assistidos.findIndex(f => f.titulo === filme.titulo);
        if (idx >= 0) {
            assistidos[idx].ranking = ranking;
        } else {
            assistidos.push({ titulo: filme.titulo, ranking, comment: '' });
        }
        localStorage.setItem(getChaveFilmesUsuario(), JSON.stringify(assistidos));
        alert(`Você deu ${ranking} estrelas para ${filme.titulo}`);
        atualizarPerfil();
    });

}