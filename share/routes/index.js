const express = require('express');
const alunoRouter = require('./alunoRouter');
const cursoRouter = require('./cursoRouter');
const router = express.Router();
const moment = require('moment');
const chalk = require('chalk');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log(chalk.magenta('Requisição -> Hora: '+moment().format("MM/DD/YYYY HH:mm:ss"), " && URL -> "+req.path));
    next()
  })

router.use('/alunos', alunoRouter);
router.use('/cursos', cursoRouter);

router.get('/',function(req,res){return res.send("Página Inicial")});

module.exports = router;