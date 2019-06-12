import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  name: 'bar-chart',
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options', 'chart-data'],
  mounted () {
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  }
};
