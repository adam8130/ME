export const breakLinedText = (
  text,
  config = {}
) => {
  const {
    symbols = ['. ', '。'],
    keepSymbol = true,
    disabled = false
  } = config;

  if (disabled) return text;

  const escapedSymbols = symbols.map(symbol => {
    return symbol.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  });

  const regex = new RegExp(`(${escapedSymbols.join('|')})`, 'g');
  const parts = text.split(regex);
  const result = [];

  for (let i = 0; i < parts.length; i += 2) {
    result.push(parts[i]);
    if (i + 1 < parts.length) {
      keepSymbol && result.push(parts[i + 1]);
      result.push(<br key={i} />);
    }
  }

  return result;
}

export const textWithIndentSymbol = (text, symbol, key) => {
  const lines = text.split(symbol)
  return (
    <div
      key={key}
      style={{ display: 'flex', alignItems: 'flex-start', margin: '5px 0' }}
    >
      <span style={{ marginRight: '5px' }}>
        {symbol}
      </span>
      <p>{lines}</p>
    </div>
  )
}
