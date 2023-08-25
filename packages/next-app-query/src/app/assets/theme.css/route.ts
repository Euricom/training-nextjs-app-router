function getTheme(_domain: string) {
  //
  // retrieve the theme from db of file
  //
  return Promise.resolve({
    'color-primary': '#000',
    'color-secondary': '#fff',
  });
}

export async function GET(_request: Request) {
  const url = new URL(_request.url);
  const theme = await getTheme(url.hostname);

  const keys = Object.keys(theme) as (keyof typeof theme)[];
  const styles = `
  :root { 
    ${keys.map((key) => `--${key}: ${theme[key]};`).join('\n')}
  }
  `;
  return new Response(styles, {
    status: 200,
    headers: { 'Content-Type': 'text/css; charset=utf-8' },
  });
}
