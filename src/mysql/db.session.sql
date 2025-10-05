CREATE TABLE IF NOT EXISTS produto(
    idProduto INT NOT NULL, AUTO_INCREMENT,
    descricao VARCHAR(45) NOT NULL,
    marca VARCHAR(45) NOT NULL,
    quantidade INT NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY (idProduto)
);

CREATE TABLE IF NOT EXISTS apoiador(
    idApoiador INT NOT NULL, AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    notificar BOOLEAN NOT NULL,
    CONSTRAINT pk_apoiador PRIMARY KEY (idApoiador)
);

INSERT INTO produto (descricao, marca, quantidade) VALUES
('Ração', 'Pedigree', 0),
('Brinquedo', 'PetLove', 3);

INSERT INTO apoiador (nome, email, endereco, telefone, notificar) VALUES
('Evandro', 'evandrotaroco@gmail.com', 'Rua TesteA, 123', '(11) 99999-1111', 1),
('Matheus', 'matheuschizzolini@gmail.com', 'Rua TesteB, 456', '(11) 99999-2222', 1),
('João Vitor', 'joaovitor@gmail.com', 'Rua TesteC, 789', '(11) 99999-3333', 1),
('João Eduardo', 'joaoeduardo@gmail.com', 'Rua TesteD, 101', '(11) 99999-4444', 0);