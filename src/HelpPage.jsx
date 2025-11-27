export default function HelpPage() {
    return (
        <div className="page-container help-page">
            <header className="page-header">
                <h1>Hilfe & Anleitung</h1>
            </header>

            <div className="card">
                <div className="card__body">
                    <section>
                        <h2>So funktioniert die Applikation</h2>
                        <p>Diese Applikation unterstützt Sie effektiv beim Lernen, indem sie verschiedene Übungen anbietet.</p>
                    </section>

                    <section className="mt-lg">
                        <h2>Navigation</h2>
                        <dl>
                            <dt>Home</dt>
                            <dd>Hier erhalten Sie einen Überblick über Ihren Lernfortschritt und sehen, welche Schritte Sie bereits gemacht haben.</dd>
                            <dt>Aufgaben</dt>
                            <dd>In diesem Bereich finden Sie die eigentlichen Lernaufgaben, um Ihr Wissen zu vertiefen.</dd>
                            <dt>Hilfe</dt>
                            <dd>Dies ist die Seite, auf der Sie sich aktuell befinden, ist für weitere Informationen und Anleitungen.</dd>
                        </dl>
                    </section>

                    <section className="mt-lg">
                        <h2>Aufgabentypen</h2>
                        <p>Innerhalb einer einzelnen Aufgabe können verschiedene Fragetypen gemischt vorkommen, um ein abwechslungsreiches Lernerlebnis zu schaffen.</p>
                        <dl>
                            <dt>Karteikarten (FlashCards)</dt>
                            <dd>Zeigt eine Frage an. Ein Klick auf die Karte deckt die dazugehörige Antwort auf.</dd>
                            <dt>Multiple Choice (MCQ)</dt>
                            <dd>Wählen Sie aus einer Liste von Optionen die eine korrekte Antwort aus.</dd>
                            <dt>Hybrid-Karten</dt>
                            <dd>Eine flexible Aufgabenkarte, die auch Bilder enthalten kann. Sie erscheint entweder als Multiple-Choice-Frage oder als einfache Karte, bei der Sie die Antwort selbst aufdecken.</dd>
                        </dl>
                    </section>
                </div>
            </div>
        </div>
    );
}