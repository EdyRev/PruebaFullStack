const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

// Simula un usuario
const user = { id: 1, username: 'demo' };

// Genera token válido por 1 hora
const token = jwt.sign(user, SECRET, { expiresIn: '1h' });

console.log('Tu token de prueba:');
console.log(token);