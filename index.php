<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Mostrar erros para depuração
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Verifica usuário logado
$usuarioLogado = $_SESSION['usuario'] ?? 'Convidado';

// Lista de filmes
$filmes = [
    [
        'id' => '1',
        'titulo' => 'Retrato de uma Jovem em Chamas',
        'poster' => 'images/jovememchamas.jpg.avif',
        'diretor' => 'Diretora: Céline Sciamma',
        'anolancamento' => 'Ano de Lançamento: 2019',
        'descricao' => 'Marianne é uma jovem pintora na França do século 18, com a tarefa de pintar um retrato de Héloïse para seu casamento, sem que ela saiba. Passando seus dias observando Héloïse e as noites pintando, Marianne se vê cada vez mais próxima de sua modelo.',
        'avaliacao' => 4
    ],
    [
        'id' => '2',
        'titulo' => 'O Iluminado',
        'poster' => 'images/iluminado.png',
        'diretor' => 'Diretor: Stanley Kubrick',
        'anolancamento' => 'Ano de Lançamento: 1980',
        'descricao' => 'Jack Torrance se torna caseiro de inverno do isolado Hotel Overlook, nas montanhas do Colorado. Ele se instala com a esposa Wendy e o filho Danny, que é atormentando por premonições. Jack não consegue escrever e as visões de Danny se tornam mais perturbadoras. O escritor descobre os segredos sombrios do hotel e começa a se transformar em um maníaco homicida, aterrorizando sua família.',
        'avaliacao' => 5
    ],
    [
        'id' => '3',
        'titulo' => 'Cisne Negro',
    'poster' => 'images/cisnenegro.jpg',
        'diretor' => 'Diretor: Darren Aronofsky',
        'anolancamento' => 'Ano de Lançamento: 2010',
        'descricao' => 'Nina Sayers é dominada por um sentimento de imensa pressão quando se vê competindo pelo papel. Ela perde o controle da realidade e mergulha na loucura.',
        'avaliacao' => 4
    ],
    [
        'id' => '4',
        'titulo' => 'Que Horas Ela Volta?',
        'poster' => 'images/Que_horas_ela_volta_ver3_xlg.jpg',
        'diretor' => 'Diretora: Anna Muylaert',
        'anolancamento' => 'Ano de Lançamento: 2015',
        'descricao' => 'Val deixa a filha Jéssica no interior de Pernambuco e passa os 13 anos seguintes trabalhando como babá do menino Fabinho em São Paulo. Ela consegue estabilidade financeira, mas convive com a culpa por não ter criado sua filha.',
        'avaliacao' => 4
    ],
    [
        'id' => '5',
        'titulo' => 'Pretty Woman',
        'poster' => 'images/prettywoman.jpg',
        'diretor' => 'Diretor: Garry Marshall',
        'anolancamento' => 'Ano de Lançamento: 1990',
        'descricao' => 'A história de Pretty Woman se concentra na prostituta de Hollywood Vivian Ward, contratada por um rico empresário para acompanhá-lo em eventos e desenvolverem uma relação durante a estadia de uma semana.',
        'avaliacao' => 4
    ],
    [
        'id' => '6',
        'titulo' => 'Brilho Eterno de uma Mente Sem Lembranças',
        'poster' => 'images/brilhoeterno.jpg',
        'diretor' => 'Diretor: Michel Gondry',
        'anolancamento' => 'Ano de Lançamento: 2004',
        'descricao' => 'Joel descobre que sua amada Clementine apagou suas lembranças dele através de uma empresa especializada. Agora ele decide reagir e apagar as memórias dela também.',
        'avaliacao' => 4
    ],
    [
        'id' => '7',
        'titulo' => 'Conto da Princesa Kaguya',
        'poster' => 'images/kaguya.jpg',
        'diretor' => 'Diretor: Isao Takahata',
        'anolancamento' => 'Ano de Lançamento: 2013',
        'descricao' => 'Kaguya é encontrada ainda bebê dentro de um tronco de bambu. Ao crescer, é cobiçada por cinco nobres, mas exige presentes quase impossíveis para evitar um matrimônio indesejado.',
        'avaliacao' => 4
    ],
    [
        'id' => '8',
        'titulo' => 'A Substância',
    'poster' => 'images/asubstanci.jpg.jpg',
        'diretor' => 'Diretora: Coralie Fargeat',
        'anolancamento' => 'Ano de Lançamento: 2024',
        'descricao' => 'Elisabeth Sparkle, renomada por um programa de aeróbica, enfrenta um golpe devastador quando seu chefe a demite. Um laboratório oferece uma substância que promete transformá-la em uma versão aprimorada.',
        'avaliacao' => 4
    ]
];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Streamly</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/script.js" defer></script>
    <style>
        .movie-card { background:#1a2a40; color:#fff; padding:1rem; border-radius:0.5rem; width:14rem; }
        .movie-card img { width:100%; border-radius:0.5rem; }
        .star { color: gray; }
        .star.filled { color: gold; }
    </style>
</head>
<body class="bg-gray-100">

<!-- HEADER -->
<?php include 'includes/header.php'; ?>

<!-- CONTEÚDO PRINCIPAL -->
<main class="p-8">
    <h2 class="text-center text-4xl font-bold my-8">Seja bem-vindo ao Streamly, <?= htmlspecialchars($usuarioLogado) ?>!</h2>
    <div id="filmes-container" class="flex flex-wrap justify-center gap-6">
        <?php foreach($filmes as $filme): ?>
            <div class="movie-card">
                <img src="<?= htmlspecialchars($filme['poster']) ?>" alt="Capa do filme">
                <h3 class="text-lg font-semibold mt-2"><?= htmlspecialchars($filme['titulo']) ?></h3>
                <p><?= htmlspecialchars($filme['diretor']) ?></p>
                <p><?= htmlspecialchars($filme['anolancamento']) ?></p>
                <p class="text-sm mt-1"><?= htmlspecialchars($filme['descricao']) ?></p>
                <div class="mt-2">
                    <?php for($i=1; $i<=5; $i++): ?>
                        <span class="star <?= $i <= $filme['avaliacao'] ? 'filled' : '' ?>">&#9733;</span>
                    <?php endfor; ?>
                </div>
                <button onclick="window.location.href='pages/filmes.php?id=<?= $filme['id'] ?>'" class="mt-2 bg-blue-600 text-white px-4 py-1 rounded w-full">Detalhes</button>
            </div>
        <?php endforeach; ?>
    </div>
</main>

<!-- FOOTER -->
<?php include 'includes/footer.php'; ?>

</body>
</html>
<?php if (!empty($usuarioLogado) && $usuarioLogado !== 'Convidado'): ?>
<script>
    // Expose current user to client-side scripts
    window.currentUser = <?= json_encode($usuarioLogado) ?>;
</script>
<?php endif; ?>
