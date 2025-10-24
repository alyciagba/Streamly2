<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$usuarioLogado = $_SESSION['usuario'] ?? 'Convidado';

function linkPath($path) {
    $currentDir = basename(__DIR__); 
    $parentDir = basename(dirname(__DIR__)); 
    
    $fullPath = dirname(__DIR__) . '/' . ltrim($path, '/');
    return $fullPath;
}

$inPages = strpos($_SERVER['PHP_SELF'], '/pages/') !== false;
if ($inPages) {
    $homeLink = '../index.php';
    $sobreLink = 'sobre.php';
    $contatoLink = 'contato.php';
    $perfilLink = 'perfil.php';
    $loginLink = 'login.php';
    $logoutLink = 'logout.php';
    $listasLink = 'listas.php';
} else {
    $homeLink = 'index.php';
    $sobreLink = 'pages/sobre.php';
    $contatoLink = 'pages/contato.php';
    $perfilLink = 'pages/perfil.php';
    $loginLink = 'pages/login.php';
    $logoutLink = 'pages/logout.php';
    $listasLink = 'pages/listas.php';
}
?>

<header class="site-header">
    <span class="text-2xl font-bold tracking-wide">Streamly</span>
    <nav class="space-x-4">
        <a href="<?= $homeLink ?>" class="hover:underline">Home</a>
    <a href="<?= $sobreLink ?>" class="hover:underline">Sobre</a>
    <a href="<?= $contatoLink ?>" class="hover:underline">Contato</a>
    <a href="<?= $listasLink ?? ($inPages ? 'listas.php' : 'pages/listas.php') ?>" class="hover:underline">Listas</a>

    <a href="<?= $perfilLink ?>" class="hover:underline">Perfil</a>
        <?php if ($usuarioLogado !== 'Convidado'): ?>
            <a id="nav-logout" href="<?= $logoutLink ?>" class="hover:underline">Logout (<?= htmlspecialchars($usuarioLogado) ?>)</a>
        <?php else: ?>
            <a id="nav-login" href="<?= $loginLink ?>" class="hover:underline">Login</a>
        <?php endif; ?>
    </nav>
</header>
<?php
if (isset($filmes) && is_array($filmes)):
?>
<script>
    try {
        window.filmes = <?= json_encode($filmes, JSON_UNESCAPED_UNICODE) ?>;
    } catch (e) {}
</script>
<?php endif; ?>
