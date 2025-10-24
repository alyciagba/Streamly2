<?php
if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

$nomeUsuario = $_SESSION['usuario'] ?? null;
$fotoUsuario = $_SESSION['foto'] ?? 'default.jpg';
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Listas - Streamly</title>
	<link rel="stylesheet" href="../css/styles.css">
	<script src="../js/script.js" defer></script>
</head>
<body>

<?php include '../includes/header.php'; ?>

<main class="p-8">
	<section class="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
		<h2 class="text-2xl font-bold mb-4">Listas de Filmes</h2>
		<div id="listas-page">
			<p>Aqui você pode ver suas listas de filmes.</p>
			<?php if ($nomeUsuario): ?>
				<div class="hstack mt-1">
					<select id="adicionar-filme-lista" class="form-input"></select>
					<input id="adicionar-filme-nome" type="text" placeholder="Título do filme" class="form-input flex-grow" />
					<button id="adicionar-filme-btn" class="bg-blue-600 text-white px-3 py-1 rounded">Adicionar</button>
				</div>
			<?php else: ?>
				<p>Você precisa estar logado para gerenciar listas. <a href="login.php">Entrar</a></p>
			<?php endif; ?>
		</div>
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
