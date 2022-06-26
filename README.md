# Market-Project-Gruppo-4

# Project description

A weekly product dashboard.
The website shows on the screen a list of products on sale on the shelf of a supermarket, cataloging them according to the status and the date of arrival and expiration.
The project is partially based on the previous "Expiry", unlike the previous work, the products are shown in a complete html page, moreover the history of the market inventory is freely navigable.

# Usage

Products are randomly generated from a pre-set list and an arrival and expiration date is then generated.
When the product becomes expired it is removed from inventory.
By means of the buttons it is possible to browse the history of the weeks with the various products.
# Configuration and technical characteristics


# Files and project structure

The index file contains the source code of the main html page.
The script folder contains the Javascript files that allow the site to generate products and dates and distribute them on the calendar.
The styles folder instead contains the css codes for the style and layout of the main html.

''' img/
     flower-icon.svg
    scripts/
     config.mjs
     functionGUI.mjs
     function.mjs
     itemsNames.mjs
     main.mjs
     settings.mjs
    styles/
     modern-reset.css
     styles.css
    index.html
    license
    .gitattributes
    readme.md'''
# Features delivered

- Expired products are automatically removed from the shelf.
- Products that have remained on the shelf for too long are removed even if they are not expired as they are now old.
- A certain number of products arrive in the market every week.
- The program starts working from the current date or after a possible period, if appropriately specified in the code.
- The site calculates and prints the list every week, after a short preset time.
- The variables that establish the number of incoming products, the start and end date of the program, the print time span are all configurable in the JavaScript file.
# Bonuses delivered

Bonus 1: ---

Bonus 2: ---
# Browser compatibility
- Chrome v. 103.0.5060.53: tested and compatible
- Opera v. 87.0.4390.45: tested and compatible
- Firefox v. 101.0.1: tested and compatible
- Edge v. 103.0.1264.37: tested and compatible

# External resources

No external resources were used, the only thing to report is the use of webpack
# License and contact information

Copyright(c) 2022 - Group 04; All rights reserved.
# Authors

Raul Bercea, Petro Milanese, Gabriele Bovolenta, Dario Di Maria, Joele Melchiorre

raul.bercea@edu.itspiemonte.it; pietro.milanese@edu.itspiemonte.it; gabriele.bovolenta@edu.itspiemonte.it; dario.dimaria@edu.itspiemonte.it; joele.melchiorre@edu.itspiemonte.it
# Changelog and version history

# Other information
---