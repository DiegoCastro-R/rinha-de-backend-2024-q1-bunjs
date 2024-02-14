export interface TransactionOperation {
    valor: number;
    tipo: string;
    descricao: string;
}

export interface Transaction {
    id: number;
    cliente_id: number;
    valor: number;
    tipo: 'c' | 'd'; // 'c' for credit, 'd' for debit
    descricao: string;
    realizada_em: Date;
}
