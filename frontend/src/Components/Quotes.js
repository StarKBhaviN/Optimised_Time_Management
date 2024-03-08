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
    "Until we can manage time, we can manage nothing else. - 'Peter F.Drucker'"
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
