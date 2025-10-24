<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Do not redirect guests; allow profile page to show a message when not logged in
$nomeUsuario = $_SESSION['usuario'] ?? null;
$fotoUsuario = $_SESSION['foto'] ?? 'default.jpg';
// Normalize foto path so pages/perfil.php points to the correct images folder
$fotoPath = $fotoUsuario;
if (!preg_match('#^https?://#i', $fotoUsuario) && strpos($fotoUsuario, '/') === false) {
    // simple filename like 'perfil.png' -> ../images/perfil.png
    $fotoPath = '../images/' . $fotoUsuario;
} elseif (!preg_match('#^https?://#i', $fotoUsuario) && strpos($fotoUsuario, 'images/') === 0) {
    // already 'images/...' -> prefix with ../ because we're in /pages/
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
            <img src="<?= htmlspecialchars($fotoPath) ?>" alt="Foto do Usuário" style="width:80px;height:80px;border-radius:50%;object-fit:cover;display:block;" />
            <span id="profile-username" class="text-xl font-semibold"><?= htmlspecialchars($nomeUsuario ?? 'Convidado') ?></span>
        </div>
        <?php if ($nomeUsuario): ?>
            <p>Bem-vindo(a) ao seu perfil, <?= htmlspecialchars($nomeUsuario) ?>!</p>
            <div id="profile-info" class="mt-4"></div>
            
            <!-- Listas: criar nova lista e mostrar listas do usuário -->
            <div id="listas-section" class="mt-6">
                <h3 class="text-lg font-semibold mb-2">Suas Listas</h3>
                <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;">
                    <input id="nova-lista-nome" type="text" placeholder="Nome da nova lista" style="padding:0.4rem;border-radius:6px;background:#0f1724;color:#e0e6f0;border:1px solid #233a6a;" />
                    <button id="criar-lista-btn" class="bg-blue-600 text-white px-3 py-1 rounded">Criar lista</button>
                </div>
                <div id="listas-container"></div>
            </div>
        <?php else: ?>
            <p>Você não está logado. <a href="login.php">Entrar</a> para ver seu perfil e seus filmes.</p>
        <?php endif; ?>
    </section>

    <script>
        // Expose currentUser for client-side code (used to control add/rank permissions)
        <?php if ($nomeUsuario): ?>
        window.currentUser = <?= json_encode($nomeUsuario) ?>;
        // Ensure localStorage has the username key (used by per-user lists)
        try {
            if (!localStorage.getItem('usuario')) localStorage.setItem('usuario', <?= json_encode($nomeUsuario) ?>);
        } catch (e) {}
        <?php endif; ?>
    </script>
</main>

<?php include '../includes/footer.php'; ?>

</body>
</html>
