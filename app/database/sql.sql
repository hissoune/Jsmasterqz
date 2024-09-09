Drop database jcc;
CREATE database jcc;
use jcc;

CREATE TABLE Formateur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    specialite VARCHAR(255),
    date_de_naissance DATE,
    created_at DATE,
    adresse VARCHAR(255)
);


CREATE TABLE Classe (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    formateur_id INT,
    FOREIGN KEY (formateur_id) REFERENCES Formateur(id) ON DELETE CASCADE

);


CREATE TABLE Apprenants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_inscription DATE,
    adresse VARCHAR(255),
    classe_id INT,
    FOREIGN KEY (classe_id) REFERENCES Classe(id) ON DELETE CASCADE
);

CREATE TABLE Sujet (
    id INT PRIMARY KEY AUTO_INCREMENT,
    parent_id INT NULL,  
    formateur_id INT,
    title varchar(100),
    description text ,
    FOREIGN KEY (parent_id) REFERENCES Sujet(id) ON DELETE SET NULL,  
    FOREIGN KEY (formateur_id) REFERENCES Formateur(id) ON DELETE CASCADE  
);

CREATE TABLE Niveau (
    id INT PRIMARY KEY AUTO_INCREMENT,
    niveau VARCHAR(255),
    description TEXT,
    max INT,
    min INT
);

CREATE TABLE Test (
    id INT PRIMARY KEY AUTO_INCREMENT,
    scoreValidation INT,
    droitDeVue BOOLEAN,
    totalPoints INT,
    apprenant_id INT,
    sujet_id INT,
    niveau_id INT,
    FOREIGN KEY (apprenant_id) REFERENCES Apprenants(id) ON DELETE CASCADE,
    FOREIGN KEY (sujet_id) REFERENCES Sujet(id) ON DELETE CASCADE,
    FOREIGN KEY (niveau_id) REFERENCES Niveau(id) ON DELETE CASCADE
);

CREATE TABLE Passage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    remarque TEXT,
    score INT,
    date DATE,
    raison TEXT,
    isValider BOOLEAN,
    test_id INT,
    FOREIGN KEY (test_id) REFERENCES Test(id) ON DELETE CASCADE
);

CREATE TABLE Question (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('QSM', 'QSU', 'QDirect'),
    question TEXT,
    points INT,
    nbrReponse INT,
    sujet_id INT,
    niveau_id INT,
    FOREIGN KEY (sujet_id) REFERENCES Sujet(id) ON DELETE CASCADE,
    FOREIGN KEY (niveau_id) REFERENCES Niveau(id) ON DELETE CASCADE
);

CREATE TABLE Reponse (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reponse TEXT,
    isCorrect BOOLEAN,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES Question(id) ON DELETE CASCADE
);

CREATE TABLE Media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('Image', 'Video', 'Figure', 'sons'),
    path TEXT,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES Question(id) ON DELETE CASCADE
);

CREATE TABLE Question_reponse (
    question_id INT,
    reponse_id INT,
    isCorrect BOOLEAN,
    PRIMARY KEY (question_id, reponse_id),
    FOREIGN KEY (question_id) REFERENCES Question(id) ON DELETE CASCADE,
    FOREIGN KEY (reponse_id) REFERENCES Reponse(id) ON DELETE CASCADE
);
