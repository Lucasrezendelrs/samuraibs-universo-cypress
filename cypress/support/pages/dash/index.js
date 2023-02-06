import { el } from './elements'
import header from '../../components/header'

class DashPage {
  // Acesso aos elementos do "header" através do método contructor
  constructor() {
    this.header = header
  }
}
export default new DashPage()
