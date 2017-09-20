import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STATISTICS, STATS } from './data';

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

  // private x: any;
  // private y: any;
  // private svg: any;
  // private g: any;

  constructor() {}

  ngOnInit() {
    // this.initSvg();
    // this.initAxis();
    // this.drawAxis();
    // this.drawBars();
     this.multiBarChart();
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



multiBarChart() {
const data = [
  {
    'Groups': 'A170',
    'Level 1': 1,
    'Level 2': 22,
    'Level 3': 22,
    'Level 4': 1
  },
  {
    'Groups': 'A220',
    'Level 1': 2,
    'Level 2': 1,
    'Level 3': 1,
    'Level 4': 1
  },
  {
    'Groups': 'A240',
    'Level 1': 6,
    'Level 2': 11,
    'Level 3': 18,
    'Level 4': 13
  }];


  const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

const x1 = d3.scale.ordinal();

const y = d3.scale.linear()
    .range([height, 0]);

const color = d3.scale.ordinal()
    .range(['#C4F0FF', '#E8D1FF' , '#FFC4C4', '#F6FFC4']);

const xAxis = d3.svg.axis()
    .scale(x0)
    .orient('bottom');

const yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .tickFormat(d3.format('.2s'));

const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const ageNames = d3.keys(data[0]).filter(function(key) { return key !== 'Groups'; });

console.log('data', x0);

data.forEach(function(d: any) {
    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
    });

    console.log('data', data);

  x0.domain(data.map(function(d) { return d.Groups; }));
  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
  // y.domain([0, d3.max(data, function(d: any) { return d3.max(d.ages, function(d: any) { return d.value; }); })]);

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Population');

  const state = svg.selectAll('.groups')
      .data(data)
      .enter().append('g')
      .attr('class', 'groups')
      .attr('transform', function(d) { return 'translate(' + x0(d.Groups) + ',0)'; });

  // state.selectAll('rect')
  //     .data(function(d) { return d.ages; })
  //     .enter().append('rect')
  //     .attr('width', x1.rangeBand())
  //     .attr('x', function(d: any) { return x1(d.name); })
  //     .attr('y', function(d) { return y(d.value); })
  //     .attr('height', function(d) { return height - y(d.value); })
  //     .style('fill', function(d) { return color(d.name); });


}

}

