const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            connectSrc: ["'self'"]
        }
    }
}));

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta public
app.use(express.static('public'));

// Servir arquivos do Font Awesome
app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para teste de ícones
app.get('/test-icons', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-icons.html'));
});

// Rota para qualquer outra página (fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

// Rota de contato (para formulário)
app.post('/contato', (req, res) => {
    // Aqui você pode adicionar lógica para enviar email ou salvar dados
    console.log('Dados do formulário:', req.body);
    res.json({ 
        success: true, 
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
    });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
    });
});

// Rota 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📱 Teste de ícones: http://localhost:${PORT}/test-icons`);
    console.log(`📧 WhatsApp: https://wa.me/5562999999999`);
}); 