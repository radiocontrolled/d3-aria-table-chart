https://bbc-news.github.io/accessibility-news-and-you/accessibility-news-and-developers


| Item| Result    | 
| :--------------------------------- |:------------|
|Has there been an Accessibility Review for the product feature. Colour contrast?|N/A, and colour of line is `#8E44AD`; which is WCAG AA|
|Does the design use icons|N/A|
|Consider the mark up|Code validated with https://validator.w3.org/|
|Use a linting tool with accessibility rules|to-do|
|Check the accessibility of the rendered DOM|Axe recommends manual color contrast checking (DONE)|
|Turn CSS off in the browser|SVG chart works without CSS |
|Page without JavaScript|Not implemented in this project, but if the D3 was rendered server-side, the chart would work with JavaScript turned off|
|Keyboard navigation |There are no links, there is no interactivity|
|o you need to use ARIA|See project readme for ARIA table semantics explanation; ARIA `main` landmark role added|
|Use VoiceOver (Screen Reader) on iOS (iPhone/iPad)|to-do|
|Manually check the heading orde|DONE|
|Colour blindness|to-do - ARIA errors with Chrome lens|
