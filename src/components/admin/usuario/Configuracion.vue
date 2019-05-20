<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <GChart
          type="ColumnChart"
          :data="chartData"
          :options="chartOptions"
        />    
      </v-flex>
      <v-flex sx6>
        <v-btn icon dark color="primary" @click.native="GraphicView = true">
          <v-icon>visibility</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-dialog v-model="GraphicView">
      <v-card>
        <v-card-title class="headline">
          <v-icon right>account_circle</v-icon>
          {{$t('physiotherapy.modifiedAshworthScale')}}
        </v-card-title>
        <v-layout row>
          <v-flex xs8 offset-xs2>
            <GChart
              type="ColumnChart"
              :data="chartData"
              :options="chartOptions"
              :resizeDebounce="500"
            />
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="true" class="seccion" dark @click.native="GraphicView = false">{{$t('common.close')}}
            <v-icon right>cancel</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { GChart } from 'vue-google-charts';
export default {
  components: {
    GChart
  },
  data () {
    return {
      GraphicView: false,
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Year', 'Medicina General', 'Psicomotricidad', 'Trabajo Social', 'Terapia Ocupacional', 'Medicina General', 'Psicomotricidad', 'Trabajo Social', 'Terapia Ocupacional'],
        ['Febrero', 50, 37, 43, 25, 50, 37, 43, 25],
        ['Marzo', 40, 27, 12, 32, 40, 27, 12, 32],
        ['Abril', 46, 34, 6, 54, 46, 34, 6, 54],
        ['Mayo', 37, 15, 39, 3, 37, 15, 39, 3]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017'
        }
      }
    };
  }
};
</script>
