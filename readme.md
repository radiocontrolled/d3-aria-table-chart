

# A D3 line chart enhanced with ARIA table semantics

**Demo**: https://radiocontrolled.github.io/d3-aria-table-chart/public/index.html

D3 builds charts with SVG, and scalability is an intrinsic accessibility feature of SVG. In addition, SVG has built-in elements (`title` and `desc`) that can be enhanced with ARIA. The accessibility of D3 charts need not be limited to scalability, descriptions and core content messages. In 2017, [Leonie Watson demonstrated how ARIA table semantics could be applied to an SVG line graph](https://tink.uk/accessible-svg-line-graphs/). This repo demonstrates how the ARIA table semantics technique can be implemented in a line chart built with D3. 

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
The chart in this demo depicts the monthly change in house prices in across the UK in 2017. Data for the demo chart were downloaded from the <a href="http://landregistry.data.gov.uk/">HM Land Registry</a> Website in March 2018.


## Demo accessibility features

| Feature| Purpose        | 
| :--------------------------------- |:------------|
| SVG `<title>` | SVGs should have a `<title>` as their first child and it should be meaningful. Some user agents (e.g. Chrome and Firefox) will display it as a tooltip. (In the demo chart, the `<title>` of the SVG is `aria-hidden: true` so that JAWS will not read the title of the SVG - an accessible description this is left to an `aria-label` on the chart itself)|
| SVG `<desc>` | Associates a more complex description with the SVG. The `<desc>` should also be meaningful - if your SVG drawing is built from meaningful parts, those parts should be described. As with the `<title>`, in this particular example, the `<desc>` is `aria-hidden: true` due to an accessible description residing on the chart itself|
|chart with `aria-hidden` y axis| The axes on this chart are built by a combination of D3 features: d3-scale, d3-axis and d3-time-format. The axes are grouped compositions of `<line>` and `<text>` elements. JAWS will recognise and read `<text>` elements, therefore, the y-axis is `aria-hidden` so that it will not be announced by this AT. |
|chart with `aria-hidden` y axis label| As above, this is `aria-hidden` so that it will not be announced by this AT.|
|chart using `role="table"` and associated table semantics| As it is not possible to use the native HTML `table` within SVG, an ARIA `role="table"` is used. An [ARIA table](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/#table) is "a static tabular structure containing one or more rows that each contain one or more cells". d3's x axis is given `role="row"` and its inner `<text>` months given `role="columnheader"`. A `columnheader` is the structural equivalent to an HTML `th` with a column scope; and a `columnheader` needs to be nested within a `row`.| 
|ARIA `main` landmark role|Each page should have one `main` landmark|
|Progressively enhanced CSS|Line / circle styles are inline so that when CSS is turned off, the chart still displays properly|

Visual guide to the above features: 

<img src="https://raw.githubusercontent.com/radiocontrolled/benj.info/master/assets/images/ariaRolesAnnotated.png" alt="Visual guide to aria roles applied to demo chart - aria hidden y axis and label, circles as role table cell, x axis with role role and months with role columnheader"/>

## Testing notes
Tested with VoiceOver (Mac) and JAWS 17 (Windows) on IE. Both AT can control this chart using table commands.

## Useful links
*  https://tink.uk/accessible-svg-line-graphs/
*  https://www.w3.org/TR/SVG11/access.html#SVGAccessibilityGuidelines 
*  https://www.w3.org/TR/2000/NOTE-SVG-access-20000807/ 
*  https://www.w3.org/TR/SVG11/struct.html#DescriptionAndTitleElements













