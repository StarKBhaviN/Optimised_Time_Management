import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const quotesTxt = [
    "Time is what we want most, but what we use worst. - 'William Penn'",
    "The bad news is time flies. The good news is you're the pilot. - 'Michael Altshuler'",
    "Time isn't the main thing. It's the only thing. - 'Miles Davis'",
    "Lost time is never found again. - 'Benjamin Franklin'",
    "Time is a created thing. To say 'I don't have time,' is like saying, 'I don't want to.' - 'Lao Tzu'",
    "The key is in not spending time, but in investing it. - 'Stephen R.Covey'",
    "The common man is not concerned about the passage of time, the man of talent is driven by it. - 'Shoppenhauer'",
    "Time management is life management. - 'Robin Sharma'",
    "The way we spend our time defines who we are. - 'Jonathan Estrin'",
    "Until we can manage time, we can manage nothing else. - 'Peter F.Drucker'",
    "Time is more valuable than money. You can get more money, but you cannot get more time. - Jim Rohn",
    "The bad news is time flies. The good news is you're the pilot. - Michael Altshuler",
    "The key is not in spending time, but in investing it. - Stephen R. Covey",
    "Time management is the key to success. - Michael Altshuler",
    "Lost time is never found again. - Benjamin Franklin",
    "Time is what we want most, but what we use worst. - William Penn",
    "The way we spend our time defines who we are. - Jonathan Estrin",
    "The key to success is time management and self-discipline. - Catherine Pulsifer",
    "Time is the scarcest resource and unless it is managed, nothing else can be managed. - Peter Drucker",
    "Time management is about life management. - Idowu Koyenikan",
    "The essence of self-discipline is to do the important thing rather than the urgent thing. - Barry Werner-King",
    "Until we can manage time, we can manage nothing else. - Peter F. Drucker",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "You will never 'find' time for anything. If you want time, you must make it. - Charles Buxton",
    "Time is the wisest counselor of all. - Pericles",
];

function Quotes() {
    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * quotesTxt.length);
            const randomQuote = quotesTxt[randomIndex];
            showToastMessage(randomQuote);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const showToastMessage = (quote) => {
        toast.dark(quote, {
            position: "top-right"
        });
    };

    return (
        <div>
            {/* Quotes will be displayed here on interval */}
        </div>
    );
}

export default Quotes;
