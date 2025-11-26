# Anleitung: Hinzufügen neuer Aufgaben-Sets

Dieses Tutorial erklärt, wie Sie neue Flashcard- oder Multiple-Choice-Fragen (MCQ)-Sets zum Projekt hinzufügen und sie mit der Fortschrittsanzeige auf der Startseite verknüpfen.

Folgen Sie diesen drei Schritten:

## Schritt 1: Neue Daten-Datei erstellen

Zuerst müssen Sie eine neue JSON-Datei mit Ihren Fragen im Verzeichnis `src/aufgaben/` erstellen.

### Beispiel für ein Flashcard-Set

Erstellen Sie eine Datei, z.B. `src/aufgaben/neue_flashcards.json`. Jede Karte benötigt eine `id`, `type`, `front` und `back`.

```json
[
  {
    "id": 201,
    "type": "flashcard",
    "front": { "html": "<div>Was ist Photosynthese?</div>" },
    "back": { "html": "<div>Ein Prozess, den Pflanzen nutzen, um Lichtenergie in chemische Energie umzuwandeln.</div>" }
  },
  {
    "id": 202,
    "type": "flashcard",
    "front": { "html": "<div>Was ist die Hauptstadt von Japan?</div>" },
    "back": { "html": "<div>Tokio</div>" }
  }
]
```

### Beispiel für ein MCQ-Set

Erstellen Sie eine Datei, z.B. `src/aufgaben/neue_mcqs.json`. Jede Frage benötigt eine `id`, `type`, `question`, `options` (eine Liste von Antworten) und `correct` (die richtige Antwort).

```json
[
  {
    "id": 301,
    "type": "mcq",
    "question": "Welcher Planet ist als der 'Rote Planet' bekannt?",
    "options": ["Erde", "Mars", "Jupiter", "Venus"],
    "correct": "Mars"
  }
]
```

---

## Schritt 2: Fortschrittsanzeige anpassen

Öffnen Sie die Datei `src/home/progressbar.json`. Diese Datei definiert die Schritte, die auf der Startseite angezeigt werden.

Suchen Sie den Schritt (`step`), den Sie mit Ihrem neuen Datensatz verknüpfen möchten, und ändern Sie den Wert von `"dataset"` auf den Namen Ihrer neuen Datei.

**Beispiel:** Um den dritten Schritt ("Review") mit der neuen Datei `neue_flashcards.json` zu verknüpfen, ändern Sie Folgendes:

```json
// in src/home/progressbar.json

{
  "steps": [
    { "...": "..." },
    { "...": "..." },
    { 
      "name": "Review", 
      "x": 900, 
      "y": 50, 
      "taskType": "flashcards", 
      "dataset": "neue_flashcards.json", // <-- HIER ÄNDERN
      "step": 3 
    },
    { "...": "..." }
  ]
}
```

---

## Schritt 3: Neues Set in der Anwendung registrieren

Damit die Anwendung Ihre neue Datei laden kann, muss sie in der "Import-Map" registriert werden.

1.  Öffnen Sie die Datei `src/aufgaben/AufgabenPage.jsx`.
2.  Finden Sie die Funktion `datasetImporter` am Anfang der Datei.
3.  Fügen Sie einen neuen `case` für Ihre neue Datei hinzu.

**Beispiel:** Wenn Ihre neue Datei `neue_flashcards.json` heißt:

```javascript
// in src/aufgaben/AufgabenPage.jsx

const datasetImporter = (datasetName) => {
    switch (datasetName) {
        case 'flashcards_set1.json':
            return import('./flashcards_set1.json');
        case 'mcq_set1.json':
            return import('./mcq_set1.json');
        
        // NEUEN EINTRAG HINZUFÜGEN:
        case 'neue_flashcards.json':
            return import('./neue_flashcards.json');
            
        default:
            return Promise.reject(new Error(`Unknown dataset: ${datasetName}`));
    }
};
```

---

**Fertig!** Ihr neues Aufgaben-Set ist jetzt in die Anwendung integriert. Wenn Sie den entsprechenden Schritt auf der Startseite erreichen und anklicken, wird Ihr neues Set geladen.
