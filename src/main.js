// data
// previous hash
// self hash (data + previous hash)

const sha256 = require('crypto-js/sha256')

class Block {
  constructor(data, previousHash) {
    this.data = data
    this.previousHash = previousHash
    this.hash = this.computeHash()
  }

  computeHash() {
    return sha256(this.data + this.previousHash).toString()
  }
}

// the chain of blocks
// generate the genisis block

class Chain {
  constructor() {
    this.chain = [this.bigBang()]
  }

  bigBang() {
    const genisisBlcok = new Block('我是祖先', '')
    return genisisBlcok
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlockToChain(newBlock) {
    // find the nearest block's hash
    // which is the new block's previous hash
    newBlock.previousHash = this.getLatestBlock().hash
    newBlock.hash = newBlock.computeHash()
    this.chain.push(newBlock)
  }

  // check the previous hash is equal to previous block's hash
  validateChain() {
    if (this.chain.length === 1) {
      if (this.chain[0].hash !== this.chain[0].computeHash()) {
        return false
      }
      return true
    }
    // check if current data has been change
    for (let i = 1; i < this.chain.length; i++) {
      const blockToValidate = this.chain[i]
      if (blockToValidate.hash !== blockToValidate.computeHash()) {
        console.log('data has been change')
        return false
      }

      const previousBlcok = this.chain[i - 1]
      if (blockToValidate.previousHash !== previousBlcok.hash) {
        console.log('previous and current block lost connection')
        return false
      }
    }
    return true
  }
}

const taurusxinChain = new Chain()

const block1 = new Block('转账十元', '')
taurusxinChain.addBlockToChain(block1)
const block2 = new Block('转账十个十元', '')
taurusxinChain.addBlockToChain(block2)

console.log(taurusxinChain)
console.log(taurusxinChain.validateChain())

// try to change the block
taurusxinChain.chain[1].data = '转账一百个十元'
console.log(taurusxinChain.validateChain())
