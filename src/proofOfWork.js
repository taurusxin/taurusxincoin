const sha256 = require('crypto-js/sha256');

console.log(sha256('taurusxin1').toString());
console.log(sha256('taurusxin2').toString());

// 对于不同的输入，哪怕只是一个很微小的改动，输出结果就是不一样的
// 对于同一个输入，输出结果都是一样的

// 我现在需要得到一个开头为0的哈希，请告诉我X是多少
// 我现在需要得到一个前四位为0的哈希，请告诉我X是多少


function proofOfWork() {
  let data = 'taurusxin';
  let x = 1;
  while (true) {
    if (sha256(data + x).toString().substring(0, 4) !== '0000') {
      x += 1;
    } else {
      console.log(sha256(data + x).toString());
      console.log(x);
      break;
    }
  }
}

proofOfWork();
