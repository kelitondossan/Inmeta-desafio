# Inmeta Trading Card Game

Um marketplace de cards colecionáveis onde você pode colecionar e trocar cards com outros usuários.

🎮 [Acessar Aplicação](https://inmeta-desafio.vercel.app/)

## 🚀 Tecnologias

- Vue 3
- TypeScript
- Tailwind CSS
- Pinia (Gerenciamento de Estado)
- Vue Router
- Vue Toastification
- HeadlessUI

## ✨ Funcionalidades

- 🎴 Visualização de cards disponíveis
- 👤 Sistema de autenticação
- 🔄 Sistema de trocas entre usuários
- 📱 Interface responsiva
- 🌓 Tema dark mode
- 🎨 Design moderno com efeitos de glassmorphism

## 🛠️ Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## ⚙️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/inmeta-desafio.git
cd inmeta-desafio
```

2. Instale as dependências:
```bash
# Usando npm
npm install

# Usando yarn
yarn
```

3. Configure as variáveis de ambiente:
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
```

4. Inicie o servidor de desenvolvimento:
```bash
# Usando npm
npm run dev

# Usando yarn
yarn dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🚀 Build para Produção

```bash
# Usando npm
npm run build

# Usando yarn
yarn build
```

## 📝 Estrutura do Projeto

```
src/
├── modules/           # Módulos da aplicação
│   ├── auth/         # Autenticação
│   ├── cards/        # Gerenciamento de cards
│   ├── trades/       # Sistema de trocas
│   └── users/        # Perfil e dashboard
├── shared/           # Componentes e utilitários compartilhados
├── services/         # Serviços e APIs
└── router/           # Configuração de rotas
```

## 🌐 Deploy

A aplicação está deployada na Vercel e pode ser acessada em:
[https://inmeta-desafio.vercel.app/](https://inmeta-desafio.vercel.app/)

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:
- Desktop
- Tablet
- Mobile

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

<