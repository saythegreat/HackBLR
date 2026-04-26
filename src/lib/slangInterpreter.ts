export const slangDictionary: Record<string, string> = {
  "sick": "very good",
  "lit": "exciting and fun",
  "fire": "amazing",
  "ghosted": "stopped responding suddenly",
  "salty": "bitter or upset",
  "shade": "disrespect or insult",
  "tea": "gossip or news",
  "spill the tea": "share gossip",
  "lowkey": "slightly or secretly",
  "highkey": "obviously",
  "sus": "suspicious",
  "bet": "okay or agreed",
  "no cap": "no lie",
  "cap": "lie",
  "vibe": "feeling or atmosphere",
  "vibing": "enjoying the moment",
  "flex": "show off",
  "clout": "influence or fame",
  "stan": "strong fan",
  "drag": "criticize harshly",
  "slay": "do something extremely well",
  "woke": "socially aware",
  "cancelled": "boycotted or rejected",
  "banger": "very good song",
  "cringe": "embarrassing",
  "glow up": "major improvement",
  "snatched": "looking very good",
  "pressed": "annoyed",
  "dead": "laughing hard",
  "goat": "greatest of all time",
  "mid": "average",
  "extra": "overdramatic",
  "basic": "unoriginal",
  "shook": "surprised",
  "fomo": "fear of missing out",
  "yolo": "you only live once",
  "simp": "overly attentive person",
  "thirsty": "desperate for attention",
  "boujee": "luxurious",
  "ratchet": "messy or loud",
  "slaps": "sounds very good",
  "hits different": "feels unique",
  "on point": "perfect",
  "killing it": "doing very well",
  "down bad": "feeling low",
  "take the l": "accept defeat",
  "big mood": "relatable feeling",
  "say less": "understood",
  "period": "end of discussion",
  "iconic": "very memorable",
  "legend": "highly respected",
  "mood": "relatable",
  "main character": "center of attention",
  "side eye": "disapproval",
  "caught in 4k": "caught clearly",
  "touch grass": "go outside",
  "it is what it is": "accept reality",
  "stay woke": "stay aware",
  "run it back": "repeat",
  "hold up": "wait",
  "my bad": "my mistake",
  "no worries": "it is okay",
  "piece of cake": "very easy",
  "break a leg": "good luck",
  "hit the sack": "go to sleep",
  "under the weather": "feeling sick",
  "costs an arm and a leg": "very expensive",
  "once in a blue moon": "rarely",
  "burning the midnight oil": "working late",
  "kick the bucket": "die",
  "let the cat out of the bag": "reveal secret",
  "bite the bullet": "face difficulty",
  "call it a day": "stop working",
  "cut corners": "do cheaply",
  "hit the nail on the head": "exactly correct",
  "in hot water": "in trouble",
  "miss the boat": "miss opportunity",
  "pull someone's leg": "joke with someone",
  "so far so good": "going well",
  "take it easy": "relax",
  "through thick and thin": "in all situations",
  "time flies": "time passes fast",
  "wrap your head around": "understand",
  "you bet": "certainly",
  "zero chill": "no calmness"
};

/**
 * Parses a transcript and replaces known slang/idioms with their standard English equivalents.
 * Maintains case sensitivity where possible.
 */
export function interpretSlang(text: string): string {
  if (!text) return text;

  let processedText = text;

  // Sort keys by length descending to match longer phrases first
  const sortedSlangKeys = Object.keys(slangDictionary).sort((a, b) => b.length - a.length);

  for (const slang of sortedSlangKeys) {
    // Word boundary regex to ensure we don't replace partial words
    const regex = new RegExp(`\\b${slang}\\b`, 'gi');
    
    processedText = processedText.replace(regex, (match) => {
      const replacement = slangDictionary[slang];
      // Basic casing preservation
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  return processedText;
}
