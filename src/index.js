import { some } from './some.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.scss'

const someF = () => console.log('somF')

console.log(' 987 ' + Date.now(), some(5))

someF()
