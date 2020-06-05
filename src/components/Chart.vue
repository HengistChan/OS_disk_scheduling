<template>
  <div :id="type" style="height: 500px"></div>
</template>

<script>
  export default {
    name: "Chart",
    props: ['cdata', "type", 'start'],
    data() {
      return {
        mychart: null
      }
    },
    methods: {
      create_chart() {
        let dom = document.getElementById(this.type.toString());
        let chart = this.$echarts.init(dom);
        chart.setOption({
            title: {
              text: this.type
            },
            tooltip: {trigger: 'axis'},
            xAxis: {
              name: '时间',
              boundaryGap: false,
              type: 'value',
              max: this.cdata.time[this.cdata.time.length -1][0] + 10
            },
            yAxis: {name: '磁道'},
            dataZoom: [
              {type: 'inside'},
              {
                type: 'slider',
                show: true,
                xAxisIndex: [0]
              },
              {
                type: 'slider',
                show: true,
                yAxisIndex: [0]
              }
            ],
            series: [{
              name: '磁道',
              type: 'line',
              data: [[0,this.start],...this.cdata.time]
            }]
          }
        )
        this.mychart = chart;
      }
    },
    watch: {
      cdata() {
        if (this.mychart !== null)
          this.mychart.clear();
        this.create_chart();
      }
    }
  }
</script>

<style scoped>

</style>
