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

// Resolve poster paths so pages in /pages/ work with relative image paths.
function resolvePosterPath(poster) {
    if (!poster) return poster;
    // If poster is an absolute URL, return as-is
    if (/^https?:\/\//i.test(poster)) return poster;
    // If poster already starts with '/' treat as root-relative
    if (poster.startsWith('/')) return poster;
    // If poster is relative like 'images/...' and the current page is inside /pages/,
    // prefix with '../' so it resolves to the images folder at project root.
    try {
        if (poster.startsWith('images/') && window.location.pathname.indexOf('/pages/') !== -1) {
            return '../' + poster;
        }
    } catch (e) {
        // ignore and return poster
    }
    return poster;
}

// Note: Server-side PHP sessions now control login state. The client-side
// localStorage-based login and navbar toggling were removed so form submission
// and PHP session handling operate without interference.

// --- List management (per-user, stored in localStorage) ---
function getChaveListasUsuario() {
    return `listas_${getUsuario()}`;
}

function loadListsForUser() {
    try {
        return JSON.parse(localStorage.getItem(getChaveListasUsuario())) || [];
    } catch (e) {
        return [];
    }
}

function saveListsForUser(listas) {
    try {
        localStorage.setItem(getChaveListasUsuario(), JSON.stringify(listas || []));
        return { ok: true };
    } catch (e) {
        console.error('Erro ao salvar listas no localStorage', e);
        return { ok: false, msg: 'Erro ao salvar listas no navegador' };
    }
}

function createList(nome) {
    console.log('DEBUG: createList called with', nome);
    if (!nome || !nome.trim()) return { ok: false, msg: 'Nome vazio' };
    const listas = loadListsForUser();
    if (listas.some(l => l.name.toLowerCase() === nome.trim().toLowerCase())) return { ok: false, msg: 'Já existe uma lista com esse nome' };
    listas.push({ name: nome.trim(), filmes: [] });
    const saved = saveListsForUser(listas);
    if (!saved.ok) return { ok: false, msg: saved.msg };
    renderLists();
    return { ok: true };
}

function deleteList(idx) {
    const listas = loadListsForUser();
    if (idx < 0 || idx >= listas.length) return;
    listas.splice(idx, 1);
    saveListsForUser(listas);
    renderLists();
}

function editList(idx, novoNome) {
    const listas = loadListsForUser();
    if (idx < 0 || idx >= listas.length) return { ok: false, msg: 'Lista inválida' };
    if (!novoNome || !novoNome.trim()) return { ok: false, msg: 'Nome vazio' };
    // avoid duplicate names
    if (listas.some((l, i) => i !== idx && l.name.toLowerCase() === novoNome.trim().toLowerCase())) return { ok: false, msg: 'Já existe uma lista com esse nome' };
    listas[idx].name = novoNome.trim();
    saveListsForUser(listas);
    renderLists();
    return { ok: true };
}

function addMovieToList(listIdx, movieTitle) {
    const listas = loadListsForUser();
    if (listIdx < 0 || listIdx >= listas.length) return { ok: false, msg: 'Lista inválida' };
    const lista = listas[listIdx];
    if (!lista.filmes.includes(movieTitle)) {
        lista.filmes.push(movieTitle);
        saveListsForUser(listas);
        renderLists();
        return { ok: true };
    }
    return { ok: false, msg: 'Filme já presente na lista' };
}

function removeMovieFromList(listIdx, movieTitle) {
    const listas = loadListsForUser();
    if (listIdx < 0 || listIdx >= listas.length) return;
    const lista = listas[listIdx];
    const i = lista.filmes.indexOf(movieTitle);
    if (i >= 0) {
        lista.filmes.splice(i, 1);
        saveListsForUser(listas);
        renderLists();
    }
}

function renderLists() {
    const container = document.getElementById('listas-container');
    const pageContainer = document.getElementById('listas-page');
    const listas = loadListsForUser();

    const renderInto = (el) => {
        if (!el) return;
        if (listas.length === 0) {
            el.innerHTML = '<p>Você ainda não tem listas criadas.</p>';
            return;
        }

        // If rendering into the perfil container, only show list names and counts
        // (no movie entries). Full detail (with posters and remove buttons) is
        // shown only on the listas page (`#listas-page`).
        const isPerfilContainer = el.id === 'listas-container';

        let html = '<div class="user-lists">';
        listas.forEach((l, idx) => {
            if (isPerfilContainer) {
                html += `<div class="user-list" style="border:1px solid #233a6a;padding:0.6rem;border-radius:8px;margin-bottom:0.6rem;display:flex;justify-content:space-between;align-items:center;">
                    <div style="display:flex;flex-direction:column;">
                        <strong>${escapeHtml(l.name)}</strong>
                        <small style="color:#cfe1ff;margin-top:0.25rem;">${l.filmes.length} filme(s)</small>
                    </div>
                    <div>
                        <button class="edit-list-btn" data-idx="${idx}" style="background:#233a6a;color:#fff;border:none;padding:0.25rem 0.5rem;border-radius:6px;margin-right:0.4rem;">Editar</button>
                        <button class="del-list-btn" data-idx="${idx}" style="background:#ff4444;color:#fff;border:none;padding:0.25rem 0.5rem;border-radius:6px;">Excluir</button>
                    </div>
                </div>`;
            } else {
                html += `<div class="user-list" style="border:1px solid #233a6a;padding:0.6rem;border-radius:8px;margin-bottom:0.6rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <strong>${escapeHtml(l.name)}</strong>
                        <div>
                            <button class="edit-list-btn" data-idx="${idx}" style="background:#233a6a;color:#fff;border:none;padding:0.25rem 0.5rem;border-radius:6px;margin-right:0.4rem;">Editar</button>
                            <button class="del-list-btn" data-idx="${idx}" style="background:#ff4444;color:#fff;border:none;padding:0.25rem 0.5rem;border-radius:6px;margin-right:0.4rem;">Excluir</button>
                        </div>
                    </div>
                    <div style="margin-top:0.5rem;">
                        ${l.filmes.length === 0 ? '<small>Nenhum filme nesta lista.</small>' : '<ul style="list-style:none;padding:0;margin:0;">' + l.filmes.map(f => {
                            // find poster and rating for this title
                            const stored = JSON.parse(localStorage.getItem(getChaveFilmesUsuario())) || [];
                            const watched = stored.find(w => w.titulo === f) || {};
                            const movieObj = filmes.find(m => m.titulo === f) || {};
                            const posterPath = resolvePosterPath(movieObj.poster || 'images/jovememchamas.jpg.avif');
                            const rating = watched.ranking || 0;
                            const stars = [1,2,3,4,5].map(i => `<span style="color:${i<=rating? '#ffd700':'#6b7280'};font-size:0.9rem;">&#9733;</span>`).join('');
                            return `<li style="display:flex;justify-content:space-between;align-items:center;padding:0.35rem 0;border-bottom:1px solid rgba(255,255,255,0.03);">
                                        <div style="display:flex;gap:0.6rem;align-items:center;">
                                            <img src="${posterPath}" alt="${escapeHtml(f)}" style="width:50px;height:75px;object-fit:cover;border-radius:4px;"/>
                                            <div style="min-width:180px;max-width:300px;">
                                                <div style="font-weight:600;">${escapeHtml(f)}</div>
                                                <div style="margin-top:0.25rem;">${stars}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <button class="remove-movie-from-list" data-list="${idx}" data-movie="${escapeHtml(f)}" style="background:#d23;color:#fff;border:none;padding:0.25rem 0.6rem;border-radius:6px;">Remover</button>
                                        </div>
                                    </li>`;
                        }).join('') + '</ul>'}
                    </div>
                </div>`;
            }
        });
        html += '</div>';
        el.innerHTML = html;

        // attach edit/delete handlers (present in both perfil and listas views)
        el.querySelectorAll('.edit-list-btn').forEach(b => b.addEventListener('click', () => {
            const idx = parseInt(b.getAttribute('data-idx'));
            const listasLocal = loadListsForUser();
            const current = listasLocal[idx] && listasLocal[idx].name ? listasLocal[idx].name : '';
            const novo = prompt('Novo nome para a lista:', current);
            if (novo === null) return;
            const res = editList(idx, novo);
            if (!res.ok) alert(res.msg || 'Falha ao renomear lista');
        }));

        el.querySelectorAll('.del-list-btn').forEach(b => b.addEventListener('click', () => {
            const idx = parseInt(b.getAttribute('data-idx'));
            if (confirm('Excluir esta lista?')) deleteList(idx);
        }));

        // attach remove-movie handlers only if movie entries were rendered
        el.querySelectorAll('.remove-movie-from-list').forEach(b => b.addEventListener('click', () => {
            const listIdx = parseInt(b.getAttribute('data-list'));
            const movieTitle = b.getAttribute('data-movie');
            if (confirm('Remover este filme da lista?')) removeMovieFromList(listIdx, movieTitle);
        }));
    };

    renderInto(container);
    // also render on listas page if present
    renderInto(pageContainer);

    // update any list select on the listas page
    try {
        const sel = document.getElementById('adicionar-filme-lista');
        if (sel) {
            sel.innerHTML = '';
            if (listas.length === 0) {
                const opt = document.createElement('option');
                opt.text = 'Nenhuma lista disponível';
                opt.value = '';
                sel.appendChild(opt);
                sel.disabled = true;
            } else {
                listas.forEach((l, idx) => {
                    const opt = document.createElement('option');
                    opt.value = String(idx);
                    opt.text = l.name;
                    sel.appendChild(opt);
                });
                sel.disabled = false;
            }
        }
    } catch (e) { console.error('Erro ao popular select de listas', e); }
}

function ensureListStatusElement() {
    try {
        let el = document.getElementById('listas-status');
        if (!el) {
            // try to insert under listas-container or listas-section
            const container = document.getElementById('listas-container') || document.getElementById('listas-section') || document.getElementById('listas-page');
            if (container) {
                el = document.createElement('div');
                el.id = 'listas-status';
                el.style.marginTop = '0.5rem';
                container.parentNode.insertBefore(el, container.nextSibling);
            }
        }
        return el;
    } catch (e) { console.error('Erro ao garantir status element', e); return null; }
}

function showListStatus(msg, isError) {
    const el = ensureListStatusElement();
    if (!el) {
        // fallback to alert
        if (isError) alert(msg);
        return;
    }
    el.textContent = msg;
    el.style.color = isError ? '#ff4444' : '#22c55e';
    // remove after 4s
    setTimeout(() => { if (el) el.textContent = ''; }, 4000);
}

// Document-level fallback click handler removed to prevent duplicate creates.

// Listen for storage events so other tabs/windows update their UI immediately
window.addEventListener('storage', (ev) => {
    try {
        const key = ev.key;
        if (!key) return;
        // react only when user's listas key changed
        const expectedPrefix = `listas_${getUsuario()}`;
        if (key === expectedPrefix) {
            console.log('DEBUG: storage event - listas changed, re-rendering');
            renderLists();
        }
    } catch (e) { console.error('Error handling storage event', e); }
});

// initialize create-list UI and render lists when profile is present
function initListUI() {
    try {
        const criarBtn = document.getElementById('criar-lista-btn');
        const novaNome = document.getElementById('nova-lista-nome');
        if (criarBtn && novaNome) {
            // avoid double-binding
            if (!criarBtn._hasInit) {
                criarBtn.addEventListener('click', () => {
                    // prevent duplicate handling if another handler is already processing
                    if (criarBtn._creating) {
                        console.log('DEBUG: criar-lista-btn click ignored, already processing');
                        return;
                    }
                    criarBtn._creating = true;
                    try {
                        console.log('DEBUG: criar-lista-btn clicked');
                        const nome = novaNome.value || '';
                        console.log('DEBUG: criar-lista - nome=', nome);
                        const res = createList(nome);
                        console.log('DEBUG: criar-lista - result=', res);
                        if (!res.ok) {
                            showListStatus(res.msg || 'Falha ao criar lista', true);
                            return;
                        }
                        novaNome.value = '';
                        showListStatus('Lista criada com sucesso', false);
                    } catch (err) {
                        console.error('Erro no handler criar-lista-btn', err);
                        alert('Ocorreu um erro ao criar a lista (ver console)');
                    } finally {
                        criarBtn._creating = false;
                    }
                });
                criarBtn._hasInit = true;
            }
        }

        // render lists on load if containers exist
        renderLists();
    } catch (err) {
        console.error('Error initializing list UI', err);
    }
}

// Try to initialize immediately (defer scripts should execute after DOM is parsed,
// but initialize again on DOMContentLoaded to be resilient).
try { initListUI(); } catch (e) { console.error('initListUI immediate failed', e); }
document.addEventListener('DOMContentLoaded', initListUI);

// Global inline fallback removed. Rely on the single bound handler in initListUI.

// Wire adicionar-filme button on listas page
function initAddMovieToListUI() {
    try {
        const addBtn = document.getElementById('adicionar-filme-btn');
        const input = document.getElementById('adicionar-filme-nome');
        const sel = document.getElementById('adicionar-filme-lista');
        if (!addBtn || !input || !sel) return;
        if (addBtn._hasInit) return;
        addBtn.addEventListener('click', () => {
            const title = (input.value || '').trim();
            if (!title) { alert('Digite o título do filme'); return; }
            const idx = parseInt(sel.value);
            if (isNaN(idx)) { alert('Selecione uma lista válida'); return; }
            const res = addMovieToList(idx, title);
            if (res.ok) {
                alert(`Filme "${title}" adicionado à lista.`);
                input.value = '';
            } else {
                alert(res.msg || 'Falha ao adicionar filme.');
            }
        });
        addBtn._hasInit = true;
    } catch (e) { console.error('Erro no initAddMovieToListUI', e); }
}

try { initAddMovieToListUI(); } catch (e) { console.error('initAddMovieToListUI immediate failed', e); }
document.addEventListener('DOMContentLoaded', () => { initAddMovieToListUI(); });


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
        // Render watched movies side-by-side using the CSS grid (.profile-movies-grid)
        html += '<div class="profile-movies-grid">';
        filmesAssistidos.forEach((f, idx) => {
            const found = filmes.find(x => x.titulo === f.titulo) || {};
            const poster = resolvePosterPath(found.poster || 'images/jovememchamas.jpg.avif');
            const rating = f.ranking || 0;
            html += `
                <div class="movie-item" style="max-width:360px;">
                    <img src="${poster}" alt="${escapeHtml(f.titulo)}" style="width:80px;height:120px;object-fit:cover;border-radius:6px;flex:0 0 80px;" />
                    <div style="display:flex;flex-direction:column;flex:1;min-width:0;">
                        <div class="title">${escapeHtml(f.titulo)}</div>
                        <div class="movie-comment" style="margin-top:6px;color:#dfeffc;">${f.comment ? `<em>${escapeHtml(f.comment)}</em>` : '<small>Nenhum comentário.</small>'}</div>
                        <div class="star-rating" data-idx="${idx}" style="margin-top:6px;">
                            ${[1,2,3,4,5].map(i => `<span class="star ${i<=rating? 'filled':''}" data-star="${i}">&#9733;</span>`).join('')}
                        </div>
                        <div class="controls" style="margin-top:8px;display:flex;gap:0.4rem;align-items:center;">
                            <button class="remover-btn" data-idx="${idx}" style="background:#ff4444;color:#fff;border:none;padding:0.35rem 0.6rem;border-radius:6px;">Remover</button>
                            <button class="edit-comment-btn" data-idx="${idx}" style="background:#233a6a;color:#fff;border:none;padding:0.35rem 0.6rem;border-radius:6px;">Editar</button>
                            <button class="add-to-list-btn" data-idx="${idx}" style="background:#1e90ff;color:#fff;border:none;padding:0.35rem 0.6rem;border-radius:6px;">Adicionar à lista</button>
                        </div>
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

    // attach handlers for 'Adicionar à lista' buttons
    const addToListButtons = profileInfo.querySelectorAll('.add-to-list-btn');
    addToListButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            const filmesAssistidosLocal = JSON.parse(localStorage.getItem(getChaveFilmesUsuario())) || [];
            const movieTitle = filmesAssistidosLocal[idx] && filmesAssistidosLocal[idx].titulo ? filmesAssistidosLocal[idx].titulo : null;
            if (!movieTitle) { alert('Filme não encontrado'); return; }
            const listas = loadListsForUser();
            if (!listas || listas.length === 0) { alert('Você não tem listas. Crie uma lista primeiro.'); return; }
            const opts = listas.map((l,i) => `${i+1}) ${l.name}`).join('\n');
            const escolha = prompt('Escolha a lista para adicionar:\n' + opts);
            if (!escolha) return;
            const n = parseInt(escolha);
            if (isNaN(n) || n < 1 || n > listas.length) { alert('Escolha inválida.'); return; }
            const res = addMovieToList(n-1, movieTitle);
            if (res.ok) alert(`"${movieTitle}" adicionado à lista "${listas[n-1].name}"`);
            else alert(res.msg || 'Não foi possível adicionar o filme à lista.');
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
    if (posterEl) posterEl.src = resolvePosterPath(filme.poster);
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
        // Debug: log when add button is clicked to help diagnose missing prompt
        console.log('DEBUG: adicionar clicked', { filme, pageTitle: document.getElementById('titulo')?.textContent, urlId: movieId });
        if (!filme) { console.log('DEBUG: no filme object found, aborting add'); return; }
        const usuario = getUsuario();
        console.log('DEBUG: currentUser', usuario);
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
            // Offer to add the newly added movie to one of the user's lists
            const listas = loadListsForUser();
            if (listas && listas.length > 0) {
                if (confirm('Deseja adicionar este filme a uma das suas listas?')) {
                    const opts = listas.map((l,i) => `${i+1}) ${l.name}`).join('\n');
                    const escolha = prompt('Escolha a lista para adicionar:\n' + opts);
                    if (escolha) {
                        const n = parseInt(escolha);
                        if (!isNaN(n) && n >= 1 && n <= listas.length) {
                            const res = addMovieToList(n-1, filme.titulo);
                            if (res.ok) alert(`Filme adicionado à lista "${listas[n-1].name}"`);
                            else alert(res.msg || 'Não foi possível adicionar o filme à lista.');
                        } else {
                            alert('Escolha inválida.');
                        }
                    }
                }
            }
        } else {
            alert("Filme já adicionado!");
        }
        atualizarPerfil();
    });
}

if (btnRankear) {
    btnRankear.addEventListener('click', () => {
        // Debug: log when rank button is clicked
        console.log('DEBUG: rankear clicked', { filme, pageTitle: document.getElementById('titulo')?.textContent, urlId: movieId });
        if (!filme) { console.log('DEBUG: no filme object found, aborting rank'); return; }
        const usuario = getUsuario();
        console.log('DEBUG: currentUser', usuario);
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