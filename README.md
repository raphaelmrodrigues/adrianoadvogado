# Dr. Adriano - Site de Advocacia

Landing page profissional para advogado especialista em direito da família, desenvolvida com Node.js, Express e tecnologias web modernas.

## 🚀 Características

- **Design Responsivo**: Adaptável a todos os dispositivos
- **Performance Otimizada**: Carregamento rápido e eficiente
- **SEO Otimizado**: Meta tags e estrutura semântica
- **Formulário de Contato**: Sistema de envio de mensagens
- **Animações Suaves**: Efeitos visuais profissionais
- **Navegação Intuitiva**: Menu mobile e scroll suave
- **Segurança**: Middleware de proteção (Helmet, CORS)

## 📋 Seções do Site

1. **Hero Section**: Apresentação principal com call-to-action
2. **Sobre**: Informações sobre o advogado e estatísticas
3. **Serviços**: Lista completa de serviços oferecidos
4. **Depoimentos**: Testemunhos de clientes satisfeitos
5. **Contato**: Formulário e informações de contato
6. **Footer**: Links úteis e informações adicionais

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **Helmet**: Segurança HTTP
- **CORS**: Cross-Origin Resource Sharing
- **Morgan**: Logger de requisições

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna e responsiva
- **JavaScript**: Interatividade e funcionalidades
- **Google Fonts**: Tipografia profissional

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/raphaelmrodrigues/adrianoadvogado.git
   cd adrianoadvogado
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   # Modo desenvolvimento (com auto-reload)
   npm run dev
   
   # Modo produção
   npm start
   ```

4. **Acesse o site**
   - Abra seu navegador
   - Acesse: `http://localhost:3000`

## 🎨 Personalização

### Cores e Estilo
As cores principais do site estão definidas no arquivo `public/css/style.css`:

```css
/* Cores principais */
--primary-color: #2c3e50;
--secondary-color: #3498db;
--accent-color: #2980b9;
--text-color: #333;
--light-text: #7f8c8d;
```

### Conteúdo
Para personalizar o conteúdo, edite o arquivo `public/index.html`:

- **Informações do advogado**: Seção "Sobre"
- **Serviços oferecidos**: Seção "Serviços"
- **Dados de contato**: Seção "Contato" e Footer
- **Depoimentos**: Seção "Depoimentos"

### Imagens
- Adicione suas imagens na pasta `public/images/`
- Atualize os caminhos no HTML conforme necessário

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Configurações Avançadas

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
NODE_ENV=development
```

### Configuração do Formulário
Para conectar o formulário a um serviço de email real, edite o arquivo `server.js`:

```javascript
// Rota de contato (para formulário)
app.post('/contato', (req, res) => {
    // Adicione aqui sua lógica de envio de email
    // Exemplo com Nodemailer:
    // sendEmail(req.body);
    
    res.json({ 
        success: true, 
        message: 'Mensagem enviada com sucesso!' 
    });
});
```

### Deploy
Para fazer deploy em produção:

1. **Heroku**
   ```bash
   heroku create
   git push heroku main
   ```

2. **Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **DigitalOcean/AWS**
   - Configure um servidor Node.js
   - Use PM2 para gerenciar o processo

## 📊 Estrutura do Projeto

```
adrianoadvogado/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   ├── index.html
│   └── 404.html
├── server.js
├── package.json
└── README.md
```

## 🚀 Scripts Disponíveis

- `npm start`: Inicia o servidor em modo produção
- `npm run dev`: Inicia o servidor em modo desenvolvimento com auto-reload
- `npm test`: Executa os testes (a ser implementado)

## 🔒 Segurança

O projeto inclui várias camadas de segurança:

- **Helmet**: Headers de segurança HTTP
- **CORS**: Controle de acesso cross-origin
- **Validação de entrada**: Sanitização de dados do formulário
- **Rate limiting**: Proteção contra ataques de força bruta (recomendado adicionar)

## 📈 SEO e Performance

### Otimizações Implementadas
- Meta tags completas
- Estrutura HTML semântica
- Imagens otimizadas
- CSS e JS minificados
- Lazy loading de imagens
- Compressão gzip

### Meta Tags Incluídas
- Title e description
- Open Graph tags
- Keywords
- Viewport para mobile
- Charset UTF-8

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas:
- Email: contato@adrianoadvogado.com
- Telefone: (11) 99999-9999

## 🔄 Atualizações Futuras

- [ ] Sistema de blog
- [ ] Chat online
- [ ] Área do cliente
- [ ] Integração com WhatsApp
- [ ] Sistema de agendamento
- [ ] Analytics avançado

---

