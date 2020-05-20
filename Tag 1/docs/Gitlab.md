# SCM - Platformen/Tools
- gitlab.com
- github.com
- Bitbucket
- SVN

# SCM - Einrichten
- GIT installieren (git-scm.com)
- GITHub-Desktop installieren (desktop.github.com)
- Git mit VSC nutzbar

# GitLab Projekte einrichten

1. Projekt in Gitlab.com anlegen
    - mit README.md initialisieren
2. Clone Projekt
    - lokal einen Hauptordner (leer!) erstellen
    - Repo(sitory) clonen mit VSC od. Github-Desktop
    - HTTPS-Clone URL aus Gitlab kopieren
    - Logindaten für Gitlab eingeben (falls noch nicht passiert)
    - Hauptordner zum clonen auswählen (Projektordner wird automatisch erstellt)
3. VSC einen Workspace speichern

# Änderungen am Code
## Commits
- Neue Dateien, Entfernete Dateien, Änderungen zuerst zu einem Commit zusammenfassen
- im VCS vorher Änderungen "stagen" oder im Github-Desktop auswählen
- Commit einen Titel geben 
- Commits syncen (Pull/Push)

## Commits mergen (wenn mehrere Branches vorhanden sind)
- Zuerst Merge-Request erstellen (von welchen Branch zu welchem) - gitlab.com
- "diskutieren"
- wenn alles passt => "Merge" (ggf. Branch löschen, wenn er danach nicht mehr gebraucht wird, sonst behalten)

# Branches

Es gibt mehrere Kopien des Quellcodes.
In jedem Branch kann weitergearbeitet werden (unterschiedliche Aufgaben).
Am Ende werden die Änderungen zusammengeführt (Merge)

## Standard-Branches

- master (das ist die öffentliche Version der Software)
- develop (hier wird weiterentwickelt)
- hotfix (bei Problemen im master, zB bugs, wird hier gearbeitet, nach Fehlerbehebung werden Änderungen in master und develop gemerged)

## weitere 
- realeasecandite
- feature1 (usw.)

## Achtung
- neuen Branch lokal erstellen (Kopie von master) und mit Sync online bringen
- beim Arbeiten im VSC darauf achten, dass der richtige Branch ausgewählt wurde.

# Aufgaben verwalten
Zuerst werden Milestones (Ziele, zB Versionsnummern) definiert.
Kategorien für Aufgaben angelegt (Labels)

## Issue
Aufgaben werden als Issue erstellt.
Beschreibung der Aufgabe mit Markdown (zB -[] Tasks) möglich
Quickactions wie /estimate und /spend um Zeitaufwand zu protokollieren
In Boards werden Issues übersichtlich dargestellt und können schnell verschoben od. geschlossen (Aufgabe = erledigt) werden