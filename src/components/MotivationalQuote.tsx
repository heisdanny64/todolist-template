import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const quotes = [
  "The secret of getting ahead is getting started.",
  "You don't have to be great to start, but you have to start to be great.",
  "Progress, not perfection. Keep going!",
  "Small steps every day lead to big changes.",
  "You're doing amazing! Just a few more tasks to go.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Don't watch the clock; do what it does. Keep going.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream big, start small, act now.",
  "Every accomplishment starts with the decision to try.",
];

interface MotivationalQuoteProps {
  show: boolean;
}

export function MotivationalQuote({ show }: MotivationalQuoteProps) {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    if (show) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <div className="flex items-start gap-3">
        <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
        <p className="text-lg italic text-foreground/90">{quote}</p>
      </div>
    </div>
  );
}
