import * as SQLite from 'expo-sqlite'; 

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('Quiz.db');
    return cx;
}

export async function createTableTemas() {    
    const query = `CREATE TABLE IF NOT EXISTS temas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_tema TEXT NOT NULL
        );`;
    try {
        var cx = await getDbConnection();
        await cx.execAsync(query);   
        await cx.closeAsync() ;
        console.log("Tabelas 'temas' criadas com sucesso.");
    } catch (error) {
        console.error("Erro ao criar tabelas:", error);
    }
};

export async function createTablePerguntas() {    
    const query = `CREATE TABLE IF NOT EXISTS perguntas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pergunta TEXT NOT NULL,
            alternativa_a TEXT NOT NULL,
            alternativa_b TEXT NOT NULL,
            alternativa_c TEXT NOT NULL,
            alternativa_d TEXT NOT NULL,
            alternativa_correta TEXT NOT NULL,
            tema_id INTEGER NOT NULL,
            FOREIGN KEY (tema_id) REFERENCES temas (id)
        );`;
    try {
        var cx = await getDbConnection();
        await cx.execAsync(query);   
        await cx.closeAsync() ;
        console.log("Tabelas'perguntas' criadas com sucesso.");
    } catch (error) {
        console.error("Erro ao criar tabelas:", error);
    }
};