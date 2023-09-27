import Sentiment from 'sentiment';
const sentiment = new Sentiment();
export function fromText (text) {
      return sentiment.analyze(text);
};
