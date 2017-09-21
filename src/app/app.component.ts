import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STATISTICS, STATS } from './data';
// import { $ } from 'protractor/built';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  // private width: number;
  // private height: number;
  // private margin = {top: 20, right: 20, bottom: 30, left: 40};
  groupChart: any;
  // private x: any;
  // private y: any;
  // private svg: any;
  // private g: any;

   groupChartData = [{ '2614': 8, '4449': 15, 'over': 1 },
   { '2614': 7, '4449': 2, 'over': 2 },
   { '2614': 4, '4449': 5, 'over': 3 },
   { '2614': 19, '4449': 8, 'over': 4 },
   { '2614': 3, '4449': 7, 'over': 5 },
   { '2614': 6, '4449': 1, 'over': 6 },
   { '2614': 7, '4449': 6, 'over': 7 },
   { '2614': 13, '4449': 2, 'over': 8 },
   { '2614': 1, '4449': 8, 'over': 9 },
   { '2614': 8, '4449': 9, 'over': 10 }];

   columnsInfo = { '2614': 'Team A', '4449': 'Team B' };

     barChartConfig = {
      mainDiv: '#chart',
      colorRange: ['#2a98cd', '#df7247'],
      data: this.groupChartData,
      columnsInfo: this.columnsInfo,
      xAxis: 'over',
      yAxis: 'runs',
      label: {
        xAxis: 'Over',
        yAxis: 'Runs'
      },
      requireLegend: true
    };



  constructor() {}

  ngOnInit() {

    this.groupBarChart(this.barChartConfig);
    // this.initSvg();
    // this.initAxis();
    // this.drawAxis();
    // this.drawBars();
    //  this.multiBarChart();
  }

  // private initSvg() {
  //   this.svg = d3.select('svg');
  //   this.width = +this.svg.attr('width') - this.margin.left - this.margin.right ;
  //   this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
  //   this.g = this.svg.append('g')
  //                    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');;
  // }

  // private initAxis() {
  //   this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
  //   this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
  //   this.x.domain(STATISTICS.map((d) => d.x));
  //   this.y.domain([0, d3Array.max(STATISTICS, (d) => d.y)]);
  // }

  // private drawAxis() {
  //   this.g.append('g')
  //         .attr('class', 'axis axis--x')
  //         .attr('transform', 'translate(0,' + this.height + ')')
  //         .call(d3Axis.axisBottom(this.x));
  //   this.g.append('g')
  //         .attr('class', 'axis axis--y')
  //         .call(d3Axis.axisLeft(this.y).ticks(10, '%'))
  //         .append('text')
  //         .attr('class', 'axis-title')
  //         .attr('transform', 'rotate(-90)')
  //         .attr('y', 6)
  //         .attr('dy', '0.71em')
  //         .attr('text-anchor', 'end')
  //         .text('y');
  // }

  // private drawBars() {
  //   this.g.selectAll('.bar')
  //         .data(STATISTICS)
  //         .enter().append('rect')
  //         .attr('class', 'bar')
  //         .attr('x', (d) => this.x(d.x) )
  //         .attr('y', (d) => this.y(d.y) )
  //         .attr('width', this.x.bandwidth())
  //         .attr('height', (d) => this.height - this.y(d.y) );
  // }
groupBarChart(config) {

      this.drawgroupBarChartChart(config);
      this.setReSizeEvent(config);
    }

    setReSizeEvent(data) {
        let resizeTimer;
        const interval = 500;
        window.removeEventListener('resize', function () {
        });
        window.addEventListener('resize', function (event) {

          if (resizeTimer !== false) {
            clearTimeout(resizeTimer);
          }
          resizeTimer = setTimeout(function () {
            $(data.mainDiv).empty();
            this.drawgroupBarChartChart(data);
            clearTimeout(resizeTimer);
          }, interval);
        });
      }

      drawgroupBarChartChart(config) {
      const data = config.data;
      let columnsInfo = config.columnsInfo;
      const xAxis = config.xAxis;
      const yAxis = config.yAxis;
      const colorRange = config.colorRange;
      const mainDiv = config.mainDiv;
      const mainDivName = mainDiv.substr(1, mainDiv.length);
      const label = config.label;
      const requireLegend = config.requireLegend;
      d3.select(mainDiv).append('svg').attr('width', $(mainDiv).width()).attr('height', $(mainDiv).height()*0.9);
      const svg = d3.select(mainDiv + ' svg'),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr('width') - margin.left - margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom;

      const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (requireLegend != null && requireLegend !== undefined && requireLegend !== false) {
        $('#Legend_' + mainDivName).remove();
        this.creategroupBarChartLegend(mainDiv, columnsInfo, colorRange);
      }

      let x0 = d3Scale.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

      const x1 = d3Scale.scaleBand()
        .padding(0.05);

      const y = d3Scale.scaleLinear()
        .rangeRound([height, 0]);

      const z = d3Scale.scaleOrdinal()
        .range(colorRange);

      const keys = Object.keys(columnsInfo);
      x0.domain(data.map(function (d) {
        return d[xAxis];
      }));
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);
      y.domain([0, d3.max(data, function (d) {
        return d3.max(keys, function (key) {
          return d[key];
        });
      })]).nice();

      const element = g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {
          return "translate(" + x0(d[xAxis]) + ",0)";
        });

      const rect = element.selectAll("rect")
        .data(function (d, i) {
          return keys.map(function (key) {
            return { key: key, value: d[key], index: key + "_" + i + "_" + d[xAxis] };
          });
        })
        .enter().append("rect")
        .attr("x", function (d) {
          return x1(d.key);
        })
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("width", x1.bandwidth())
        .attr("data-index", function (d, i) {
          return d.index;
        })
        .attr("height", function (d) {
          return height - y(d.value);
        })
        .attr("fill", (d) => (d.key) );

      //   g.append("g")
      //   .attr("class", "axis")
      //   .attr("transform", "translate(0," + height + ")")
      //   .call(d3Axis.axisBottom())
      //   .append("text")
      //   .attr("x", width / 2)
      //   .attr("y", margin.bottom * 0.9)
      //   .attr("dx", "0.32em")
      //   .attr("fill", "#000")
      //   .attr("font-weight", "bold")
      //   .attr("text-anchor", "start")
      //   .text(label.xAxis);

      // g.append("g")
      //   .attr("class", "axis")
      //   .call(d3Axis.axisLeft(y).ticks(null, "s"))
      //   .append("text")
      //   .attr("x", 0)
      //   .attr("y", 6)//y(y.ticks().pop()) + 0.5)
      //   .attr("dy", "0.71em")
      //   .attr("fill", "#000")
      //   .attr("transform", "rotate(-90)")
      //   .attr("font-weight", "bold")
      //   // .attr("text-anchor", "start")
      //   .text(label.yAxis);

}

     creategroupBarChartLegend(mainDiv, columnsInfo, colorRange) {
      const z = d3Scale.scaleOrdinal()
        .range(colorRange);
      const mainDivName = mainDiv.substr(1, mainDiv.length);
      $(mainDiv).before("<div id='Legend_" + mainDivName + "' class='pmd-card-body' style='margin-top:0; margin-bottom:0;'></div>");
      const keys = Object.keys(columnsInfo);
      keys.forEach(function (d) {
        const cloloCode = z(d);
        $("#Legend_" + mainDivName).append("<span class='team-graph team1' style='display: inline-block; margin-right:10px;'>\
  			<span style='background:" + cloloCode + ";width: 10px;height: 10px;display: inline-block;vertical-align: middle;'>&nbsp;</span>\
  			<span style='padding-top: 0;font-family:Source Sans Pro, sans-serif;font-size: 13px;display: inline;'>" + columnsInfo[d] + " </span>\
  		</span>");
      });

    }




}




