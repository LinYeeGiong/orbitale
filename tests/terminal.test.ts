import { describe, expect, it } from 'vitest';

import { parseTerminalCommand } from '../src/lib/terminal';

describe('parseTerminalCommand', () => {
  it('normalizes a route command and returns its site path', () => {
    expect(parseTerminalCommand('  notes  ')).toEqual({
      kind: 'navigate',
      command: '/notes',
      route: '/notes/',
    });
  });

  it('recognizes non-navigation commands', () => {
    expect(parseTerminalCommand('/explore')).toEqual({ kind: 'explore', command: '/explore' });
    expect(parseTerminalCommand('/clear')).toEqual({ kind: 'clear', command: '/clear' });
  });

  it('returns every available command for help', () => {
    expect(parseTerminalCommand('/help')).toEqual({
      kind: 'help',
      command: '/help',
      commands: ['/home', '/about', '/notes', '/essays', '/daily', '/explore', '/help', '/clear'],
    });
  });

  it('keeps the normalized command when input is unknown', () => {
    expect(parseTerminalCommand('archive')).toEqual({
      kind: 'unknown',
      command: '/archive',
    });
  });
});
