const Aluno = require("../models/aluno");
const Curso = require("../models/curso");
 
exports.index = async (req,res)=>{
  const alunos = await Aluno.findAll();
  return res.json(alunos)
}

exports.show = async(req,res)=>{
  const aluno = await Aluno.findByPk(req.params.id);
  return res.json(aluno);
}

exports.store = async(req,res)=>{
  const aluno = await Aluno.create(req.body);
  return res.json(aluno)
}

exports.update = async(req,res)=>{
  await Aluno.update(req.body, {where: {id: req.params.id}});
  const aluno = await Aluno.findByPk(req.params.id);
  return res.json(aluno)
}

exports.delete = async(req,res)=>{
  const aluno = await Aluno.findByPk(req.params.id);
  await Aluno.destroy({where: {id: req.params.id}});
  return res.json(aluno)
}