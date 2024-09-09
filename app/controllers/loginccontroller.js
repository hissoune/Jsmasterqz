const Formateur = require('../models/Formateurmodel');

const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        if (role === 'Formateur') {
            const formateur = await Formateur.checkcridencials({ email, password });

            if (formateur) {
                req.session.user = {
                    id: formateur.id,
                    name: formateur.firstname,
                    role: 'Formateur'  
                };
                return res.redirect('/Dashboard');  
            } else {
                return res.status(401).send('Invalid credentials for Formateur');
            }
        } 
        else if (role === 'Student') {
            const student = await Student.checkcridencials({ email, password });

            if (student) {
                
                req.session.user = {
                    id: student.id,
                    name: student.name,
                    role: 'Student'  
                };
                return res.redirect('/student');  
            } else {
                return res.status(401).send('Invalid credentials for Student');
            }
        } 
        else {
            return res.status(403).send('Unauthorized role');
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send('Internal Server Error');
    }
};




const register =async (req, res) => {
     try {
        const { firstname,lastname,email,password ,adress,datenessance,specialty } = req.body;
         await Formateur.insert({ firstname, lastname, created_at: new Date(),email,password,adress,datenessance ,specialty });
        res.redirect('/login?type=Formateur');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const logout = (req, res) => {
     req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/'); 
    });

}

module.exports = {
    login,
    register,
    logout
};