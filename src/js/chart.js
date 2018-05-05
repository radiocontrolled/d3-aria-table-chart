import dataUtilities from './dataUtilities';
import {scaleLinear, scaleTime} from 'd3-scale';
import {axisBottom, axisLeft} from 'd3-axis';
import {timeFormat} from 'd3-time-format'
import {select, selectAll} from 'd3-selection';
import {line} from 'd3-shape';

/*
  SVG canvas
*/
class Canvas {
  constructor(parentDiv) {
    this.parentDiv = parentDiv;
    this.setCanvasDimensions();

    // set width of SVG
    this.svg = select(this.parentDiv)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
      //.attr('role', 'img'); // we're pretending this is a table ///
      //.attr('aria-labelledby', 'title desc');

    this.title = this.svg
      .append('title')
      .attr('aria-hidden', true)
      .attr('id', 'titleId')
      .text('Monthly percentage change in UK house prices, 2017');

    this.desc = this.svg
      .append('desc')
      .attr('aria-hidden', true)

      .text('A line chart demonstrating all property types\' monthly percentage change in prices in 2017');

    // position g inside of SVG
    this.canvas = this.svg
      .append('g')
      .attr('class', 'canvas')
      .attr('width', this.width - this.margins.right - this.margins.left)
      .attr('height', this.height - this.margins.top - this.margins.bottom)
      .attr('transform', `translate(0, ${this.margins.top})`);

    this.table = this.canvas
      .append('g')
      .attr('role', 'table')
      // change this to reference a const at some point //
      .attr('aria-label', 'I am the aria label describing the d3 Chart, monthly percentage change in UK house prices, 2017. ');

  }

  setCanvasDimensions() {
    this.width = document.getElementsByClassName(this.parentDiv.replace(/\./, ''))[0].offsetWidth;

    const MARGIN = 30;
    this.margins = { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN };

    const PADDING = 0.8;

    if (window.innerHeight > window.innerWidth) {
      this.height = this.width * 1.25 * PADDING;
      this.margins.top = MARGIN / 2;
    } else {
      this.height = this.width / 3;
    }

  }

  updateCanvasDimensions() {
    this.svg
      .attr('width', this.width)
      .attr('height', this.height);

    this.canvas
      .attr('width', this.width - this.margins.right - this.margins.left)
      .attr('height', this.height - this.margins.top - this.margins.bottom)
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`);
  }
}

/*
  Scales, axes, gridlines, line drawing function
*/
class Chart extends Canvas {
  constructor(parentDiv, data, max) {
    super(parentDiv, data);

    this.data = data;

    const DATA_PADDING = 5;
    this.max = max + DATA_PADDING;

    // draw x axis -----
    this.xScale = scaleTime()
      .domain([this.data[0].date, this.data[this.data.length - 1].date])
      .range([this.margins.left, this.width - this.margins.right]);

    this.xAxis = axisBottom(this.xScale);


    this.table
      .append('g')
      .attr('role', 'row')
      .attr('class', 'x axis')
      .call(this.xAxis)
      .attr('transform', `translate(0, ${this.height - this.margins.bottom - this.margins.top})`);

    // manually select to create first January ---
    // for some reason d3 v4 doesn't want to give me the first tick
    // a first columnheader is required for the first month
    select('.x.axis').insert('text', 'path').text('January').attr('role', 'columnheader');

    // add extra a11y attributes to row
    this.xAxisA11yAttribs = selectAll('.x.axis .tick text')
      .attr('role', 'columnheader');

    // draw y axis -----
    this.yScale = scaleLinear()
      .domain([2, -2])
      .range([this.margins.bottom, this.height - this.margins.top]);

    this.yAxis = axisLeft(this.yScale);

    this.canvas
      .append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)
      .attr('aria-hidden', true)
      .attr('transform', `translate(${this.margins.left}, ${-this.margins.bottom})`)
      .append('text')
        .attr('fill', '#2c3e50')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.5em')
        .attr('dx', '-3em')
        .attr('text-anchor', 'end')
        .attr('aria-hidden', true)
        .text('Per cent change');


    // for each category, draw a line -----
    dataUtilities.getCategoriesToVisualise(this.data, 'date').forEach((el) => {
      const lineGenerator = line()
        .x((d) => this.xScale(d.date))
        .y((d) => this.yScale(d[el]));

      this.drawLine(this.data, lineGenerator, el);
      this.drawLineData(this.data, el);

    });
  }

  drawLine(data, lineGenerator, className) {
    const title = `Per cent change, ${className.replace(/\-/g, " ")}`;

    this.table
      .append('g')
      .attr('role', 'row') // g to append dots
      .attr('class', `${className}`)
      .append('g')
      .append('path')
      .attr('transform', `translate(0, ${-this.margins.bottom})`)
      .data([data])
      .attr("d", lineGenerator)
      .attr('class', `line ${className}`);
  }

  drawLineData(data, className) {
    const parent = select(`.${className}`);
    const formatter = timeFormat('%b');

    parent.selectAll(`.cell`)
      .data(data)
      .enter()
      .append('g')
      .attr('role', 'cell')
      .append('circle')
      .attr('r', 3)
      .attr('cx', (d) => this.xScale(d.date))
      .attr('cy', (d) => this.yScale(d['all-property-types']))
      .attr('transform', `translate(0, ${-this.margins.bottom})`)
      .attr('class', className)
      .append('title')
      .text((d) => d['all-property-types']);
  }

  resizeLine(el) {
    const lineGenerator = line()
      .x((d) => this.xScale(d.date))
      .y((d) => this.yScale(d[el]));

    const path = `path.line.${el}`;

    select(path)
      .attr('transform', `translate(0, ${-this.margins.bottom})`)
      .attr("d", lineGenerator);
  }

  resizeChartComponents() {
    this.xScale
      .range([this.margins.left, this.width - this.margins.right]);

    select('.x.axis')
      .call(this.xAxis)
      .attr('transform', `translate(0, ${this.height - this.margins.bottom - this.margins.top})`);

    this.yScale
      .range([this.margins.bottom, this.height - this.margins.top]);

    const lineGenerator = line()
      .x((d) => this.xScale(d.date))
      .y((d) => this.yScale(d[el]));


    select('.y.axis')
      .call(this.yAxis)
      .attr('transform', `translate(${this.margins.left}, ${-this.margins.bottom})`);

    dataUtilities.getCategoriesToVisualise(this.data, 'date').forEach((el) => {
      this.resizeLine(el);
    });
  }
}


dataUtilities.getData('./data/housePrices.json')
  .then((data) => {
    const processedData = dataUtilities.processRawData(data);
    const max = dataUtilities.getMaxOfData(processedData); // refactor
    const canvas = new Chart('.chart', processedData, max);

    select(window).on('resize', function(){
      canvas.setCanvasDimensions();
      canvas.updateCanvasDimensions();
      canvas.resizeChartComponents();
    });
  })
  .catch((err) => {
    console.log('There was an error: ', err);
  });
