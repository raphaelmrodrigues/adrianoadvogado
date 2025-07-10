# Adriano Lisboa Advogados - Landing Page

Uma landing page moderna e profissional para o escritório de advocacia do Dr. Adriano Lisboa, especialista em direito da família.

## 🚀 Características

### Design Moderno
- **Design Responsivo**: Adaptável a todos os dispositivos
- **Interface Profissional**: Visual clean e elegante
- **Tipografia Otimizada**: Fonte Inter para melhor legibilidade
- **Paleta de Cores Profissional**: Azul e dourado para transmitir confiança

### Funcionalidades
- **Navegação Suave**: Scroll suave entre seções
- **Animações Interativas**: Efeitos visuais modernos
- **Formulário de Contato**: Integração com WhatsApp
- **Contadores Animados**: Estatísticas dinâmicas
- **Menu Mobile**: Navegação otimizada para dispositivos móveis

### Seções Principais
1. **Hero Section**: Apresentação impactante com call-to-action
2. **Sobre**: Informações sobre o advogado e experiência
3. **Serviços**: Áreas de atuação detalhadas
4. **Depoimentos**: Testemunhos de clientes
5. **CTA**: Formulário de consulta gratuita
6. **Contato**: Informações de contato completas

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com CSS Grid e Flexbox
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia Inter

## 📁 Estrutura do Projeto

```
adrianoadvogado/
├── public/
│   ├── index.html          # Página principal
│   ├── css/
│   │   └── style.css       # Estilos da aplicação
│   ├── js/
│   │   └── main.js         # Funcionalidades JavaScript
│   └── images/             # Imagens do projeto
├── server.js               # Servidor Node.js
├── package.json            # Dependências do projeto
└── README.md              # Documentação
```

## 🎨 Design System

### Cores
- **Primary**: `#1e40af` (Azul principal)
- **Secondary**: `#f59e0b` (Dourado)
- **Accent**: `#10b981` (Verde)
- **Text Primary**: `#1a1a1a` (Texto principal)
- **Text Secondary**: `#6b7280` (Texto secundário)

### Tipografia
- **Família**: Inter
- **Pesos**: 300, 400, 500, 600, 700
- **Hierarquia**: Títulos grandes para impacto, texto legível para conteúdo

### Componentes
- **Cards**: Bordas arredondadas com sombras suaves
- **Botões**: Gradientes com efeitos hover
- **Formulários**: Campos com validação visual
- **Navegação**: Header fixo com backdrop blur

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd adrianoadvogado
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o servidor**
```bash
npm start
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 📱 Responsividade

A landing page é totalmente responsiva e otimizada para:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Breakpoints
- `@media (max-width: 1024px)`: Ajustes para tablets
- `@media (max-width: 768px)`: Layout mobile
- `@media (max-width: 480px)`: Otimizações para smartphones

## ⚡ Performance

### Otimizações Implementadas
- **Lazy Loading**: Imagens carregadas sob demanda
- **Debounce**: Otimização de eventos de scroll
- **CSS Otimizado**: Estilos organizados e eficientes
- **JavaScript Modular**: Código limpo e reutilizável

### Métricas de Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Personalização

### Alterando Informações
1. **Dados do Advogado**: Edite o arquivo `index.html`
2. **Cores**: Modifique as variáveis CSS em `style.css`
3. **Imagens**: Substitua as URLs das imagens
4. **Contato**: Atualize telefone e endereço

### Adicionando Novas Seções
1. Crie a estrutura HTML na seção desejada
2. Adicione os estilos CSS correspondentes
3. Implemente funcionalidades JavaScript se necessário

## 📞 Integração WhatsApp

O formulário de contato está configurado para integração com WhatsApp:

```javascript
// Configuração no main.js
const phoneNumber = '5562999999999'; // Substitua pelo número real
const message = 'Olá! Gostaria de agendar uma consulta jurídica.';
```

## 🎯 SEO

### Meta Tags Implementadas
- **Title**: Otimizado para busca
- **Description**: Descrição clara dos serviços
- **Viewport**: Configuração para dispositivos móveis
- **Favicon**: Ícone personalizado

### Estrutura Semântica
- **Header**: Navegação principal
- **Main**: Conteúdo principal
- **Section**: Seções organizadas
- **Footer**: Informações de contato

## 🔒 Segurança

- **Validação de Formulários**: Client-side e server-side
- **Sanitização de Dados**: Prevenção de XSS
- **HTTPS**: Recomendado para produção

## 📈 Analytics

Para implementar Google Analytics:

```html
<!-- Adicione no head do index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Deploy

### Opções de Deploy
1. **Netlify**: Deploy automático via Git
2. **Vercel**: Otimizado para performance
3. **GitHub Pages**: Gratuito e simples
4. **Servidor Próprio**: Node.js com PM2

### Variáveis de Ambiente
```env
NODE_ENV=production
PORT=3000
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💼 Sobre o Advogado

**Dr. Adriano Lisboa** é especialista em direito da família com mais de 15 anos de experiência, oferecendo soluções jurídicas eficientes e atendimento humanizado em Goiânia e região.

### Áreas de Atuação
- Direito da Família
- Direito Trabalhista
- Direito Previdenciário
- Direito do Consumidor

## 📞 Contato

- **Telefone**: (62) 99999-9999
- **WhatsApp**: (62) 99999-9999
- **Email**: contato@adrianolisboa.com.br
- **Endereço**: Rua das Palmeiras, 123 - Centro, Goiânia - GO

---

**Desenvolvido com ❤️ para o Dr. Adriano Lisboa Advogados**

