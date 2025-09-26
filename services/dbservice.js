import * as SQLite from 'expo-sqlite'; 

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('Quiz.db');
    return cx;
};

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

export async function adicionaPergunta(tema_id, perguntaObj) {
    console.log("Inserindo a pergunta");
    console.log(perguntaObj);
    let dbCx = await getDbConnection();    

    // PRAGMA foreign_keys = ON;
    await dbCx.execAsync('PRAGMA foreign_keys = ON;');
    
    let query = 'INSERT INTO perguntas (pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_correta, tema_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    // Mapeia o array de alternativas para extrair a alternativa correta e o texto das 4 alternativas
    const alternativaCorreta = perguntaObj.alternativas.find(alt => alt.isCorrect);
    
    const params = [
        perguntaObj.pergunta,
        perguntaObj.alternativas[0].text,
        perguntaObj.alternativas[1].text,
        perguntaObj.alternativas[2].text,
        perguntaObj.alternativas[3].text,
        alternativaCorreta ? alternativaCorreta.text : '', // Pega o texto da alternativa correta
        tema_id
    ];

    const result = await dbCx.runAsync(query, params);    
    await dbCx.closeAsync();    

    return result.changes === 1;    
};

export async function obtemTodosOsTemas() {
    var retorno = []
  const cx = await getDbConnection();
  try {
    const temas = await cx.getAllAsync('SELECT * FROM temas;');
    console.log("Temas encontrados:", temas);
    for (const registro of temas) {        
        let obj = {
            id: registro.id,
            nome: registro.nome_tema,        
        }
        retorno.push(obj);
    }
    return retorno;
  } catch (error) {
    console.error("Erro ao buscar temas:", error);
    return [];
  }
};

export async function adicionaTema(tema) {    
    console.log("Inserindo o tema");
    console.log(tema);
    let dbCx = await getDbConnection();    
    let query = 'insert into temas (nome_tema) values (?)';
    const result = await dbCx.runAsync(query, [tema.nome]);    
    await dbCx.closeAsync() ;    
    return result.changes == 1;    
};

export async function excluiTema(id) {
    let dbCx = await getDbConnection();
    let query = 'delete from temas where id=?';
    const result = await dbCx.runAsync(query, id);
    await dbCx.closeAsync() ;
    return result.changes == 1;    
};

export async function alteraTema(tema) {
    let dbCx = await getDbConnection();
    let query = 'update temas set nome_tema=? where id=?';
    const result = await dbCx.runAsync(query, [tema.nome,tema.id]);
    await dbCx.closeAsync() ;
    return result.changes == 1;
}

export async function obterPerguntasPorTema(temaId) {
    console.log(`Buscando perguntas para o tema ID: ${temaId}`);
    let dbCx = await getDbConnection();    
    let query = 'SELECT * FROM perguntas WHERE tema_id = ?;';

    let retorno = []
    
    try {
        // O método getAllAsync retorna todas as linhas que correspondem à query
        const resultados = await dbCx.getAllAsync(query, [temaId]);
        await dbCx.closeAsync();

        for (const registro of resultados) {        
        let obj = {
            id: registro.id,
            pergunta: registro.pergunta,        
        }
           retorno.push(obj);
    }
        console.log(retorno)
        return retorno;
    } catch (error) {
        console.error("Erro ao obter perguntas:", error);
        throw error;
    }
};