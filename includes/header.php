<?php
// Inicia a sessão se ainda não tiver sido iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Nome do usuário logado ou "Convidado"
$usuarioLogado = $_SESSION['usuario'] ?? 'Convidado';

// Função para corrigir caminhos dependendo da pasta
function linkPath($path) {
    // Detecta se o arquivo atual está dentro da pasta pages
    $currentDir = basename(__DIR__); // "includes"
    $parentDir = basename(dirname(__DIR__)); // "Streamly"
    
    // Se estiver em includes dentro de pages, volta 2 níveis; se estiver na raiz, apenas 1
    $fullPath = dirname(__DIR__) . '/' . ltrim($path, '/');
    return $fullPath;
}

// Compute relative links so header works when included from root or from /pages/
$inPages = strpos($_SERVER['PHP_SELF'], '/pages/') !== false;
if ($inPages) {
    $homeLink = '../index.php';
    $sobreLink = 'sobre.php';
    $contatoLink = 'contato.php';
    $perfilLink = 'perfil.php';
    $loginLink = 'login.php';
    $logoutLink = 'logout.php';
} else {
    $homeLink = 'index.php';
    $sobreLink = 'pages/sobre.php';
    $contatoLink = 'pages/contato.php';
    $perfilLink = 'pages/perfil.php';
    $loginLink = 'pages/login.php';
    $logoutLink = 'pages/logout.php';
}
?>

<header class="flex justify-between items-center p-4 bg-blue-800 text-white" style="background-color:#16213e;color:#ffffff;padding:1rem;display:flex;justify-content:space-between;align-items:center;">
    <span class="text-2xl font-bold tracking-wide">Streamly</span>
    <nav class="space-x-4">
        <a href="<?= $homeLink ?>" class="hover:underline">Home</a>
        <a href="<?= $sobreLink ?>" class="hover:underline">Sobre</a>
        <a href="<?= $contatoLink ?>" class="hover:underline">Contato</a>

        <a href="<?= $perfilLink ?>" class="hover:underline">Perfil</a>
        <?php if ($usuarioLogado !== 'Convidado'): ?>
            <a id="nav-logout" href="<?= $logoutLink ?>" class="hover:underline">Logout (<?= htmlspecialchars($usuarioLogado) ?>)</a>
        <?php else: ?>
            <a id="nav-login" href="<?= $loginLink ?>" class="hover:underline">Login</a>
        <?php endif; ?>
    </nav>
</header>
