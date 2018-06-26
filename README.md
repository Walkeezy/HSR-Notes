# HSR CAS-FEE 2018 Projekt 1

Ein kleine, lustige Notizen-App.

## Installation

1. Repo klonen
2. In das HSR-Notes Verzeichnis wechseln und `npm install` ausführen
3. `node server.js` ausführen
4. http://127.0.0.1:3000 aufrufen

## Features

* Anzeigen, Erfassen, Bearbeiten und Löschen von Notizen
* Sortieren der Notizen nach Fälligskeitsdatum, Erstellungsdatum und Wichtigkeit
* Filtern der Notizen nach Status
* Speichern der Daten auf Node.js-Server, Kommunikation über JSON-REST-Schnittstelle
* Dunkler Style
* Heller Style
* Responsive Design

## Verwendete Libraries für das Backend

* Express JS (Middleware: body-parser)
* NeDB
* Moment.js

## Verwendete Libraries für das Frontend

* jQuery
* Handlebars.js
* Moment.js
* Normalize.css
