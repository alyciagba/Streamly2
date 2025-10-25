let filmes = window.filmes || [];

function ensureFilmesLoaded() {
    return new Promise((resolve, reject) => {
        if (Array.isArray(filmes) && filmes.length) return resolve(filmes);
            
            let jsonUrl = (window.location.pathname.indexOf('/pages/') !== -1) ? '../data/filmes.json' : 'data/filmes.json';
            const tryFetch = (url) => fetch(url).then(r => {
                if (!r.ok) throw new Error('fetch failed');
                return r.json();
            });

            tryFetch(jsonUrl)
                .then(json => {
                    filmes = json || [];
                    resolve(filmes);
                })
                .catch(err => {
                    const alt = (jsonUrl.startsWith('../') ? '/data/filmes.json' : '../data/filmes.json');
                    return tryFetch(alt).then(json => {
                        filmes = json || [];
                        resolve(filmes);
                    }).catch(err2 => {
                        console.error('Erro ao carregar filmes.json', err2);
                        filmes = [];
                        resolve(filmes);
                    });
                });
    });
}

function getUsuario() {
    if (typeof window !== 'undefined' && window.currentUser) return window.currentUser;
    return 'Convidado';
}


function getChaveFilmesUsuario() {
    return `filmesAssistidos_${getUsuario()}`;
}


// retorna a chave usada no localstorage para armazenar os filmes
// assistidos do usuário atual tipo:filmesAssistidos_Maria

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ajusta os caminhos de posters e escapa caracteres especiais nas urls 

function resolvePosterPath(poster) {
    if (!poster) return poster;
    
    if (/^https?:\/\//i.test(poster)) return poster;
    
    if (poster.startsWith('/')) return poster;
    
    try {
        if (poster.startsWith('images/') && window.location.pathname.indexOf('/pages/') !== -1) {
            return '../' + poster;
        }
    } catch (e) {
        
    }
    return poster;
}


function getChaveListasUsuario() {
    return `listas_${getUsuario()}`;
}


// retorna a chave usada no localStorage para armazenar as listas do usuario atual

function loadListsForUser() {
    try {
        return JSON.parse(localStorage.getItem(getChaveListasUsuario())) || [];
    } catch (e) {
        return [];
    }
}


// le as listas do usuário do localStorage e retorna um array.

function saveListsForUser(listas) {
    try {
        localStorage.setItem(getChaveListasUsuario(), JSON.stringify(listas || []));
        return { ok: true };
    } catch (e) {
        console.error('Erro ao salvar listas no localStorage', e);
        return { ok: false, msg: 'Erro ao salvar listas no navegador' };
    }
}


// persiste o array de listas no localStorage para o usuário atual.

function createList(nome) {
    if (!nome || !nome.trim()) return { ok: false, msg: 'Nome vazio' };
    const listas = loadListsForUser();
    if (listas.some(l => l.name.toLowerCase() === nome.trim().toLowerCase())) return { ok: false, msg: 'Já existe uma lista com esse nome' };
    listas.push({ name: nome.trim(), filmes: [] });
    const saved = saveListsForUser(listas);
    if (!saved.ok) return { ok: false, msg: saved.msg };
    renderLists();
    return { ok: true };
}


// cria uma nova lista local para o usuário valida nome não vazio
// e evita nomes duplicados (case-insensitive salva e re-renderiza.

function deleteList(idx) {
    const listas = loadListsForUser();
    if (idx < 0 || idx >= listas.length) return;
    listas.splice(idx, 1);
    saveListsForUser(listas);
    renderLists();
}


// remove a lista de índice e atualiza armazenamento

function editList(idx, novoNome) {
    const listas = loadListsForUser();
    if (idx < 0 || idx >= listas.length) return { ok: false, msg: 'Lista inválida' };
    if (!novoNome || !novoNome.trim()) return { ok: false, msg: 'Nome vazio' };
    
    if (listas.some((l, i) => i !== idx && l.name.toLowerCase() === novoNome.trim().toLowerCase())) return { ok: false, msg: 'Já existe uma lista com esse nome' };
    listas[idx].name = novoNome.trim();
    saveListsForUser(listas);
    renderLists();
    return { ok: true };
}


// renomeia a lista no índice `idx` para `novoNome` após validações

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


// adiciona `movieTitle` a  lista de índice `listIdx` caso não exista.
// salva e re-renderiza


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


// remove um título de filme de uma lista (se presente), salva e re-renderiza.

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

        
        
        
        const isPerfilContainer = el.id === 'listas-container';

        let html = '<div class="user-lists">';
        listas.forEach((l, idx) => {
            if (isPerfilContainer) {
                html += `<div class="user-list user-list--perfil">
                    <div class="list-meta">
                        <strong>${escapeHtml(l.name)}</strong>
                        <small class="list-count">${l.filmes.length} filme(s)</small>
                    </div>
                    <div>
                        <button class="edit-list-btn btn-small" data-idx="${idx}">Editar</button>
                        <button class="del-list-btn btn-small btn-del" data-idx="${idx}">Excluir</button>
                    </div>
                </div>`;
            } else {
                html += `<div class="user-list">
                    <div class="list-header">
                        <strong>${escapeHtml(l.name)}</strong>
                        <div>
                            <button class="edit-list-btn btn-small" data-idx="${idx}">Editar</button>
                            <button class="del-list-btn btn-small btn-del" data-idx="${idx}">Excluir</button>
                        </div>
                    </div>
                    <div class="list-item">
                        ${l.filmes.length === 0 ? '<small>Nenhum filme nesta lista.</small>' : '<ul class="list-ul">' + l.filmes.map(f => {
                            
                            const stored = JSON.parse(localStorage.getItem(getChaveFilmesUsuario())) || [];
                            const watched = stored.find(w => w.titulo === f) || {};
                            const movieObj = filmes.find(m => m.titulo === f) || {};
                            const posterPath = resolvePosterPath(movieObj.poster || 'images/jovememchamas.jpg.avif');
                            const rating = watched.ranking || 0;
                            const stars = [1,2,3,4,5].map(i => `<span class="star small ${i<=rating? 'filled':''}">&#9733;</span>`).join('');
                            return `<li class="list-li">
                                        <div class="left">
                                            <img class="list-thumb" src="${posterPath}" alt="${escapeHtml(f)}" />
                                            <div class="list-meta-right">
                                                <div class="list-title">${escapeHtml(f)}</div>
                                                <div class="list-stars">${stars}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <button class="remove-movie-from-list btn-small btn-del" data-list="${idx}" data-movie="${escapeHtml(f)}">Remover</button>
                                        </div>
                                    </li>`;
                        }).join('') + '</ul>'}
                    </div>
                </div>`;
            }
        });
        html += '</div>';
        el.innerHTML = html;

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

        el.querySelectorAll('.remove-movie-from-list').forEach(b => b.addEventListener('click', () => {
            const listIdx = parseInt(b.getAttribute('data-list'));
            const movieTitle = b.getAttribute('data-movie');
            if (confirm('Remover este filme da lista?')) removeMovieFromList(listIdx, movieTitle);
        }));
    };

    renderInto(container);
    renderInto(pageContainer);

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


// Renderiza as listas do usuário em dois locais possíveis:
// visão compacta no perfil
// visão completa na página de listas
// para cada filme listado tenta resolver o poster consultando o array `filmes`.
// após injetar o HTML, o método anexa handlers para editar/excluir/remover.


function ensureListStatusElement() {
    try {
        let el = document.getElementById('listas-status');
        if (!el) {
            const container = document.getElementById('listas-container') || document.getElementById('listas-section') || document.getElementById('listas-page');
            if (container) {
                el = document.createElement('div');
                el.id = 'listas-status';
                el.classList.add('list-status','mt-1');
                container.parentNode.insertBefore(el, container.nextSibling);
            }
        }
        return el;
    } catch (e) { console.error('Erro ao garantir status element', e); return null; }
}

// garante que exista um elemento DOM para exibir mensagens de status

function showListStatus(msg, isError) {
    const el = ensureListStatusElement();
    if (!el) {
        if (isError) alert(msg);
        return;
    }
    el.textContent = msg;
    el.classList.remove('list-status--error','list-status--ok');
    el.classList.add(isError ? 'list-status--error' : 'list-status--ok');
    setTimeout(() => { if (el) el.textContent = ''; }, 4000);
}


// mostra uma mensagem visual abaixo das listas.

window.addEventListener('storage', (ev) => {
    try {
        const key = ev.key;
        if (!key) return;
        const expectedPrefix = `listas_${getUsuario()}`;
        if (key === expectedPrefix) {
            renderLists();
        }
    } catch (e) { console.error('Error handling storage event', e); }
});


// observa mudanças no localStorage vindas de outras abas e
// re-renderiza as listas se a chave do usuário atual for alterada.

function initListUI() {
    try {
        const criarBtn = document.getElementById('criar-lista-btn');
        const novaNome = document.getElementById('nova-lista-nome');
        if (criarBtn && novaNome) {
            if (!criarBtn._hasInit) {
                criarBtn.addEventListener('click', () => {
                    if (criarBtn._creating) {
                        return;
                    }
                    criarBtn._creating = true;
                    try {
                        const nome = novaNome.value || '';
                        const res = createList(nome);
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

        renderLists();
    } catch (err) {
        console.error('Error initializing list UI', err);
    }
}


// (botão criar + campo de nome) evita dupla ligação e concorrência.
// também chama `renderLists()`

try { initListUI(); } catch (e) { console.error('initListUI immediate failed', e); }
document.addEventListener('DOMContentLoaded', initListUI);


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
        html += '<div class="profile-movies-grid">';
        filmesAssistidos.forEach((f, idx) => {
            const found = filmes.find(x => x.titulo === f.titulo) || {};
            const poster = resolvePosterPath(found.poster || 'images/jovememchamas.jpg.avif');
            const rating = f.ranking || 0;
            html += `
                    <div class="movie-item">
                    <img class="profile-thumb" src="${poster}" alt="${escapeHtml(f.titulo)}" />
                    <div class="movie-item-body">
                        <div class="title">${escapeHtml(f.titulo)}</div>
                        <div class="movie-comment">${f.comment ? `<em>${escapeHtml(f.comment)}</em>` : '<small>Nenhum comentário.</small>'}</div>
                        <div class="star-rating" data-idx="${idx}">
                            ${[1,2,3,4,5].map(i => `<span class="star ${i<=rating? 'filled':''}" data-star="${i}">&#9733;</span>`).join('')}
                        </div>
                        <div class="controls">
                            <button class="remover-btn btn-small btn-del" data-idx="${idx}">Remover</button>
                            <button class="edit-comment-btn btn-small" data-idx="${idx}">Editar</button>
                            <button class="add-to-list-btn btn-small" data-idx="${idx}">Adicionar à lista</button>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    profileInfo.innerHTML = html;

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
            if (novo === null) return; 
            filmesAssistidos[idx].comment = novo.trim();
            localStorage.setItem(getChaveFilmesUsuario(), JSON.stringify(filmesAssistidos));
            atualizarPerfil();
        });
    });

    const starContainers = profileInfo.querySelectorAll('.star-rating');
    starContainers.forEach(container => {
        const idx = parseInt(container.getAttribute('data-idx'));
        container.querySelectorAll('.star').forEach(s => {
            s.addEventListener('click', () => {
                const newRating = parseInt(s.getAttribute('data-star'));
                filmesAssistidos[idx].ranking = newRating;
                localStorage.setItem(getChaveFilmesUsuario(), JSON.stringify(filmesAssistidos));
                atualizarPerfil();
            });
        });
    });

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
ensureFilmesLoaded().then(() => {
    if (document.getElementById('profile-username') && document.getElementById('profile-info')) {
        atualizarPerfil();
    }
    try { renderLists(); } catch (e) {  }

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    let filme = (Array.isArray(filmes) ? filmes.find(f => f.id === movieId) : null);

    if (!filme) {
        const tituloEl = document.getElementById('titulo');
        const pageTitle = tituloEl ? tituloEl.textContent.trim() : '';
        if (pageTitle && Array.isArray(filmes)) {
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

    const btnAdicionar = document.getElementById('adicionar');
    const btnRankear = document.getElementById('rankear');

    if (btnAdicionar) {
        btnAdicionar.addEventListener('click', () => {
            if (!filme) { return; }
            const usuario = getUsuario();
            if (!usuario || usuario === 'Convidado') {
                alert('Você precisa estar logado para adicionar filmes ao perfil.');
                return;
            }

            let assistidos = JSON.parse(localStorage.getItem(getChaveFilmesUsuario())) || [];
            if (!assistidos.some(f => f.titulo === filme.titulo)) {
                let comentario = prompt('Adicionar um comentário sobre este filme (opcional):', '');
                comentario = comentario === null ? '' : comentario.trim();
                assistidos.push({ titulo: filme.titulo, ranking: 0, comment: comentario });
                localStorage.setItem(getChaveFilmesUsuario(), JSON.stringify(assistidos));
                alert("Filme adicionado ao perfil!");
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
            if (!filme) { return; }
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
});