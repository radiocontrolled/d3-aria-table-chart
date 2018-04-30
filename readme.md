
# Installation 
`npm install`

Requires Node v8.

# Run
`cd a11y-chart-2`
`start:dev`

# Build
`npm run build`
http://localhost:8080/public/index.html

# Test
`npm run test`

# Data 
Source: http://landregistry.data.gov.uk/

# a11y features
- Inline SVG (when the SVG is in the HTML) means SVG source is directly available in the DOM - which is exposed to the accessibility API that is used by AT.
- Putting `role="img"` on the svg element ensures it is identified as a graphic. 
- Using `aria-labelledby` referencing the id values of the `title` and `desc` elements provides the accessible name and accessible description. This is because `title` and `desc` support may be patchy in screen readers

LEFT OFF: 
https://www.w3.org/TR/SVG11/access.html#SVGAccessibilityGuidelines
https://www.w3.org/TR/2000/NOTE-SVG-access-20000807/
https://www.w3.org/TR/SVG11/struct.html#DescriptionAndTitleElements

to test with Catherine: 
- does role="presentation" affect anything? (try it toggled on / off)
- is reading of tabular data correct?
- could she do the live screen reader demo?

Sources: 
  

TO DO: -- standard a11y assessment
TO do: -- add caveat that this is a pres about technical accessibility
