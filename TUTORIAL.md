# Tutorial: Aufgaben und Lernpfad bearbeiten

Dieses Tutorial erklärt, wie du neue Quiz-Aufgaben erstellst und sie zum Lernpfad auf der Startseite hinzufügst.

## Teil 1: Quiz-Datensätze erstellen

Alle Quiz-Daten liegen im Verzeichnis `src/aufgaben/data/`. Jede Datei ist ein JSON-Array, das eine Liste von Frage-Objekten enthält.

Es gibt drei Arten von Fragen: `flashcard`, `mcq`, und `hybrid`. Jedes Frage-Objekt in der JSON-Datei **muss** eine `id` und eine `type` Eigenschaft haben.

### Format 1: Flashcard

Eine einfache Frage-Antwort-Karte. Sie verhält sich wie eine traditionelle Lernkarte.

-   `type`: `"flashcard"`
-   `front.html`: Die Vorderseite der Karte (die Frage).
-   `back.html`: Die Rückseite der Karte (die Antwort).

**Beispiel (`set1.json`):**
```json
[
  {
    "id": 1,
    "type": "flashcard",
    "front": { "html": "<div>Was ist die Hauptstadt von Alaska?</div>" },
    "back": { "html": "<div>Juneau</div>" }
  }
]
```

### Format 2: Multiple Choice (MCQ)

Eine Frage mit mehreren Antwortmöglichkeiten.

-   `type`: `"mcq"`
-   `question`: Der Text der Frage.
-   `options`: Ein Array mit den Antwortmöglichkeiten (Strings).
-   `correct`: Die exakte Zeichenkette der richtigen Antwort aus dem `options`-Array.

**Beispiel (`set2.json`):**
```json
[
  {
    "id": 3,
    "type": "mcq",
    "question": "Welcher dieser ist ein US-Bundesstaat?",
    "options": ["Ontario", "Texas", "Quebec", "Alberta"],
    "correct": "Texas"
  }
]
```

### Format 3: Hybrid-Karte

Eine flexible Karte, die entweder eine Flashcard oder eine MCQ sein kann.

-   `type`: `"hybrid"`
-   `front.html`: Die Frage.
-   `back.html`: Die ausführliche Antwort.
-   `options` (optional): Wenn vorhanden, werden Multiple-Choice-Optionen angezeigt.
-   `correct` (optional): Die richtige Antwort, falls `options` verwendet wird.

**Beispiel 1: Hybrid als MCQ (`set5.json`):**
```json
[
  {
    "id": 10,
    "type": "hybrid",
    "front": { "html": "<div>Welches Logo ist das?<br/><img src='/vite.svg' alt='Logo'/></div>" },
    "back": { "html": "<div>Das ist das <strong>Vite</strong> Logo.</div>" },
    "options": ["Vite", "React", "Vue"],
    "correct": "Vite"
  }
]
```

**Beispiel 2: Hybrid als Flashcard (`set5.json`):**
(Ohne `options` und `correct`)
```json
[
  {
    "id": 11,
    "type": "hybrid",
    "front": { "html": "<div>Was ist der Zweck einer 'key'-Prop in React?</div>" },
    "back": { "html": "<div>Der 'key' hilft React, Elemente in einer Liste zu identifizieren.</div>" }
  }
]
```

### Bilder in Fragen verwenden

Du kannst Bilder in allen `.html`-Feldern (`front.html`, `back.html`) verwenden.
1.  Platziere die Bilddatei im `public/` Verzeichnis.
2.  Binde es mit einem `<img>`-Tag und einem Pfad beginnend mit `/` ein.

**Beispiel:** `<img src='/dein-bild.png' alt='Beschreibung' style='width:100px;'/>`

---

## Teil 2: Den Lernpfad anpassen

Die Datei `src/home/progressbar.json` definiert die einzelnen Schritte des Lernpfads.

Jeder Schritt ist ein Objekt im `steps`-Array mit folgenden Eigenschaften:
-   `name`: Der Name des Schritts, der auf der Karte angezeigt wird.
-   `taskType`: Der Typ der Aufgabe. Dieser sollte mit dem `type` in deiner JSON-Datei übereinstimmen (`flashcards`, `mcq`, `mixed`, `hybrid`).
-   `dataset`: Der Pfad zu deiner JSON-Datei, relativ zu `src/aufgaben/`. **Beispiel:** `"data/set1.json"`.
-   `step`: Die Nummer des Schritts (eindeutig und fortlaufend).
-   `x`, `y`, `mobile_x`, `mobile_y`: Die Koordinaten für die Position auf dem Lernpfad (Desktop und Mobile).

**Beispiel-Eintrag in `progressbar.json`:**
```json
{
  "name": "Review",
  "x": 900, "y": 50, "mobile_x": 200, "mobile_y": 250,
  "taskType": "hybrid",
  "dataset": "data/set5.json",
  "step": 3
}
```
Um einen Schritt zu ändern, passe einfach die `dataset`- und `taskType`-Eigenschaft an oder füge ein komplett neues Schritt-Objekt zum Array hinzu.

---

## Teil 3: Neue Datensätze registrieren

Jede neue JSON-Datei muss in der `AufgabenPage` registriert werden, damit die Anwendung sie laden kann.

1.  Öffne die Datei `src/aufgaben/AufgabenPage.jsx`.
2.  Finde die Funktion `datasetImporter` am Anfang der Datei.
3.  Füge einen neuen `case` für deine neue Datei hinzu. Der `case` muss dem Wert entsprechen, den du in `progressbar.json` bei `dataset` eingetragen hast.

**Beispiel:**
```javascript
// in src/aufgaben/AufgabenPage.jsx

const datasetImporter = (datasetName) => {
    switch (datasetName) {
        // ... andere cases
        
        // NEUEN EINTRAG HINZUFÜGEN:
        case 'data/deine-neue-datei.json':
            return import('./data/deine-neue-datei.json');
            
        default:
            // ...
    }
};
```

---
**Fertig!** Deine neuen Aufgaben sind nun Teil der Anwendung.