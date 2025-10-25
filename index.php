<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

ini_set('display_errors', 1);
error_reporting(E_ALL);

$usuarioLogado = $_SESSION['usuario'] ?? 'Convidado';

$filmes = [];
$jsonPath = __DIR__ . '/data/filmes.json';
if (file_exists($jsonPath)) {
    $raw = file_get_contents($jsonPath);
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $filmes = $decoded;
    }
}
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
</head>
<body>

<?php include 'includes/header.php'; ?>

<main class="p-8">
    <h2 class="text-center text-4xl font-bold my-8">Seja bem-vindo ao Streamly, <?= htmlspecialchars($usuarioLogado) ?>!</h2>
    <div id="filmes-container" class="movie-list">
        <?php foreach($filmes as $filme): ?>
            <div class="movie-card">
                <img src="<?= htmlspecialchars($filme['poster']) ?>" alt="Capa do filme">
                <h3 class="text-lg font-semibold mt-2"><?= htmlspecialchars($filme['titulo']) ?></h3>
                <p><?= htmlspecialchars($filme['diretor']) ?></p>
                <p><?= htmlspecialchars($filme['anolancamento']) ?></p>
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

<?php include 'includes/footer.php'; ?>

</body>
</html>
<?php if (!empty($usuarioLogado) && $usuarioLogado !== 'Convidado'): ?>
<script>
    window.currentUser = <?= json_encode($usuarioLogado) ?>;
</script>
<?php endif; ?>
