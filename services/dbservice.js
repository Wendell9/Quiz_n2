import * as FileSystem from 'expo-file-system/legacy';
import * as SQLite from "expo-sqlite";

const databaseName = "Quiz.db";

export async function limpaBancoDeDados() {
  const dbPath = `${FileSystem.documentDirectory}SQLite/${databaseName}`;

  try {
    // Usamos o getInfoAsync para verificar se o arquivo existe
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    
    if (fileInfo.exists) {
      console.log("Banco de dados existente. Apagando...");
      await FileSystem.deleteAsync(dbPath);
      console.log("Banco de dados apagado com sucesso.");
    } else {
      console.log("Nenhum banco de dados encontrado para apagar.");
    }
  } catch (error) {
    console.error("Erro ao tentar apagar o banco de dados:", error);
  }
}

export async function getDbConnection() {
  try {
    const cx = await SQLite.openDatabaseAsync("Quiz.db");
    console.log("Conexão com o banco de dados aberta.");
    return cx;
  } catch (error) {
    console.error("Erro ao abrir o banco de dados:", error);
    return null; // Retorna null em caso de falha
  }
}

export async function createTableTemas() {
  const query = `CREATE TABLE IF NOT EXISTS temas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_tema TEXT NOT NULL
        );`;
  try {
    var cx = await getDbConnection();
    // Verifique se a conexão é válida antes de tentar usá-la
    if (!cx) {
      console.error("Não foi possível estabelecer a conexão.");
      return;
    }
    await cx.execAsync(query);
    await cx.closeAsync();
    console.log("Tabelas 'temas' criadas com sucesso.");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
}

// Função para excluir as perguntas de um tema
export async function excluirPerguntasPorTema(idTema) {
  console.log("Perguntas do id a seguir serão excluidas: ", idTema);
  let dbCx = await getDbConnection();
  const result = await dbCx.runAsync(`DELETE FROM perguntas WHERE tema_id = ?;`, idTema);
  console.log(`Linhas afetadas pela exclusão: ${result.changes}`);
  await dbCx.closeAsync();
}

export async function excluiTodasAsPerguntas() {
  console.log("Excluindo todas as perguntas...");
  let dbCx = await getDbConnection();
  await dbCx.runAsync(`DELETE FROM perguntas`);
  await dbCx.closeAsync();
}

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
  //  const queryLimpaTabelaPergunta = `DROP TABLE IF EXISTS perguntas;`;
  try {
    var cx = await getDbConnection();
    //    await cx.execAsync(queryLimpaTabelaPergunta);
    await cx.execAsync(query);
    await cx.closeAsync();
    console.log("Tabelas'perguntas' criadas com sucesso.");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
}

export async function adicionaPergunta(tema_id, perguntaObj) {
  console.log("Inserindo a pergunta");
  console.log(perguntaObj);
  let dbCx = await getDbConnection();

  console.log(dbCx);

  // PRAGMA foreign_keys = ON;
  await dbCx.execAsync("PRAGMA foreign_keys = ON;");

  let query =
    "INSERT INTO perguntas (pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_correta, tema_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  console.log("Salvando a alternativa correta", perguntaObj.alternativaCorreta);
  const params = [
    perguntaObj.pergunta,
    perguntaObj.alternativas.find((alt) => alt.id == "A").text,
    perguntaObj.alternativas.find((alt) => alt.id == "B").text,
    perguntaObj.alternativas.find((alt) => alt.id == "C").text,
    perguntaObj.alternativas.find((alt) => alt.id == "D").text,
    perguntaObj.alternativaCorreta,
    tema_id,
  ];

  console.log(params);

  const result = await dbCx.runAsync(query, params);
  await dbCx.closeAsync();

  return result.changes === 1;
}

export async function obtemTodosOsTemas() {
  var retorno = [];
  const cx = await getDbConnection();

  try {
    const temas = await cx.getAllAsync("SELECT * FROM temas;");
    console.log("Temas encontrados:", temas);
    if (temas.length != 0) {
      for (const registro of temas) {
        let obj = {
          id: registro.id,
          nome: registro.nome_tema,
        };
        retorno.push(obj);
      }
    }
    return retorno;
  } catch (error) {
    console.error("Erro ao buscar temas:", error);
    return [];
  }
}

export async function adicionaTema(tema) {
  console.log("Inserindo o tema");
  console.log(tema);
  let dbCx = await getDbConnection();
  let query = "insert into temas (nome_tema) values (?)";
  const result = await dbCx.runAsync(query, [tema.nome]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function excluiTodosOsTemas() {
  await excluiTodasAsPerguntas();
  let dbCx = await getDbConnection();
  let query = "delete from temas";
  const result = await dbCx.runAsync(query);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function excluiTema(id) {
  await excluirPerguntasPorTema(id);
  let dbCx = await getDbConnection();
  let query = "delete from temas where id=?";
  const result = await dbCx.runAsync(query, id);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function excluiPergunta(idPergunta, idTema) {
  let dbCx = await getDbConnection();
  let query = "delete from perguntas where id=? and tema_id=?";
  const result = await dbCx.runAsync(query, [idPergunta, idTema]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function alteraTema(tema) {
  let dbCx = await getDbConnection();
  let query = "update temas set nome_tema=? where id=?";
  const result = await dbCx.runAsync(query, [tema.nome, tema.id]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function obterPerguntasPorTema(temaId) {
  console.log(`Buscando perguntas para o tema ID: ${temaId}`);
  let dbCx = await getDbConnection();

  // Verificação essencial: O erro acontece se a conexão for nula aqui
  if (!dbCx) {
    console.error("Conexão com o banco de dados falhou, não é possível buscar perguntas.");
    return []; // Retorne um array vazio ou lance um erro
  }

  let query = "SELECT * FROM perguntas WHERE tema_id = ?;";
  let retorno = [];

  try {
    const resultados = await dbCx.getAllAsync(query, [temaId]);
    await dbCx.closeAsync();
    if (resultados.length > 0) {
      for (const registro of resultados) {
        let obj = {
          id: registro.id,
          pergunta: registro.pergunta,
        };
        retorno.push(obj);
      }
      console.log(retorno);
    }
    return retorno;
  } catch (error) {
    console.error("Erro ao obter perguntas:", error);
    throw error;
  }
}

export async function puxarDadosPergunta(idPergunta, idTema) {
  console.log(
    `Buscando perguntas para o tema ID: ${idTema} Pergunta:${idPergunta}`
  );
  let dbCx = await getDbConnection();
  let query = "SELECT * FROM perguntas WHERE tema_id = ? and id = ?;";
  let pergunta;

  try {
    const resultado = await dbCx.getAllAsync(query, [idTema, idPergunta]);
    const dadosDaPergunta = resultado[0]; //Pega o primeiro elemento do array
    console.log(dadosDaPergunta.alternativa_correta);
    await dbCx.closeAsync();
    pergunta = {
      textoPergunta: dadosDaPergunta.pergunta,
      alternativas: [
        {
          id: "A",
          text: dadosDaPergunta.alternativa_a,
          isCorrect: dadosDaPergunta.alternativa_correta == "A",
        },
        {
          id: "B",
          text: dadosDaPergunta.alternativa_b,
          isCorrect: dadosDaPergunta.alternativa_correta == "B",
        },
        {
          id: "C",
          text: dadosDaPergunta.alternativa_c,
          isCorrect: dadosDaPergunta.alternativa_correta == "C",
        },
        {
          id: "D",
          text: dadosDaPergunta.alternativa_d,
          isCorrect: dadosDaPergunta.alternativa_correta == "D",
        },
      ],
    };
    console.log(pergunta);
    return pergunta;
  } catch (error) {
    console.error("Não foi possível puxar os dados da pergunta", error);
  }
}

export async function verificaPerguntaExistente(idTema, textoPergunta) {
    let dbCx = await getDbConnection();

    if (!dbCx) {
        console.error("Conexão com o banco de dados falhou, não é possível verificar a pergunta.");
        return false;
    }

    // A query agora usa TRIM() e LOWER() para uma busca robusta
    const query = `SELECT * FROM perguntas WHERE tema_id = ? AND LOWER(TRIM(pergunta)) = LOWER(TRIM(?));`;

    // Você passa o texto original, e o banco de dados fará a limpeza e conversão
    const params = [idTema, textoPergunta];

    try {
        const resultado = await dbCx.getAllAsync(query, params);
        await dbCx.closeAsync();

        return resultado.length > 0;
    } catch (error) {
        console.error("Erro ao verificar pergunta existente:", error);
        return false;
    }
}

export async function atualizaPergunta(idPergunta, perguntaObj, idTema) {
  console.log(
    `Atualizando perguntas para o tema ID: ${idTema} Pergunta:${idPergunta}`
  );
  let dbCx = await getDbConnection();
  let query =
    "UPDATE perguntas set pergunta = ?, alternativa_a = ?, alternativa_b = ?, alternativa_c = ?, alternativa_d = ?, alternativa_correta = ? WHERE tema_id = ? and id = ?;";

  console.log(perguntaObj.alternativas.find((alt) => alt.id == "A").text);

  try {
    const params = [
      perguntaObj.pergunta,
      perguntaObj.alternativas.find((alt) => alt.id == "A").text,
      perguntaObj.alternativas.find((alt) => alt.id == "B").text,
      perguntaObj.alternativas.find((alt) => alt.id == "C").text,
      perguntaObj.alternativas.find((alt) => alt.id == "D").text,
      perguntaObj.alternativaCorreta,
      idTema,
      idPergunta,
    ];

    console.log(params);

    const result = await dbCx.runAsync(query, params);
    await dbCx.closeAsync();
    return result.changes === 1;
  } catch (error) {
    console.error("Não foi possível atualizar os dados da pergunta", error);

    
  }
  
}

// services/dbservice.js

// ... (Outras funções existentes)

export async function obtemTemasComContagem() {
    var retorno = [];
    const cx = await getDbConnection();

    try {
        const query = `
            SELECT 
                t.id, 
                t.nome_tema, 
                COUNT(p.id) AS count_perguntas
            FROM 
                temas t
            LEFT JOIN 
                perguntas p ON t.id = p.tema_id
            GROUP BY 
                t.id, t.nome_tema;
        `;
        const temas = await cx.getAllAsync(query);
        await cx.closeAsync();

        if (temas.length > 0) {
            for (const registro of temas) {
                let obj = {
                    id: registro.id,
                    nome: registro.nome_tema,
                    count_perguntas: registro.count_perguntas // Adiciona a contagem
                };
                retorno.push(obj);
            }
        }
        return retorno;
    } catch (error) {
        console.error("Erro ao buscar temas com contagem:", error);
        return [];
    }
}

//Função para obter perguntas aleatórias para o jogo
export async function obtemPerguntasParaOJogo(temaId, quantidade) {
    console.log(`Buscando ${quantidade} perguntas aleatórias para o tema ID: ${temaId}`);
    let dbCx = await getDbConnection();

    if (!dbCx) {
        console.error("Conexão com o banco de dados falhou, não é possível buscar perguntas.");
        return [];
    }

    // SQLite usa ORDER BY RANDOM() para seleção aleatória.
    const query = `
        SELECT 
            id, 
            pergunta, 
            alternativa_a, 
            alternativa_b, 
            alternativa_c, 
            alternativa_d, 
            alternativa_correta
        FROM 
            perguntas 
        WHERE 
            tema_id = ? 
        ORDER BY 
            RANDOM() 
        LIMIT 
            ?;
    `;
    let retorno = [];

    try {
        const resultados = await dbCx.getAllAsync(query, [temaId, quantidade]);
        await dbCx.closeAsync();

        if (resultados.length > 0) {
            for (const registro of resultados) {
                // Estrutura para o jogo
                let obj = {
                    id: registro.id,
                    pergunta: registro.pergunta,
                    alternativas: [
                        { id: "A", text: registro.alternativa_a },
                        { id: "B", text: registro.alternativa_b },
                        { id: "C", text: registro.alternativa_c },
                        { id: "D", text: registro.alternativa_d },
                    ],
                    alternativaCorreta: registro.alternativa_correta,
                };
                retorno.push(obj);
            }
        }
        return retorno;
    } catch (error) {
        console.error("Erro ao obter perguntas para o jogo:", error);
        throw error;
    }
}
