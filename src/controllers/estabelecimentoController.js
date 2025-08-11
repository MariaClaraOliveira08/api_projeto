const connect = require("../db/connect");

// Controller para estabelecimentos
module.exports = class estabelecimentosController {
  
  // Criar novo estabelecimento
  static async createEstabelecimento(req, res) {
    const { placeId, nome, endereco, tipo, latitude, longitude, telefone, website } = req.body;

    if (!placeId || !nome || !endereco || !tipo) {
      return res.status(400).json({ error: "Campos placeId, nome, endereco e tipo são obrigatórios" });
    }

    try {
      // Verificar se já existe estabelecimento com esse placeId
      const existe = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM estabelecimentos WHERE place_id = ? LIMIT 1`;
        connect.query(query, [placeId], (err, results) => {
          if (err) return reject(err);
          resolve(results.length > 0);
        });
      });

      if (existe) {
        return res.status(400).json({ error: "Estabelecimento já cadastrado" });
      }

      // Inserir novo estabelecimento
      const queryInsert = `INSERT INTO estabelecimentos (place_id, nome, endereco, tipo, latitude, longitude, telefone, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      connect.query(
        queryInsert,
        [placeId, nome, endereco, tipo, latitude, longitude, telefone || null, website || null],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro interno ao salvar estabelecimento" });
          }
          return res.status(201).json({ message: "Estabelecimento criado com sucesso", id: result.insertId });
        }
      );
    } catch (error) {
      return res.status(500).json({ error: "Erro interno do servidor", details: error.message });
    }
  }

  // Buscar todos os estabelecimentos
  static async getAllEstabelecimentos(req, res) {
    const query = `SELECT * FROM estabelecimentos`;

    connect.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno ao buscar estabelecimentos" });
      }
      return res.status(200).json({ message: "Lista de estabelecimentos", estabelecimentos: results });
    });
  }

  // Atualizar estabelecimento
  static async updateEstabelecimento(req, res) {
    const { id, nome, endereco, tipo, latitude, longitude, telefone, website } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID do estabelecimento é obrigatório" });
    }

    const query = `UPDATE estabelecimentos SET nome = ?, endereco = ?, tipo = ?, latitude = ?, longitude = ?, telefone = ?, website = ? WHERE id = ?`;

    connect.query(
      query,
      [nome, endereco, tipo, latitude, longitude, telefone || null, website || null, id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno ao atualizar estabelecimento" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Estabelecimento não encontrado" });
        }
        return res.status(200).json({ message: "Estabelecimento atualizado com sucesso" });
      }
    );
  }

  // Deletar estabelecimento
  static async deleteEstabelecimento(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID do estabelecimento é obrigatório" });
    }

    const query = `DELETE FROM estabelecimentos WHERE id = ?`;

    connect.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno ao deletar estabelecimento" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Estabelecimento não encontrado" });
      }
      return res.status(200).json({ message: "Estabelecimento excluído com sucesso" });
    });
  }

  // Buscar estabelecimento por placeId
  static async getEstabelecimentoByPlaceId(req, res) {
    const { placeId } = req.params;
    if (!placeId) {
      return res.status(400).json({ error: "PlaceId é obrigatório" });
    }

    const query = `SELECT * FROM estabelecimentos WHERE place_id = ? LIMIT 1`;

    connect.query(query, [placeId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno ao buscar estabelecimento" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Estabelecimento não encontrado" });
      }
      return res.status(200).json({ estabelecimento: results[0] });
    });
  }
};
