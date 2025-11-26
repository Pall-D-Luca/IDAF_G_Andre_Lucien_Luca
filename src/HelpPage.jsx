export default function HelpPage() {
    return (
        <div className="page-container help-page">
            <header className="page-header">
                <h1>Hilfe & Anleitung</h1>
            </header>

            <div className="card">
                <div className="card__body">
                    <section>
                        <h2>Wie es funktioniert</h2>
                        <p>Diese Anwendung wurde entwickelt, um Ihnen beim Lernen zu helfen, indem sie verschiedene Arten von Übungen anbietet.</p>
                    </section>

                    <section className="mt-lg">
                        <h2>Navigation</h2>
                        <dl>
                            <dt>Home</dt>
                            <dd>Hier sehen Sie Ihren Lernfortschritt auf dem Lernpfad.</dd>
                            <dt>Aufgaben</dt>
                            <dd>Hier finden Sie die eigentlichen Lernübungen.</dd>
                            <dt>Hilfe</dt>
                            <dd>Diese Seite, auf der Sie sich gerade befinden.</dd>
                        </dl>
                    </section>

                    <section className="mt-lg">
                        <h2>Aufgabentypen</h2>
                        <dl>
                            <dt>Karteikarten (FlashCards)</dt>
                            <dd>Zeigen Sie eine Frage an. Klicken Sie auf die Karte, um die Antwort aufzudecken.</dd>
                            <dt>Multiple Choice</dt>
                            <dd>Wählen Sie die richtige Antwort aus einer Liste von Optionen aus.</dd>
                        </dl>
                    </section>
                </div>
                <div className="card__footer">
                    <div className="callout callout--info">
                        <p><strong>Tipp:</strong> Bleiben Sie am Ball! Regelmässiges Üben führt zum besten Lernerfolg.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}