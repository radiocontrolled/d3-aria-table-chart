

# Accessible D3 charts using the ARIA table semantics design pattern

**Demo**: https://radiocontrolled.github.io/d3-aria-table-chart/public/index.html

D3 is an important tool for building chart visualisations. BBC News audiences include those who access charts through assistive technology (AT), so the accessibility of its D3 charts to AT users is important.

D3 builds charts with SVG, and scalability is an intrinsic accessibility feature of SVG. In addition, SVG has built-in semantic elements and can be enhanced with ARIA. 

The accessibility of D3 charts need not be limited to scalability, descriptions and core content messages. In 2017, [Leonie Watson demonstrated how ARIA table semantics could be applied to an SVG line graph](https://tink.uk/accessible-svg-line-graphs/). 

In this project I extend Leonie's work by demonstrating how the ARIA table semantics technique can be implemented in a line chart built with D3. I draw on lessons learned in the course of testing various charts produced for BBC Visual Journalism and through testing against BBC News' in-house guidelines, <a href="https://bbc-news.github.io/accessibility-news-and-you/accessibility-news-and-developers">Accessibility, News and Devleopers</a>.

## Future work and caveats
* ARIA table semantics can be applied to line charts and multi-series line charts. This design patten could also be applicable to bar charts, scatterplots and other visualisation layouts that lend themselves to being described as 'tabular' data.

* user experience should guide this design pattern's use and uptake. More testing, user testing for accessibility/usability and development is needed to refine this design pattern, identify its limitations, and establish browser and AT support (see AT support below)

## Demo setup
### Installation 
`npm install`

Requires Node v8.

### Run
`cd d3-aria-table-chart`<br/>
`npm run start:dev`

Visit http://localhost:8080/public/index.html

### Build
`npm run sass`<br/>
`npm run build`

### Test
`npm run test`

### Data 
The chart in this demo depicts the monthly change in house prices in across the UK in 2017. Data for the demo chart was downloaded from the <a href="http://landregistry.data.gov.uk/">HM Land Registry</a> Website in March 2018.


## Demo accessibility features

| Feature| Purpose        | 
| :--------------------------------- |:------------|
| SVG `<title>` | SVGs should have a `<title>` as their first child and it should be meaningful. Some user agents (e.g. Chrome and Firefox) will display it as a tooltip. (In the demo chart, the `<title>` of the SVG is `aria-hidden: true` so that JAWS will not read the title of the SVG - an accessible description this is left to an `aria-label` on the chart itself)|
| SVG `<desc>` | Associates a more complex description with the SVG. The `<desc>` should also be meaningful - if your SVG drawing is built from meaningful parts, those parts should be described. As with the `<title>`, in this particular example, the `<desc>` is `aria-hidden: true` due to an accessible description residing on the chart itself|
|chart with `aria-hidden` y axis| The axes on this chart are built by a combination of D3 features: d3-scale, d3-axis and d3-time-format. The axes are grouped compositions of `<line>` and `<text>` elements. JAWS will recognise and read `<text>` elements, therefore, the y-axis is `aria-hidden` so that it will not be announced by this AT. |
|chart with `aria-hidden` y axis label| As above, this is `aria-hidden` so that it will not be announced by this AT.|
|chart using `role="table"` and associated table semantics| As it is not possible to use the native HTML `table` within SVG, an ARIA `role="table"` is used. An [ARIA table](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/#table) is "a static tabular structure containing one or more rows that each contain one or more cells". d3's x axis is given `role="row"` and its inner `<text>` months given `role="columnheader"`. A `columnheader` is the structural equivalent to an HTML `th` with a column scope; and a `columnheader` needs to be nested within a `row`. 

Visual guide to the above features: 

<img src="https://raw.githubusercontent.com/radiocontrolled/benj.info/master/assets/images/ariaRolesAnnotated.png" alt="Visual guide to aria roles applied to demo chart - aria hidden y axis and label, circles as role table cell, x axis with role role and months with role columnheader"/>


The demo also features an HTML table with data identical to that included in the chart. This HTML table is a visual aid for AT testing. It also provides an alternative presentation of content to give the user choice in how content is consumed, and for those for whom the chart is not accessible.

**The `table` role:**

A meaningful `aria-label` should be added to the ARIA table.

```
<g role="table" aria-label="Meaningful lable describing chart should go here">
  <!-- chart goes here -->
/g>

```


**d3 x axis annotated with ARIA roles:**

The columnheader establishes a relationship between it and all cells in the corresponding column. It is the structural equivalent to an HTML `th` element with a column scope and it must be nested under an element with an ARIA role of `row`.

```
<g role="row" class="x axis" fill="none" font-size="10" ...>
  ...
    <g class="tick" opacity="1" transform="translate(73.14615384615385,0)">
      <line stroke="#000" y2="6"></line>
      <text fill="#000" y="9" dy="0.71em" role="columnheader">February</text>
    </g>
  ...
  </g>
```

**Table cells:**

```
  <g role="cell">
    <circle r="3" cx="30" cy="284.5875" transform="translate(0, -30)" class="all-property-types">
      <title>-0.19</title> 
    </circle>
  </g>
```


## Assistive technology support

P1 testing is a work in progress and follows https://bbc-news.github.io/accessibility-news-and-you/accessibility-and-supported-assistive-technology 

|AT|Result (work in progress)|
|:--|:--|
|JAWS Version 17 With Internet Explorer 11 on Windows (XP/Vista/7/8/10)(Screen Reader)|JAWS identifies the chart as a table and the table can be navigated uing JAWS' table commands.|
|ZoomText Magnifier/Reader Latest Version With Internet Explorer 11 on Windows (XP/Vista/7/8/10)(Screen Magnifier with Screen Reader capabilities)
||
|Dragon Naturallyspeaking Version 13 With Internet Explorer 11 on Windows (XP/Vista/7/8/10)(Speech Recognition)||
|Read&Write Latest Version With Internet Explorer 11 on Windows (XP/Vista/7/8/10)(Reading Solution)||
|VoiceOver iOS (iPhone/iPad) Latest Version With Safari(Latest Version) on iOS (Latest Version)(Screen Reader)||

## Useful links
*  https://www.w3.org/TR/SVG11/access.html#SVGAccessibilityGuidelines 
*  https://www.w3.org/TR/2000/NOTE-SVG-access-20000807/ 
*  https://www.w3.org/TR/SVG11/struct.html#DescriptionAndTitleElements
*  https://tink.uk/accessible-svg-line-graphs/












