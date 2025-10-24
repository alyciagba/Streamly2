<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}
$usuarioLogado = $_SESSION['usuario'] ?? 'Convidado';


$jsonPath = __DIR__ . '/../data/filmes.json';
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
  <title>Detalhes do Filme - Streamly</title>
  <link rel="stylesheet" href="../css/styles.css">
  <script src="https://cdn.tailwindcss.com"></script>
  
</head>
<body>
  <?php include '../includes/header.php'; ?>
  <?php if (!empty($usuarioLogado) && $usuarioLogado !== 'Convidado'): ?>
  <script>
    window.currentUser = <?= json_encode($usuarioLogado) ?>;
  </script>
  <?php endif; ?>

  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="bg-[#1a2a40] p-6 rounded-lg shadow-md">
      <div class="text-center">
        <h2 id="titulo" class="text-3xl font-bold mb-4 text-white"></h2>
        <img id="poster" class="mx-auto object-contain h-auto max-h-[500px] mb-4 rounded-lg shadow-md" alt="Poster do filme">
      </div>

        <p id="diretor" class="mb-4 text-gray-200"></p>
        <p id="anolancamento" class="mb-4 text-gray-200"></p>
        <p id="descricao" class="mb-4 text-gray-200"></p>
        <p id="avaliacao" class="mb-4 font-semibold text-yellow-400"></p>

    <div class="flex gap-4">
        <button id="adicionar" class="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded">Adicionar como assistido</button>
        <button id="rankear" class="bg-blue-1000 hover:bg-blue-900 text-white px-4 py-2 rounded">Rankear</button>
    </div>

  </main>

  <?php include '../includes/footer.php'; ?>
  <script src="../js/script.js" defer></script>
</body>
</html>
