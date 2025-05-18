import express from 'express';

const host = '0.0.0.0';
const port = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));

// Lista para armazenar os usuários cadastrados
const listaUsuarios = [];

// Página de login (GET)
app.get('/', (req, res) => {
  res.send(`
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <title>Página Inicial</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      </head>
      <body class="container mt-5">
        <div class="card">
          <h2 class="text-center">Login</h2>
          <form action="/login" method="POST"> <!-- Action para envio -->
            <div class="mb-3">
              <label for="emailLogin" class="form-label">Email</label>
              <input type="email" name="email" class="form-control" id="emailLogin" placeholder="Seu email">
            </div>
            <div class="mb-3">
              <label for="senhaLogin" class="form-label">Senha</label>
              <input type="password" name="senha" class="form-control" id="senhaLogin" placeholder="Senha">
            </div>
            <button type="submit" class="btn btn-primary w-100">Entrar</button>
          </form>
          <div class="text-center mt-3">
            <a href="/cadastro" class="btn btn-secondary">Novo Cadastro</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Página de Cadastro (GET)
app.get('/cadastro', (req, res) => {
  res.send(`
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <title>Cadastro</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      </head>
      <body class="container mt-5">
        <div class="card">
          <h2 class="text-center">Cadastro</h2>
          <form action="/cadastro" method="POST"> <!-- Action para envio -->
            <div class="mb-3">
              <label for="nomeUsuario" class="form-label">Nome</label>
              <input type="text" name="nome" class="form-control" placeholder="Seu nome">
            </div>
            <div class="mb-3">
              <label for="emailCadastro" class="form-label">Email</label>
              <input type="email" name="email" class="form-control" placeholder="Email">
            </div>
            <div class="mb-3">
              <label for="senhaCadastro" class="form-label">Senha</label>
              <input type="password" name="senha" class="form-control" placeholder="Senha">
            </div>
            <div class="mb-3">
              <label for="confirmaSenha" class="form-label">Confirme sua senha</label>
              <input type="password" name="confirmarSenha" class="form-control" placeholder="Confirme sua senha">
            </div>
            <button type="submit" class="btn btn-success w-100">Cadastrar</button>
          </form>
          <div class="text-center mt-3">
            <a href="/" class="btn btn-secondary">Voltar ao Login</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Processamento do cadastro (POST)
app.post('/cadastro', (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  if (senha !== confirmarSenha) {
    return res.send('<h3>Erro: As senhas não coincidem!</h3><a href="/cadastro">Voltar</a>');
  }

  listaUsuarios.push({ nome, email, senha });

  res.send(`<h3>Cadastro realizado com sucesso! 🎉</h3><p>Nome: ${nome}</p><p>Email: ${email}</p><a href="/">Voltar ao Login</a>`);
});

// Processamento do login (POST)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  
  const usuario = listaUsuarios.find(user => user.email === email && user.senha === senha);

  if (!usuario) {
    return res.send('<h3>Erro: Email ou senha inválidos!</h3><a href="/">Voltar</a>');
  }

  res.send(`<h3>Login efetuado com sucesso!</h3><p>Bem-vindo, ${usuario.nome}!</p><a href="/">Voltar</a>`);
});

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}/`);
});
