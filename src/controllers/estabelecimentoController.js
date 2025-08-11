const { buscarEstabelecimentosGoogle } = require('../services/googleMapsService');

exports.buscarEstabelecimentos = async (req, res) => {
  try {
    const { location, radius, type } = req.query;

    if (!location || !radius || !type) {
      return res.status(400).json({ error: 'Parâmetros location, radius e type são obrigatórios' });
    }

    const estabelecimentosGoogle = await buscarEstabelecimentosGoogle(location, radius, type);

    return res.status(200).json({
      message: 'Busca concluída com sucesso',
      estabelecimentos: estabelecimentosGoogle
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar estabelecimentos' });
  }
};
