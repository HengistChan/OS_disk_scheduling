<template>
  <div v-show="fcfs_data !== null">
    <div class="table">
      <el-table :data="tableData">
        <el-table-column
            prop="type"
            label="调度算法"
            width="180">
        </el-table-column>
        <el-table-column
            prop="time"
            label="寻道总长度"
            width="180">
        </el-table-column>
        <el-table-column
            prop="avg"
            label="平均寻道长度"
            width="180">
        </el-table-column>
      </el-table>
    </div>
    <div class="charts">
      <chart :start="start" :cdata="fcfs_data" type="fcfs_data"></chart>
      <chart :start="start" :cdata="sstf_data" type="sstf_data"></chart>
      <chart :start="start" :cdata="scan_data" type="scan_data"></chart>
      <chart :start="start" :cdata="cscan_data" type="cscan_data"></chart>
    </div>
  </div>
</template>

<script>
  import main from '../assets/mian';
  import Chart from "./Chart";

  export default {
    name: "Charts",
    props: ['randomData', 'start'],
    data() {
      return {
        fcfs_data: null,
        sstf_data: null,
        scan_data: null,
        cscan_data: null,
        tableData: []
      }
    },
    methods: {
      doMain() {
        this.fcfs_data = main.fcfs(this.randomData, this.start);
        this.sstf_data = main.sstf(this.randomData, this.start);
        this.scan_data = main.scan(this.randomData, this.start);
        this.cscan_data = main.cscan(this.randomData, this.start);
        this.avg();
      },
      avg() {
        this.tableData = [];
        let len = this.randomData.length;
        let fcfs_time = this.fcfs_data.time[this.fcfs_data.time.length - 1][0];
        let sstf_time = this.sstf_data.time[this.sstf_data.time.length - 1][0];
        let scan_time = this.scan_data.time[this.scan_data.time.length - 1][0];
        let cscan_time = this.cscan_data.time[this.cscan_data.time.length - 1][0];
        this.tableData.push({type: 'fcfs', avg: (fcfs_time / len).toFixed(2), time: fcfs_time});
        this.tableData.push({type: 'sstf', avg: (sstf_time / len).toFixed(2), time: sstf_time});
        this.tableData.push({type: 'scan', avg: (scan_time / len).toFixed(2), time: scan_time});
        this.tableData.push({type: 'cscan', avg: (cscan_time / len).toFixed(2), time: cscan_time});
      }
    },
    watch: {
      randomData() {
        this.doMain();
      },
      start() {
        this.doMain();
      }
    },
    components: {Chart}
  }
</script>

<style scoped>
  .charts {
    margin-top: 3%;
  }
  .table {
    position: relative;
    margin: auto;
  }
</style>
