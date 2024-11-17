const UserRepository = require('../repository/userRepository');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios.' });
    }
    try {
        //bucar el usuario si existe
        const user = await UserRepository.findByUsername(username);
        if (!user) 
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        // comparaion contraseña de db con la escrita
        if (user.password !== password) 
            return res.status(400).json({ error: 'Contraseña incorrecta.' });
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        // error desconocido "db, timeout"
        console.error('Error al iniciar sesión:', error.message);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
