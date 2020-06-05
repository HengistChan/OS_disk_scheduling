export default {
  createDiskRequest() {
    // eslint-disable-next-line no-unused-vars
    let arr = [], count, tmp = [];
    count = 200;
    tmp = [];
    this.getRandoms(0, 499, count, tmp, count);
    arr = [...arr, ...tmp];

    count = 100;
    tmp = [];
    this.getRandoms(500, 999, count, tmp, count);
    arr = [...arr, ...tmp];

    count = 100;
    tmp = [];
    this.getRandoms(1000, 1499, count, tmp, count);
    arr = [...arr, ...tmp];
    //打乱arr数组
    for (let i = 0; i < arr.length; i++) {
      let tmp1 = Math.round(Math.random() * arr.length) % arr.length;
      let tmp2 = Math.round(Math.random() * arr.length) % arr.length;
      if (arr[tmp1] !== arr[tmp2]) {
        [arr[tmp1], arr[tmp2]] = [arr[tmp2], arr[tmp1]];
      }
    }
    return arr;
  },

  //获取指定长度及范围随机数
  getRandoms(begin, end, num, tmp, count) {
    if (num > (end - begin + 1) || end < begin) {
      return;
    }
    for (let i = 0; i < num; i++) {
      let temp = Math.round(Math.random() * (end - begin + 1)) + begin;
      tmp.push(temp);
    }
    let len = tmp.length;
    if (len < count) {
      this.getRandoms(begin, end, count - len, tmp, count);
    }
  }
}
