export const terminalCommands = [
  '/home',
  '/about',
  '/notes',
  '/essays',
  '/daily',
  '/explore',
  '/help',
  '/clear',
] as const;

export type TerminalCommand = (typeof terminalCommands)[number];

export type TerminalResult =
  | { kind: 'navigate'; command: TerminalCommand; route: string }
  | { kind: 'explore'; command: '/explore' }
  | { kind: 'help'; command: '/help'; commands: readonly TerminalCommand[] }
  | { kind: 'clear'; command: '/clear' }
  | { kind: 'unknown'; command: string };

const routes: Partial<Record<TerminalCommand, string>> = {
  '/home': '/',
  '/about': '/about/',
  '/notes': '/notes/',
  '/essays': '/essays/',
  '/daily': '/daily/',
};

export function parseTerminalCommand(input: string): TerminalResult {
  const value = input.trim().toLowerCase();
  const command = value.startsWith('/') ? value : `/${value}`;

  if (command === '/explore') return { kind: 'explore', command };
  if (command === '/help') return { kind: 'help', command, commands: terminalCommands };
  if (command === '/clear') return { kind: 'clear', command };

  const route = routes[command as TerminalCommand];
  if (route) return { kind: 'navigate', command: command as TerminalCommand, route };

  return { kind: 'unknown', command };
}
