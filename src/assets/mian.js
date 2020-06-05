export default {
  /**
   * FIFS算法
   */
  fcfs(data, start) {
    let tracks = [],                //移动的磁道数
      next = [];                    //下一个访问的磁道
    tracks.push(Math.abs(start - data[0]));
    data.forEach((v, i, arr) => {
      if (i !== 0) {
        tracks.push(Math.abs(arr[i] - arr[i - 1]))
      }
      next.push(v);
    })
    let time = this.add_time(next,tracks);
    console.log('fcfs',{next, tracks, time});
    return {next, tracks, time};
  },

  /**
   * SSTF算法
   */
  sstf(data, start) {
    //排序
    let len = data.length,
      now = start,
      tracks = [],
      next = [];

    data = this.b_sort(data);           //冒泡排序
    if (data[len - 1] <= now) {         //data数组中最后一个磁道是否小于或等于开始磁道
      tracks.push(Math.abs(now - data[len - 1]));
      data.forEach((v, i, arr) => {
        if (i !== 0)
          tracks.push(Math.abs(arr[len - i] - arr[len - i - 1]));
        next.push(arr[len - i - 1]);
      })
    } else if (data[0] >= now) {      //data数组中第一个磁道是否大于或等于开始磁道
      tracks.push(Math.abs(data[0] - now));
      data.forEach((v, i, arr) => {
        if (i !== 0)
          tracks[i] = Math.abs(arr[i - 1] - arr[i]);
        next.push(arr[i]);
      })
    } else {                     //起始磁道位于为data中间
      let l, r, k = 0;
      while (data[k] < now) {    //计算起始位置在data中的下标
        k++;
      }
      l = k - 1;
      r = k;

      while ((l >= 0) && (r < len)) {              //就近选择算法
        if ((now - data[l]) <= (data[r] - now)) {
          tracks.push(now - data[l]);
          next.push(data[l]);
          now = data[l];
          l = l - 1;
        } else {
          tracks.push(data[r] - now);
          next.push(data[r]);
          now = data[r];
          r = r + 1;
        }
      }
      if (l == -1) {                         //处理剩余数组元素
        for (let j = r; j < len; j++) {
          tracks.push(data[j] - now);
          next.push(data[j]);
          now = data[j];
        }
      } else {
        for (let j = l; j >= 0; j--) {
          tracks.push(now - data[j]);
          next.push(data[j]);
          now = data[j];
        }
      }
    }
    let time = this.add_time(next,tracks);     //计算移动磁道所花时间
    console.log('sstf', {next, tracks, time});
    return {next, tracks, time};
  },

  scan(data, start) {
    let now = start,
      len = data.length,
      tracks = [],
      next = [];
    data = this.b_sort(data);      //冒泡排序

    if (data[0] >= now) {         //data数组中第一个磁道是否大于或等于开始磁道
      tracks[0] = data[0] - now;
      data.forEach((v, i, arr) => {
        if (i !== 0)
          tracks.push(arr[i] - arr[i - 1]);
        next.push(v)
      })
    } else {                    //起始磁道位于中间或末尾
      let k = 0, l, r;
      while (now > data[k] && k < data.length) {    //计算起始位置在data中的下标
        k++;
      }
      l = k - 1;
      r = k;
      for (let i = r; i < len; i++) {             //磁头递增方向移动
        next.push(data[i]);
        tracks.push(Math.abs(data[i] - now));
        now = data[i];
      }
      for (let i = l; i >= 0; i--) {              //回到起始位置，磁头递减方向移动
        next.push(data[i]);
        tracks.push(Math.abs(now - data[i]));
        now = data[i];
      }
    }
    let time = this.add_time(next,tracks);          //计算磁头移动时间
    console.log('scan', {next, tracks, time});
    return {next, tracks, time};
  },

  cscan(data, start) {
    let now = start,
      len = data.length,
      tracks = [],
      next = [];
    data = this.b_sort(data);       //冒泡排序

    if (data[0] >= now) {           //data数组中第一个磁道是否大于或等于开始磁道
      tracks[0] = data[0] - now;
      data.forEach((v, i, arr) => {
        if (i !== 0)
          tracks.push(arr[i] - arr[i - 1]);
        next.push(v)
      })
    } else {                //起始磁道位于中间或末尾
      let k = 0, l, r;
      while (now > data[k] && k < data.length) {   //计算起始位置在data中的下标
        k++;
      }
      l = k - 1;
      r = k;
      for (let i = r; i < len; i++) {            //磁头递增方向移动
        next.push(data[i]);
        tracks.push(Math.abs(data[i] - now));
        now = data[i];
      }
      for (let i = 0; i <= l; i++) {           //磁头指向data中第一个磁道，往递增方向移动到原起始位置
        next.push(data[i]);
        tracks.push(Math.abs(now - data[i]));
        now = data[i];
      }
    }
    let time = this.add_time(next,tracks);
    console.log('cscan', {next, tracks, time});
    return {next, tracks, time};
  },

  b_sort(data) {
    let tmp = [];
    data.forEach(v => tmp.push(v));
    for (let i = tmp.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (tmp[j] > tmp[j + 1]) {
          [tmp[j], tmp[j + 1]] = [tmp[j + 1], tmp[j]];
        }
      }
    }
    return tmp;
  },

  add_time(next,tracks) {
    let tmp = [],sum = 0;
    next.forEach((v,i) => {
      sum += tracks[i];
      tmp.push([sum,v])
    })
    return tmp;
  }
}
