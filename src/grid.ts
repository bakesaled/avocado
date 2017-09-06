import { Node } from './node';

export class Grid {
  private nodes: Array<Array<Node>>;

  public height: number;
  public width: number;

  constructor(private matrix: Array<Array<number>>) {
    this.init();
  }

  public init() {
    this.nodes = this.buildNodes();
  }

  private buildNodes(): Array<Array<Node>> {
    this.height = this.matrix.length;
    this.width = this.matrix[0].length;
    let nodes = new Array(this.height);

    for (let i = 0; i < this.height; i++) {
      nodes[i] = new Array(this.width);
      for (let j = 0; j < this.width; j++) {
        nodes[i][j] = new Node(j, i, this.matrix[i][j] === 0);
      }
    }

    return nodes;
  }
}
