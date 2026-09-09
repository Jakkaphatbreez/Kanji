
export function extractCharsFromSource(sourceText, fieldName) {
  const regex = new RegExp(`\\b${fieldName}:\\s*'([^']*)'`, 'g');
  const chars = [];
  let match;
  while ((match = regex.exec(sourceText)) !== null) {
    chars.push(match[1]);
  }
  return chars;
}

export function extractStrokePaths(svgText) {
  const pathTags = svgText.match(/<path\b[^>]*>/g) ?? [];
  const paths = [];
  for (const tag of pathTags) {
    const match = tag.match(/\sd="([^"]*)"/);
    if (match) paths.push(match[1]);
  }
  return paths;
}
