<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$nomeUsuario = $_SESSION['usuario'] ?? null;
$fotoUsuario = $_SESSION['foto'] ?? 'default.jpg';
$fotoPath = $fotoUsuario;
if (!preg_match('#^https?://#i', $fotoUsuario) && strpos($fotoUsuario, '/') === false) {
    $fotoPath = '../images/' . $fotoUsuario;
} elseif (!preg_match('#^https?://#i', $fotoUsuario) && strpos($fotoUsuario, 'images/') === 0) {
    $fotoPath = '../' . $fotoUsuario;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil - Streamly</title>
    <link rel="stylesheet" href="../css/styles.css">
    <script src="../js/script.js" defer></script>
</head>
<body>

<?php include '../includes/header.php'; ?>

<main class="p-8">
    <section id="profile-section" class="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
            <div class="flex items-center gap-4 mb-4">
            <img src="<?= htmlspecialchars($fotoPath) ?>" alt="Foto do Usuário" class="avatar" />
            <span id="profile-username" class="text-xl font-semibold"><?= htmlspecialchars($nomeUsuario ?? 'Convidado') ?></span>
        </div>
        <?php if ($nomeUsuario): ?>
            <p>Bem-vindo(a) ao seu perfil, <?= htmlspecialchars($nomeUsuario) ?>!</p>
            <div id="profile-info" class="mt-4"></div>
            
            <div id="listas-section" class="mt-6">
                <h3 class="text-lg font-semibold mb-2">Suas Listas</h3>
                <div class="hstack">
                    <input id="nova-lista-nome" type="text" placeholder="Nome da nova lista" class="form-input" />
                    <button id="criar-lista-btn" class="bg-blue-600 text-white px-3 py-1 rounded">Criar lista</button>
                </div>
                <div id="listas-container"></div>
            </div>
        <?php else: ?>
            <p>Você não está logado. <a href="login.php">Entrar</a> para ver seu perfil e seus filmes.</p>
        <?php endif; ?>
    </section>

    <script>
        <?php if ($nomeUsuario): ?>
        window.currentUser = <?= json_encode($nomeUsuario) ?>;
        try {
            if (!localStorage.getItem('usuario')) localStorage.setItem('usuario', <?= json_encode($nomeUsuario) ?>);
        } catch (e) {}
        <?php endif; ?>
    </script>
</main>

<?php include '../includes/footer.php'; ?>

</body>
</html>
