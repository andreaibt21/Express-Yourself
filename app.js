const express = require('express');
const app = express();

// Serves Express Yourself website
app.use(express.static('public'));

const { getElementById, getIndexById, updateElement,
  seedElements, createElement } = require('./utils');

const expressions = [];
seedElements(expressions, 'expressions');

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

app.get('/expressions', (req, res, next) => {
  res.send(expressions);
});
//GET
app.get('/expressions/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});
//Update Expression
app.put('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

// Create new Expression:
app.post('/expressions', (req, res, next) => {
  const validExpre = createElement('expressions', req.query);

  if (validExpre) {
    expressions.push(validExpre)
    res.status(201).send(validExpre)
  } else {
    res.status(400).send();
  };
});

//Delete Expression:
app.delete('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


//ANIMALS 
//get animals
app.get('/animals', (req, res, next) => {
  res.send(animals)
})
app.get('/animals/:id', (req, res, next) => {
  const getId = getElementById(req.params.id, animals);
  if (getId) {
    res.send(getId);
  } else {
    res.status(404).send();
  }
})
//Update Animals
app.put('/animals/:id', (req, res, next) => {
  const indexAnimal = getIndexById(req.params.id, animals)
  if (indexAnimal !== -1) {
    const updateAnimal = updateElement(req.params.id, req.query, animals)
    res.send(updateAnimal)
  } else {
    res.status(404).send()
  }
});
//Create new animal
app.post('/animals', (req, res, next) => {
  const newAnimal = createElement('animals', req.query);
  if (newAnimal) {
    animals.push(newAnimal);
    res.status(201).send(newAnimal);
  } else {
    res.status(400).send();
  }
});
//Delete animal
app.delete('/animals/:id', (req, res, next) => {
  const deleteAnimal = getIndexById(req.params.id, animals)
  if (deleteAnimal === -1) {
    res.status(404).send();
  } else {
    res.status(204).send(animals.splice(deleteAnimal, 1));
  }

});
