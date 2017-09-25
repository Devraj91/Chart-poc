import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as d3 from 'd3/build/d3';
//  import * as d3Scale from 'd3-scale';
//  import * as d3Array from 'd3-array';
//  import * as d3Axis from 'd3-axis';

import { STATISTICS, STATS } from './data';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  width: number;
  height: number;
  margin = { top: 20, right: 30, bottom: 30, left: 40 };
  data = [];

  constructor() {}
  ngOnInit() {
    this.barchart();
    this.color();
  }

  color() {}

  barchart() {
    this.data = [
      { name: 'Locke', value: 4 },
      { name: 'Reyes', value: 8 },
      { name: 'Ford', value: 15 },
      { name: 'Jarrah', value: 16 },
      { name: 'Shephard', value: 23 },
      { name: 'Kwon', value: 42 },
      { name: 'Kwo', value: 54 }
    ];
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, this.width])
      .paddingInner(0.1);

    const y = d3.scaleLinear().range([this.height, 0]);


    const xAxis = d3.axisBottom(x);

    const yAxis = d3.axisLeft(y);

    const chart = d3
      .select('.chart')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );

    const barWidth = this.width / this.data.length;

    x.domain(
      this.data.map(function(d) {
        return d.name;
      })
    );
    y.domain([
      0,
      d3.max(this.data, function(d) {
        return d.value;
      })
    ]);

    chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);

    chart
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Frequency');


    const bar = chart
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => {
        return x(d.name);
      })
      .attr('y', function(d) {
        return y(d.value);
      })
      .attr('height', (d) => {
        console.log('height', this.height, y(d.value));
        return this.height - y(d.value);
      })
      .attr('width', x.bandwidth());

    bar
      .append('rect')
      .attr('y', (d) => {
        return y(d.value);
      })
      .attr('height', (d) => {
        return this.height - y(d.value);
      })
      .attr('width', barWidth - 1);

    bar
      .append('text')
      .attr('x', barWidth / 2)
      .attr('y', (d) => {
        return y(d.value) + 3;
      })
      .attr('dy', '.75em')
      .text((d) => {
        return d.name;
      });

  }
}
