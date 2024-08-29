
import { Node } from './index'

export default class BinaryNode {
  value: string
  rigth: Node
  left: Node
  constructor (value: string, left: Node, rigth: Node) {
    this.value = value
    this.left = left
    this.rigth = rigth
  }
}
