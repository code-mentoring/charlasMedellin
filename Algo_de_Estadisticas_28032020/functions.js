const fs = require('fs');
let datos = []

datos = fs.readFile('creditos.csv', 'utf8', function (err, data) {

  data = data.split(/\r?\n/).slice(1);
  // datos = datos.map(elem => parseInt(elem, 10))
  datos = data.map(elem => parseInt(elem.split(',')[0], 10))
  creditos = data.map(elem => parseInt(elem.split(',')[1], 10))

  const length = datos.length
  console.log('Datos: ');
  console.log('notas: ', datos);
  console.log('creditos: ', creditos)


  //mean media o promedio estimado 
  const meanReducer = (acum, currentValue) => acum + currentValue;
  const mean = datos.reduce(meanReducer) / length
  console.log('promedio: ', mean.toFixed(2));


  // promedio ponderado, este tiene en cuanta el valor y un peso asociado al mismo

  let pesos = 0;
  let acum = 0;
  for (var i = 0; i < length; i++) {
    pesos += creditos[i];
    acum += datos[i] * creditos[i];
  }

  let proPonderado = (acum / pesos).toFixed(1)
  console.log('Promedio ponderado: ', proPonderado);


  //Ordenamos los datos

  datos.sort((a, b) => a - b);
  console.log('Datos ordenados: ');
  console.log(datos);

  //mediana en datos ordenados es el elemento que tiene el 50% de los datos sobre el 
  // y el 50% por debajo 


  function calMediana(arreglo) {
    let mediana


    if (arreglo.length % 2 === 0) {
      const aux = length / 2;
      mediana = ((arreglo[aux] + arreglo[aux - 1]) / 2)

    } else {
      mediana = arreglo[(arreglo.length + 1) / 2]
    }

    return mediana
  }

  let mediana = calMediana(datos)
  console.log('mediana: ', mediana);


  // moda es el valor que mas se repite

  let contadores = [];

  datos.forEach(element => {
    let cont = 0;
    datos.forEach(elem => {
      if (elem === element) {
        cont++;
      }
    });
    contadores.push({
      valor: element,
      cuantos: cont,
    });
  });

  let mayor = 0;
  contadores.forEach(elem => {
    if (elem.cuantos > mayor) {
      mayor = elem.cuantos;
    }
  });

  const moda = contadores.find(elem => elem.cuantos === mayor);
  console.log('moda: ', moda.valor);


  // un cuartil es la minima cota superior al x% de los datos, por ejemplo
  // el primer cuartil o el del 25% es un numero que es superior al 25 de los
  // datos 

  const datosQua1 = datos.slice(0, length / 2);
  const datosQua3 = datos.slice((length + 1) / 2, length);

  console.log('datosQua1 ', datosQua1);

  console.log('datosQua3 ', datosQua3);


  const qua1 = calMediana(datosQua1)
  const qua3 = calMediana(datosQua3)
  console.log('cuartiles: ');
  console.log('cuartil 1: ', qua1);
  console.log('cuartil 2: ', mediana);
  console.log('cuartil 3: ', qua3);
  console.log('cuartil 4 (max value): ', datos[length - 1]);
  console.log('min value: ', datos[0]);

  // desviacion estandar
  // es una medida que se usa para cuantificar la variación o dispersión de un conjunto de datos numéricos


  const distReducer = (acum, currentValue) => acum + (currentValue - mean) ** 2;
  const dist = datos.reduce(distReducer, 0);

  const desv = Math.sqrt(dist / length).toFixed(1)

  console.log('desviacion: ', desv);


});
