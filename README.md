# Project_2

Our group undertook an analysis concerning the occupation of parking spaces in the CBD of Melbourne, using retrived data from parking sensors in this localisation. This data was accessed from the City of Melbourne open data website (https://data.melbourne.vic.gov.au/), using API.

Due to the character of the data, it was agreed that the best method to share and present the result of our analysis would be to create a map.  This map will show the available and occupied parking spots in Melbourne, CBD. As we are concerned with live data this map will routinely update every two minutes, operating as a real time map. 

In addition to this, we have created another plot using Plotly. As this plot is filtered by area name, it will show the average duration and minutes that each car spent in each parking space as corresponding to the required area. 

In order to achieve our objectives for this project, we created a big SQL database, in fact joining two databases. This was evidenced utilising Sqlalchemy, as the group connected the database with Flask, in which one can see our data analysis work and plots. 

