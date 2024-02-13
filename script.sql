-- Create the 'clientes' table
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    limite INT NOT NULL,
    saldo INT NOT NULL
);

-- Create the 'transacoes' table
CREATE TABLE IF NOT EXISTS transacoes (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    valor INT NOT NULL,
    tipo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    realizada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Insert initial data into the 'clientes' table
INSERT INTO clientes (limite, saldo) VALUES
(1000 * 100, 0),
(800 * 100, 0),
(10000 * 100, 0),
(100000 * 100, 0),
(5000 * 100, 0);
