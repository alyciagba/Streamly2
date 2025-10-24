<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Caminho do arquivo JSON de usuários
$usuariosPath = __DIR__ . '/../data/users.json';
$usuariosJson = file_exists($usuariosPath) ? file_get_contents($usuariosPath) : '[]';
$usuarios = json_decode($usuariosJson, true);

$erro = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'] ?? '';
    $senha = $_POST['senha'] ?? '';

    // Busca usuário no JSON
    $usuarioEncontrado = null;
    foreach ($usuarios as $u) {
        if ($u['nome'] === $usuario && $u['senha'] === $senha) {
            $usuarioEncontrado = $u;
            break;
        }
    }

    if ($usuarioEncontrado) {
        $_SESSION['usuario'] = $usuarioEncontrado['nome'];
        $_SESSION['foto'] = $usuarioEncontrado['foto'] ?? 'default.jpg';

        // Include and render the profile page directly to avoid redirect issues.
        include 'perfil.php';
        exit;
    } else {
        $erro = "Usuário ou senha incorretos!";
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Streamly</title>
    <link rel="stylesheet" href="../css/styles.css">
    <script src="../js/script.js" defer></script>
</head>
<body>

<?php include '../includes/header.php'; ?>

<main class="p-8 flex justify-center">
    <form id="formLogin" method="POST" action="login.php" class="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

        <?php if ($erro): ?>
            <p class="text-red-600 mb-4"><?= htmlspecialchars($erro) ?></p>
        <?php endif; ?>

        <label for="usuario" class="block mb-1">Usuário:</label>
        <input type="text" name="usuario" id="usuario" required class="w-full mb-3 p-2 border rounded">

        <label for="senha" class="block mb-1">Senha:</label>
        <input type="password" name="senha" id="senha" required class="w-full mb-4 p-2 border rounded">

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Entrar</button>
    </form>
</main>

<?php include '../includes/footer.php'; ?>

</body>
</html>
