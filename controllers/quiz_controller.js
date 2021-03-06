var models = require('../models/models.js');

// Autoload - factoriza el c�digo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
   models.Quiz.find({
		where: {
			id: Number(quizId)
		},
		include: [{
			model: models.Comment
		}]
	}).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
/*Anterior
exports.index = function(req, res) {
    models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index', { quizes: quizes});
    }
  ).catch(function(error) { next(error);})
};*/

//GET /quizes. Buscamos la pregunta 
exports.index = function(req, res) {
  var buscar = ("%" + req.query.search + "%").replace(/ /g, '%');
  
  //Si existe la variable buscar...
  if(req.query.search) {
    models.Quiz.findAll({
		where: ["UPPER(pregunta) LIKE ?", buscar.toUpperCase()], 
		order: [['pregunta',  'ASC']]}
	).then(function(quizes) {
		res.render('quizes/index', { quizes: quizes, errors: []});
	}).catch(function(error)  {next(error);})
    
  }else {
	models.Quiz.findAll().then(
        function(quizes) {
			res.render('quizes/index', { quizes: quizes, errors: []});
		}
      ).catch(function(error){ next(error); })
  }
 };

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
  );

  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
		
	var errors=quiz.validate();
	if(errors){
		res.render('quizes/new', {quiz: quiz, errors: errors});
	  } else {
		quiz // save: guarda en DB campos pregunta, respuesta y tema de quiz
		.save({fields: ["pregunta", "respuesta", "tema"]})
		.then( function(){ res.redirect('/quizes')}) 
	  }      // res.redirect: Redirecci�n HTTP a lista de preguntas
    
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;  // req.quiz: autoload de instancia de quiz

  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  var errors=req.quiz.validate();
	if(errors){
        res.render('quizes/edit', {quiz: req.quiz, errors: errors});
    } else {
        req.quiz     // save: guarda campos pregunta, respuesta y tema en DB
        .save( {fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes');});
    }     // Redirecci�n HTTP a lista de preguntas (URL relativo)
  
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};

//  console.log("req.quiz.id: " + req.quiz.id);

//m�todo GET de la respuesta /author
exports.author = function(req, res){
	res.render('author', {nombre: 'Senor X', srcImagen:'/images/senorX.png', errors: []});
}