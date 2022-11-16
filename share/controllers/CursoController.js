const Aluno = require("../models/aluno");
const Curso = require("../models/curso");
 
exports.index = async (req,res)=>{
  const cursos = await Curso.findAll();
  return res.json(cursos)
}

exports.show = async(req,res)=>{
  const curso = await Curso.findByPk(req.params.id);
  return res.json(curso);
}

exports.store = async(req,res)=>{
  const curso = await Curso.create(req.body);
  return res.json(curso)
}

exports.update = async(req,res)=>{
  await Curso.update(req.body, {where: {id: req.params.id}});
  const curso = await Curso.findByPk(req.params.id);
  return res.json(curso)
}

exports.delete = async(req,res)=>{
  const curso = await Curso.findByPk(req.params.id);
  await Curso.destroy({where: {id: req.params.id}});
  return res.json(curso)
}