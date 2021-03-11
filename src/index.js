import "bootstrap/dist/css/bootstrap.min.css"

const elem = document.createElement('input')

const someF = () => console.log('somF')

document.body.appendChild(elem)

console.log(' 900 ' + Date.now())

someF()